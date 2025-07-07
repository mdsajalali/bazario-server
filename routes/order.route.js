const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

// Get all orders
router.get("/", getAllOrders);

// Update order status by ID
router.post("/:id", updateOrderStatus);

module.exports = router;
