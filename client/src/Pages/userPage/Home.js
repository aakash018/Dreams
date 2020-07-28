import React from "react";
//import axios from "axios";
import NavBar from "../../Components/UserHome/NavBar/Nav-Bar";
import LogOut from "../../Components/UserHome/Logout";
import PostInput from "../../Components/UserHome/PostInput/postInput";
function UserHome({ checkForAuth }) {
  const logoutStyle = {
    position: "absolute",
    top: "10px",
    right: "100px",
  };

  return (
    <div>
      <NavBar />
      <div className="userLogOut" style={logoutStyle}>
        <LogOut handleAuth={checkForAuth} />
      </div>
      <PostInput />
    </div>
  );
}

export default UserHome;
