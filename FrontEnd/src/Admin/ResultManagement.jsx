import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload } from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";

const STATUS_STYLES = {
  applied: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-blue-100 text-blue-700",
  selected: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ResultManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const authHeaders = { Authorization: `Bearer ${getToken()}` };

  // Fetch all jobs for the dropdown
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`);
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);

  // Fetch applicants for the selected job
  useEffect(() => {
    if (!selectedJobId) {
      setApplicants([]);
      return;
    }

    const fetchApplicants = async () => {
      setLoadingApplicants(true);
      try {
        const res = await fetch(`${API_BASE_URL}/applications?jobId=${selectedJobId}`, {
          headers: authHeaders,
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.applications)) {
          setApplicants(data.applications.filter((app) => app.jobSeekerId && app.jobSeekerId._id));
        } else {
          setApplicants([]);
        }
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setApplicants([]);
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchApplicants();
  }, [selectedJobId]);

  // Declare the final result for one applicant — this updates the SAME
  // Application record the job seeker sees on their own Results page.
  const declareResult = async (applicationId, status) => {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to update result");

      toast.success(`Marked as ${status}`);
      setApplicants((prev) =>
        prev.map((app) => (app._id === applicationId ? { ...app, status } : app))
      );
    } catch (err) {
      console.error("Error declaring result:", err);
      toast.error(err.message || "Failed to update result");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDownloadResume = async (filename) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/resume/${filename}`, { headers: authHeaders });
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading resume:", err);
      toast.error("Failed to download resume");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-green-600 mb-1">Result Management</h2>
      <p className="text-sm text-gray-500 mb-6">
        Pick a job, then declare the final result for each applicant. This updates what the
        job seeker sees on their own "View Results" page instantly.
      </p>

      <select
        className="border border-gray-200 p-2.5 w-full rounded-lg text-gray-900 mb-6"
        value={selectedJobId}
        onChange={(e) => setSelectedJobId(e.target.value)}
      >
        <option value="">-- Select a job to review --</option>
        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title} — {job.company}
          </option>
        ))}
      </select>

      {!selectedJobId ? (
        <p className="text-gray-400 text-sm text-center py-10">
          Select a job above to see who applied and set their result.
        </p>
      ) : loadingApplicants ? (
        <p className="text-gray-500 text-sm text-center py-10">Loading applicants…</p>
      ) : applicants.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-10">
          No applicants for this job yet.
        </p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {applicants.map((app) => (
            <div
              key={app._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {app.jobSeekerId.username || app.jobSeekerId.name || "Unknown"}
                </p>
                <p className="text-xs text-gray-500">{app.jobSeekerId.email || "No email"}</p>
                {app.resumeUrl && (
                  <button
                    onClick={() => handleDownloadResume(app.resumeUrl)}
                    className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-medium mt-1"
                  >
                    <FaDownload className="text-[10px]" /> Resume
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status || "applied"}
                </span>

                <select
                  className="border border-gray-200 rounded-lg text-sm px-2 py-1.5 text-gray-700"
                  value={app.status || "applied"}
                  disabled={updatingId === app._id}
                  onChange={(e) => declareResult(app._id, e.target.value)}
                >
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultManagement;
