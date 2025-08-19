import Form from "../models/formSchema.js";
import twilio from "twilio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, msg: "Method Not Allowed" });
  }

  try {
    const {
      name,
      phone,
      email,
      date,
      timeHour,
      timeMin,
      timeAMPM,
      numPets,
      petType,
      petName,
      message,
    } = req.body;

    const SID = process.env.TWILIO_SID;
    const AUTH = process.env.TWILIO_AUTH;
    const client = twilio(SID, AUTH);

    console.log("Received form data:", req.body);
    console.log(SID, AUTH);

    const form = new Form({
      name,
      phone,
      email,
      date,
      timeHour,
      timeMin,
      timeAMPM,
      numPets,
      petType,
      petName,
      message,
    });
    await form.save();

    await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+923068748112",
      body: `🐾 New Appointment Request:
Name: ${name}
Phone: ${phone}
Email: ${email}
Date: ${date} ${timeHour}:${timeMin} ${timeAMPM}
Pets: ${numPets} ${petType}(s)
Pet Name: ${petName || "N/A"}
Message: ${message || "N/A"}`
    });

    console.log("✅ WhatsApp message sent successfully");
    res.status(201).json({ success: true, msg: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Twilio Error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
}
