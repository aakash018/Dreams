import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import UserHome from "./Pages/userPage/Home";
import NavBar from "./Components/UserHome/NavBar/Nav-Bar";
import PostInput from "./Components/UserHome/PostInput/postInput";
import Global from "./Pages/userPage/Global";
import { Posts } from "./Components/posts_contex";

import "./App.css";

function App() {
  const [status, setStatus] = useState(Cookies.get("isLoggedIn"));

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInputBox, setShowInputBox] = useState({
    display: false,
    isFromEdit: false,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  //To  Edit and majke new post
  const [title, setTitle] = useState("");
  const [postInput, setPostInput] = useState("");

  //For Sharing POst
  const [postId, setPostId] = useState("");
  const [sharedPosts, setSharedPosts] = useState([]);

  //For Liking post
  const [likedPosts, setLikedPosts] = useState([]);

  const handleAuth = (recivedStatus) => {
    if (recivedStatus) {
      recivedStatus = "true";
    } else {
      recivedStatus = "false";
    }
    setStatus(recivedStatus);
    Cookies.set("isLoggedIn", recivedStatus);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {status === "true" ? <Redirect to="/user/home" /> : <Home />}
          </Route>
          <Route path="/signup" exact>
            {status === "true" ? <Redirect to="/user/home" /> : <SignUp />}
          </Route>
          <Route path="/login" exact>
            {status === "true" ? (
              <Redirect to="/user/home" />
            ) : (
              <Login checkForAuth={handleAuth} />
            )}
          </Route>
          {status === "true" && (
            <Posts.Provider
              value={{
                posts,
                setPosts,
                showInputBox,
                setShowInputBox,
                searchTerm,
                setSearchTerm,
                sharedPosts,
                setSharedPosts,
                showConfirmModal,
                setShowConfirmModal,
                title,
                setTitle,
                postInput,
                setPostInput,
                postId,
                setPostId,
                likedPosts,
                setLikedPosts,
              }}
            >
              <NavBar />
              <PostInput />
              <Route path="/user/home" exact>
                <UserHome checkForAuth={handleAuth} />
              </Route>
              <Route path="/user/global" component={Global} exact />
            </Posts.Provider>
          )}
          <Route path="*" exact>
            {status === "true" ? <Redirect to="/user/home" /> : <Home />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
