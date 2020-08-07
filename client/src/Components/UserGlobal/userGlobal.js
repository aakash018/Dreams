import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { Posts } from "../posts_contex";

import PostContainer from "../ReusableComponents/PostContainer/postContainer";
import Error from "../ReusableComponents/Error/error";

import "./userGlobal.css";
function GlobalPosts() {
  const { sharedPosts, setSharedPosts } = useContext(Posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  useEffect(() => {
    let mounted = true;
    const source = axios.CancelToken.source();
    try {
      if (sharedPosts.length === 0) {
        setLoading(true);
        axios
          .get("/api/sharePost", { cancelToken: source.token })
          .then((res) => {
            if (mounted) {
              if (res.data.error) {
                setLoading(false);
                return setError({
                  display: true,
                  errorMessage: res.data.errorMessage,
                });
              } else {
                setError({ display: false });
                setSharedPosts(res.data);
                setLoading(false);
              }
            }
          })
          .catch(() => {
            if (mounted) {
              setLoading(false);
              setError({
                display: true,
                errorMessage: "Failed to load Global Post! Try again",
              });
            }
          });
      }
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log("Cancled reequest");
      }
    }
    return () => {
      source.cancel();
      mounted = false;
    };
  }, [setSharedPosts, sharedPosts.length]);

  return (
    <div>
      {loading && <h1 className="postsContainer">Loading</h1>}
      {error.display && <Error errorMessage={error.errorMessage} />}
      <div className="postsContainer">
        {sharedPosts.map((sharedPost) => (
          <div key={sharedPost._id} className="sharedPostWraper">
            <PostContainer
              date={sharedPost.postedTime}
              name={[sharedPost.firstName, sharedPost.lastName]}
              title={sharedPost.title}
              post={sharedPost.post}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GlobalPosts;
