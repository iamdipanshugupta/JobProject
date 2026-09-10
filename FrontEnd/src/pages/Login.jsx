import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, Briefcase, Search, TrendingUp } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left branded panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-green-600 to-green-700 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/10 rounded-full" />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">JOBIFY</h1>
          <p className="text-green-100 text-sm mt-1">Find Your Dream Job</p>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-3xl font-bold leading-snug mb-6">
            Welcome back. Your next opportunity is one login away.
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="bg-white/15 p-2.5 rounded-lg">
                <Search size={20} />
              </span>
              <p className="text-sm text-green-50">Search thousands of live openings</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/15 p-2.5 rounded-lg">
                <Briefcase size={20} />
              </span>
              <p className="text-sm text-green-50">Apply and track every application</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/15 p-2.5 rounded-lg">
                <TrendingUp size={20} />
              </span>
              <p className="text-sm text-green-50">Know exactly where you stand</p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-green-100">© {new Date().getFullYear()} Jobify. All rights reserved.</p>
      </div>

      {/* Right side — login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="max-w-md w-full">
          {/* Mobile-only brand header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-green-600">JOBIFY</h1>
            <p className="text-gray-500 text-sm">Find Your Dream Job</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in to your account</h2>
          <p className="text-gray-500 text-sm mb-8">Enter your details to continue</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="accent-green-600 w-4 h-4" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-green-600 font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;