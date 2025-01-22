const mongoose = require("mongoose");

const mongoConnect = async () => {
  try {
    mongoose.connect(process.env.URL_ONE_TO_MANY);
    console.info("Mongodb est connecte");
  } catch (err) {
    console.error("Erreur de connection avec mongodb");
  }
};

module.exports = mongoConnect();
