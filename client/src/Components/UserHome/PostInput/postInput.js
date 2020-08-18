import React, { useState, useContext } from "react";
import axios from "axios";

//Components
import Error from "../../ReusableComponents/Error/error";
import Textarea from "../../ReusableComponents/Textarea/textarea";
import Button from "../../ReusableComponents/Button/button";
import CustomButton from "../../ReusableComponents/CustomButton/button";
import Input from "../../ReusableComponents/Input/input";
import { Posts } from "../../posts_contex";

//Style
import "./postInput.css";

function PostInput() {
  const { posts, setPosts } = useContext(Posts);
  const { showInputBox, setShowInputBox } = useContext(Posts);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  //Variables
  const { postInput, setPostInput } = useContext(Posts);
  const { title, setTitle } = useContext(Posts);
  const { postId } = useContext(Posts);
  // setTitle(showInputBox.title);
  const handleInputChange = (input, setValue) => {
    setValue(input);
  };

  //Submit Function
  const handleSubmit = () => {
    setError({
      display: false,
    });

    if (postInput.trim() === "" || title.trim() === "") {
      return setError({
        display: true,
        errorMessage: "Empty Field",
      });
    } else {
      setLoading(true);
    }

    if (!showInputBox.isFromEdit) {
      axios
        .post("/api/home", { title, postInput })
        //Sends request to save
        .then((res) => {
          if (res.data.status === "error") {
            return setError({
              display: true,
              errorMessage: res.data.errorMessage,
            });
          }
          setLoading(false);
          setPostInput("");
          setTitle("");
          setPosts(res.data.posts);
          setShowInputBox({ display: false });
        })
        .catch((e) => {
          setError({
            display: true,
            errorMessage: "Internal Error! Try again...",
          });
          console.log("Error : ", e);
        });
    } else {
      setLoading(true);
      axios
        .put("/api/postOptions/edit", { id: postId, title, postInput })
        .then((res) => {
          if (res.data.error) {
            return setError({
              display: true,
              errorMessage: res.data.errorMessage,
            });
          }
          const updatedPostAfterEdit = posts.map((element) => {
            if (element._id === postId) {
              return res.data.post[0];
            } else {
              return element;
            }
          });
          setLoading(false);
          setPosts(updatedPostAfterEdit);
          setPostInput("");
          setTitle("");
          setShowInputBox({ isFromEdit: false });
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          setPostInput("");
          setTitle("");
          setError({
            display: true,
            errorMessage: "Internal Error! Try Again...",
          });
        });
    }
  };

  return (
    <div className="postInputContainer">
      {showInputBox.display && (
        <div className="postInputWraper">
          <div className="postInputCancleButton">
            <CustomButton
              action={() => {
                setPostInput("");
                setTitle("");
                setShowInputBox({ display: false });
                setError({ display: false });
              }}
              content="&times;"
            />
          </div>
          <div className="errorContainer">
            {error.display && (
              <Error errorMessage={error.errorMessage} color="white" />
            )}
          </div>
          <div className="titleInput">
            <Input
              stateToUpdate={setTitle}
              type="text"
              onchange={handleInputChange}
              placeholder="Title"
              color="white"
              value={title}
            />
          </div>
          <Textarea
            handleChange={handleInputChange}
            setValue={setPostInput}
            value={postInput}
          />
          <div className="postSubmitButton">
            <Button
              action={handleSubmit}
              text={loading ? "Posting" : "Post"}
              disable={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostInput;
