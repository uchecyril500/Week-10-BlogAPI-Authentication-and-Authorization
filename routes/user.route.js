
// routes/user.route.js
// Handles user registration and login routes.

const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

// Register new user
router.post("/sign-up", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
