import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username:     { type: String, required: true },
    email:        { type: String, required: true, unique: true },
    password:     { type: String, required: true },
    role:         { type: String, enum: ["admin", "jobseeker"], default: "jobseeker" },
    status:       { type: String, enum: ["Approved", "Blocked"], default: "Approved" },

    // Profile fields
    name:           { type: String },
    mobile:         { type: String },
    qualification:  { type: String },
    institute:      { type: String },
    experience:     { type: String },
    skills:         [{ type: String }],
    resumeUrl:      { type: String },

    // Tracking
    lastLogin:    { type: Date },
    jobId:        { type: String, unique: true, sparse: true },

    // Password reset
    resetPasswordToken:  { type: String },
    resetPasswordExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);