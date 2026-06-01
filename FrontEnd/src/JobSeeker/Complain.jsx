import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Complain = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [formData, setFormData] = useState({ subject: "", description: "" });
  const [loading, setLoading] = useState(false);

  // Load logged-in user info from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const status = localStorage.getItem("userStatus");
    setUserEmail(email);
    setUserStatus(status);
  }, []);

  // Check if user is logged in and approved
  if (!userEmail || userStatus !== "Approved") {
    return (
      <p className="text-red-600 text-center mt-10">
        You are not logged in or blocked
      </p>
    );
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.description) {
      toast.error("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/complain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, submittedBy: userEmail }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Complaint submitted successfully!");
        setFormData({ subject: "", description: "" });
      } else {
        toast.error(result.message || "Failed to submit complaint.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting complaint.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 bg-white min-h-screen text-gray-900 flex justify-center items-start">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-lg shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Raise a Complaint</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter complaint subject"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe your issue"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complain;
