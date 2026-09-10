import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaMapMarkerAlt, FaBuilding, FaMoneyBillWave, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import  API_BASE_URL  from "../config/api.js";
import { getToken, getUserId } from "../utils/auth.js";

const ApplyJob = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const jobSeekerId = getUserId();

  useEffect(() => {
    if (!jobSeekerId) {
      toast.error("Please login first to apply for a job!");
      navigate("/login");
    }
  }, [jobSeekerId, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        toast.error("Unable to fetch jobs. Try again later.");
      }
    };
    fetchJobs();
  }, []);

  const selectedJob = jobs.find((j) => j._id === jobId);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!jobId) {
      toast.error("Please select a job to apply for.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("coverLetter", coverLetter || "");

      if (selectedResume) {
        formData.append("resume", selectedResume); // File object from <input type="file">
      }

      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData, // ✅ no JSON.stringify
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to apply");

      toast.success(data.message || "✅ Applied Successfully!");
      setJobId("");
      setCoverLetter("");
      setSelectedResume(null);
    } catch (err) {
      console.error("Error applying for job:", err);
      toast.error(err.message || "❌ Failed to apply for job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-gray-900 max-w-2xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-green-600 font-bold text-xl mb-4">Apply for a Job</h2>

      <form onSubmit={handleApply} className="space-y-4">
        {/* Job Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Job</label>
          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="border p-2 w-full rounded text-gray-900"
          >
            <option value="">-- Select a Job --</option>
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title} — {job.company} ({job.location})
              </option>
            ))}
          </select>
        </div>

        {/* Job details preview — shows once a job is picked, so you know exactly what you're applying to */}
        {selectedJob && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 text-lg mb-2">{selectedJob.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <FaBuilding className="text-green-600" /> {selectedJob.company}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" /> {selectedJob.location}
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" />
                {selectedJob.salary || "Salary not disclosed"}
              </p>
              <p className="flex items-center gap-2">
                <FaGraduationCap className="text-green-600" /> {selectedJob.qualification}
              </p>
              <p className="flex items-center gap-2 sm:col-span-2">
                <FaBriefcase className="text-green-600" />
                {selectedJob.experience} · <span className="capitalize">{selectedJob.jobType}</span>
              </p>
            </div>
            {selectedJob.description && (
              <p className="text-sm text-gray-600 mt-3 border-t border-green-200 pt-3">
                {selectedJob.description}
              </p>
            )}
          </div>
        )}

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (optional)</label>
          <textarea
            placeholder="Write a cover letter (optional)"
            className="border p-2 w-full rounded text-gray-900"
            rows="4"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>

        {/* Resume File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setSelectedResume(e.target.files[0])}
            className="border p-2 w-full rounded text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-green-600 text-white p-2.5 rounded w-full font-medium transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
