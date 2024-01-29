const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO DB IS UP and connected!");
  })
  .catch((err) => {
    console.err(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server is started on port: ", process.env.PORT);
});
