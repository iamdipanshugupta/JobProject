import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ComplainManagement = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/complain");
      if (!res.ok) throw new Error("Failed to fetch complaints");
      const data = await res.json();
      setComplains(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Mark complaint as resolved
  const handleStatusChange = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/complain/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      toast.success("Complaint marked as resolved!");
      fetchComplaints();
    } catch (err) {
      console.error(err); 
      toast.error("Error updating status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      console.log("Deleting complaint ID:", id); // ✅ Debug
      const res = await fetch(`http://localhost:8080/api/complain/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete complaint");

      toast.success("Complaint deleted successfully!");
      fetchComplaints(); // refresh table
    } catch (err) {
      console.error(err);
      toast.error("Error deleting complaint");
    }
  };



  return (
    <div className="p-8 bg-white min-h-screen text-gray-900">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold mb-6 text-center">Complain Management</h1>

      {loading && <p className="text-center text-gray-700 mb-4">Loading complaints...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">User</th>
              <th className="border p-3">Issue</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complains.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="border p-3 text-center">
                  No complaints found.
                </td>
              </tr>
            )}

            {complains.map((c, idx) => (
              <tr key={c._id} className="hover:bg-gray-100">
                <td className="border p-3 text-center">{idx + 1}</td>
                <td className="border p-3">{c.submittedBy}</td>
                <td className="border p-3">{c.description}</td>
                <td className="border p-3 text-center">{c.status}</td>
                <td className="border p-3 text-center space-x-2">
                  {c.status !== "Resolved" && (
                    <button
                      onClick={() => handleStatusChange(c._id)}
                      className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplainManagement;
