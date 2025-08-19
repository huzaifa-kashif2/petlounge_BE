import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const from = req.body.From;  // sender's WhatsApp number
  const to = req.body.To;      // your Twilio WhatsApp number
  const body = req.body.Body;  // message text
  const messageSid = req.body.MessageSid;

  console.log("📩 New WhatsApp message received:");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Message:", body);
  console.log("Message SID:", messageSid);

  // Respond back to Twilio with TwiML
  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>Hello! Thanks for your message.</Message>
    </Response>
  `);
});

export default router;
