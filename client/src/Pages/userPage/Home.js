import React from "react";

import LogOut from "../../Components/UserHome/Logout";

import SearchBar from "../../Components/UserHome/Search";

import PostsDreams from "../../Components/UserHome/Posts/posts";
// import ConfirmModal from "../../Components/UserHome/confimModal";
// import { Posts } from "../../Components/posts_contex";
function UserHome({ checkForAuth }) {
  const logoutStyle = {
    position: "fixed",
    top: "10px",
    right: "10vw",
  };

  // const { setShowConfirmModal } = useContext(Posts);

  return (
    <div>
      <SearchBar />
      {/* <ConfirmModal /> */}
      <div className="userLogOut" style={logoutStyle}>
        <LogOut handleAuth={checkForAuth} />
      </div>

      <PostsDreams />
    </div>
  );
}

export default UserHome;
