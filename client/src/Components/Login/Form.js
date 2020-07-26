import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Input from "../ReusableComponents/Input/input";
import Error from "../ReusableComponents/Error/error";

//import UserHome from "../../Pages/userPage/Home";

function Form({ handleAuth }) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      setError({
        display: false,
        errorMessage: "",
      });
      axios
        .post("/api/login", { username, password })
        .then((res) => {
          setError({ display: true, errorMessage: res.data.error });
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
