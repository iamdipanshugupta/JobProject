import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFileUpload,
  FaTasks,
  FaUserCircle,
  FaCommentDots,
  FaExclamationCircle,
  FaLandmark,
  FaBuilding,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const services = [
  {
    title: "Search Jobs",
    desc: "Browse live openings by title, location, or category and find roles that actually fit you.",
    icon: <FaSearch />,
    link: "/viewjob",
  },
  {
    title: "Easy Application",
    desc: "Upload your resume once and apply to any job in a couple of clicks — no repeated forms.",
    icon: <FaFileUpload />,
    link: "/jobseeker/apply-job",
  },
  {
    title: "Application Tracking",
    desc: "See exactly where each application stands — applied, shortlisted, or selected.",
    icon: <FaTasks />,
    link: "/jobseeker/results",
  },
  {
    title: "Profile Management",
    desc: "Keep your qualifications, experience, skills, and resume up to date in one place.",
    icon: <FaUserCircle />,
    link: "/jobseeker/profile",
  },
  {
    title: "Government & Private Jobs",
    desc: "Explore openings across both government and private sector employers.",
    icon: <FaLandmark />,
    link: "/viewjob",
  },
  {
    title: "Multiple Categories",
    desc: "From IT to marketing to education — filter jobs by the field you care about.",
    icon: <FaBuilding />,
    link: "/viewjob",
  },
  {
    title: "Feedback",
    desc: "Tell us what's working and what isn't — we actively improve based on your input.",
    icon: <FaCommentDots />,
    link: "/jobseeker/feedback",
  },
  {
    title: "Support & Complaints",
    desc: "Facing an issue with a job posting or application? Reach out and we'll help.",
    icon: <FaExclamationCircle />,
    link: "/enquiry",
  },
];

const Services = () => {
  return (
    <div className="bg-white py-20 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-center text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Everything you need to find, apply to, and land your next job — built around job seekers, not recruiters.
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Link
                to={service.link}
                className="group block h-full bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md hover:bg-green-50 transition text-center"
              >
                <div className="flex justify-center mb-4">
                  <span className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/register"
            className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Get Started — It's Free
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
