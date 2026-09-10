import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  GraduationCap,
  Building2,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import API_BASE_URL from "../config/api.js";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    mobile: "",
    qualification: "",
    institute: "",
    experience: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      const res = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success(res.data.message || "Account created successfully!");
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // Small reusable input with a leading icon and label
  const Field = ({ icon, label, name, type = "text", placeholder, required }) => {
    const IconComponent = icon;

    return (
      <div>
        <label className="block mb-1.5 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={data[name]}
            onChange={handleChange}
            required={required}
            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* Left branded panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-green-600 via-green-600 to-green-700 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white/10 rounded-full" />

        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">JOBIFY</h1>
          <p className="text-green-100 text-sm mt-1">Find Your Dream Job</p>
        </div>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-3xl font-bold leading-snug mb-6">
            Create your profile once, apply everywhere.
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="bg-white/15 p-2.5 rounded-lg">
                <CheckCircle2 size={20} />
              </span>
              <p className="text-sm text-green-50">Free to join, always</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/15 p-2.5 rounded-lg">
                <Briefcase size={20} />
              </span>
              <p className="text-sm text-green-50">Apply to jobs in one click</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/15 p-2.5 rounded-lg">
                <Sparkles size={20} />
              </span>
              <p className="text-sm text-green-50">Get matched to the right roles</p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-green-100">
          © {new Date().getFullYear()} Jobify. All rights reserved.
        </p>
      </div>

      {/* Right side — registration form */}
      <div className="w-full lg:w-3/5 bg-gray-50 px-6 py-10 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Mobile-only brand header */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold text-green-600">JOBIFY</h1>
            <p className="text-gray-500 text-sm">Find Your Dream Job</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
          <p className="text-gray-500 text-sm mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Login instead
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-8">
            {/* Account details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={User} label="Username" name="username" placeholder="Choose a username" required />
                <Field icon={Mail} label="Email" name="email" type="email" placeholder="you@example.com" required />
                <div className="sm:col-span-2">
                  <label className="block mb-1.5 text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={data.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
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
              </div>
            </div>

            {/* Personal details */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={User} label="Full Name" name="name" placeholder="Your full name" />
                <Field icon={Phone} label="Mobile Number" name="mobile" type="tel" placeholder="10-digit mobile number" />
              </div>
            </div>

            {/* Professional details */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                Professional Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={GraduationCap} label="Qualification" name="qualification" placeholder="e.g. B.Tech CSE" />
                <Field icon={Building2} label="Institute / College" name="institute" placeholder="Your college or university" />
                <Field icon={Briefcase} label="Experience" name="experience" placeholder="e.g. 2 years" />
                <Field icon={Sparkles} label="Skills" name="skills" placeholder="React, Node.js, SQL" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;