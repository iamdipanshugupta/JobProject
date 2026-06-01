import path from "path";
import User from "../models/user.model.js";

// -------------------- GET All Users --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- GET All Job Seekers --------------------
export const getAllJobSeekers = async (req, res) => {
  try {
    const seekers = await User.find({ role: "jobseeker" }).select("-password").sort({ createdAt: -1 });
    res.json({ success: true, seekers });
  } catch (error) {
    console.error("Get Job Seekers Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- UPDATE User Status --------------------
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Blocked"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, message: `User ${status.toLowerCase()} successfully`, user });
  } catch (error) {
    console.error("Update User Status Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- Download Resume --------------------
export const downloadResume = (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", "resumes", req.params.filename);
  res.download(filePath, (err) => {
    if (err) res.status(404).json({ success: false, message: "File not found" });
  });
};