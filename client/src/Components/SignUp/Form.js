import React, { useState } from "react";
import axios from "axios";

import Input from "../ReusableComponents/Input/input";
import Error from "../ReusableComponents/Error/error";

import "./form.css";

//import logo from "../../ReusableComponents/dream.svg";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  const handleChange = (data, setValue) => {
    setValue(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      setError({
        display: true,
        errorMessage: "Some filds are empty",
      });
    } else {
      if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        setError({
          display: true,
          errorMessage: "Not a valid email",
        });
      } else {
        setError({
          display: true,
          errorMessage: "",
        });
        await axios.post("/api/signup", { username, password, email });
      }
    }
  };

  return (
    <div className="formContainer">
      <form>
        <div className="errorContainer">
          {error.display && <Error errorMessage={error.errorMessage} />}
        </div>
        <div className="inputField">
          <Input
            lableFor="name"
            lable="Name"
            type="text"
            onchange={handleChange}
            stateToUpdate={setUsername}
          />
        </div>
        <div className="inputField">
          <Input
            lableFor="email"
            lable="Email"
            type="email"
            onchange={handleChange}
            stateToUpdate={setEmail}
          />
        </div>
        <div className="inputField">
          <Input
            lableFor="password"
            lable="Password"
            type="password"
            onchange={handleChange}
            stateToUpdate={setPassword}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          SignUp
        </button>
      </form>
    </div>
  );
}

export default Form;
