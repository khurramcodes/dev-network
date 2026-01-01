const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://khurramiqbal99_db_user:ddxuMCgTwFbeTytR@dev-network.8dstbrv.mongodb.net/devnetwork_db"
  );
};

module.exports = connectDB;
