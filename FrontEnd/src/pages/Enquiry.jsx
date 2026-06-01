import React, { useState } from "react";
import axios from "axios";

const Enquiry = () => {

  
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    number: ""
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8080/api/auth/enquiry", form);

    if (res.data.success) {
      alert(res.data.message || "Enquiry sent successfully!");
      setForm({ name: "", email: "", message: "", number: "" });
    } else {
      alert(res.data.message || "Something went wrong!");
    }
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", JSON.stringify(error.response.data, null, 2));
      alert(error.response.data.message || "Error from server");
    } else {
      console.error("Network error:", error.message);
      alert("Network error: " + error.message);
    }
  }
};



  return (
    <>
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-10">
      <br></br>
      <br></br>
      <br></br>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Contact Us
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Contact Information */}
        <motion.div
          className="bg-white text-gray-800 rounded-lg shadow-md p-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-[#5bbc2e]">
            Our Contact Information
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li><strong>Address:</strong> 123 Jobify Lane, New Delhi, India</li>
            <li><strong>Email:</strong> kumardipanshu983542@hmail.com</li>
            <li><strong>Phone:</strong> +91 7667233823</li>
            <li><strong>Working Hours:</strong> Mon - Fri, 9:00AM - 6:00PM</li>
          </ul>
        </motion.div>

        {/* Enquiry Form */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 underline">
            Get in Touch
          </h2>
          <form className="grid grid-cols-1 gap-5 text-gray-800" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5bbc2e]"
              required
              onChange={handleInputChange}
              name="name"
              value={form.name}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5bbc2e]"
              required
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5bbc2e]"
              required
              name="number"
              value={form.number}
              onChange={handleInputChange}
            />
            <textarea
              placeholder="Your Query"
              className="border border-gray-300 rounded px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#5bbc2e]"
              required
              name="message"
              value={form.message}
              onChange={handleInputChange}
            ></textarea>
            <button
              type="submit"
              className="bg-[#5bbc2e] hover:bg-[#4ca923] text-white font-semibold py-3 px-6 rounded transition duration-300"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
      
    </div>
    </>
  );
};

export default Enquiry;
