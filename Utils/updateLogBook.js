const LogEntry = require("../models/LogEntry");

const updateLogBook = async (stu, goingTo) => {
  try {
    const currentDate = new Date();

    const newLogEntry = new LogEntry({
      roll_number: stu.roll_number,
      name: stu.name,
      contact: stu.contact,
      hostel: stu.hostel,
      room_number: stu.room_number,
      goingTo: goingTo,
      outTime: currentDate.toLocaleString(), // Current server time in ISO format
      inTime: null,
    });

    const sentLogEntry = await newLogEntry.save();
    if (sentLogEntry) {
      console.log(`Log entry created for roll number: ${stu.roll_number}`);
      return sentLogEntry;
    } else {
      console.log(`Failed to log ${stu.rollNumber}`);
      throw new Error(`Failed to log ${stu.rollNumber}`);
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

module.exports = updateLogBook;
