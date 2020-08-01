import React from "react";

import "./textarea.css";
function Textarea({ handleChange, setValue }) {
  const handleInputChange = (e) => {
    handleChange(e.target.value, setValue);
  };

  return (
    <div className="inputTextarea">
      <textarea onChange={handleInputChange}></textarea>
    </div>
  );
}

export default Textarea;
