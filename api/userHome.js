const express = require("express");
const router = express();

const data = {
  name: "Joe",
  emotion: "Happy",
};

router.get("/", (req, res) => {
  res.send(data);
});

module.exports = router;
