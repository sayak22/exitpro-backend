const nodemailer = require("nodemailer");
const LogEntry = require("../models/logEntry");

// Configure the email transport using nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER, // sender email
    pass: process.env.EMAIL_APP_PASS, // found in the security section of manage your google account
  },
});

const sendWarningMail = async () => {
  try {
    // Find all log entries with inTime set to null
    const logEntries = await LogEntry.find({ inTime: null });
    if(!logEntries || logEntries.legth==0)
      console.log('No open entries to warn')

    // Send email to each student
    for (const entry of logEntries) {
      const mailOptions = {
        from: { name: "ExitPro Admin", address: process.env.EMAIL_USER },
        to: `${entry.roll_number}@iiitu.ac.in`,
        subject: "Warning: Return to campus",
        text: `Dear ${entry.name},\n\nYou are still out of campus. Please return to campus as soon as possible. You will not be allowed entry after 9:00 PM (IST).\n\nThanks & Regards,\nAdmin(ExitPro).`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Warning email sent to: ${entry.roll_number}@iiitu.ac.in`);
    }
  } catch (error) {
    console.error("Error sending warning emails:", error);
  }
};

module.exports = sendWarningMail;
