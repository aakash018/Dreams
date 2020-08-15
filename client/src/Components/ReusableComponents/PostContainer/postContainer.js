import React from "react";

import Heading from "../Heading/heading";
import DropDownMenu from "../DropDownMenu/dropdown";

import "./postContainer.css";
function PostContainer({ title, post, name, date, showOptions, options }) {
  return (
    <div className="postBoxContainer">
      {showOptions && <DropDownMenu options={options} />}
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
  );
}

export default PostContainer;
