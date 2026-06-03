import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../config/api";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
      if (res.data.success) {
        toast.success(res.data.message || "Password reset link sent!");
        setEmail("");
      } else {
        toast.error(res.data.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending reset link");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#5bbc2e]">
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#5bbc2e]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5bbc2e] text-white w-full py-3 rounded hover:bg-[#4ca923] transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
