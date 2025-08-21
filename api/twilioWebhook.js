import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const from = req.body.From;  
  const to = req.body.To;     
  const body = req.body.Body;
  const messageSid = req.body.MessageSid;

  console.log("📩 New WhatsApp message received:");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Message:", body);
  console.log("Message SID:", messageSid);

  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>Hello! Thanks for your message.</Message>
    </Response>
  `);
});

export default router;
