// api/twilioWebhook.js
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  // Twilio sends the data in `req.body`
  const from = req.body.From;  // sender's WhatsApp number
  const body = req.body.Body;  // message text

  console.log("📩 New WhatsApp message received:");
  console.log("From:", from);
  console.log("Message:", body);

  // Respond to Twilio (required, even if empty)
  res.send("<Response></Response>");
});

export default router;
