import Job from "../models/job.model.js";

// -------------------- GET All Jobs (with optional filters) --------------------
export const getJobs = async (req, res) => {
  try {
    const { location, company, qualification, jobType } = req.query;
    const filters = {};

    if (location) filters.location = new RegExp(location, "i");
    if (company) filters.company = new RegExp(company, "i");
    if (qualification) filters.qualification = new RegExp(qualification, "i");
    if (jobType) filters.jobType = jobType;

    const jobs = await Job.find(filters).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Fetch Jobs Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// -------------------- CREATE Job (Admin) --------------------
export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ success: false, message: "Failed to create job" });
  }
};

// -------------------- UPDATE Job (Admin) --------------------
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json(job);
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ success: false, message: "Failed to update job" });
  }
};

// -------------------- DELETE Job (Admin) --------------------
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete job" });
  }
};