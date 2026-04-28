// models/user.model.js
// Defines the User schema with name, email, and hashed password.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;

