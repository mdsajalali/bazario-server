const Brand = require("../models/brand.model");

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch brands", message: err.message });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.status(200).json(brand);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch brand", message: err.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name, image } = req.body;
    const brand = new Brand({ name, image });
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create brand", message: err.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { name, image } = req.body;
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.status(200).json(brand);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update brand", message: err.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.status(200).json(brand);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete brand", message: err.message });
  }
};

module.exports = {getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand}
