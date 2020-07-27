import React from "react";

import Heading from "../Components/ReusableComponents/Heading/heading";
import Form from "../Components/Login/Form";

function Login({ checkForAuth }) {
  const styleForHeading = {
    marginLeft: "43%",
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
