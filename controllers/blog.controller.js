const Blog = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const blog = req.body;
    const newBlog = new Blog(blog);
    await newBlog.save();
    res.status(201).json({ blog: newBlog });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create blog", message: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", message: err.message });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blog", message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update blog", message: err.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
};
