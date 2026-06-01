import React, { useState, useEffect } from "react";

const ResultManagement = () => {
  const [result, setResult] = useState({ jobId: "", jobSeekerId: "", status: "" });
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/jobs");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Fetch applicants when a job is selected
  useEffect(() => {
    if (!result.jobId) {
      setApplicants([]);
      return;
    }

    const fetchApplicants = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/applications?jobId=${result.jobId}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.applications)) {
          // ✅ Filter only applicants with valid jobSeekerId._id
          const validApplicants = data.applications.filter(
            (app) => app.jobSeekerId && app.jobSeekerId._id
          );
          setApplicants(validApplicants);
        } else {
          setApplicants([]);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setApplicants([]);
      }
    };

    fetchApplicants();
  }, [result.jobId]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  // ✅ Submit result update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!result.jobId || !result.jobSeekerId || !result.status) {
      alert("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/results", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });
      const data = await res.json();
      alert(data.msg || "✅ Result Updated Successfully!");
      setResult({ jobId: "", jobSeekerId: "", status: "" });
      setApplicants([]);
    } catch (err) {
      console.error("Error updating result:", err);
      alert("❌ Failed to update result");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow text-gray-900 max-w-md mx-auto">
      <h2 className="text-green-500 font-bold text-xl mb-4">Result Management</h2>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Select Job */}
        <select
          name="jobId"
          className="border text-gray-900 p-2 w-full rounded"
          value={result.jobId}
          onChange={handleChange}
        >
          <option value="">Select Job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title} - {job.company}
            </option>
          ))}
        </select>

        {/* Select Applicant */}
        <select
          name="jobSeekerId"
          className="border text-gray-900 p-2 w-full rounded"
          value={result.jobSeekerId}
          onChange={handleChange}
          disabled={!result.jobId || applicants.length === 0}
        >
          <option value="">Select Applicant</option>
          {applicants.map((app) => (
            <option key={app._id} value={app.jobSeekerId._id}>
              {app.jobSeekerId.username || "Unknown"} ({app.jobSeekerId.email || "No Email"})
            </option>
          ))}
        </select>

        {/* Select Status */}
        <select
          name="status"
          className="border text-gray-900 p-2 w-full rounded"
          value={result.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-green-500 text-white p-2 rounded w-full ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Result"}
        </button>
      </form>
    </div>
  );
};

export default ResultManagement;
