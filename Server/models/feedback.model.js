import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role:    { type: String, enum: ["admin", "jobseeker"], required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);