const express = require("express");
const roomRouter = new express.Router();
const Room = require("../models/rooms");

let admina = "";
let usera = "";

const findRoom = async (admin) => {
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

roomRouter.post("/createroomrequest", (req, res) => {
  res.render("newroomform", { admin: req.body.admin, user: req.body.admin });
  admina = req.body.admin;
});

roomRouter.post("/newroomrequest", async (req, res) => {
  try {
    const dataa = new Room({
      name: req.body.room,
      admin: req.body.admin,
    });
    const results = await dataa.save();
    res.render("roomCreationConfirm", {
      user: req.body.admin,
    });
  } catch (err) {
    res.render("allerrors", {
      user: req.body.admin,
    });
  }
});

roomRouter.post("/validateRoom", async (req, res) => {
  let dataa = await Room.find({ name: req.body.room, admin: req.body.admin });
  if (dataa.length === 0) {
    res.send({ msg: "success" });
  } else {
    res.send({ msg: "error" });
  }
});

roomRouter.post("/joinroomrequest", async (req, res) => {
  res.render("joinroomform", { user: req.body.user });
  usera = req.body.user;
});

roomRouter.post("/joinroom", async (req, res) => {
  try {
    let dataa = await Room.find({ name: req.body.room, admin: req.body.admin });
    if (dataa.length !== 0) {
      if (dataa[0].activeUsers.indexOf(req.body.user) === -1) {
        let results = await Room.updateOne(
          { name: req.body.room, admin: req.body.admin },
          {
            $push: {
              activeUsers: req.body.user,
            },
          }
        );
      }
      dataa = await Room.find({ name: req.body.room, admin: req.body.admin });
      res.render("chatroom", {
        user: req.body.user,
        roomId: dataa[0]._id,
        room: dataa[0].name,
        admin: dataa[0].admin,
        activeUsers: dataa[0].activeUsers,
      });
    } else {
      res.render("allerrors", {
        user: req.body.user,
      });
    }
  } catch (err) {
    res.render("allerrors", {
      user: req.body.user,
    });
  }
});

roomRouter.post("/updateActiveUsersList", async (req, res) => {
  try {
    let data = await Room.find({ name: req.body.room, admin: req.body.admin });
    let dataa = data[0].activeUsers;
    res.status(200).send({ dataa: dataa });
  } catch (err) {
    res.status(err.status).send({ dataa: err.message });
  }
});

roomRouter.post("/removeUserFromActiveList", async (req, res) => {
  console.log("request came!!");
  try {
    let dataa = await Room.find({ name: req.body.room, admin: req.body.admin });
    if (dataa.length !== 0) {
      if (dataa[0].activeUsers.indexOf(req.body.user) === -1) {
        let results = await Room.updateOne(
          { name: req.body.room, admin: req.body.admin },
          {
            $pullAll: {
              activeUsers: [req.body.user],
            },
          }
        );
      }
      res.status(200).send({ message: "Success" });
    } else {
      res.status(404).send({ message: "Error" });
    }
  } catch (e) {
    res.status(e.status).send({ message: "error" });
  }
});

roomRouter.post("/deleteRoom", async (req, res) => {
  let admin = req.body.user;
  let room = req.body.room;
  let dataa = await Room.findOneAndDelete({ name: room, admin: admin });
  let users = [];
  users.push(admin);
  let roomData = await findRoom(admin);
  res.render("profile", {
    user: users,
    madeRooms: roomData,
  });
});

module.exports = roomRouter;
