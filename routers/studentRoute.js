const express = require("express");
const Student = require("../models/student");
const router = express.Router();

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
      res
        .status(404)
        .json({
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

module.exports = router;