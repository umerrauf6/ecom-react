const express = require("express");
const Router = express.Router();
const Customer = require("../models/CustomerModel");
const Product = require("../models/ProductSchema");
const Cart = require("../models/CartModel");
const Wishlist = require("../models/WishlistModel");
const Checkout = require("../models/CheckoutModel");
const auth = require("../middleware/auth");

Router.post("/signup", async (req, res) => {
  try {
    var { name, email, password, access } = req.body;
    if (!access) access = "customer";
    if (!name || !email || !password)
      return res.json({ err: "please fill all details" });
    const user = await Customer.findOne({ email });
    if (user) return res.json({ err: "User already exist" });
    const newUser = new Customer({ name, email, password, access });
    await newUser.save();
    return res.json({ email: newUser.email, name: newUser.name });
  } catch (error) {
    return res.json({ error });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ err: "please fill all details" });
    const user = await Customer.findOne({ email });
    if (!user) return res.status(401).json({ msg: "No Customer found" });
    const isMatch = await user.validatePassword(password);
    if (!isMatch) return res.status(401).json({ msg: "Password not Match" });
    const token = await user.generateJWT();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        access: user.access,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});
Router.get("/getorders", async (req, res) => {
  try {
    const response = await Checkout.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});

Router.post("/postCheckout", auth, async (req, res) => {
  try {
    const userId = req.user.userID;
    const { productsArray, shippingAddress, price } = req.body;
    const newCheckout = new Checkout({
      products: productsArray,
      userID: userId,
      customerAddress: shippingAddress,
      totalPrice: price,
    });
    const response = await newCheckout.save();
    // console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});

Router.get("/getAllWishlist", auth, async (req, res) => {
  try {
    const userId = req.user.userID;
    const data = await Wishlist.find({ createdBy: userId });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
Router.get("/getAllCart", auth, async (req, res) => {
  try {
    const userId = req.user.userID;
    const data = await Cart.find({ createdBy: userId });
    res.status("200").json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
Router.post("/addToWishlist", async (req, res) => {
  try {
    const { productID, productName, price, productImage, createdBy } = req.body;
    const newWishlist = new Wishlist({
      productID,
      productName,
      price,
      productImage,
      createdBy,
    });
    await newWishlist.save();
    res.json({ msg: "Added to Wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});
Router.post("/addToCart", async (req, res) => {
  try {
    const { productID, productName, price, productImage, createdBy } = req.body;
    const newCart = new Cart({
      productID,
      productName,
      price,
      productImage,
      createdBy,
    });
    await newCart.save();
    res.json({ msg: "Product Upload Succesfull" });
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});
Router.post("/uploadproduct", async (req, res) => {
  try {
    const {
      productName,
      price,
      productDescription,
      productImage,
      discountPrice,
      isSpecial,
    } = req.body;
    const newProduct = new Product({
      productName,
      price,
      productDescription,
      productImage,
      discount: discountPrice,
      isSpecial,
    });
    await newProduct.save();
    res.json({ msg: "Product Upload Succesfull" });
  } catch (error) {
    console.log(error);
    res.json({ Error: error });
  }
});
Router.get("/allspecialproducts", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    const allSpecialProducts = allProducts.filter((p) => {
      return p.isSpecial === true;
    });
    res.json(allSpecialProducts);
  } catch (error) {
    res.json(error);
  }
});

module.exports = Router;
