const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} = require("../controllers/blog.controller");
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.post("/", createBlog);
router.put("/:id", updateBlog);

module.exports = router;
