const mongoose = require("mongoose");
const validator = require("validator");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
  activeUsers: {
    type: Array,
    default: [],
  },
  usersIds: {
    type: Array,
    default: [],
  },
});

const Room = new mongoose.model("Room", roomSchema);

module.exports = Room;
