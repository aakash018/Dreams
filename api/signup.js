const express = require("express");
const router = express();
const Users = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    if (data == null) throw "No input Found";
    const old_user = await Users.findOne({ username: data.username });
    if (old_user != null) throw "User Exists";
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await new Users({
      username: data.username,
      password: hashPassword,
      email: data.email,
    });

    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, errorMessage: error });
  }
});

module.exports = router;
