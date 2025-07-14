const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
