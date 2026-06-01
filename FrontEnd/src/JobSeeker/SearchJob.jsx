import React, { useState, useEffect } from "react";

const SearchJob = ({ jobSeekerId }) => {
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    qualification: "",
    jobType: "",
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  // ✅ Fetch jobs with filters
  const handleSearch = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`http://localhost:8080/api/jobs?${query}`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
    setLoading(false);
  };

  // ✅ Apply for a job
  const handleApply = async (jobId) => {
    try {
      const res = await fetch("http://localhost:8080/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, jobSeekerId }),
      });
      const data = await res.json();
      alert(data.msg || "Applied Successfully!");
    } catch (err) {
      console.error("Error applying job:", err);
      alert("❌ Failed to apply for job");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow text-gray-900">
      <h2 className="text-green-500 font-bold text-xl mb-4">Search Jobs</h2>

      {/* ✅ Filters */}
      <div className="space-y-2 mb-4">
        <input
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          onChange={handleChange}
          value={filters.location}
        />
        <input
          name="company"
          placeholder="Company"
          className="border p-2 w-full"
          onChange={handleChange}
          value={filters.company}
        />
        <input
          name="qualification"
          placeholder="Qualification"
          className="border p-2 w-full"
          onChange={handleChange}
          value={filters.qualification}
        />
        <select
          name="jobType"
          className="border p-2 w-full"
          onChange={handleChange}
          value={filters.jobType}
        >
          <option value="">Select Job Type</option>
          <option value="government">Government</option>
          <option value="private">Private</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white p-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* ✅ Jobs List */}
      {jobs.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-2">Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Qualification</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td className="border p-2">{job.title}</td>
                <td className="border p-2">{job.company}</td>
                <td className="border p-2">{job.location}</td>
                <td className="border p-2">{job.qualification}</td>
                <td className="border p-2 capitalize">{job.jobType}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No jobs found. Try searching.</p>
      )}
    </div>
  );
};

export default SearchJob;
