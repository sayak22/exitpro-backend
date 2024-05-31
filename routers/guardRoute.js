const express = require("express");
const Guard = require("../models/guard");
const router = express.Router();

router.post("/", async (req, res) => {
  //Instertin record to Guard database
  try {
    const data = req.body;
    const newGuard = new Guard(data);
    newGuard.otp = newGuard.otp === undefined ? null : newGuard.otp;
    const savedGuard = await newGuard.save();
    res.status(201).json(savedGuard);
  } catch (err) {
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

router.get("/", async (req, res) => {
  //Retrieving from Guard database
  try {
    const data = await Guard.find();
    console.log("data retrieved");
    res.status(200).json(data);
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
    const updatedGuard = await Guard.findByIdAndUpdate(objID, data);
    console.log("data updated");
    res.status(200).json(updatedGuard);
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
    const response = await Guard.findByIdAndDelete(objId);
    if (!response) {
      console.log("Guard not found");
      res.status(404).json({ Error: "Data not found" });
    }
    console.log("Guard deleted");
    res.status(200).json({ Message: "Data deleted successfully!" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Internal server error", Details: err.message });
  }
});

module.exports = router;
