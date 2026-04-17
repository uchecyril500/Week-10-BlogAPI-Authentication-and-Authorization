//protect routes with requireAuth, fix imports


// article.route.js
// Routes for articles:
// - POST /api/articles        (protected)
// - GET  /api/articles        (public or protected – your choice)
// - GET  /api/articles/search (protected here)
// - GET  /api/articles/:id    (protected)
// - PATCH /api/articles/:id   (protected + ownership in controller)
// - DELETE /api/articles/:id  (protected + ownership in controller)

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

// Create article (requires authentication)
router.post("/articles", requireAuth, postArticle);

// Get all articles (you can make this public or protected)
router.get("/articles", requireAuth, getAllArticle);

// Search articles (protected)
router.get("/articles/search", requireAuth, searchArticles);

// Get article by ID (protected)
router.get("/articles/:id", requireAuth, getArticleById);

// Update article (protected + ownership in controller)
router.patch("/articles/:id", requireAuth, updateArticleById);

// Delete article (protected + ownership in controller)
router.delete("/articles/:id", requireAuth, deleteArticleById);

module.exports = router;
