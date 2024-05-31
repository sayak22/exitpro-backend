const express = require("express");
const Guard = require("../models/guard");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

router.get("/login/:guardID", async (req, res) => {
  try {
    const guard = await Guard.findById(req.params.guardID);
    const guardEmail = guard.guardEmail;

    const otp = generateOtp();

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: guardEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    const updatedGuard = await Guard.findOneAndUpdate(
      { guardID: guard.guardId },
      { otp: otp }
    );

    let info = await transporter.sendMail(mailOptions);
    console.log(`OTP sent successfully. Message ID: ${info.messageId}`);
    res.status(200).json(updatedGuard)

  } catch (err) {
    console.log(`error: ${err}`);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
