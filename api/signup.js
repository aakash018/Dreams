const express = require("express");
const router = express();

router.post("/", (req, res) => {
  const newdata = req.body;
  console.log(newdata);
});

module.exports = router;
