import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { Posts } from "../posts_contex";

import PostContainer from "../ReusableComponents/PostContainer/postContainer";
import Error from "../ReusableComponents/Error/error";

import "./userGlobal.css";
function GlobalPosts() {
  const { sharedPosts, setSharedPosts } = useContext(Posts);
  const { likedPosts, setLikedPosts } = useContext(Posts);
  const [loading, setLoading] = useState(false);
  // const [likes, setLikes] = useState(null)
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
          .get("/api/globalPosts", { cancelToken: source.token })
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
                console.log(res.data);
                setSharedPosts(res.data.sharedPost);
                setLikedPosts(res.data.likedPosts);
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
  }, [setSharedPosts, sharedPosts.length, setLikedPosts]);

  const handleLike = (post) => {
    axios.post("/api/postOptions/like", { id: post._id, likes: post.likes });
    setSharedPosts(
      sharedPosts.map((element) => {
        if (element._id === post._id) {
          //searching if the post is liked already
          const isLiked = likedPosts.find(
            (likedPost) => likedPost === element._id
          );
          if (isLiked == null) {
            //changing like list and count on client side
            //Onevery refresh it is asked with server for list
            element.likes = element.likes + 1;
            setLikedPosts(likedPosts.concat(element._id));
          } else {
            //changing unlike list and count on client side
            //Onevery refresh it is asked with server for list
            element.likes = element.likes - 1;
            setLikedPosts(
              likedPosts.filter((likedPost) => likedPost !== element._id)
            );
          }
          return element;
        } else {
          return element;
        }
      })
    );
  };

  //This function sends parameters to change like icon when clicked
  const handelLikeIcon = (sharedPostId) => {
    const isLiked = likedPosts.find((likedPost) => sharedPostId === likedPost);

    if (isLiked == null) {
      return "not-active";
    } else {
      return "active";
    }
  };

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
              showOptions={false}
              showInteraction={true}
              likesCount={sharedPost.likes}
              isLiked={handelLikeIcon(sharedPost._id)}
              handleLike={() => handleLike(sharedPost)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GlobalPosts;
