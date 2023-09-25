const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  bilingAddress: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});
const productSchema = new mongoose.Schema({
  productID: String,
  productName: String,
  price: Number,
  productImage: String,
});

const CheckoutSchema = new mongoose.Schema({
  products: {
    type: [productSchema],
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  customerAddress: {
    type: addressSchema,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);

module.exports = Checkout;
