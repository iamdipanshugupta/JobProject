import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaDownload, FaChevronDown, FaChevronUp } from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";
import usePagination from "../utils/usePagination.js";
import Pagination from "../componants/Pagination.jsx";

const STATUS_STYLES = {
  applied: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-blue-100 text-blue-700",
  selected: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const authHeaders = { Authorization: `Bearer ${getToken()}` };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/applications/all`, { headers: authHeaders });
      if (res.data.success) {
        setApplications(res.data.applications);
      } else {
        toast.error(res.data.message || "Failed to fetch applications");
      }
    } catch (err) {
      toast.error("Failed to fetch applications");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/applications/${id}/status`,
        { status },
        { headers: { "Content-Type": "application/json", ...authHeaders } }
      );

      if (res.data.success) {
        toast.success(`Marked as ${status}`);
        setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Failed to update status");
      console.error("Error updating:", err);
    }
  };

  const handleDownloadResume = async (filename) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/resume/${filename}`, {
        headers: authHeaders,
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast.error("Failed to download resume");
    }
  };

  const filtered = statusFilter
    ? applications.filter((a) => a.status === statusFilter)
    : applications;

  const { pageItems: pagedApplications, ...pagination } = usePagination(filtered, 10);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-green-600">Manage Applications</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
        >
          <option value="">All statuses</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading applications…</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Job Title</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Applicant</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Resume</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedApplications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-8">
                    No applications found
                  </td>
                </tr>
              ) : (
                pagedApplications.map((app) => (
                  <React.Fragment key={app._id}>
                    <tr className="border-t border-gray-100">
                      <td className="py-3 px-4 text-gray-800">{app.jobId?.title || "N/A"}</td>
                      <td className="py-3 px-4 text-gray-800">
                        <p className="font-medium">{app.jobSeekerId?.name || "N/A"}</p>
                        <p className="text-xs text-gray-500">{app.jobSeekerId?.email || "N/A"}</p>
                      </td>
                      <td className="py-3 px-4">
                        {app.resumeUrl ? (
                          <button
                            onClick={() => handleDownloadResume(app.resumeUrl)}
                            className="flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-medium"
                          >
                            <FaDownload className="text-[10px]" /> Download
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">No resume</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            STATUS_STYLES[app.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {app.status || "applied"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={() => updateStatus(app._id, "shortlisted")}
                            disabled={app.status === "shortlisted"}
                            className="px-2.5 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() => updateStatus(app._id, "selected")}
                            disabled={app.status === "selected"}
                            className="px-2.5 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Select
                          </button>
                          <button
                            onClick={() => updateStatus(app._id, "rejected")}
                            disabled={app.status === "rejected"}
                            className="px-2.5 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Reject
                          </button>
                          {app.coverLetter && (
                            <button
                              onClick={() => setExpandedId(expandedId === app._id ? null : app._id)}
                              className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                            >
                              Cover Letter {expandedId === app._id ? <FaChevronUp className="text-[9px]" /> : <FaChevronDown className="text-[9px]" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedId === app._id && app.coverLetter && (
                      <tr className="bg-gray-50">
                        <td colSpan="5" className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">
                          <span className="font-medium text-gray-700">Cover Letter: </span>
                          {app.coverLetter}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {!loading && <Pagination {...pagination} />}
    </div>
  );
};

export default ManageApplications;
