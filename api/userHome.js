const express = require("express");
const router = express();
const Users = require("../models/users");

//Sends all old posts when user first login
router.get("/", async (req, res) => {
  try {
    const users = await Users.findOne({ username: req.user.username });
    await sleep(3000);
    res.json({
      firstName: [req.user.firstName, req.user.lastName],
      posts: users.posts,
    });
  } catch (e) {
    res.json({
      status: "error",
      errorMessage: "Failed to load post ! Try relogging in",
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
    await sleep(3000);
    res.status(200).json({
      posts: users.posts,
    });
  } catch (e) {
    res.json({
      status: "error",
      errorMessage: "Failed to load user! Try relogging in",
    });
    console.log(e);
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = router;
