import React from "react";

import "./heading.css";
function Heading({ title, color }) {
  const style = {
    color: color || "black",
  };

  return (
    <h2 className="heading" style={style}>
      {title}
    </h2>
  );
}

export default Heading;
