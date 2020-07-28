import React from "react";
import axios from "axios";

import Button from "../ReusableComponents/Button/button";

function Logout({ handleAuth }) {
  const handleLogout = () => {
    axios.delete("/api/home").then((res) => handleAuth(res.data));
  };

  return (
    <div>
      <Button action={handleLogout} text="LogOut" />
    </div>
  );
}

export default Logout;
