import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveAuthData, getToken, getRole } from "../utils/auth.js";
import API_BASE_URL from "../config/api.js";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token) {
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "jobseeker") navigate("/jobseeker/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, data);

      if (res?.data?.success) {
        const { token, user } = res.data;
        saveAuthData(token, user);
        toast.success(res.data.message || "Login Successful!");

        if (user.role?.toLowerCase() === "admin") navigate("/admin/dashboard");
        else navigate("/jobseeker/dashboard");
      } else {
        toast.error(res?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50 min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="max-w-md w-full bg-white text-gray-700 p-10 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-[#5bbc2e] mb-8 underline">Login</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white hover:border-[#5bbc2e] focus:border-[#5bbc2e]"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                className="input input-bordered w-full pr-10 bg-white hover:border-[#5bbc2e] focus:border-[#5bbc2e]"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-success" />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5bbc2e] hover:bg-[#4db62c]"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;