import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

//Components
import Error from "../../ReusableComponents/Error/error";
import PostContainer from "../../ReusableComponents/PostContainer/postContainer";
// import ComfirmModel from "../../UserHome/confimModal";
// import PostEdit from "../../UserHome/PostEdit/postEdit";
import { Posts } from "../../posts_contex";

import "./posts.css";
import ConfirmModal from "../../UserHome/confimModal";

function PostsDreams() {
  //Variables
  const { posts, setPosts, searchTerm } = useContext(Posts);

  // //For EDit
  const { setTitle } = useContext(Posts);
  const { setPostInput } = useContext(Posts);
  const { setShowInputBox } = useContext(Posts);
  const { setPostId } = useContext(Posts);

  //To Show Different MOadls
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showShareConfirmModal, setShowShareConfirmModal] = useState(false);

  //To Set Which post to delete or share
  const [postToPerformAction, setPostToPerformAction] = useState({});

  //Share needs arious parameters. This state sets name for Share. On 0 holds name ans 1 holds ButtonText
  const [parametersToSendToShareContainer, setParametersToShare] = useState([]);

  //Name is stored in LS
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("name")) || []
  );

  //To change value of shared to share
  const shared = useRef("");

  const [loading, setLoading] = useState(false);
  const [loadingForModal, setLoadingForModal] = useState(false);
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
              setName(res.data.name);
              //Saving in LS so the value is not lost after page cchnages
              localStorage.setItem("name", JSON.stringify(res.data.name));
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
    //If post is not Shared Share it
    if (!post.isShared) {
      setLoadingForModal(true);
      axios
        .post("/api/postOptions/share", {
          _id: post._id,
          name: name,
          title: post.title,
          post: post.post,
          postedTime: post.postedTime,
        })
        .then((res) => {
          //Server will return updated post after share and we update the posts state with updatePosts
          const updatedPostsAfterShare = posts.map((element) => {
            if (element._id === post._id) {
              return res.data.post[0];
            } else {
              return element;
            }
          });

          setPosts(updatedPostsAfterShare);
          setLoadingForModal(false);
          if (res.data.error) {
            setError({
              display: true,
              errorMessage: res.data.errorMessage,
            });
          }
          setShowShareConfirmModal(false);
        })
        .catch((e) => {
          console.log(e);
          //Refresh page on every sharing error

          setError({
            display: true,
            errorMessage: "Unknown Error! Try again",
          });
        });
    } else {
      //Else Unshare It
      setLoadingForModal(true);
      axios
        .post("/api/postOptions/unshare", {
          id: post._id,
        })
        .then((res) => {
          //Server will return updated post after share and we update the posts state with updatePosts
          const updatedPostsAfterUnshare = posts.map((element) => {
            if (element._id === post._id) {
              return res.data.post[0];
            } else {
              return element;
            }
          });

          setPosts(updatedPostsAfterUnshare);
          setLoadingForModal(false);
          setShowShareConfirmModal(false);
        })
        .catch((e) => {
          //To refresh page useEffect everytime there is an error whine shareing

          setError({
            display: true,
            errorMessage: "Unknown Error! Try again",
          });
        });
    }
  };

  const handleDelete = (post) => {
    //Remove deelted post in server
    setLoadingForModal(true);
    axios
      .put("/api/postOptions/delete", {
        id: post._id,
      })
      .then((res) => {
        //To remove Deleted post in client side
        const remove = posts.filter((element) => element._id !== post._id);
        setPosts(remove);
        setLoadingForModal(false);
        setShowDeleteConfirmModal(false);
      });
  };

  const handelEdit = (post) => {
    setShowInputBox({
      display: true,
      isFromEdit: true,
    });
    setPostId(post._id);
    setTitle(post.title);
    setPostInput(post.post);
  };

  const handleDeletModal = (post) => {
    setPostToPerformAction(post);
    setShowDeleteConfirmModal(true);
  };

  const handleShareModal = (post, name) => {
    setPostToPerformAction(post);
    //Button Name set for confirm Model
    const buttonName = post.isShared ? "Unshare" : "Share";
    setParametersToShare([name, buttonName]);
    setShowShareConfirmModal(true);
  };

  //Function to escape special RegEx characters
  function escapeRegex(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  return (
    <div className="postsContainer">
      {/* {console.log(showInputBox)} */}
      {loading && <h1 className="postsWraper">Loading</h1>}
      {error.display && <Error errorMessage={error.errorMessage} />}
      {showDeleteConfirmModal && (
        <ConfirmModal
          stateToCancel={setShowDeleteConfirmModal}
          message={"Delete The Post ?"}
          confirmedAction={() => handleDelete(postToPerformAction)}
          confirmButtonText={loadingForModal ? "Deleting" : "Delete"}
          disableButton={loadingForModal}
        />
      )}
      {showShareConfirmModal && (
        <ConfirmModal
          stateToCancel={setShowShareConfirmModal}
          message={parametersToSendToShareContainer[1] + " the post?"}
          confirmedAction={() =>
            handleShare(
              postToPerformAction,
              parametersToSendToShareContainer[0]
            )
          }
          confirmButtonText={
            loadingForModal
              ? parametersToSendToShareContainer[1] + "ing"
              : parametersToSendToShareContainer[1]
          }
          disableButton={loadingForModal}
        />
      )}

      {posts.map((post) => {
        if (
          post.title.match(new RegExp(escapeRegex(searchTerm.trim()), "i")) ||
          searchTerm.trim() === ""
        ) {
          //To change the button lable
          // Button lable is set according to "isShared" key in the posts object
          // isShared is updated on every click on "handleShare" function
          shared.current = post.isShared ? "Unshare" : "Share";

          return (
            <div key={post._id} className="postsWraper">
              <PostContainer
                post={post.post}
                title={post.title}
                name={name}
                date={post.postedTime}
                showOptions={true}
                options={{
                  [shared.current]: () => handleShareModal(post, name),
                  Delete: () => handleDeletModal(post), //handleDelete(post),
                  Edit: () => handelEdit(post),
                }}
              />
            </div>
          );
        }
        return "";
      })}
    </div>
  );
}

export default PostsDreams;
