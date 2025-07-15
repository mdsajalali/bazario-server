const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ product: newProduct });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create product", message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const model = req.body;
    await Product.findByIdAndUpdate({ _id: id }, model);
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update product", message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete product", message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("brandId", "name");
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch product", message: err.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
