const Student = require("../models/student");

const getStudentByRollNumber = async (rollNumber) => {
  try {
    const data = await Student.findOne({ roll_number: rollNumber });
    if (data) {
      console.log(`Data of Roll Number: ${rollNumber} retrieved`);
      return data;
    } else {
      throw new Error(`Data of Roll Number: ${rollNumber} not found`);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getStudentByRollNumber;
