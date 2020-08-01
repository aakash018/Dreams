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
  const { setPosts } = useContext(Posts);
  const { showInputBox, setShowInputBox } = useContext(Posts);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  //Variables
  const [postInput, setPostInput] = useState("");
  const [title, setTitle] = useState("");

  const handleInputChange = (input, setValue) => {
    setValue(input);
  };

  //Submit Function

  const handleSubmit = () => {
    setError({
      display: false,
    });
    if (postInput === "") {
      return setError({
        display: true,
        errorMessage: "Empty Field",
      });
    }

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
        setPostInput("");
        setPosts(res.data.posts);
        setShowInputBox(false);
      })
      .catch((e) => {
        setError({
          display: true,
          errorMessage: "Internal Error! Try again...",
        });
        console.log("Error : ", e);
      });
  };

  return (
    <div className="postInputContainer">
      {showInputBox && (
        <div className="postInputWraper">
          <div className="postInputCancleButton">
            <CustomButton
              action={() => {
                setShowInputBox(false);
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
            />
          </div>
          <Textarea handleChange={handleInputChange} setValue={setPostInput} />
          <div className="postSubmitButton">
            <Button action={handleSubmit} text="Post" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostInput;
