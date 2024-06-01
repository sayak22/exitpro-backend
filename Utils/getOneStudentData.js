const Student = require("../models/Student");

const getStudentByRollNumber = async (rollNumber) => {
  try {
    const data = await Student.findOne({ roll_number: rollNumber });
    if (data) {
      console.log(`Data of Roll Number: ${rollNumber} retrieved`);
      return data;
    } else {
      console.log(`Data of Roll Number: ${rollNumber} not found`);
      throw new Error(`Data of Roll Number: ${rollNumber} not found`);
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Internal server error: ${err.message}`);
  }
};

module.exports = getStudentByRollNumber;
