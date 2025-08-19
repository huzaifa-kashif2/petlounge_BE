// api/twilioWebhook.js
import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const from = req.body.From;      // sender's WhatsApp number
  const body = req.body.Body;      // message text
  const to = req.body.To;          // your Twilio WhatsApp number
  const messageSid = req.body.MessageSid;  // Twilio message SID
  const timestamp = new Date().toISOString();

  console.log("📩 New WhatsApp message received:");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Message:", body);
  console.log("Message SID:", messageSid);
  console.log("Timestamp:", timestamp);

  // Respond with all details in JSON
  res.json({
    success: true,
    from,
    to,
    body,
    messageSid,
    timestamp
  });
});
export default router;
