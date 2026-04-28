// blog.js
// Main server entry point.
// Loads environment variables, connects to DB,
// sets up middleware, mounts routes, and starts the server.

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./database/connectDB");
const RequestLogger = require("./Middlewares/logger");
const errorhandler = require("./Middlewares/errorhandler");

const ArticleRoutes = require("./routes/article.route");
const UserRoutes = require("./routes/user.route");

const app = express();
const PORT = process.env.PORT || 3007;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(RequestLogger);

// Routes
app.use("/api/users", UserRoutes);
app.use("/api", ArticleRoutes);

// Homepage route (for Render testing)
app.get("/", (req, res) => {
  res.send("Blog API is running on Render...");
});

// Global error handler (MUST be last)
app.use(errorhandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
