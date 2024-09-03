const express = require("express");
require("dotenv").config();

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/twitter", (req, res) => {
  res.send("hiiii");
});
app.listen(process.env.PORT, () => {
  console.log("it is listenining on port");
});
