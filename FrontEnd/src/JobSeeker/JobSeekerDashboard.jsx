import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPaperPlane,
  FaClipboardCheck,
  FaCommentDots,
  FaExclamationCircle,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getUser, getUserId } from "../utils/auth.js";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const STAGES = [
  { key: "applied", label: "Applied", icon: <FaPaperPlane />, color: "bg-green-500" },
  { key: "shortlisted", label: "Shortlisted", icon: <FaHourglassHalf />, color: "bg-amber-500" },
  { key: "selected", label: "Selected", icon: <FaCheckCircle />, color: "bg-emerald-600" },
  { key: "rejected", label: "Not selected", icon: <FaTimesCircle />, color: "bg-gray-400" },
];

const ACTIONS = [
  {
    title: "Search Jobs",
    desc: "Filter openings by location, company, or qualification.",
    icon: <FaSearch />,
    path: "/jobseeker/search-job",
  },
  {
    title: "Apply Jobs",
    desc: "Submit your resume for roles you're interested in.",
    icon: <FaPaperPlane />,
    path: "/jobseeker/apply-job",
  },
  {
    title: "View Results",
    desc: "Track where each application stands, stage by stage.",
    icon: <FaClipboardCheck />,
    path: "/jobseeker/results",
  },
  {
    title: "Feedback",
    desc: "Tell us what's working, and what isn't.",
    icon: <FaCommentDots />,
    path: "/jobseeker/feedback",
  },
  {
    title: "Complaints",
    desc: "Flag an issue with a job posting or application.",
    icon: <FaExclamationCircle />,
    path: "/jobseeker/complain",
  },
];

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const jobSeekerId = getUserId();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobSeekerId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/applications/my?jobSeekerId=${jobSeekerId}`);
        const data = await res.json();
        if (data.success) setApplications(data.applications || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobSeekerId]);

  const counts = STAGES.reduce((acc, stage) => {
    acc[stage.key] = applications.filter((a) => a.status === stage.key).length;
    return acc;
  }, {});
  const total = applications.length;

  const recent = [...applications]
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 4);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-8 mb-8 text-white shadow-sm">
        <p className="text-green-100 text-sm font-medium tracking-wide uppercase mb-1">
          {greeting()}
        </p>
        <h1 className="text-3xl font-bold mb-2">
          {user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
        </h1>
        <p className="text-green-50 max-w-xl">
          {total === 0
            ? "You haven't applied to anything yet — your next opportunity is one search away."
            : `You've applied to ${total} job${total === 1 ? "" : "s"} so far. Here's where things stand.`}
        </p>
        <button
          onClick={() => navigate("/jobseeker/search-job")}
          className="mt-5 inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-green-50 transition"
        >
          Search jobs <FaArrowRight className="text-sm" />
        </button>
      </div>

      {/* Application pipeline */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your application pipeline</h2>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading your applications…</p>
        ) : total === 0 ? (
          <p className="text-gray-500 text-sm">
            No applications yet. Once you apply, your progress through each stage will show up here.
          </p>
        ) : (
          <>
            <div className="flex w-full h-3 rounded-full overflow-hidden mb-6 bg-gray-100">
              {STAGES.map((stage) =>
                counts[stage.key] > 0 ? (
                  <div
                    key={stage.key}
                    className={stage.color}
                    style={{ width: `${(counts[stage.key] / total) * 100}%` }}
                    title={`${stage.label}: ${counts[stage.key]}`}
                  />
                ) : null
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STAGES.map((stage) => (
                <div key={stage.key} className="flex items-center gap-3">
                  <span className={`${stage.color} text-white p-2.5 rounded-lg text-sm`}>
                    {stage.icon}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-gray-900 leading-none">
                      {counts[stage.key]}
                    </p>
                    <p className="text-xs text-gray-500">{stage.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Quick actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {ACTIONS.map((action) => (
          <div
            key={action.path}
            onClick={() => navigate(action.path)}
            className="group bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-green-200 hover:shadow-md cursor-pointer transition"
          >
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-green-50 text-green-600 text-lg mb-4 group-hover:bg-green-600 group-hover:text-white transition">
              {action.icon}
            </span>
            <h3 className="text-base font-bold text-gray-900 mb-1">{action.title}</h3>
            <p className="text-sm text-gray-500">{action.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      {recent.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent applications</h2>
            <button
              onClick={() => navigate("/jobseeker/results")}
              className="text-sm text-green-600 font-medium hover:underline"
            >
              View all
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {recent.map((app) => {
              const stage = STAGES.find((s) => s.key === app.status) || STAGES[0];
              return (
                <li key={app._id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {app.jobId?.title || "Job listing removed"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {app.jobId?.company} · Applied{" "}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`${stage.color} text-white text-xs font-medium px-3 py-1 rounded-full`}
                  >
                    {stage.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;