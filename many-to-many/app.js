const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.info("Serveur est demaree sur http://localhost:3000");
});
