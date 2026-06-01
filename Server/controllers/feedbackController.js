import Feedback from "../models/feedback.model.js";

// -------------------- Submit Feedback (JobSeeker) --------------------
export const submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ success: false, message: "Feedback message is required" });
    }

    const feedback = await Feedback.create({ userId: req.userId, role: "jobseeker", message });
    res.status(201).json({ success: true, message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- GET All Feedback (Admin) --------------------
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error("Get Feedback Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- DELETE Feedback (Admin) --------------------
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ success: false, message: "Feedback not found" });
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Delete Feedback Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};