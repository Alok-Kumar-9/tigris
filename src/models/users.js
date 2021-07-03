const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    email: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid E-mail");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },
  dob: {
    type: Date,
    required: true,
    validate(value) {
      if (!validator.isDate(value)) {
        throw new Error("Invalid Date");
      }
    },
  },
  sex: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female", "others"],
  },
});

userSchema.pre("save", async function (next) {
  //let dd = req.body.password;
  //req.body.password = await bcrypt.hash(dd);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
