import React, { useState, useEffect } from "react";
import axios from "axios";

import LogOut from "../../Components/UserHome/Logout";

function UserHome({ checkForAuth }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get("/api/home").then((res) => setEmail(res.data.email));
  }, []);

  return (
    <div>
      <h2>Joe Mama {email}</h2>
      <LogOut handleAuth={checkForAuth} />
    </div>
  );
}

export default UserHome;
