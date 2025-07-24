const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: Array(String),
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog;
