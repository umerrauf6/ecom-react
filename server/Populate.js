const mongoose = require("mongoose");
const Product = require("./models/ProductSchema");

const mongoURI =
  "mongodb+srv://su0000676:OCz2TibZFtWl6mQ9@cluster0.p1vw0nf.mongodb.net/Ecommerce";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jsonData = [
  {
    productName: "Smartphone X",
    price: 499.99,
    discount: 599.99,
    productDescription:
      "A powerful and sleek smartphone with advanced features.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: true,
  },
  {
    productName: "Laptop Pro",
    price: 1299.99,
    discount: 1399.99,
    productDescription: "High-performance laptop for work and play.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: false,
  },
  {
    productName: "Wireless Earbuds",
    price: 89.99,
    discount: 99.99,
    productDescription:
      "True wireless earbuds with noise-cancellation technology.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: true,
  },
  {
    productName: "4K Ultra HD TV",
    price: 899.99,
    discount: 999.99,
    productDescription:
      "Immerse yourself in stunning 4K visuals with this smart TV.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: false,
  },
  {
    productName: "Gaming Console",
    price: 299.99,
    discount: 349.99,
    productDescription:
      "Experience the latest gaming adventures with this console.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: true,
  },
  {
    productName: "Smartwatch Elegance",
    price: 199.99,
    discount: 219.99,
    productDescription:
      "Stay connected and stylish with this elegant smartwatch.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: false,
  },
  {
    productName: "Digital Camera",
    price: 499.99,
    discount: 599.99,
    productDescription:
      "Capture moments with precision using this high-quality digital camera.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: true,
  },
  {
    productName: "Fitness Tracker",
    price: 79.99,
    discount: 89.99,
    productDescription:
      "Monitor your health and fitness goals with this sleek tracker.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: false,
  },
  {
    productName: "Wireless Router",
    price: 59.99,
    discount: 69.99,
    productDescription:
      "Enhance your home network with this high-speed wireless router.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: true,
  },
  {
    productName: "Bluetooth Speaker",
    price: 49.99,
    discount: 59.99,
    productDescription:
      "Enjoy your favorite music on the go with this portable speaker.",
    productImage: "https://picsum.photos/id/237/200/300",
    isSpecial: false,
  },
];

Product.insertMany(jsonData)
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });
