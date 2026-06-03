import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import { sendEmail, passwordResetTemplate } from "../utils/sendEmail.js";

// -------------------- Register --------------------
export const register = async (req, res) => {
  try {
    const { username, email, password, name, mobile, qualification, institute, experience, skills } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const jobId = "JOB" + Date.now().toString().slice(-6);

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "jobseeker",
      name,
      mobile,
      qualification,
      institute,
      experience,
      skills: skills ? skills.split(",").map((s) => s.trim()) : [],
      jobId,
      resumeUrl: req.file ? `/uploads/resumes/${req.file.filename}` : "",
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// -------------------- Login --------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect password" });

    if (user.status === "Blocked") {
      return res.status(403).json({ success: false, message: "Your account has been blocked by admin" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLogin: user.lastLogin,
        name: user.name,
        mobile: user.mobile,
        qualification: user.qualification,
        institute: user.institute,
        skills: user.skills,
        jobId: user.jobId,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

// -------------------- Forgot Password --------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: "No user found with this email" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log("CLIENT_URL =", process.env.CLIENT_URL);
    console.log("Reset URL =", resetUrl);
    console.log("CLIENT_URL =", process.env.CLIENT_URL);

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: passwordResetTemplate(resetUrl, user.name),
    });

    res.json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- Reset Password --------------------
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) return res.status(400).json({ success: false, message: "New password is required" });

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired reset token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};