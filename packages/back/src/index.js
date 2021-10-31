require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./routes");

const { sequelize } = require("./database/models");

const { port } = require("./config/server");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(port, async (err) => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`Listening on port ${port}`);
    try {
      await sequelize.authenticate();
      console.log("Connected to database");
    } catch (error) {
      console.log("Error connecting to database", error);
    }
  }
});
