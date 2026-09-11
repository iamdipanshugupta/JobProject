import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title:         { type: String, required: true },
    company:       { type: String, required: true },
    location:      { type: String, required: true },
    salary:        { type: String },
    category: {
      type: String,
      enum: ["IT & Software", "Design", "Marketing", "Business", "Engineering", "Education", "Other"],
      default: "Other",
    },
    qualification: { type: String, required: true },
    experience:    { type: String, required: true },
    jobType:       { type: String, enum: ["government", "private"], required: true },
    description:   { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);