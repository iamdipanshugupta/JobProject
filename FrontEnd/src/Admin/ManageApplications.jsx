import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/applications/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setApplications(res.data.applications);
      } else {
        toast.error(res.data.msg || "Failed to fetch applications");
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

  // ✅ Update application status
  const updateStatus = async (id, status) => {
    try {
      // Convert to lowercase and match backend validStatus values
      const backendStatus =
        status.toLowerCase() === "approve"
          ? "shortlisted"
          : status.toLowerCase() === "reject"
          ? "rejected"
          : status.toLowerCase();

      const res = await axios.put(
        `http://localhost:8080/api/applications/${id}/status`,
        { status: backendStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(`Application ${backendStatus} successfully`);
        fetchApplications(); // refresh the list
      } else {
        toast.error(res.data.msg || "Failed to update status");
      }
    } catch (err) {
      toast.error("Failed to update status");
      console.error("Error updating:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-green-600">Manage Applications</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              <th className="py-2 px-4 text-gray-900 border">Job Title</th>
              <th className="py-2 px-4 text-gray-900 border">Applicant Name</th>
              <th className="py-2 px-4 text-gray-900 border">Email</th>
              <th className="py-2 px-4 text-gray-900 border">Status</th>
              <th className="py-2 px-4 text-gray-900 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-900 py-4">
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app._id} className="text-center">
                  <td className="py-2 px-4 text-gray-900 border">
                    {app.jobId?.title || "N/A"}
                  </td>
                  <td className="py-2 px-4 text-gray-900 border">
                    {app.jobSeekerId?.name || "N/A"}
                  </td>
                  <td className="py-2 px-4 text-gray-900 border">
                    {app.jobSeekerId?.email || "N/A"}
                  </td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        app.status === "applied"
                          ? "bg-yellow-200 text-yellow-700"
                          : app.status === "shortlisted"
                          ? "bg-blue-200 text-blue-700"
                          : app.status === "selected"
                          ? "bg-green-200 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-200 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => updateStatus(app._id, "approve")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(app._id, "reject")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageApplications;
