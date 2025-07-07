const express = require("express");
const { getNewProducts, getFeaturedProducts, getCategories, getBrands, getFilteredProducts, getWishlist, addToWishlist, removeFromWishlist, addToCart, removeFromCart, getCartItems, createOrder, getOrders } = require("../controllers/shop.controller");
const { getProductById } = require("../controllers/product.controller");
const router = express.Router(); 

router.get("/new-products", getNewProducts);
router.get("/featured-products", getFeaturedProducts);
router.get("/categories", getCategories);
router.get("/brands", getBrands);
router.get("/products", getFilteredProducts);
router.get("/product/:id", getProductById);

// Wishlist
router.get("/wishlists", getWishlist);
router.post("/wishlists/:id", addToWishlist);
router.delete("/wishlists/:id", removeFromWishlist);

// Cart
router.post("/carts/:id", addToCart);
router.delete("/carts/:id", removeFromCart);
router.get("/carts", getCartItems);

// Order
router.post("/order", createOrder);
router.get("/orders", getOrders);

module.exports = router;
