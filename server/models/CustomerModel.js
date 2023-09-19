const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  access: {
    type: String,
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
CustomerSchema.pre("save", function (next) {
  const SALT_WORK_FACTOR = 10;
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
CustomerSchema.methods.validatePassword = async function validatePassword(
  data
) {
  return bcrypt.compare(data, this.password);
};

CustomerSchema.methods.generateJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.SECRETE_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
const CustomerModel = model("Customer", CustomerSchema);

module.exports = CustomerModel;
