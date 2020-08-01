import React from "react";

function Heading({ title, color, fontSize }) {
  const style = {
    fontFamily: "var(--defult-font)",
    fontWeight: "lighter",
    fontSize: fontSize || "4rem",
    margin: "30px",
    color: color || "black",
  };

  return (
    <h2 className="heading" style={style}>
      {title}
    </h2>
  );
}

export default Heading;
