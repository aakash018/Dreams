import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

//Components
import Error from "../../ReusableComponents/Error/error";
import PostContainer from "../../ReusableComponents/PostContainer/postContainer";
import { Posts } from "../../posts_contex";

import "./posts.css";
function PostsDreams() {
  //Variables
  const { posts, setPosts, searchTerm } = useContext(Posts);
  const [firstName, setFirstname] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  //First request to server to get all old the posts
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setLoading(true);
    axios
      .get("/api/home")
      .then((res) => {
        if (res.data.status === "error") {
          setLoading(false);
          return setError({
            display: true,
            errorMessage: res.data.errorMessage,
          });
        }
        setFirstname(res.data.firstName);
        setPosts(res.data.posts.map((post) => post));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError({
          display: true,
          errorMessage: "Failed To Load. Try Again",
        });
      });
    return () => {
      source.cancel();
    };
  }, [setPosts]);

  //Function to escape special RegEx characters
  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  return (
    <div className="postsContainer">
      {loading && <h1 className="postsWraper">Loading</h1>}
      {error.display && <Error errorMessage={error.errorMessage} />}
      {posts.map((post) => {
        if (
          post.title.match(new RegExp(escapeRegex(searchTerm), "i")) ||
          searchTerm.trim() === ""
        ) {
          return (
            <div key={post._id} className="postsWraper">
              <PostContainer
                post={post.post}
                title={post.title}
                name={firstName}
                date={post.postedTime}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default PostsDreams;
