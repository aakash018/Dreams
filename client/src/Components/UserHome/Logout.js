import React from "react";
import axios from "axios";

function Logout({ handleAuth }) {
  const handleLogout = () => {
    axios.post("/api/home").then((res) => handleAuth(res.data));
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
