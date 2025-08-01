const express = require("express");
const { getBlogs } = require("../controllers/blog.controller");
const router = express.Router();

router.get("/", getBlogs);

module.exports = router;
