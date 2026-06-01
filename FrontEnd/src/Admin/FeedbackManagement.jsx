import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setFeedbacks(data.feedbacks);
        else toast.error(data.message);
      } catch (err) {
        toast.error("Failed to fetch feedbacks!");
      }
    };
    fetchFeedbacks();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/feedback/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setFeedbacks(feedbacks.filter((f) => f._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to delete feedback!");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        All Feedback
      </h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-700">No feedback available.</p>
      ) : (
        <div className="bg-green-500 shadow rounded-lg overflow-hidden">
          <ul>
            {feedbacks.map((f) => (
              <li
                key={f._id}
                className="border-b border-green-300 p-4 text-gray-900 hover:bg-green-100"
              >
                <p className="font-semibold">
                  {f.userId?.username ?? "Unknown User"} ({f.userId?.email ?? "N/A"})
                </p>
                <p className="mt-1">{f.message}</p>
                <p className="text-gray-700 text-sm mt-1">
                  {new Date(f.createdAt).toLocaleString()}
                </p>

                <button
                  onClick={() => handleDelete(f._id)}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;
