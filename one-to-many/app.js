const express = require("express");
const dotenv = require("dotenv").config();

const userRoutes = require("./routes/userRoute.js");
const postRoutes = require("./routes/postRoute.js");
const mongooseConnect = require("./config/db.js");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

app.listen(port, () => {
  console.info("Serveur est demaree sur http://localhost:3000");
});
