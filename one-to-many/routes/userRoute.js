const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchema.js");
const postModel = require("../models/postSchema.js");

router.get("/", (req, res) => {
  res.send("Vous etes dans le route utilisateur");
});

router.get("/:id", async (req, res) => {
  try {
    if (req.params.id.length !== 24) {
      return res.status(400).send("Cette id n'existe pas");
    }
    const user = await userModel.findById(req.params.id).populate("posts");
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send("Utilisateur pas trouve");
    }
  } catch (err) {
    res.status(500).send("serveur erreur");
    console.error(err.message);
  }
});

router.post("/new", async (req, res) => {
  try {
    if (!req.body?.username || !req.body?.email) {
      return res.status(400).send("Mal requet");
    }
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      posts: req.body?.posts,
    });
    await user.save();
    res.status(201).send("Utilisateur enrigistre!");
  } catch (err) {
    res.status(500).send("Serveur erreur");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userModel.findById(userId);
    if (!deletedUser) {
      return res.status(404).send("Utilisateur pas trouve");
    }
    if (deletedUser.posts.length !== 0) {
      deletedUser.posts.forEach(async (post) => {
        await postModel.findByIdAndDelete(post);
        console.info("Deleted post with id:", post);
      });
    }
    await userModel.findByIdAndDelete(userId);
    res.status(200).send("Utilisateur supprime");
  } catch (err) {
    res.status(500).send("Serveur erreur");
    console.error(err.message);
  }
});

module.exports = router;
