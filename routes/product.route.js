const express = require("express");
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require("../controllers/product.controller");
const router = express.Router(); 

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
