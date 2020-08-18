const express = require("express");
const router = express();

const SharedPost = require("../models/globalPost");
const Users = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const sharedPost = await SharedPost.find();
    await sleep(2000);
    res.json(sharedPost);
  } catch {
    res
      .status(404)
      .json({ error: true, errorMessage: "Error 404! No shared Post found" });
  }
});

router.post("/like", async (req, res) => {
  const data = req.body;

  const isLiked = req.user.likedPosts.find((likedPost) => {
    return likedPost == data.id;
  });

  try {
    if (isLiked == null) {
      await SharedPost.updateOne({ _id: data.id }, { likes: data.likes + 1 });
      await Users.updateOne(
        { _id: req.user._id },
        { $push: { likedPosts: data.id } }
      );

      const oldUser = req.user;
      oldUser.likedPosts.push(data.id);
      req.login(oldUser, (error) => {
        if (error) {
          console.log(error);
        }
      });
    } else {
      await SharedPost.updateOne({ _id: data.id }, { likes: data.likes - 1 });
      await Users.updateOne(
        { _id: req.user._id },
        { $pull: { likedPosts: data.id } }
      );

      const oldUser = req.user;
      const removeItem = oldUser.likedPosts.indexOf(data.id);
      oldUser.likedPosts.splice(removeItem, 1);
      req.login(oldUser, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  } catch (e) {
    console.log("Error : ", e);
  }
});

router.post("/share", async (req, res) => {
  const data = req.body;

  try {
    //To creatnew global post
    const sharedPost = new SharedPost({
      _id: data._id,
      firstName: data.name[0],
      lastName: data.name[1],
      title: data.title,
      post: data.post,
      likes: data.likes,
      postedTime: data.postedTime,
    });
    await sharedPost.save();

    //To trun isShared in post to true after Shared
    await Users.updateOne(
      { _id: req.user._id, "posts._id": data._id },
      {
        $set: {
          "posts.$.isShared": true,
        },
      }
    );
    const user = await Users.findOne({ username: req.user.username });
    const postAfterShared = await user.posts.filter(
      (post) => post._id == data._id
    );
    await sleep(2000);
    res.status(200).json({
      post: postAfterShared,
    });
  } catch (e) {
    res.status(500).send("Server Error while sharing the post. Try Again...");
    console.log(e);
  }
});

router.post("/unshare", async (req, res) => {
  const data = req.body;

  try {
    const sharedPost = await SharedPost.findById(data.id);
    if (sharedPost != null) {
      await SharedPost.findOneAndRemove({ _id: data.id });
      await Users.updateOne(
        { _id: req.user._id, "posts._id": data.id },
        {
          $set: {
            "posts.$.isShared": false,
          },
        }
      );
      const user = await Users.findOne({ username: req.user.username });
      const postAfterUnshared = await user.posts.filter(
        (post) => post._id == data.id
      );
      await sleep(2000);
      res.status(200).json({
        post: postAfterUnshared,
      });
    }
  } catch (e) {
    res.json({
      error: true,
      errorMessage: "Server Error ! Try Again",
    });
  }
});

router.put("/edit", async (req, res) => {
  const data = req.body;
  try {
    await Users.updateOne(
      {
        _id: req.user._id,
        "posts._id": data.id,
      },
      {
        $set: {
          "posts.$.title": data.title,
          "posts.$.post": data.postInput,
        },
      }
    );

    const user = await Users.findOne({ username: req.user.username });
    const postAfterEdit = await user.posts.filter(
      (post) => post._id == data.id
    );

    const sharedPost = await SharedPost.findById(data.id);
    if (sharedPost != null) {
      await SharedPost.updateOne(
        {
          _id: data.id,
        },
        {
          $set: {
            title: data.title,
            post: data.postInput,
          },
        }
      );
    }

    res.status(200).json({
      post: postAfterEdit,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: true,
      errorMessage: "Falied to edit! Try Again",
    });
  }
});

router.put("/delete", async (req, res) => {
  const data = req.body;
  try {
    // To delet From User Object side
    await Users.updateOne(
      { _id: req.user._id },
      { $pull: { posts: { _id: data.id } } }
    );
    //To delete from global shared side
    const sharedPost = await SharedPost.findById(data.id);
    if (sharedPost != null) {
      await SharedPost.findOneAndRemove({ _id: data.id });
    }
    // await sleep(2000);
    res.send("data");
  } catch (e) {
    console.log(e);
  }
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = router;
