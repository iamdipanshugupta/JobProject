import Complain from "../models/complain.model.js";

// -------------------- Submit Complaint (JobSeeker) --------------------
export const submitComplaint = async (req, res) => {
  try {
    const { subject, description, submittedBy } = req.body;

    if (!subject || !description || !submittedBy) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await Complain.findOne({ submittedBy, subject, description });
    if (existing) {
      return res.status(409).json({ success: false, message: "Duplicate complaint already submitted" });
    }

    const complaint = await Complain.create({ subject, description, submittedBy });
    res.status(201).json({ success: true, message: "Complaint submitted successfully", complaint });
  } catch (error) {
    console.error("Submit Complaint Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- GET All Complaints (Admin) --------------------
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complain.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Get Complaints Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- UPDATE Complaint Status (Admin) --------------------
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complain.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    res.json({ success: true, complaint });
  } catch (error) {
    console.error("Update Complaint Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------------------- DELETE Complaint (Admin) --------------------
export const deleteComplaint = async (req, res) => {
  try {
    await Complain.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Delete Complaint Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};