const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  roll_number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  room_number: {
    type: Number,
    required: true,
  },
  goingTo: {
    type: String,
    required: true,
  },
  outTime: {
    type: String,
    required: true,
  },
  inTime: {
    type: String,
  },
});

const LogEntry = mongoose.model("LogEntry", logSchema);
module.exports = LogEntry;
