const express = require("express");
const router = express.Router();
const postModel = require("../models/postSchema.js");
const userModel = require("../models/userSchema.js");

router.get("/", (req, res) => {
  res.send("Vous etes dans le route post");
});

router.get("/:id", async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id).populate("author");
    if (post) {
      return res.status(200).send(post);
    } else {
      return res.status(404).send("Post pas trouve");
    }
  } catch (err) {
    res.status(500).send("serveur erreur");
    console.error(err.message);
  }
});

router.post("/new", async (req, res) => {
  try {
    if (!req.body?.title || !req.body?.content || !req.body?.author) {
      return res.status(400).send("Mal requet");
    }
    const post = new postModel({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    await post.save();
    await userModel.findByIdAndUpdate(req.body.author, {
      $push: { posts: post._id },
    });
    res.status(201).send("Post enregistre");
  } catch (err) {
    res.status(500).send("Serveur erreur");
    console.error(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await postModel.findById(postId);
    await postModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send("Post pas trouve");
    }
    await userModel.findByIdAndUpdate(
      { posts: req.params.id },
      { $pull: { posts: postId } }
    );
    res.status(200).send("Post supprime!");
  } catch (err) {
    res.status(500).send("Serveur erreur");
    console.error(err.message);
  }
});

module.exports = router;
