import React, { useEffect, useState } from "react";

const Results = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get jobSeekerId from localStorage
  const jobSeekerId = localStorage.getItem("jobSeekerId");

  // 🔹 Guard for not logged-in users
  if (!jobSeekerId) {
    return (
      <div className="p-6 bg-white rounded shadow text-gray-900 max-w-md mx-auto">
        <p className="text-red-500">
          Please log in to see your applications and results.
        </p>
      </div>
    );
  }

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/applications/my?jobSeekerId=${jobSeekerId}`
        );
        const data = await res.json();

        console.log("Fetched applications:", data); // 🔹 debug

        if (data.success && Array.isArray(data.applications)) {
          setApplications(data.applications);
        } else {
          setApplications([]);
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        setApplications([]);
      }
      setLoading(false);
    };

    fetchApplications();
  }, [jobSeekerId]);

  return (
    <div className="p-6 bg-white rounded shadow text-gray-900 max-w-3xl mx-auto">
      <h2 className="text-green-500 font-bold text-xl mb-4">
        My Applications & Results
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : applications.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Applied On</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="border p-2">{app.jobId?.title || "N/A"}</td>
                <td className="border p-2">{app.jobId?.company || "N/A"}</td>
                <td className="border p-2">
                  {app.appliedAt
                    ? new Date(app.appliedAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td
                  className={`border p-2 font-bold ${
                    app.status === "selected"
                      ? "text-green-600"
                      : app.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status
                    ? app.status.charAt(0).toUpperCase() + app.status.slice(1)
                    : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No applications found.</p>
      )}
    </div>
  );
};

export default Results;
