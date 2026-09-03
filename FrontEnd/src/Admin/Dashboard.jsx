import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaExclamationCircle,
  FaCommentDots,
  FaUsers,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import { getToken } from "../utils/auth.js";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const authHeaders = { headers: { Authorization: `Bearer ${getToken()}` } };

  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    complaints: 0,
    feedbacks: 0,
    users: 0,
  });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [jobsRes, appsRes, complaintsRes, feedbackRes, usersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/jobs`).then((r) => r.json()).catch(() => []),
          fetch(`${API_BASE_URL}/applications/all`).then((r) => r.json()).catch(() => ({ applications: [] })),
          fetch(`${API_BASE_URL}/complaints`).then((r) => r.json()).catch(() => []),
          fetch(`${API_BASE_URL}/feedback`, authHeaders).then((r) => r.json()).catch(() => ({ feedbacks: [] })),
          fetch(`${API_BASE_URL}/admin/users`, authHeaders).then((r) => r.json()).catch(() => ({ users: [] })),
        ]);

        const jobs = Array.isArray(jobsRes) ? jobsRes : [];
        const applications = appsRes?.applications || [];
        const complaints = Array.isArray(complaintsRes) ? complaintsRes : [];
        const feedbacks = feedbackRes?.feedbacks || [];
        const users = usersRes?.users || [];

        setStats({
          jobs: jobs.length,
          applications: applications.length,
          complaints: complaints.length,
          feedbacks: feedbacks.length,
          users: users.length,
        });

        // Build a merged, real recent-activity feed from live data
        const feed = [
          ...applications.map((a) => ({
            type: "application",
            text: `${a.jobSeekerId?.name || "A job seeker"} applied for ${a.jobId?.title || "a job"}`,
            date: a.appliedAt,
          })),
          ...complaints.map((c) => ({
            type: "complaint",
            text: `${c.submittedBy || "A user"} submitted a complaint: "${c.subject}"`,
            date: c.createdAt,
          })),
          ...feedbacks.map((f) => ({
            type: "feedback",
            text: `New feedback received: "${(f.message || "").slice(0, 60)}${f.message?.length > 60 ? "…" : ""}"`,
            date: f.createdAt,
          })),
        ]
          .filter((item) => item.date)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        setActivity(feed);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const cards = [
    {
      label: "Total Jobs",
      value: stats.jobs,
      icon: <FaBriefcase />,
      accent: "text-green-700 bg-green-50",
      path: "/admin/jobs",
    },
    {
      label: "Applications",
      value: stats.applications,
      icon: <FaFileAlt />,
      accent: "text-sky-700 bg-sky-50",
      path: "/admin/applications",
    },
    {
      label: "Complaints",
      value: stats.complaints,
      icon: <FaExclamationCircle />,
      accent: "text-red-600 bg-red-50",
      path: "/admin/complaints",
    },
    {
      label: "Feedbacks",
      value: stats.feedbacks,
      icon: <FaCommentDots />,
      accent: "text-blue-600 bg-blue-50",
      path: "/admin/feedback",
    },
    {
      label: "Registered Users",
      value: stats.users,
      icon: <FaUsers />,
      accent: "text-amber-600 bg-amber-50",
      path: "/admin/login-info",
    },
  ];

  const activityDot = {
    application: "bg-sky-500",
    complaint: "bg-red-500",
    feedback: "bg-blue-500",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-8 mb-8 text-white shadow-sm">
        <p className="text-green-100 text-sm font-medium tracking-wide uppercase mb-1">
          {greeting()}, Admin
        </p>
        <h1 className="text-3xl font-bold mb-2">Job Portal control center</h1>
        <p className="text-green-50 max-w-xl">
          {loading
            ? "Pulling the latest numbers…"
            : `${stats.jobs} jobs live, ${stats.applications} applications in progress, and ${stats.complaints} complaints waiting on you.`}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            onClick={() => navigate(card.path)}
            className="bg-white shadow-sm p-5 rounded-xl cursor-pointer hover:shadow-md transition"
          >
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg mb-3 ${card.accent}`}>
              {card.icon}
            </span>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {loading ? "…" : card.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent activity</h2>
          {!loading && activity.length > 0 && (
            <span className="text-xs text-gray-400">Last {activity.length} events</span>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading recent activity…</p>
        ) : activity.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Nothing has happened yet — new applications, complaints, and feedback will show up here as they come in.
          </p>
        ) : (
          <ul className="space-y-4">
            {activity.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${activityDot[item.type]}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-400">{new Date(item.date).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate("/admin/applications")}
          className="mt-5 inline-flex items-center gap-2 text-sm text-green-600 font-medium hover:underline"
        >
          Go to Manage Applications <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
