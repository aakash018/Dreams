import React from "react";
import "./input.css";

function Input({
  lableFor,
  lable,
  stateToUpdate,
  onchange,
  type,
  placeholder,
  color,
  ...rest
}) {
  const handleChange = (e) => {
    onchange(e.target.value, stateToUpdate);
  };

  const style = {
    color: color || "black",
  };

  return (
    <div className="inputContainer">
      <label htmlFor={lableFor}>
        {lable}
        <input
          {...rest}
          placeholder={placeholder}
          type={type}
          className="formInnput"
          id={lableFor}
          onChange={handleChange}
          style={style}
        ></input>
      </label>
    </div>
  );
}

export default Input;
