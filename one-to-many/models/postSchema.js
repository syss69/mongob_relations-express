const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
