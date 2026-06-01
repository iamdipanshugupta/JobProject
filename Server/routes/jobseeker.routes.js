import express from "express";
import User from "../models/user.model.js"; // assuming job seekers are stored in User model

const router = express.Router();

// ✅ Get all job seekers (only for admin)
router.get("/", async (req, res) => {
  try {
    const seekers = await User.find({ role: "jobseeker" }); // fetch only job seekers
    res.json(seekers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job seekers" });
  }
});

// ✅ Block / Unblock job seeker
router.put("/:id/status", async (req, res) => {
  try {
    const seeker = await User.findById(req.params.id);
    if (!seeker) return res.status(404).json({ error: "Job Seeker not found" });

    seeker.status = seeker.status === "Active" ? "Blocked" : "Active";
    await seeker.save();

    res.json({ msg: "Status updated", seeker });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
