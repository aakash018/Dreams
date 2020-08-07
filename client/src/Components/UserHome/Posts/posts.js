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
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  //First request to server to get all old the posts
  useEffect(() => {
    let mounted = true;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      if (posts.length === 0) {
        setLoading(true);
        axios
          .get("/api/home", { cancelToken: source.token })
          .then((res) => {
            if (mounted) {
              if (res.data.status === "error") {
                setLoading(false);
                return setError({
                  display: true,
                  errorMessage: res.data.errorMessage,
                });
              }
              setName(res.data.firstName);
              setPosts(res.data.posts.map((post) => post));
              setLoading(false);
            }
          })

          .catch((e) => {
            if (mounted) {
              setLoading(false);
              setError({
                display: true,
                errorMessage: "Failed To Load. Try Again",
              });
            }
          });
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log("CAncle");
      }
    }

    return () => {
      source.cancel();
      mounted = false;
    };
  }, [setPosts, posts.length]);

  //Function to handle Share
  const handleShare = (post, name) => {
    axios
      .post("/api/sharePost", {
        _id: post._id,
        name: name,
        title: post.title,
        post: post.post,
        postedTime: post.postedTime,
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  //Function to escape special RegEx characters
  function escapeRegex(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  return (
    <div className="postsContainer">
      {loading && <h1 className="postsWraper">Loading</h1>}
      {error.display && <Error errorMessage={error.errorMessage} />}
      {posts.map((post) => {
        if (
          post.title.match(new RegExp(escapeRegex(searchTerm.trim()), "i")) ||
          searchTerm.trim() === ""
        ) {
          return (
            <div key={post._id} className="postsWraper">
              <PostContainer
                post={post.post}
                title={post.title}
                name={name}
                date={post.postedTime}
              />
              {/* Take post from current itration */}
              <button onClick={() => handleShare(post, name)}>Share</button>
            </div>
          );
        }
        return "";
      })}
    </div>
  );
}

export default PostsDreams;
