import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import { UserContext } from "../../contexts/userContext";

function LoginForm({ history }) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/auth/login", inputs)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        // localStorage.setItem("DnDNotesUser", JSON.stringify(res.data.user));
        console.log(res.data.user);
        setUser(res.data.user);
        history.push("/campaigns");
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          placeholder="Username"
        ></input>
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="Password"
        ></input>
        {error && <p>{error}</p>}
        <button type="submit">OK</button>
      </form>
    </>
  );
}

export default LoginForm;
