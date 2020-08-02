import React from "react";
import Form from "../Components/SignUp/Form";
import Heading from "../Components/ReusableComponents/Heading/heading";

function SignUp() {
  const headerStyle = {
    textAlign: "center",
    fontSize: "2.7rem",
    marginTop: "30px",
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
