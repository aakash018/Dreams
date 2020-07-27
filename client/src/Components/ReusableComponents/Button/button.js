import React from "react";

import "./button.css";

function Button({ action, text, disable }) {
  const handleSubmit = (e) => {
    action(e);
  };

  return (
    <button onClick={handleSubmit} className="submitButton" disabled={disable}>
      {text}
    </button>
  );
}

export default Button;
