const express = require("express");
const registerRouter = new express.Router();
const User = require("../models/users");

let tr = { msg: "success" };
let tre = { msg: "error" };

registerRouter.post("/register", async (req, res) => {
  try {
    const dataa = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      dob: req.body.dob,
      sex: req.body.sex,
    });
    const results = await dataa.save();
    //res.status(200).send(results);
    res.render("successreg");
  } catch (err) {
    res.render("regerr");
  }
});

//registerRouter.post("/checkName", async (req, res) => {
//console.log(req.body);
//  let dataa = await User.find({ name: req.body.name });
//  console.log(dataa);
//  if (dataa.length === 0) {
//    res.json(tr);
//  } else {
//    res.json(tre);
//  }
//});

registerRouter.post("/checkUserName", async (req, res) => {
  let dataa = await User.find({ username: req.body.username });
  console.log(dataa);
  if (dataa.length === 0) {
    res.json(tr);
  } else {
    res.json(tre);
  }
});

registerRouter.post("/checkEmail", async (req, res) => {
  let dataa = await User.find({ email: req.body.email });
  console.log(dataa);
  if (dataa.length === 0) {
    res.json(tr);
  } else {
    res.json(tre);
  }
});

registerRouter.post("/checkPhone", async (req, res) => {
  let dataa = await User.find({ phone: req.body.phone });
  console.log(dataa);
  if (dataa.length === 0) {
    res.json(tr);
  } else {
    res.json(tre);
  }
});

module.exports = registerRouter;
