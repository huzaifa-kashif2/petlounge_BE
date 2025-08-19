import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import formRoutes from "./api/form.js";

dotenv.config();
connectDB();

const app = express();

// Allowed origins
const allowedOrigins = [
  "https://petlounge.vercel.app",
  "http://localhost:5173"
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed for this origin"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use("/api/form", formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
