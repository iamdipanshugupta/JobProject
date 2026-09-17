import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCommentDots } from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";

const MAX_LENGTH = 1000;

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter your feedback before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ message: message.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Thank you! Your feedback has been submitted.");
        setMessage("");
      } else {
        toast.error(data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Toaster position="top-right" />

      <div className="flex items-center gap-3 mb-2">
        <span className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-lg">
          <FaCommentDots />
        </span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Share Your Feedback</h2>
          <p className="text-sm text-gray-500">Help us make Jobify better for everyone.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
          className="w-full border border-gray-200 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
          rows={6}
          placeholder="What's working well? What could be improved? Let us know..."
        />
        <div className="flex justify-between items-center mt-2 mb-4">
          <p className="text-xs text-gray-400">Be as specific as you'd like — every bit helps.</p>
          <p className="text-xs text-gray-400">{message.length}/{MAX_LENGTH}</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting…" : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
