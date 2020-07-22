const express = require("express");
const app = express();
const PORT = 5000;

const singup = require("./api/signup");
const login = require("./api/login");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/signup", singup);
app.use("/api/login", login);

app.post("/api/login", (req, res) => {
  const newdata = req.body;
  console.log(newdata);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server At PORT ${PORT}`);
});
