const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  title: String,
  post: String,
  likes: Number,
  postedTime: String,
});

module.exports = mongoose.model("GolbalPosts", globalSchema);
