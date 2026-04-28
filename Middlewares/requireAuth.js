// Middlewares/requireAuth.js
// Protects routes by verifying JWT tokens.
// Attaches the logged-in user to req.user.

const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied - No token provided" });
  }

  // Extract token
  const token = authHeader.replace("Bearer ", "").trim();

  try {
    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = requireAuth;
