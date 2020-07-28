import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Input from "../ReusableComponents/Input/input";
import Error from "../ReusableComponents/Error/error";
import Button from "../ReusableComponents/Button/button";

import "./form.css";

//import logo from "../../ReusableComponents/dream.svg";

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  const history = useHistory();

  const handleChange = (data, setValue) => {
    setValue(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      username === "" ||
      password === "" ||
      email === "" ||
      confirm_password === ""
    ) {
      setError({
        display: true,
        errorMessage: "Some filds are empty",
      });
    } else if (password !== confirm_password) {
      setError({
        display: true,
        errorMessage: "Confirm Password did not match",
      });
    } else {
      if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        setError({
          display: true,
          errorMessage: "Not a valid email",
        });
      } else {
        setError({
          display: false,
          errorMessage: "",
        });

        await axios
          .post("/api/signup", { username, password, email })
          .then((res) => {
            if (res.data.success) history.push("/login");
            else
              setError({ display: true, errorMessage: res.data.errorMessage });
          })
          .catch(() => {
            setError({
              display: true,
              errorMessage:
                "Internal Error! Try again later or report the error",
            });
          });
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
            lableFor="username"
            lable="Username"
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
        <div className="inputField">
          <Input
            lableFor="confirm-password"
            lable="Confirm Password"
            type="password"
            onchange={handleChange}
            stateToUpdate={setConfirmPassword}
          />
        </div>
        <div className="signupButton">
          <Button text="SignUp" action={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default Form;
