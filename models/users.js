const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  likedPosts: {
    type: Array,
    default: [],
  },
  posts: [
    {
      title: String,
      post: String,
      postedTime: String,
      isShared: {
        type: Boolean,
        default: false,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Users", usersSchema);
