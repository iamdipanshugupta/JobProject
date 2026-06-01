import { useState } from 'react';
import { motion } from "framer-motion";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    status: "Open",
    applications: 25,
    description: "Build responsive web applications using React and Tailwind CSS.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSys",
    status: "Closed",
    applications: 40,
    description: "Develop scalable APIs with Node.js and Express.",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignPro",
    status: "Open",
    applications: 15,
    description: "Create user-friendly interfaces and prototypes.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudNet",
    status: "Open",
    applications: 30,
    description: "Manage CI/CD pipelines and cloud infrastructure.",
  },
];

const JobOverview = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    document.getElementById("job_modal").showModal();
  };

  return (
    <motion.div
      className="space-y-6 bg-white text-gray-800 border border-gray-200 p-6 rounded-md shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div className="card bg-white shadow-xl border border-gray-200" whileHover={{ scale: 1.03 }}>
          <div className="card-body">
            <h3 className="card-title">Total Jobs</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
        </motion.div>
        <motion.div className="card bg-white shadow-xl border border-gray-200" whileHover={{ scale: 1.03 }}>
          <div className="card-body">
            <h3 className="card-title">Active Jobs</h3>
            <p className="text-2xl font-bold">45</p>
          </div>
        </motion.div>
        <motion.div className="card bg-white shadow-xl border border-gray-200" whileHover={{ scale: 1.03 }}>
          <div className="card-body">
            <h3 className="card-title">Applicants</h3>
            <p className="text-2xl font-bold">1,230</p>
          </div>
        </motion.div>
        <motion.div className="card bg-white shadow-xl border border-gray-200" whileHover={{ scale: 1.03 }}>
          <div className="card-body">
            <h3 className="card-title">Interviews Scheduled</h3>
            <p className="text-2xl font-bold">89</p>
          </div>
        </motion.div>
      </div>

      {/* Job Listings Table */}
      <motion.div
        className="card bg-white shadow-xl border border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="card-body">
          <h3 className="card-title mb-4">Recent Job Listings</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-left text-gray-700">
                  <th>ID</th>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td>{job.id}</td>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>{job.applications}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-ghost btn-sm hover:bg-gray-100"
                        onClick={() => openModal(job)}
                      >
                        View
                      </button>
                      <button className="btn btn-sm bg-white text-gray-800 border border-gray-300 hover:bg-gray-100">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Modal for Job Details */}
      <dialog id="job_modal" className="modal">
        <motion.div
          className="modal-box bg-white text-gray-800 border border-gray-200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {selectedJob ? (
            <>
              <h3 className="font-bold text-lg">{selectedJob.title}</h3>
              <p className="py-2"><strong>Company:</strong> {selectedJob.company}</p>
              <p className="py-1"><strong>Status:</strong> {selectedJob.status}</p>
              <p className="py-1"><strong>Applications:</strong> {selectedJob.applications}</p>
              <p className="py-2"><strong>Description:</strong> {selectedJob.description}</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary" onClick={() => setSelectedJob(null)}>
                    Close
                  </button>
                </form>
              </div>
            </>
          ) : (
            <p>No job selected</p>
          )}
        </motion.div>
      </dialog>
    </motion.div>
  );
};

export default JobOverview;
