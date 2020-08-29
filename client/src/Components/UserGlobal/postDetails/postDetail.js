import React from "react";

import { useHistory } from "react-router-dom";

import { usePostDetails } from "../../../CustomHooks/usePostDetails";

import "./postDetails.css";
function PostDetail({ match }) {
  const history = useHistory();

  const postToShow = usePostDetails(match.params.id);

  const handleCancle = () => {
    history.goBack();
  };

  return (
    <div className="postDetailContainer">
      <div className="postDetailWraper">
        <section className="postDetailCancle" onClick={handleCancle}>
          &times;
        </section>
        <div className="mainDataSection">
          <section className="postDetail">{postToShow.post}</section>

          <section className="commentSection">
            {postToShow.comments.map((comment) => (
              <div key={comment.id} className="commentWraper">
                <section className="mainCommenSection">
                  <section className="dateSection">
                    {comment.commentedTime}
                  </section>
                  {comment.comment}
                  <section className="nameSection">
                    {comment.name[0]}
                    {comment.name[1]}
                  </section>
                </section>
                <div className="divider"></div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
