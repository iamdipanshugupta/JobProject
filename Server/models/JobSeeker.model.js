import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "jobseeker" },
  status: { type: String, enum: ["Pending", "Approved", "Blocked"], default: "Approved" },
  skills: [{ type: String }],
  resumeUrl: { type: String, default: "" },
  qualification: { type: String },
  experience: { type: String },
  mobile: { type: String },
  institute: { type: String },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String },
  resetPasswordExpiry: { type: Date }
});

// Automatically update `updatedAt` field on save
jobSeekerSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);
export default JobSeeker;
