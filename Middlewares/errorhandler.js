
// Middlewares/errorhandler.js
// Global error handler for the entire application.
// Captures errors from controllers and sends a clean JSON response.

const errorhandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  console.error(err.stack || "");

  const status = err.status || 500;

  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorhandler;
