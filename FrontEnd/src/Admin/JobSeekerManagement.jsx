import React, { useState, useEffect } from "react";

const JobSeekerManagement = () => {
  const [jobSeekers, setJobSeekers] = useState([]);

  // Fetch job seekers from backend
  const fetchJobSeekers = async () => {
    try {
      const token = localStorage.getItem("token"); // if protected
      const res = await fetch("http://localhost:8080/api/jobseekers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setJobSeekers(data);
    } catch (err) {
      console.error("Error fetching job seekers:", err);
    }
  };

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // Toggle status (Approved <-> Blocked)
  const toggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/jobseekers/${id}/status`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          status: currentStatus === "Approved" ? "Blocked" : "Approved",
        }),
      });

      const data = await res.json();

      // Update UI with new status
      setJobSeekers((prev) =>
        prev.map((js) =>
          js._id === id ? { ...js, status: data.seeker?.status || js.status } : js
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Job Seeker Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="border border-white p-2">ID</th>
            <th className="border border-white p-2">Username</th>
            <th className="border border-white p-2">Email</th>
            <th className="border border-white p-2">Status</th>
            <th className="border border-white p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobSeekers.map((seeker) => (
            <tr key={seeker._id}>
              <td className="border border-gray-300 p-2 text-gray-900">{seeker._id}</td>
              <td className="border border-gray-300 p-2 text-gray-900">{seeker.username}</td>
              <td className="border border-gray-300 p-2 text-gray-900">{seeker.email}</td>
              <td className="border border-gray-300 p-2 text-gray-900">{seeker.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => toggleStatus(seeker._id, seeker.status)}
                  className={`px-3 py-1 rounded ${
                    seeker.status === "Approved" ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                >
                  {seeker.status === "Approved" ? "Block" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobSeekerManagement;
