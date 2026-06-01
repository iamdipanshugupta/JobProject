import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ApplyJob = () => {
  const navigate = useNavigate();

  // ✅ State
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);


  // jobSeekerId state ensures it's available before submitting
  const [jobSeekerId, setJobSeekerId] = useState(undefined);

  // ✅ Load jobSeekerId from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("user");

    if (storedUserId) {
      setJobSeekerId(storedUserId);
    } else if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setJobSeekerId(parsed?.id || null); // ✅ changed from _id to id
      } catch {
        setJobSeekerId(null);
      }
    } else {
      setJobSeekerId(null);
    }
  }, []);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (jobSeekerId === null) {
      toast.error("Please login first to apply for a job!");
      navigate("/login");
    }
  }, [jobSeekerId, navigate]);

  // ✅ Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/jobs");
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

  const handleApply = async (e) => {
  e.preventDefault();

  const jobSeekerId = localStorage.getItem("jobSeekerId");
  if (!jobSeekerId) {
    toast.error("User not found. Please login again.");
    navigate("/login");
    return;
  }

  if (!jobId) {
    toast.error("Please select a job to apply for.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("jobSeekerId", jobSeekerId);
    formData.append("coverLetter", coverLetter || "");

    if (selectedResume) {
      formData.append("resume", selectedResume); // File object from <input type="file">
    }

    const res = await fetch("http://localhost:8080/api/applications", {
      method: "POST",
      body: formData, // ✅ no JSON.stringify
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to apply");

    toast.success(data.msg || "✅ Applied Successfully!");
    setJobId("");
    setCoverLetter("");
  } catch (err) {
    console.error("Error applying for job:", err);
    toast.error(err.message || "❌ Failed to apply for job");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 bg-white rounded shadow text-gray-900 max-w-md mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-green-500 font-bold text-xl mb-4">Apply for a Job</h2>

     <form onSubmit={handleApply} className="space-y-3">
  {/* Job Dropdown */}
  <select
    value={jobId}
    onChange={(e) => setJobId(e.target.value)}
    className="border p-2 w-full rounded text-gray-900"
  >
    <option value="">-- Select a Job --</option>
    {jobs.map((job) => (
      <option key={job._id} value={job._id}>
        {job.title}
      </option>
    ))}
  </select>

  {/* Cover Letter */}
  <textarea
    placeholder="Write a cover letter (optional)"
    className="border p-2 w-full rounded text-gray-900"
    rows="4"
    value={coverLetter}
    onChange={(e) => setCoverLetter(e.target.value)}
  />

  {/* Resume File Input */}
  <input
    type="file"
    onChange={(e) => setSelectedResume(e.target.files[0])}
    className="border p-2 w-full rounded text-gray-900"
  />

  {/* Submit Button */}
  <button
    type="submit"
    className={`bg-green-500 text-white p-2 rounded w-full transition ${
      loading || jobSeekerId === null
        ? "opacity-70 cursor-not-allowed"
        : "hover:bg-green-600"
    }`}
    disabled={loading || jobSeekerId === null}
  >
    {loading ? "Applying..." : "Apply"}
  </button>
</form>

    </div>
  );
};

export default ApplyJob;
