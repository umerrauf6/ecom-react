const mongoose = require("mongoose");

// Define the product schema
const WishlistSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: [true, "must provide Customer"],
  },
});

// Create a Product model using the product schema
const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

module.exports = WishlistModel;
