import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    number:  { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);