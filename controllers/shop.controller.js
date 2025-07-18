const Cart = require("../models/cart.model");
const Category = require("../models/category.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Wishlist = require("../models/wishlist.model");

const getNewProducts = async (req, res) => {
  try {
    const newProducts = await Product.find({ isNew: true });
    res.send(newProducts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch new products", message: err.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true });
    res.send(featured);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch featured products",
      message: err.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch categories", message: err.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await Category.find();
    res.send(brands);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch brands", message: err.message });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    let {
      searchTerm,
      categoryId,
      brandId,
      sortBy = "price",
      sortOrder = -1,
      page = 1,
      pageSize = 6,
    } = req.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);
    sortOrder = parseInt(sortOrder);

    const queryFilter = {};

    if (searchTerm) {
      queryFilter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { shotDescription: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ];
    }

    if (categoryId) queryFilter.categoryId = categoryId;
    if (brandId) queryFilter.brandId = brandId;

    const sortOptions = {};
    if (sortBy && sortBy.trim() !== "") {
      sortOptions[sortBy] = sortOrder;
    }

    const products = await Product.find(queryFilter)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const total = await Product.countDocuments(queryFilter);

    res.json({ products, total });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.send(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch product", message: err.message });
  }
};

// Wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId }).populate("productId");
    const products = wishlist.map((x) => x.productId);
    res.send(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get wishlist", message: err.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const existing = await Wishlist.findOne({ userId, productId });
    if (existing)
      return res.status(400).json({ message: "Already in wishlist" });

    const wishlist = await Wishlist.create({ userId, productId });
    res.send(wishlist);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add to wishlist", message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    await Wishlist.deleteOne({ userId, productId });
    res.send("wishlist deleted");
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to remove from wishlist", message: err.message });
  }
};

// Cart
const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const userId = req.user.id;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;

      if (cartItem.quantity <= 0) {
        await Cart.findByIdAndDelete(cartItem._id);
        return res.send({ message: "Item removed from cart" });
      }

      await cartItem.save();
    } else {
      if (quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Quantity must be greater than 0" });
      }

      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
    }

    res.send(cartItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add to cart", message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const result = await Cart.findOneAndDelete({ userId, productId });
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete from cart", message: err.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ userId }).populate("productId");

    const result = cartItems.map((x) => ({
      quantity: x.quantity,
      product: x.productId,
    }));

    res.send(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get cart items", message: err.message });
  }
};

// Orders
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = req.body;

    let orderItem = new Order({
      ...order,
      userId: userId,
      status: "inprogress",
    });

    await orderItem.save();
    await Cart.deleteMany({ userId });

    res.json({ message: "Success" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create order", message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId });
    res.send(orders);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to get orders", message: err.message });
  }
};

module.exports = {
  getNewProducts,
  getFeaturedProducts,
  getCategories,
  getBrands,
  getFilteredProducts,
  getProductById,
  getWishlist,
  addToWishlist,
  removeFromCart,
  addToCart,
  getCartItems,
  createOrder,
  getOrders,
  removeFromWishlist,
};
