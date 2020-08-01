import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

//Components
import Error from "../../ReusableComponents/Error/error";
import PostContainer from "../../ReusableComponents/PostContainer/postContainer";
import { Posts } from "../../posts_contex";

import "./posts.css";
function PostsDreams() {
  const style = {
    position: "absolute",
    left: "30%",
  };

  //Variables
  const { posts, setPosts } = useContext(Posts);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  //First request to server to get all old the posts
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    axios
      .get("/api/home")
      .then((res) => {
        if (res.data.status === "error") {
          return setError({
            display: true,
            errorMessage: res.data.errorMessage,
          });
        }
        setPosts(res.data.posts.map((post) => post));
      })
      .catch((e) => {
        setError({
          display: true,
          errorMessage: "Failed To Load. Try Again",
        });
      });
    return () => {
      source.cancel();
    };
  }, [setPosts]);

  return (
    <div style={style} className="postsContainer">
      {error.display && <Error errorMessage={error.errorMessage} />}
      {posts.map((post) => (
        <div key={post._id} className="postsWraper">
          <PostContainer post={post.post} title={post.title} />
        </div>
      ))}
    </div>
  );
}

export default PostsDreams;
