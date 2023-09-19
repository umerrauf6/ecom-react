const cookieParser = require("cookie-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const router = require("./router/route");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use("/api/", router);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`app listening on port ${process.env.PORT}`);
});
