import { useEffect, useState } from "react";

import axios from "axios";

export function usePostDetails(id) {
  const [postToShow, setPostToShow] = useState({
    comments: [],
    post: "",
  });

  useEffect(() => {
    axios
      .get("/api/postOptions/postDetails", { params: { id: id } })
      .then((res) => {
        if (res.data.error == null) {
          setPostToShow({
            comments: res.data.comments || [],
            post: res.data.post,
          });
        } else {
          setPostToShow({
            comments: [],
            post: res.data.errorMessage,
          });
        }
      });
  }, [id]);

  return postToShow;
}
