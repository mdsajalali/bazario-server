const cors = require("cors");
require("dotenv/config");
const express = require("express");
const { connectDB } = require("./config/db.js");

// app config
const app = express();
const port = process.env.PORT || 5000;

// db connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/api/v1", (req, res) => {
  res.send("Welcome to bazario server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
