//ENV
if (process.env.NODE_ENV != "production") {
  require("dotenv/config");
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const PORT = process.env.PORT || 5000;

const singup = require("./api/signup");
const login = require("./api/login");
const userHome = require("./api/userHome");
const sharePost = require("./api/sharePost");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static(__dirname + "/client/build"));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/home", userHome);
app.use("/api/sharePost", sharePost);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server At PORT ${PORT}`);
});
