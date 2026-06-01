// JobSeeker/Feedback.js
import { useState } from "react";
import toast from "react-hot-toast";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!message.trim()) return toast.error("Please enter feedback.");

    try {
      const res = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Feedback submitted!");
        setMessage("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4  text-green-500">Submit Feedback</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border-black-2  text-gray-900 p-2 mb-4"
        rows={5}
        placeholder="Write your feedback..."
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default Feedback;
