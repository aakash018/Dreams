import React, { useState, useContext } from "react";
import axios from "axios";

import TextArea from "../../Textarea/textarea";
import Button from "../../Button/button";
import "./commentInput.css";

import { CommentID } from "../../../Contex/commentContex";
import { Posts } from "../../../posts_contex";

function CommentInput() {
  const { postIdForComment, setPostIdForComment } = useContext(CommentID);
  const { sharedPosts, setSharedPosts } = useContext(Posts);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (value, setValue) => {
    setValue(value);
  };

  const handleCommentSubmit = () => {
    // console.log(postIdForComment);
    setLoading(true);
    try {
      axios.post("/api/postOptions/comment", {
        comment,
        id: postIdForComment,
        name: JSON.parse(localStorage.getItem("name")),
      });
      setLoading(false);
      setSharedPosts(
        sharedPosts.map((post) => {
          if (post._id === postIdForComment) {
            post.comments.push({
              comment: comment,
              id: postIdForComment,
              name: JSON.parse(localStorage.getItem("name")),
            });
            return post;
          } else {
            return post;
          }
        })
      );
      console.log(sharedPosts);
      setPostIdForComment(null);
    } catch (e) {
      setLoading(false);
      console.log("Error Commenting", e);
    }
  };

  return (
    <div className="commentInputContainer">
      <div className="commentInputBox">
        <TextArea handleChange={handleChange} setValue={setComment} />
      </div>
      <div className="commentPostButton">
        <Button
          text={loading ? "Posting" : "Post"}
          action={handleCommentSubmit}
          disable={loading}
        />
      </div>
    </div>
  );
}

export default CommentInput;
