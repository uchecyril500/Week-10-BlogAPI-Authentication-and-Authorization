//link article to user (ownership)


// article.model.js
// Mongoose model for articles:
// - header, subHeader, title, content
// - author is a reference to User (ownership)
// - comments embedded
// - text index for search

const mongoose = require("mongoose");

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
      minLength: 3,
    },
  },
  { timestamps: true }
);

const articleSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
      minLength: 5,
    },
    subHeader: {
      type: String,
      minLength: 5,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    content: {
      type: String,
      required: true,
      minLength: 20,
    },
    // Ownership: store the ID of the user who created the article
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

articleSchema.index({
  header: "text",
  subHeader: "text",
  title: "text",
  content: "text",
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
