const express = require("express");
const router = express();
const initilizePassport = require("./passport-config");
const passport = require("passport");
const Users = require("../models/users");
//const bcrypt = require("bcrypt");

const userAuth = async () => {
  try {
    const users = await Users.find();
    initilizePassport(
      passport,
      (username) => users.find((user) => username === user.username),
      (id) => users.find((user) => id === user.id)
    );
  } catch (e) {
    console.log(e);
  }
};

router.get("/", (req, res) => {
  userAuth();
});

router.post("/", passport.authenticate("local"), (req, res) => {
  res.json({
    name: "Joe",
  });
});

module.exports = router;
