const express = require("express");
const router = express();
const Users = require("../models/users");

router.post("/", async (req, res) => {
  const data = req.body;
  const user = await new Users({
    username: data.username,
    password: data.password,
    email: data.email,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
