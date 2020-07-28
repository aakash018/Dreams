import React, { useState } from "react";
import axios from "axios";
import Textarea from "../../ReusableComponents/Textarea/textarea";

function PostInput() {
  const style = {
    position: "absolute",
    left: "50%",
  };

  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const handleInputChange = (input) => {
    setPost(input);
  };

  const handleSubmit = () => {
    axios
      .post("/api/home", { post })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };

  return (
    <div style={style}>
      <Textarea handleChange={handleInputChange} />
      {posts.map((post) => (
        <div key={post}>{post}</div>
      ))}
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}

export default PostInput;
