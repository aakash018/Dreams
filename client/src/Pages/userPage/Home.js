import React from "react";
import axios from "axios";

function UserHome() {
  axios.get("/api/home").then((res) => console.log(res.data));

  return (
    <div>
      <h2>Joe</h2>
    </div>
  );
}

export default UserHome;
