import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";
import API_BASE_URL from "../config/api.js";

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/users/enquiry`, form);
      if (res.data.success) {
        toast.success(res.data.message || "Enquiry sent successfully!");
        setForm({ name: "", email: "", message: "", number: "" });
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        toast.error(error.response.data.message || "Error from server");
      } else {
        console.error("Network error:", error.message);
        toast.error("Network error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4 md:px-10">
      <Toaster position="top-right" />

      <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">Contact Us</h1>
      <p className="text-center text-gray-500 mb-14">
        Have a question or facing an issue? We'd love to hear from you.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Information */}
        <motion.div
          className="bg-white text-gray-800 rounded-xl shadow-sm p-8"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Contact Information</h2>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <FaMapMarkerAlt />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-sm text-gray-500">123 Jobify Lane, New Delhi, India</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <FaEnvelope />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-500">support@jobify.com</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <FaPhoneAlt />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-sm text-gray-500">+91 00000 00000</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <FaClock />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Working Hours</p>
                <p className="text-sm text-gray-500">Mon – Fri, 9:00 AM – 6:00 PM</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Enquiry Form */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-8"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
          <form className="grid grid-cols-1 gap-5 text-gray-800" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
              onChange={handleInputChange}
              name="name"
              value={form.name}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
              name="number"
              value={form.number}
              onChange={handleInputChange}
            />
            <textarea
              placeholder="Your Query"
              className="border border-gray-200 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
              name="message"
              value={form.message}
              onChange={handleInputChange}
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`font-semibold py-3 px-6 rounded-lg transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? "Sending…" : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Enquiry;
