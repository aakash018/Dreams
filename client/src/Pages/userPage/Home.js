import React, { useState } from "react";

import NavBar from "../../Components/UserHome/NavBar/Nav-Bar";
import LogOut from "../../Components/UserHome/Logout";
import PostInput from "../../Components/UserHome/PostInput/postInput";
import { Posts } from "../../Components/posts_contex";
import PostsDreams from "../../Components/UserHome/Posts/posts";

function UserHome({ checkForAuth }) {
  const logoutStyle = {
    position: "fixed",
    top: "10px",
    right: "10vw",
  };

  const [posts, setPosts] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  return (
    <div>
      <Posts.Provider
        value={{ posts, setPosts, showInputBox, setShowInputBox }}
      >
        <NavBar />
        <div className="userLogOut" style={logoutStyle}>
          <LogOut handleAuth={checkForAuth} />
        </div>

        <PostInput />
        <PostsDreams />
      </Posts.Provider>
    </div>
  );
}

export default UserHome;
