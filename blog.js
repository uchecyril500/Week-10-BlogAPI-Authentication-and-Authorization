//wiring everything together

// blog.js
// Main server file:
// - Loads env
// - Connects to DB
// - Sets up middlewares
// - Mounts user + article routes
// - Uses global error handler

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const connectDB = require("./database/connectDB");
const RequestLogger = require("./Middlewares/logger");
const errorhandler = require("./Middlewares/errorhandler");
const ArticleRoutes = require("./routes/article.route");
const UserRoute = require("./routes/user.route");

connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(RequestLogger);

// Auth routes
app.use("/api/users", UserRoute);

// Article routes
app.use("/api", ArticleRoutes);

app.get("/", (req, res) => {
  res.send("Blog API is running on Render...");
});


// Error handler LAST
app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
