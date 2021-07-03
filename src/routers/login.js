const express = require("express");
const loginRouter = new express.Router();
const User = require("../models/users");
const Room = require("../models/rooms");
const bcrypt = require("bcryptjs");

let usrn = "";
let pass = "";

//does not work
const hashPassword = async (pass) => {
  try {
    const passwd = await bcrypt.hash(pass, 4);
    return passwd;
  } catch (e) {
    return false;
  }
};

//does not work
const comparePassword = async (passwd, checker) => {
  try {
    const rerr = await bcrypt.compare(passwd, checker);
    return rerr;
  } catch (e) {
    return "0000";
  }
};

const findRooms = async (admin) => {
  let roomt = [];
  try {
    let roomData = await Room.find({ admin: admin });
    roomData.forEach(function (item, index) {
      roomt.push(item.name);
    });
    return roomt;
  } catch (e) {
    console.log(e);
    return roomt;
  }
};

loginRouter.post("/login", async (req, res) => {
  try {
    usrn = req.body.username;
    pass = req.body.userpassword;
    let users = [];
    //let passwd = hashPassword(pass);
    //console.log(passwd);
    let results = await User.find({ username: usrn });
    //find method returns an array of objects...
    //findOne method returns an single object...
    if (results.length === 0) {
      res.render("loginerr");
    }
    //let rerr = comparePassword(passwd, results.password);
    else {
      let isMatch = await bcrypt.compare(pass, results[0].password);
      if (isMatch) {
        users.push(results[0].username);
        let roomData = await findRooms(usrn);
        res.render("profile", {
          user: users,
          madeRooms: roomData,
        });
      } else {
        res.render("loginerr");
      }
    }
  } catch (err) {
    res.render("loginerr");
  }
});

loginRouter.get("/backtohome", (req, res) => {
  res.redirect("/");
});

loginRouter.post("/redirecthome", async (req, res) => {
  let users = [];
  users.push(req.body.user);
  let roomData = await findRooms(req.body.user);
  res.render("profile", {
    user: users,
    madeRooms: roomData,
  });
});

module.exports = loginRouter;
