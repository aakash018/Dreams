import React, { useState } from "react";
import GlobalPosts from "../../Components/UserGlobal/userGlobal";
// import Modal from "../../Components/ReusableComponents/Modal";

// import { Post } from "../../Components/posts_contex";

import { CommentID } from "../../Components/Contex/commentContex";

function Global() {
  const [postIdForComment, setPostIdForComment] = useState(null);

  return (
    <div>
      <CommentID.Provider value={{ postIdForComment, setPostIdForComment }}>
        <GlobalPosts />
      </CommentID.Provider>
    </div>
  );
}

export default Global;
