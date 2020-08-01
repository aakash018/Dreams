import React from "react";

import Heading from "../Heading/heading";

function PostContainer({ title, post, name, time }) {
  return (
    <div className="postBoxContainer">
      <Heading fontSize="1.5rem" title={title} color="var(--theme-color)" />
      <section className="postSection">{post}</section>
      <section className="nameOfPoster">{name}</section>
    </div>
  );
}

export default PostContainer;
