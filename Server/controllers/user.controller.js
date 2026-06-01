import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Enquiry from "../models/enquiry.model.js";

// -------------------- GET Current User Profile --------------------
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -__v");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, profile: user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- UPDATE Current User Profile --------------------
export const updateProfile = async (req, res) => {
  try {
    const { username, name, mobile, qualification, institute, experience, skills, password } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (username) user.username = username;
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (qualification) user.qualification = qualification;
    if (institute) user.institute = institute;
    if (experience) user.experience = experience;
    if (skills) user.skills = skills.split(",").map((s) => s.trim());
    if (password) user.password = await bcrypt.hash(password, 10);
    if (req.file) user.resumeUrl = `/uploads/resumes/${req.file.filename}`;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully", profile: user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- Submit Enquiry --------------------
export const submitEnquiry = async (req, res) => {
  try {
    const { name, email, message, number } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }

    const newEnquiry = new Enquiry({ name, email, message, number });
    await newEnquiry.save();
    res.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Enquiry Submit Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- Get All Enquiries (Admin) --------------------
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Get Enquiries Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- Delete Enquiry (Admin) --------------------
export const deleteEnquiry = async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Enquiry not found" });
    res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Delete Enquiry Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};