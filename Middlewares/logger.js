

// Middlewares/logger.js
// Logs every incoming request with timestamp, method, URL, and IP.

const logRequest = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  console.log(`${timestamp} - ${method} ${url} from ${ip}`);

  next(); // continue to next middleware or route
};

module.exports = logRequest;
