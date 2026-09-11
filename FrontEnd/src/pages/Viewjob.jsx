import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { isLoggedIn, getRole } from "../utils/auth.js";

const Viewjob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`);
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        toast.error("Unable to load jobs right now.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.description || ""}`.toLowerCase();
      const matchesKeyword = keyword ? text.includes(keyword.toLowerCase()) : true;
      const matchesLocation = location
        ? job.location?.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = jobType ? job.jobType === jobType : true;
      return matchesKeyword && matchesLocation && matchesType;
    });
  }, [jobs, keyword, location, jobType]);

  const handleApply = (job) => {
    if (!isLoggedIn()) {
      toast.error("Please login as a job seeker to apply.");
      navigate("/login");
      return;
    }
    if (getRole() !== "jobseeker") {
      toast.error("Only job seeker accounts can apply for jobs.");
      return;
    }
    navigate(`/jobseeker/apply-job?jobId=${job._id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-16 px-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Next Opportunity</h1>
        <p className="text-green-50">
          {loading ? "Loading jobs…" : `${jobs.length} open position${jobs.length === 1 ? "" : "s"} waiting for you`}
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-3">
          <div className="flex items-center flex-1 gap-2 border border-gray-200 rounded-lg px-3">
            <FaSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, company, or keyword"
              className="w-full py-2.5 focus:outline-none text-gray-800"
            />
          </div>
          <div className="flex items-center flex-1 gap-2 border border-gray-200 rounded-lg px-3">
            <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full py-2.5 focus:outline-none text-gray-800"
            />
          </div>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-gray-600 focus:outline-none md:w-48"
          >
            <option value="">All job types</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      {/* Job list */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-center text-gray-400 py-16">Loading jobs…</p>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <FaBriefcase className="text-5xl mx-auto mb-4" />
            <p className="text-lg">
              {jobs.length === 0
                ? "No jobs have been posted yet — check back soon!"
                : "No jobs match your filters. Try broadening your search."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition p-5"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0 text-lg">
                      <FaBuilding />
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-green-600" /> {job.location}
                        </span>
                        {job.salary && (
                          <span className="flex items-center gap-1.5">
                            <FaMoneyBillWave className="text-green-600" /> {job.salary}
                          </span>
                        )}
                        {job.qualification && (
                          <span className="flex items-center gap-1.5">
                            <FaGraduationCap className="text-green-600" /> {job.qualification}
                          </span>
                        )}
                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full capitalize">
                          {job.jobType}
                        </span>
                      </div>

                      {job.description && (
                        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{job.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col justify-end sm:justify-center flex-shrink-0">
                    <button
                      onClick={() => handleApply(job)}
                      className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 transition whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA for non-members */}
      {!isLoggedIn() && (
        <div className="bg-white border-t border-gray-100 py-12 px-4 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">New here?</h3>
          <p className="text-gray-500 mb-5">Create a free account to apply and track your applications.</p>
          <Link
            to="/register"
            className="inline-block bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            Register Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Viewjob;