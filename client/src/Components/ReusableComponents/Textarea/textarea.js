import React from "react";

import "./textarea.css";
function Textarea({ handleChange, setValue, value }) {
  const handleInputChange = (e) => {
    handleChange(e.target.value, setValue);
  };

  return (
    <div className="inputTextarea">
      <textarea onChange={handleInputChange} value={value}></textarea>
    </div>
  );
}

export default Textarea;
