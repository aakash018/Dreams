import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Heading from "../Heading/heading";
import DropDownMenu from "../DropDownMenu/dropdown";
import CommentInput from "./CommentInput/commentInput";

import "./postContainer.css";
function PostContainer({
  title,
  post,
  name,
  date,
  showOptions,
  options,
  showInteraction,
  likesCount,
  handleLike,
  handleComment,
  handlePostDetails,
  isLiked,
  disableLike,
  commentCount,
}) {
  const [showCommentInputSection, setCommentInput] = useState(false);

  const handleLikeClick = () => {
    if (!disableLike) {
      handleLike();
    } else {
      console.log("Not liked");
    }
  };

  const handleCommentClick = () => {
    handleComment();
    setCommentInput(!showCommentInputSection);
  };

  const handelPostDetail = () => {
    handlePostDetails();
  };

  return (
    <div className="postBoxContainer">
      {showOptions && <DropDownMenu options={options} />}
      <div className="postWraper" onClick={handelPostDetail}>
        <section className="nameAndDate">{date}</section>
        <div className="mainData">
          <Heading fontSize="1.5rem" title={title} color="var(--theme-color)" />
          <section className="postSection">
            <pre>{post}</pre>
          </section>
        </div>
        <section className="nameAndDate">
          {name[0]} {name[1]}
        </section>
      </div>
      {showInteraction && (
        <div className="interactionSection">
          <div className="divider"></div>
          <div className="interactionContainer">
            <div className="interactionWraper">
              <section
                className={"button " + isLiked}
                onClick={handleLikeClick}
              >
                &#10084;
              </section>
              <section className="Count">{likesCount}</section>
            </div>
            <div className="interactionWraper">
              <section className="button" onClick={handleCommentClick}>
                <FontAwesomeIcon icon={faComment} />
              </section>
              <section className="Count">{commentCount}</section>
            </div>
          </div>
        </div>
      )}
      {showCommentInputSection && <CommentInput />}
    </div>
  );
}

export default PostContainer;
