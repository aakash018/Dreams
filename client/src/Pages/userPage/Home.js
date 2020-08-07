import React from "react";

import LogOut from "../../Components/UserHome/Logout";

import SearchBar from "../../Components/UserHome/Search";

import PostsDreams from "../../Components/UserHome/Posts/posts";

function UserHome({ checkForAuth }) {
  const logoutStyle = {
    position: "fixed",
    top: "10px",
    right: "10vw",
  };

  return (
    <div>
      <SearchBar />
      <div className="userLogOut" style={logoutStyle}>
        <LogOut handleAuth={checkForAuth} />
      </div>

      <PostsDreams />
    </div>
  );
}

export default UserHome;
