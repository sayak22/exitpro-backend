const LogEntry = require("../models/logEntry");
const { format } = require("date-fns");

const updateLogBook = async (stu, goingTo) => {
  try {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "MMM dd yyyy HH:mm:ss");

    const newLogEntry = new LogEntry({
      roll_number: stu.roll_number,
      name: stu.name,
      contact: stu.contact,
      hostel: stu.hostel,
      room_number: stu.room_number,
      goingTo: goingTo,
      outTime: formattedDate, // Formatted server time
      inTime: null,
    });

    const sentLogEntry = await newLogEntry.save();
    if (sentLogEntry) {
      console.log(`Log entry created for roll number: ${stu.roll_number}`);
      return sentLogEntry;
    } else {
      console.log(`Failed to log ${stu.roll_number}`);
      throw new Error(`Failed to log ${stu.roll_number}`);
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

module.exports = updateLogBook;
