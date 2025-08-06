const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
