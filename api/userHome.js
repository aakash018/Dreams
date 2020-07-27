const express = require("express");
const router = express();

router.get("/", (req, res) => {
  const userData = {
    name: req.user.username,
    email: req.user.email,
  };
  res.json(userData);
});

router.post("/", (req, res) => {
  req.logOut();
  res.send(req.isAuthenticated());
});

module.exports = router;
