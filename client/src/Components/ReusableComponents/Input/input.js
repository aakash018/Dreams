import React from "react";
import "./input.css";

function Input({ lableFor, lable, stateToUpdate, onchange, type }) {
  const handleChange = (e) => {
    onchange(e.target.value, stateToUpdate);
  };

  return (
    <div className="inputContainer">
      <label htmlFor={lableFor}>
        {lable}
        <input
          type={type}
          className="formInnput"
          id={lableFor}
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
}

export default Input;
