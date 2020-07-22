import React, { useState } from "react";
import axios from "axios";

import Input from "../ReusableComponents/Input/input";
import Error from "../ReusableComponents/Error/error";

import "./form.css";

//import logo from "../../ReusableComponents/dream.svg";

function Form() {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (data, setValue) => {
    setValue(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "" || password === "" || email === "") {
      setError(true);
    } else {
      if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        setError(true);
      } else {
        setError(false);
        await axios.post("/api/signup", { input, password, email });
      }
    }
  };

  return (
    <div className="formContainer">
      <form>
        <div className="errorContainer">
          {error && <Error errorMessage="Error" />}
        </div>
        <div className="inputField">
          <Input
            lableFor="name"
            lable="Name"
            type="text"
            onchange={handleChange}
            stateToUpdate={setInput}
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
