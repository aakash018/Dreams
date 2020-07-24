const express = require("express");
const router = express();
const Users = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const data = req.body;
  const hashPassword = await bcrypt.hash(data.password, 10);
  const user = await new Users({
    username: data.username,
    password: hashPassword,
    email: data.email,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
