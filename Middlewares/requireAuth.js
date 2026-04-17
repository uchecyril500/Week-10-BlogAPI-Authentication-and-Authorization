
// This file protect routes with JWT and attach user


// requireAuth.js
// Middleware to protect routes:
// - Reads Bearer token from Authorization header
// - Verifies JWT
// - Loads user from DB and attaches it to req.user
// - Blocks access if token is missing/invalid or user no longer exists

const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access denied - No token provided" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // payload: { userId, name, iat, exp }
    const user = await UserModel.findById(payload.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach full user document to request
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = requireAuth;
