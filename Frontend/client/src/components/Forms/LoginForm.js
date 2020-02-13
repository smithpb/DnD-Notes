import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import { setFullUser } from "../../util/userInfo";

function LoginForm({ history, fetchData }) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");

  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/auth/login", inputs)
      .then(res => {
        setFullUser(res.data.token, res.data.user);
        fetchData();
        history.push("/campaigns");
      })
      .catch(error => {
        setError(error.response.data.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
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
        <button type="submit">OK</button>
      </form>
    </>
  );
}

export default LoginForm;
