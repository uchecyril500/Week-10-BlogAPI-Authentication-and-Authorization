// routes/article.route.js
// Handles all article endpoints.
// All routes are protected with requireAuth middleware.
// Ownership checks are done inside the controller.

const express = require("express");
const router = express.Router();

const {
  postArticle,
  getAllArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  searchArticles,
} = require("../controllers/article.controller");

const requireAuth = require("../Middlewares/requireAuth");

// Create article (protected)
router.post("/articles", requireAuth, postArticle);

// Get all articles (protected)
router.get("/articles", requireAuth, getAllArticle);

// Search articles (protected)
router.get("/articles/search", requireAuth, searchArticles);

// Get article by ID (protected)
router.get("/articles/:id", requireAuth, getArticleById);

// Update article (protected + ownership inside controller)
router.patch("/articles/:id", requireAuth, updateArticleById);

// Delete article (protected + ownership inside controller)
router.delete("/articles/:id", requireAuth, deleteArticleById);

module.exports = router;
