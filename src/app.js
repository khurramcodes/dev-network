const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

const PORT = 3000;

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Mian",
    lastName: "Adeel",
    emaiId: "adeel@gmail.com",
    password: "qwerty123",
  };

  const user = new User(userObj);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send(`Error: Saving User Failed: ${error.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY!");
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING SUCCESSFULLY AT PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB CONNECTION FAILED: ", error);
  });
