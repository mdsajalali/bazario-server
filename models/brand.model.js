const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: String
});

const Brand = mongoose.model("brand", brandSchema);
module.exports = Brand;
