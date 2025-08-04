const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
} = require("../controllers/blog.controller");
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.post("/", createBlog);

module.exports = router;
