// models/article.model.js
// Defines the Article schema with text search, comments, and author reference.

const mongoose = require("mongoose");

// =========================
// COMMENT SUB-SCHEMA
// =========================
const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

// =========================
// ARTICLE SCHEMA
// =========================
const articleSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
      minlength: 5,
    },
    subHeader: {
      type: String,
      minlength: 5,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    content: {
      type: String,
      required: true,
      minlength: 20,
    },

    // Reference to User model (ownership)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [commentSchema],
  },
  { timestamps: true }
);

// =========================
// TEXT INDEX FOR SEARCH
// =========================
articleSchema.index({
  header: "text",
  subHeader: "text",
  title: "text",
  content: "text",
});

// =========================
// EXPORT MODEL
// =========================
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
