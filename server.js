//ENV
if (process.env.NODE_ENV != "production") {
  require("dotenv/config");
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = 5000;

const singup = require("./api/signup");
const login = require("./api/login");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected with DB")
);

app.use("/api/signup", singup);
app.use("/api/login", login);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server At PORT ${PORT}`);
});
