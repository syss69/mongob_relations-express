const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  posts: { type: Array, ref: "Post" },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
