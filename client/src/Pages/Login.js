import React from "react";

import Heading from "../Components/ReusableComponents/Heading/heading";
import Form from "../Components/Login/Form";

function Login({ checkForAuth }) {
  const styleForHeading = {
    textAlign: "center",
    fontSize: "2.7rem",
    marginTop: "20px",
  };

  return (
    <div>
      <div style={styleForHeading}>
        <Heading title="Login" />
      </div>
      <Form handleAuth={checkForAuth} />
    </div>
  );
}

export default Login;
