import React from "react";

import "./button.css";
function Button({ content }) {
  return (
    <div className="customButton">
      <div className="buttonWraper">
        <section>{content}</section>
      </div>
    </div>
  );
}

export default Button;
