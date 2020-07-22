import React, { useState } from "react";
import axios from "axios";

import Input from "../ReusableComponents/Input/input";
import Error from "../ReusableComponents/Error/error";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  const handleChange = (data, setState) => {
    setState(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError({
        display: true,
        errorMessage: "Fields are Empty",
      });
    } else {
      setError({
        display: false,
        errorMessage: "",
      });
      axios.post("/api/login", { username, password });
    }
    console.log(error);
  };

  return (
    <div>
      {error.display && <Error errorMessage={error.errorMessage} />}
      <form>
        <Input
          lableFor="Username"
          lable="Username"
          type="text"
          onchange={handleChange}
          stateToUpdate={setUsername}
        />
        <Input
          lableFor="Password"
          lable="Password"
          type="password"
          onchange={handleChange}
          stateToUpdate={setPassword}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

export default Form;
