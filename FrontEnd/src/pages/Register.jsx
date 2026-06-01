import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api.js";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "", email: "", password: "", name: "",
    mobile: "", qualification: "", institute: "", experience: "", skills: "",
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
        toast.success(res.data.message);
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

  const fields = [
    { name: "username",      placeholder: "Username",           type: "text" },
    { name: "email",         placeholder: "Email",              type: "email" },
    { name: "password",      placeholder: "Password",           type: "password" },
    { name: "name",          placeholder: "Full Name",          type: "text" },
    { name: "mobile",        placeholder: "Mobile Number",      type: "tel" },
    { name: "qualification", placeholder: "Qualification",      type: "text" },
    { name: "institute",     placeholder: "Institute / College", type: "text" },
    { name: "experience",    placeholder: "Experience (e.g. 2 years)", type: "text" },
    { name: "skills",        placeholder: "Skills (comma separated)", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden my-24">

        {/* Left Panel */}
        <div className="bg-gradient-to-br from-[#5bbc2e] to-[#4db31e7b] text-white flex flex-col justify-center items-center p-10 w-full md:w-1/3">
          <h2 className="text-3xl font-semibold mb-4">Welcome</h2>
          <p className="text-center mb-6 text-gray-100">"Start your journey — sign up now!"</p>
          <a href="/login" className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-200 transition">
            Login
          </a>
        </div>

        {/* Registration Form */}
        <div className="bg-white p-10 w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-center text-[#5bbc2e] mb-8">Create Account</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={data[field.name]}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5bbc2e] text-gray-800"
                required={["username", "email", "password"].includes(field.name)}
              />
            ))}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded font-semibold text-white transition ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5bbc2e] hover:bg-[#4ca923]"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;