import React from "react";

function Error({ errorMessage }) {
  const style = {
    fontSize: "2rem",
    color: "red",
  };

  return (
    <div>
      <h2 style={style}>{errorMessage}</h2>
    </div>
  );
}

export default Error;
