import React from "react";
import Form from "../Components/SignUp/Form";
import Heading from "../Components/ReusableComponents/Heading/heading";

function SignUp() {
  const headerStyle = {
    textAlign: "center",
  };
  return (
    <div>
      <div className="signupHeader" style={headerStyle}>
        <Heading title="SignUp" />
      </div>
      <Form />
    </div>
  );
}

export default SignUp;
