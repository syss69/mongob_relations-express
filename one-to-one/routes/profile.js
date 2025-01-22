const express = require("express");
const router = express.Router();
const profileModel = require("../models/profileSchema.js");

router.get("/", (req, res) => {
  res.send("Vous etes dans le route profil");
});

router.get("/:id", async (req, res) => {
  try {
    const profile = await profileModel
      .findById(req.params.id)
      .populate("userdata");
    if (profile) res.status(200).send(profile);
    else res.status(404).send("Profil non trouve");
  } catch (err) {
    res.status(500).send("Serveur erreur");
    console.error(err.message);
  }
});

router.post("/new", async (req, res) => {
  try {
    if (!req.body?.name || !req.body?.bio || !req.body.userdata) {
      return res.status(400).send("Mal requet");
    }
    const profile = new profileModel({
      name: req.body.name,
      bio: req.body.bio,
      userdata: req.body.userdata,
    });
    await profile.save();
    res.status(201).send("Profil enregistre");
  } catch (err) {
    res.status(500).json({ erreur: err.message });
  }
});

module.exports = router;
