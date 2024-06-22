const express = require("express");
const Guard = require("../models/guard");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

// ROUTER TO HANDLE SENDING OF OTP
router.put("/login", async (req, res) => {
  try {
    const guard = await Guard.findOne({ guardId: req.body.guardId });

    if (!guard) {
      return res.status(404).json({ Error: "Guard not found" });
    }

    const guardEmail = guard.guardEmail;
    const otp = generateOtp();

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER, // sender email
        pass: process.env.EMAIL_APP_PASS, // found in the security section of manage your google account
      },
    });

    // Email content
    let mailOptions = {
      from: { name: "ExitPro Admin", address: process.env.EMAIL_USER },
      to: guardEmail,
      subject: "Your 6 digit OTP Code for EXITPRO",
      text: `Dear ${guard.guardName},\n\nYour OTP code is - ${otp}. Do not share this OTP with anyone.\n\nThanks & Regards,\nAdmin(ExitPro).`,
    };

    try {
      // Send the OTP email
      await transporter.sendMail(mailOptions);

      // Updating the guard OTP in the Guard database.
      const updatedGuard = await Guard.findOneAndUpdate(
        { guardId: req.body.guardId },
        { otp: otp },
        { new: true }
      );

      if (!updatedGuard) {
        console.log("Failed to update OTP in database");
        return res.status(200).json({ isSuccess: false });
      }

      console.log(`OTP sent successfully to ${guardEmail}`);
      return res.status(200).json({ isSuccess: true });
    } catch (error) {
      console.log("Error sending OTP email:", error);
      return res
        .status(500)
        .json({ Error: "Error sending OTP email", Details: error.message });
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({ Error: err.message });
  }
});

//ROUTER TO HANDLE VERIFICATION OF OTP
router.post("/otpMatch", async (req, res) => {
  try {
    const guard = await Guard.findOne({ otp: req.body.otp });
    if (!guard) {
      //if guard is null that means otp that is sent to us does not match with any guard. Therefore wrong OTP
      console.log("OTP does not match with any Guard OTP");
      return res.status(200).json({ isSuccess: false });
    }

    console.log("OTP verified successfully");
    res.status(200).json({ isSuccess: true, guardName: guard.guardName });
  } catch (err) {
    console.log(`error: ${err}`);
    res.status(500).json({ Error: err.message });
  }
});

module.exports = router;

