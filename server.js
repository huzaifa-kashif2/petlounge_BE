import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import formRoutes from "./api/form.js";
import twilioWebhook from "./api/twilioWebhook.js";
import saveForm from "./api/saveForm.js";
import sendWhatsapp from "./api/sendWhatsapp.js"

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "https://petlounge.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed for this origin"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/form", formRoutes);
app.use("/api/save", saveForm); 
app.use("/api/send", sendWhatsapp); 
app.use("/api/twilio", twilioWebhook);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
