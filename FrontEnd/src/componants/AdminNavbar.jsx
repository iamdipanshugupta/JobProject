import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { clearAuthData } from "../../utils/auth.js";

const AdminNavbar = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative z-10">
      <button onClick={toggleSidebar} className="md:hidden text-gray-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="text-xl font-bold text-gray-700 ml-4 md:ml-0">Admin Dashboard</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          {menuOpen ? <FaTimes className="w-6 h-6 text-red-600" /> : <FaUserCircle className="w-6 h-6" />}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminNavbar;