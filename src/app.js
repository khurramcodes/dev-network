const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully!")
})

app.get("/user", userAuth, (req, res) => {
  res.send("Fetched user data successfully!")
})

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent successfully!");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("User deleted successfully!")
})

app.listen(3000, () => {
  console.log(`SERVER STARTED SUCCESSFULLY AT PORT: 3000`);
});
