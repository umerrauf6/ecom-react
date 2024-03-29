const express = require("express");
const Router = express.Router();
const Customer = require("../models/CustomerModel");
const Product = require("../models/ProductSchema");

Router.post("/signup", async (req, res) => {
  // var { name, email, password, access } = req.body;
  // if (!access) access = "customer";
  // console.log(name, email, password, access);
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
