const express = require("express");
const Guard = require("../models/guard");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
}

router.put("/login/:guardID", async (req, res) => {
  try {
    const guard = await Guard.findOne({ guardId: req.params.guardID });

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
      text: `Your OTP code is - ${otp}. Do not share this OTP with anyone.`,
    };

    // Function to actually send the mail and handle the success response
    const sendMail = async (transporter, mailOptions) => {
      await transporter.sendMail(mailOptions);

      // Updating the guard OTP in the Guard database.
      const updatedGuard = await Guard.findOneAndUpdate(
        { guardId: req.params.guardID },
        { otp: otp },
        { new: true }
      );

      if (!updatedGuard) {
        throw new Error("Failed to update the guard OTP in the database");
      }

      console.log(`OTP sent successfully to ${guardEmail}`);
      return updatedGuard;
    };

    const updatedGuard = await sendMail(transporter, mailOptions); // calling sendMail function
    res
      .status(200)
      .json({ Success: `Message sent to ${guard.guardName}`});
  } catch (err) {
    console.log(`error: ${err}`);
    res.status(500).json({ Error: err.message });
  }
});

module.exports = router;
