import { Link } from "react-router-dom";
import {
  FaTachometerAlt, FaBriefcase, FaClipboardCheck, FaShieldAlt,
  FaCommentDots, FaEnvelope, FaUsers, FaExclamationCircle, FaTimes, FaUserCog,
} from "react-icons/fa";
import { FaTableColumns } from "react-icons/fa6";

const navItems = [
  { icon: <FaTachometerAlt className="text-green-700" />, label: "Dashboard",              path: "/admin/dashboard" },
  { icon: <FaBriefcase     className="text-green-700" />, label: "Job Management",         path: "/admin/jobs" },
  { icon: <FaClipboardCheck className="text-green-700" />, label: "Result Management",     path: "/admin/results" },
  { icon: <FaShieldAlt     className="text-green-700" />, label: "Login Info",             path: "/admin/login-info" },
  { icon: <FaUserCog       className="text-green-700" />, label: "Admin Users",            path: "/admin/users" },
  { icon: <FaTableColumns  className="text-green-700" />, label: "Manage Applications",   path: "/admin/applications" },
  { icon: <FaCommentDots   className="text-blue-600"  />, label: "Feedback Management",   path: "/admin/feedback" },
  { icon: <FaEnvelope      className="text-purple-700" />, label: "Enquiry Management",   path: "/admin/enquiries" },
  { icon: <FaExclamationCircle className="text-red-600" />, label: "Complain Management", path: "/admin/complaints" },
  { icon: <FaUsers         className="text-indigo-700" />, label: "Job Seeker Management", path: "/admin/jobseekers" },
];

const AdminSidebar = ({ sidebarOpen, toggleSidebar }) => (
  <aside
    className={`bg-green-300 text-gray-800 w-64 p-6 flex flex-col h-screen transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static z-40`}
  >
    {/* Mobile close button */}
    <div className="md:hidden flex justify-end mb-2">
      <button onClick={toggleSidebar} className="text-gray-800 text-2xl">
        <FaTimes />
      </button>
    </div>

    <h2 className="text-2xl font-bold mb-6 text-center">Jobs@Mail</h2>
    <hr className="border-gray-300 mb-4" />

    <nav className="space-y-3 mt-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={toggleSidebar}
          className="flex items-center space-x-3 p-2 rounded hover:bg-green-200 transition-colors"
        >
          {item.icon}
          <span className="text-base">{item.label}</span>
        </Link>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;