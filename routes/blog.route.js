const express = require("express");
const { createBlog, getAllBlogs } = require("../controllers/blog.controller");
const router = express.Router();

router.get("/", getAllBlogs);

router.post("/", createBlog);

module.exports = router;
