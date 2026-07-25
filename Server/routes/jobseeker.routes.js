import express from "express";
import verifyToken, { isAdmin } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js"; // assuming job seekers are stored in User model

const router = express.Router();

// Get all job seekers (admin only)
router.get("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const seekers = await User.find({ role: "jobseeker" });
    res.json(seekers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job seekers" });
  }
});

// Block / Unblock job seeker (admin only)
router.put("/:id/status", verifyToken, isAdmin, async (req, res) => {
  try {
    const seeker = await User.findById(req.params.id);
    if (!seeker) return res.status(404).json({ error: "Job Seeker not found" });

    seeker.status = seeker.status === "Approved" ? "Blocked" : "Approved";
    await seeker.save();

    res.json({ msg: "Status updated", seeker });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
