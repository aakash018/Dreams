const express = require("express");
const router = express();
const initilizePassport = require("./passport-config");
const passport = require("passport");
const Users = require("../models/users");

//This Variable is used to store all Login errors
let errorMessage = "";

//This function is send to passport.config and changes errorMessage
const message = (message) => {
  errorMessage = message;
};

//Used to run InitPassport function and pass it with the equired users
const userAuth = async () => {
  try {
    const users = await Users.find();
    initilizePassport(
      passport,
      (username) => users.find((user) => username === user.username),
      (id) => users.find((user) => id === user.id),
      message
    );
  } catch (e) {
    console.log(e);
  }
};

//Calling userAuth() every time login page is rendered
router.get("/", (req, res) => {
  userAuth();
  res.json({ data: "Updated" });
});

//Login form land-site
router.post("/", (req, res, next) => {
  passport.authenticate("local", async (err, user) => {
    //Login Logic
    //Any external errors are set in err
    if (err) return next(err);
    //When user is not found or password is incorrect user is set false
    if (!user) {
      await sleep(000);
      return res.json({ error: errorMessage, status: req.isAuthenticated() });
    }
    //Login when everything is good...
    req.logIn(user, async (err) => {
      await sleep(000);
      if (err) return next(err);
      return res.json({ status: req.isAuthenticated() });
    });
  })(req, res, next);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = router;
