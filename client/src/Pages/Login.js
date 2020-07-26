import React from "react";

import Heading from "../Components/ReusableComponents/Heading/heading";
import Form from "../Components/Login/Form";

function Login({ checkForAuth }) {
  return (
    <div>
      <Heading title="Login" />
      <Form handleAuth={checkForAuth} />
    </div>
  );
}

export default Login;
