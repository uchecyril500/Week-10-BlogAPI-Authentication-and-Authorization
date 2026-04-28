// controllers/user.controller.js
// Handles user registration and login with bcrypt + JWT.
// Validates input using Joi and returns clean user objects.

const UserModel = require("../models/user.model");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// =========================
// REGISTER USER
// =========================
const registerUser = async (req, res, next) => {
  try {
    const registerSchema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// =========================
// LOGIN USER
// =========================
const loginUser = async (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const resUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    return res.status(200).json({
      message: "Logged in",
      user: resUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
