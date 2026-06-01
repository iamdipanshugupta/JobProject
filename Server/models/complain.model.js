import mongoose from "mongoose";

const complainSchema = new mongoose.Schema(
  {
    subject:     { type: String, required: true },
    description: { type: String, required: true },
    submittedBy: { type: String, required: true },
    status:      { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Complain", complainSchema);