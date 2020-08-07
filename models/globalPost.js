const mongoose = require("mongoose");

const globalSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  title: String,
  post: String,
  postedTime: Date,
  likes: Number,
});

module.exports = mongoose.model("GolbalPosts", globalSchema);
