const express = require("express");
const router = express();

const SharedPost = require("../models/globalPost");

router.get("/", async (req, res) => {
  try {
    const sharedPost = await SharedPost.find();
    await sleep(2000);
    res.json(sharedPost);
  } catch {
    res
      .status(404)
      .json({ error: true, errorMessage: "Error 404! No shared Post found" });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const sharedPost = new SharedPost({
      _id: data._id,
      firstName: data.name[0],
      lastName: data.name[1],
      title: data.title,
      post: data.post,
      postedTime: data.postedTime,
    });

    await sharedPost.save();
    res.send("Saved");
  } catch (e) {
    res.status(500).send("Server Error while sharing the post. Try Again...");
    console.log(e);
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = router;
