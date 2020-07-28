import React from "react";

function Textarea({ handleChange }) {
  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };

  return (
    <div className="inputTextarea">
      <textarea cols="50" rows="10" onChange={handleInputChange}></textarea>
    </div>
  );
}

export default Textarea;
