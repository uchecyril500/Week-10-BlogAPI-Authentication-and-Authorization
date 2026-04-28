

// database/connectDB.js
// Connects to MongoDB using Mongoose.
// Reads the connection string from environment variables.

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false); // recommended for Mongoose 7+

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
