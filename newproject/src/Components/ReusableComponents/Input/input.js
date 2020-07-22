import React from "react";
import "./input.css";

function Input({ lableFor, lable, type, onchange, needed, stateToUpdate }) {
  const handleChange = (e) => {
    onchange(e.target.value, stateToUpdate);
  };

  return (
    <div>
      <label htmlFor={lableFor}>
        {lable}
        <input
          type={type}
          onChange={handleChange}
          required={needed}
          className="formInnput"
          id={lableFor}
        ></input>
      </label>
    </div>
  );
}

export default Input;
