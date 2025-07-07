const Order = require("../models/order.model");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch orders", message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    console.log({ status });

    await Order.findByIdAndUpdate(id, { status });

    res.send({ message: "Updated" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update order", message: err.message });
  }
};

module.exports = {getAllOrders, updateOrderStatus}
