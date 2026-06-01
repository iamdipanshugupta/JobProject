// backend/routes/admin.js
import express from "express";
import Complain from "../models/Complain.js";
import User from "../models/user.model.js";
import path from "path";
const router = express.Router();

// GET /api/admin/complaints
router.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complain.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/admin/complaints/:id  => Mark Resolved
router.put("/complaints/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complain.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/complaints/:id  => Delete complaint
router.delete("/complaints/:id", async (req, res) => {
  try {
    await Complain.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Download resume by filename
router.get("/users/resume/:filename", (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", "resumes", req.params.filename);
  res.download(filePath, err => {
    if (err) res.status(404).send("File not found");
  });
});


export default router;
