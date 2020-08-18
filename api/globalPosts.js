const express = require("express");
const router = express();

const SharedPost = require("../models/globalPost");

router.get("/", async (req, res) => {
  try {
    const sharedPost = await SharedPost.find();
    res.json({
      sharedPost: sharedPost,
      likedPosts: req.user.likedPosts,
    });
  } catch (e) {
    console.log(e);
    res
      .status(404)
      .json({ error: true, errorMessage: "Error 404! No shared Post found" });
  }
});

module.exports = router;
