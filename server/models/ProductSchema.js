const mongoose = require("mongoose");

// Define the product schema
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  isSpecial: {
    type: Boolean,
    required: true,
  },
});

// Create a Product model using the product schema
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
