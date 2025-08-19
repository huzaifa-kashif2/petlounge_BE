import Form from "../models/formSchema.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, msg: "Method not allowed" });
  }

  try {
    const formData = req.body;

    const form = new Form(formData);
    await form.save();

    console.log("✅ Form saved to MongoDB:", formData);
    res.status(201).json({ success: true, msg: "Form saved successfully!" });
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
}
