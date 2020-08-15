import React, { useContext } from "react";
import axios from "axios";

import Button from "../ReusableComponents/Button/button";
import { Posts } from "../posts_contex";

function Logout({ handleAuth }) {
  const { setPosts } = useContext(Posts);

  const handleLogout = () => {
    axios.delete("/api/home").then((res) => handleAuth(res.data));

    //To clear state for new login
    setPosts([]);
    localStorage.removeItem("name");
  };

  return (
    <div>
      <Button action={handleLogout} text="LogOut" />
    </div>
  );
}

export default Logout;
