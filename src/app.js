const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send(`Error: Saving User Failed: ${error.message}`);
  }
});

// Find user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    console.log("Without EXEC: ", user);
    const user2 = await User.findOne({ emailId: userEmail }).exec();
    console.log("With EXEC: ", user2);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

// DELETE API - delete a user from database using the id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

// UPDATE API - update the user information in db based on id

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: req.body.password,
    };

    // console.log(userId, data);

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
});

app.patch("/userByEmail", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const data = req.body;
    const user = await User.findOneAndUpdate({ emailId: userEmail }, data, {
      returnDocument: "after",
    });

    res.send({ message: "User updated successfuly by email", user });
  } catch (error) {
    res.status(500).send("Oops! Something went wrong");
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
