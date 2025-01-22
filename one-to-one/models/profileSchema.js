const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  name: String,
  bio: String,
  userdata: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
