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

function PostEdit() {
  const { setPosts } = useContext(Posts);
  const { showEditBox, setShowEditBox } = useContext(Posts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  const handleInputChange = (input, setValue) => {
    setValue(input);
  };

  return (
    <div className="postInputContainer">
      {showEditBox && (
        <div className="postInputWraper">
          <div className="postInputCancleButton">
            <CustomButton
              action={() => {
                setShowEditBox(false);
                setError({ display: false });
              }}
              content="&times;"
            />
          </div>
          <div className="titleInput">
            <Input
              // stateToUpdate={setTitle}
              type="text"
              onchange={handleInputChange}
              placeholder="Title"
              color="white"
              // value={title}
            />
          </div>
          <Textarea />
        </div>
      )}
    </div>
  );
}

export default PostEdit;
