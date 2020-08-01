import React from "react";

function Error({ errorMessage, color }) {
  const style = {
    fontSize: "1.4rem",
    fontFamily: "var(--defult-font)",
    color: color || "rgba(245, 19, 49)",
  };

  return (
    <div style={style}>
      <h2>{errorMessage}</h2>
    </div>
  );
}

export default Error;
