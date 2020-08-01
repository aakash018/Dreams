const express = require("express");
const router = express();
const Users = require("../models/users");

//Sends all old posts when user first login
router.get("/", async (req, res) => {
  try {
    const users = await Users.findOne({ username: req.user.username });
    res.json({ posts: users.posts });
  } catch (e) {
    res.json({
      status: "error",
      errorMessage: "Failed to load post ! Try reopening browser",
    });
  }
});

//LogOut
router.delete("/", (req, res) => {
  req.logOut();
  res.send(req.isAuthenticated());
});

//Saves nwe Posts when User makes request
router.post("/", async (req, res) => {
  try {
    const users = await Users.findOne({ username: req.user.username });
    if (req.body.postInput == null) throw "Invalid Input";
    const currentTime = new Date();
    users.posts.push({
      title: req.body.title,
      post: req.body.postInput,
      postedTime: currentTime.toString(),
    });
    await users.save();
    res.json({
      status: 200,
      posts: users.posts,
    });
  } catch (e) {
    res.json({
      status: "error",
      errorMessage: "Failed to load user! Try reopening browser",
    });
    console.log(e);
  }
});

module.exports = router;
