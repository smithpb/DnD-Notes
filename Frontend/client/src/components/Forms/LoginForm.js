import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

function LoginForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = event => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/auth/login", inputs)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("DnDNotesUser", JSON.stringify(res.data.user));
        console.log("Posted", res.data.token);
      })
      .catch(error => {
        console.log(error);
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
        <button type="submit">OK</button>
      </form>
    </>
  );
}

export default LoginForm;
