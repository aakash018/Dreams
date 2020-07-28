const express = require("express");
const router = express();
const Users = require("../models/users");
const { findOne } = require("../models/users");

router.get("/", (req, res) => {
  const userData = {
    name: req.user.username,
    email: req.user.email,
  };
  res.json(userData);
});

router.delete("/", (req, res) => {
  req.logOut();
  res.send(req.isAuthenticated());
});

router.post("/", async (req, res) => {
  try {
    const users = await Users.findOne({ username: req.user.username });
    users.posts.push(req.body.post);
    await users.save();
    res.json({ posts: users.posts });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
