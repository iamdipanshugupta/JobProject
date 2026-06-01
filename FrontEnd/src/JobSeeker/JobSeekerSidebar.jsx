import { Link } from "react-router-dom";
import { FaTachometerAlt, FaSearch, FaBriefcase, FaCommentDots, FaExclamationCircle, FaClipboardCheck } from "react-icons/fa";

const navItems = [
  { icon: <FaTachometerAlt />, label: "Dashboard",   path: "/jobseeker/dashboard" },
  { icon: <FaSearch />,        label: "Search Jobs", path: "/jobseeker/search-job" },
  { icon: <FaBriefcase />,     label: "Apply For Job", path: "/jobseeker/apply-job" },
  { icon: <FaCommentDots />,   label: "Feedback",    path: "/jobseeker/feedback" },
  { icon: <FaExclamationCircle />, label: "Complain", path: "/jobseeker/complain" },
  { icon: <FaClipboardCheck />, label: "View Results", path: "/jobseeker/results" },
];

const JobSeekerSidebar = ({ sidebarOpen, toggleSidebar }) => (
  <div
    className={`fixed top-0 left-0 h-full w-64 bg-green-600 text-white transform
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      transition-transform duration-300 ease-in-out z-50 shadow-md
      md:translate-x-0 md:static md:h-auto`}
  >
    {/* Mobile close button */}
    <div className="flex justify-end p-4 md:hidden">
      <button onClick={toggleSidebar}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Jobs @ Mail</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="flex items-center space-x-3 w-full text-left hover:bg-green-700 px-3 py-2 rounded"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default JobSeekerSidebar;