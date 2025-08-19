import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    timeHour: { type: String },
    timeMin: { type: String },
    timeAMPM: { type: String },
    numPets: { type: Number, required: true },
    petType: { type: String, required: true },
    petName: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Form", formSchema);
