import React from 'react';
import { motion } from 'framer-motion';
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Services = () => {
  const services = [
    {
      title: 'Job Posting',
      desc: 'Publish your openings and attract top talent across India with ease.',
      icon: <path d="M3 10h18M9 16h6M12 6v12" />,
      link: 'http://localhost:5173/viewjob',
    },
    {
      title: 'Resume Search',
      desc: 'Browse a growing database of resumes by skill, role, or location.',
      icon: <path d="M12 4v16m8-8H4" />,
    },
    {
      title: 'Employer Dashboard',
      desc: 'Secure control panel to manage posts and applications.',
      icon: <path d="M17 9V7a4 4 0 00-8 0v2M5 11h14M5 11a2 2 0 00-2 2v4h18v-4a2 2 0 00-2-2" />,
    },
    {
      title: 'Applicant Tracking',
      desc: 'Track applications and interview stages with ease.',
      icon: <path d="M5 13l4 4L19 7" />,
    },
    {
      title: 'Analytics Reports',
      desc: 'Gain insights from performance stats and job reports.',
      icon: <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />,
    },
    {
      title: '24/7 Support',
      desc: 'We’re here to help anytime you need us.',
      icon: <path d="M18.364 5.636l-1.414 1.414M5.636 5.636l1.414 1.414M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2" />,
      link: 'http://localhost:5173/enquiry',
    },
    {
      title: 'Skill Development',
      desc: 'Access courses to grow your professional skills.',
      icon: <path d="M4 4h16v2H4zM4 8h16v2H4zM4 12h16v2H4zM4 16h16v2H4z" />,
    },
    {
      title: 'Remote Opportunities',
      desc: 'Explore jobs with remote or hybrid options.',
      icon: <path d="M3 12h18M12 3v18" />,
    },
    {
      title: 'Instant Interview Scheduling',
      desc: 'Let employers schedule interviews directly.',
      icon: <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />,
    },
  ];

  return (
    <>
    <div className="bg-white py-16 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <br></br>
        <br></br>
        <motion.h2
          className="text-4xl font-bold text-center text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We offer a wide range of services to simplify hiring and job search for employers and candidates alike.
        </motion.p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition"
              variants={cardVariants}
            >
              <div className="flex justify-center mb-4">
                <a href={service.link || "#"}>
                  <svg
                    className="w-12 h-12 text-[#5bbc2e] hover:scale-110 transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {service.icon}
                  </svg>
                </a>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Services;
