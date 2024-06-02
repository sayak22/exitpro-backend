const express = require("express");
const Student = require("../models/Student");
const getStudentByRollNumber = require("../Utils/getStudentByRollNumber");
const updateLogBook = require("../Utils/updateLogBook");
const LogEntry = require("../models/logEntry");
const router = express.Router();

/*
:::::::::::::::
BASIC ENDPOINTS
:::::::::::::::
*/
router.post("/", async (req, res) => {
  //Adding to student database
  try {
    const data = req.body;
    const newStudent = new Student(data);
    const savedStudent = await newStudent.save();
    console.log("data saved");
    res.status(200).json(savedStudent);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

router.get("/", async (req, res) => {
  //Retrieving from student database
  try {
    const data = await Student.find();
    console.log("data retrieved");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

router.get("/:rollNumber", async (req, res) => {
  //Retrieving the document of a particular roll number from student database
  try {
    const rollNumber = req.params.rollNumber;

    const data = await Student.findOne({ roll_number: rollNumber });
    if (data) {
      console.log(`data of Roll Number:${rollNumber} retrieved`);
      res.status(200).json(data);
    } else {
      console.log(`data of Roll Number:${rollNumber} not found`);
      res.status(404).json({
        Error: "Not Found",
        Details: `No data of Roll Number:${rollNumber} is found`,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

router.put("/:id", async (req, res) => {
  //Updating document through id
  try {
    const objID = req.params.id;
    const data = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(objID, data);
    console.log("data updated");
    res.status(200).json(updatedStudent);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  //Deleting document through id
  try {
    const objId = req.params.id;
    const response = await Student.findByIdAndDelete(objId);
    if (!response) {
      console.log("Student not found");
      res.status(404).json({ Error: "Data not found" });
    }
    console.log("Student deleted");
    res.status(200).json({ Message: "Data deleted successfully!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

/*
::::::::::::::
EXIT ENDPOINT
::::::::::::::
*/
router.post("/exit", async (req, res) => {
  try {
    const roll = req.body.roll_number;
    const goingTo = req.body.goingTo;
    const stu = await getStudentByRollNumber(roll);

    if (!stu) {
      console.log("Roll Number not found");
      return res.status(200).json({ Message: "Roll Number not found" });
    }

    const logEntry = await LogEntry.findOne({
      roll_number: roll,
      inTime: null,
    });
    if (logEntry && !logEntry.inTime) {
      console.log("Active log found / Student already out of campus");
      return res
        .status(200)
        .json({ Message: "Active log found / Student Already out of campus" });
    }

    const newLogEntry = await updateLogBook(stu, goingTo);
    res.status(200).json(newLogEntry);
  } catch (error) {
    if (error.message.includes("No data of Roll Number")) {
      res.status(404).json({
        Error: "Not Found",
        Details: error.message,
      });
    } else {
      res.status(500).json({
        Error: "Internal server error",
        Details: error.message,
      });
    }
  }
});

/*
::::::::::::::
ENTRY ENDPOINT
::::::::::::::
*/
router.put("/entry/:rollNumber", async (req, res) => {
  try {
    const roll = req.params.rollNumber;
    const logEntry = await LogEntry.findOne({
      roll_number: roll,
      inTime: null,
    });
    console.log(logEntry);
    if (!logEntry) {
      console.log("Log Entry not found / Student already in campus");
      return res
        .status(200)
        .json({ Message: "Log Entry not found / Student already in campus" });
    }
    // if (logEntry.inTime != null) {
    //   console.log("Student already in campus");
    //   return res.status(200).json({ Message: "Student already in campus" });
    // }
    const currentDate = new Date();
    const time = currentDate.toLocaleString();
    const logEntryToUpdate = await LogEntry.findOneAndUpdate(
      { roll_number: roll, inTime: null },
      { $set: { inTime: time } },
      { new: true }
    );

    console.log("Log Entry Updated");
    return res.status(200).json({ Message: "Log Entry updated" });
  } catch (err) {
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

module.exports = router;

/*
:::::::::::::::::::::::::::::::
OUT OF CAMPUS STUDENTS ENDPOINT(NOT WORKING)
:::::::::::::::::::::::::::::::
*/

router.get("/out/late", async (req, res) => {
  /*
  The end point is "/out/late" insted of "/late" because 
  It is conflicting with another get endpoint of roll number based fetching
  Another get router with "/:rollNumber" is conflicting with "/late" and taking 
  late as roll number, therefore casting error of "late" is displayed.
  */
  try {
      const openEntries = await LogEntry.find({ inTime: null });
      if (!openEntries || openEntries.length == 0) {
        console.log("No open entries found");
        return res.status(200).json({});
      }
      console.log(`${openEntries.length} open entries sent`)
      return res.status(200).json(openEntries);
  } catch (err) {
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});
