import mongoose from "mongoose";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";

const VALID_STATUSES = ["applied", "shortlisted", "selected", "rejected"];

// -------------------- Apply for a Job (JobSeeker) --------------------
export const applyForJob = async (req, res) => {
  try {
    const { jobId, jobSeekerId, coverLetter } = req.body;

    if (!jobId || !jobSeekerId) {
      return res.status(400).json({ success: false, message: "Job ID and Job Seeker ID are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(jobSeekerId)) {
      return res.status(400).json({ success: false, message: "Invalid Job ID or Job Seeker ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const user = await User.findById(jobSeekerId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const existing = await Application.findOne({ jobId, jobSeekerId });
    if (existing) {
      return res.status(409).json({ success: false, message: "You have already applied for this job" });
    }

    const application = new Application({
      jobId,
      jobSeekerId,
      coverLetter: coverLetter || "",
      resumeUrl: req.file ? `/uploads/resumes/${req.file.filename}` : user.resumeUrl || "",
      appliedAt: new Date(),
      status: "applied",
    });

    await application.save();
    res.status(201).json({ success: true, message: "Applied successfully", application });
  } catch (error) {
    console.error("Apply Error:", error);
    res.status(500).json({ success: false, message: "Failed to apply", error: error.message });
  }
};

// -------------------- GET My Applications (JobSeeker) --------------------
export const getMyApplications = async (req, res) => {
  try {
    const { jobSeekerId } = req.query;

    if (!jobSeekerId || !mongoose.Types.ObjectId.isValid(jobSeekerId)) {
      return res.status(400).json({ success: false, message: "Valid Job Seeker ID required" });
    }

    const applications = await Application.find({ jobSeekerId })
      .populate("jobId", "title company location jobType")
      .sort({ appliedAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    console.error("Get My Applications Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

// -------------------- GET All Applications (Admin) --------------------
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company location jobType")
      .populate("jobSeekerId", "username name email resumeUrl")
      .sort({ appliedAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    console.error("Get All Applications Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

// -------------------- GET Applicants for a Job (Admin) --------------------
export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.query;

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ success: false, message: "Valid Job ID required" });
    }

    const applications = await Application.find({ jobId })
      .populate("jobSeekerId", "username name email")
      .sort({ appliedAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    console.error("Get Applicants Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch applicants" });
  }
};

// -------------------- UPDATE Application Status (Admin) --------------------
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Application ID" });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("jobSeekerId", "username name email")
      .populate("jobId", "title company");

    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    res.json({ success: true, message: "Status updated successfully", application });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

// -------------------- DELETE Application (Admin) --------------------
export const deleteApplication = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Application ID" });
    }

    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete application" });
  }
};