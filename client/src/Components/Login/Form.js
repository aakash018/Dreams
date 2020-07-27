import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import Input from "../ReusableComponents/Input/input";
import Error from "../ReusableComponents/Error/error";
import Button from "../ReusableComponents/Button/button";

import "./form.css";

import loginCover from "../../img/dreams-cover.jpg";

function Form({ handleAuth }) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let status = false;
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get("/api/login", {
        cancelToken: source.token,
      })
      .then((res) => console.log(res.data));
    return () => {
      source.cancel();
    };
  }, []);

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
      setLoading(true);
      axios
        .post("/api/login", { username, password })
        .then((res) => {
          setError({ display: true, errorMessage: res.data.error });
          setLoading(false);
          status = res.data.status;
          //console.log(res.data.status);
          handleAuth(status);
          status ? history.push("/home") : history.push("/login");
        })
        .catch((err) => {
          console.log(err);
          setError({
            display: true,
            errorMessage: "Unknown Error! Try again later.",
          });
        });
    }
  };

  return (
    <div className="loginFormContainer">
      <div className="loginFormWraper">
        <div className="loginCover">
          <img src={loginCover} alt="LoginCover" />
        </div>
        <div className="loginElement">
          <div className="welcomeElement">
            Welcome To <span>Dreams</span>
          </div>
          <div className="errorElement">
            {error.display && <Error errorMessage={error.errorMessage} />}
          </div>
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
            <div className="loginPageButton">
              <Button
                action={handleSubmit}
                text={loading ? "Loading" : "Login"}
                disable={loading}
              />
            </div>
          </form>
          <section>
            Don't have an accont ? <Link to="/signup">SignUp</Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Form;
