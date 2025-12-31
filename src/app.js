const express = require("express");

const app = express();

app.get("/about", (req, res) => {
  res.send("This is the about route");
});

app.get("/blog", (req, res) => {
  res.send("This is the blog route");
});

app.get("/contact", (req, res) => {
  res.send("This is the contact route");
});

app.get("/", (req, res) => {
  res.send("This is the home route");
});

app.listen(3000, () => {
  console.log(`SERVER IS RUNNING SUCCESSFULLY AT PORT ${3000}`);
});
