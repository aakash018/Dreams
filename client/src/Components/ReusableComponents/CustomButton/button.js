import React from "react";

import "./button.css";
function Button({ content, action }) {
  const handleClick = () => {
    action();
  };

  return (
    <div className="customButton" onClick={handleClick}>
      <div className="buttonWraper">
        <section>{content}</section>
      </div>
    </div>
  );
}

export default Button;
