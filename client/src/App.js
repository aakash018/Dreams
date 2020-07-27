import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

import UserHome from "./Pages/userPage/Home";

import "./App.css";
//sessionStorage.setItem("isLoggedIn", false);
function App() {
  const [status, setStatus] = useState(Cookies.get("isLoggedIn"));

  const handleAuth = (recivedStatus) => {
    if (recivedStatus) {
      recivedStatus = "true";
    } else {
      recivedStatus = "false";
    }
    setStatus(recivedStatus);
    Cookies.set("isLoggedIn", recivedStatus);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {status === "true" ? <Redirect to="/home" /> : <Home />}
          </Route>
          <Route path="/signup" exact>
            {status === "true" ? <Redirect to="/home" /> : <SignUp />}
          </Route>
          <Route path="/login" exact>
            {status === "true" ? (
              <Redirect to="/home" />
            ) : (
              <Login checkForAuth={handleAuth} />
            )}
          </Route>
          {status === "true" && (
            <Route path="/home" exact>
              <UserHome checkForAuth={handleAuth} />
            </Route>
          )}
          <Route path="*" exact>
            {status === "true" ? <Redirect to="/home" /> : <Home />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
