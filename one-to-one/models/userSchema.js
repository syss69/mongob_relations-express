const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: { type: String },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
