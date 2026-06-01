import Result from "../models/result.model.js";

// -------------------- Create or Update Result (Admin) --------------------
export const upsertResult = async (req, res) => {
  try {
    const { jobId, jobSeekerId, status } = req.body;

    if (!jobId || !jobSeekerId || !status) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    let result = await Result.findOne({ jobId, jobSeekerId });

    if (result) {
      result.status = status;
      await result.save();
      return res.json({ success: true, message: "Result updated successfully", result });
    }

    result = await Result.create({ jobId, jobSeekerId, status });
    res.status(201).json({ success: true, message: "Result created successfully", result });
  } catch (error) {
    console.error("Upsert Result Error:", error);
    res.status(500).json({ success: false, message: "Failed to update result" });
  }
};

// -------------------- GET Results for a Job (Admin) --------------------
export const getResultsByJob = async (req, res) => {
  try {
    const results = await Result.find({ jobId: req.params.jobId }).populate("jobSeekerId", "name email");
    res.json({ success: true, results });
  } catch (error) {
    console.error("Get Results Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch results" });
  }
};

// -------------------- GET Results for a User (JobSeeker) --------------------
export const getResultsByUser = async (req, res) => {
  try {
    const results = await Result.find({ jobSeekerId: req.params.jobSeekerId }).populate("jobId", "title company");
    res.json({ success: true, results });
  } catch (error) {
    console.error("Get User Results Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch results" });
  }
};