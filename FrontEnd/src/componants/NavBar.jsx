import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Our Services", to: "/services" },
  { label: "View Job", to: "/viewjob" },
  { label: "Image Gallery", to: "/imagegallery" },
  { label: "Enquiry", to: "/enquiry" },
  { label: "Register", to: "/register" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3" onClick={() => setOpen(false)}>
          <img src="jobify-icon.png" alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
          <div>
            <div className="font-semibold text-gray-800 text-base sm:text-lg leading-tight">JOBIFY</div>
            <span className="text-[10px] sm:text-xs text-gray-500 tracking-widest">Find Your Dream Job</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-8 text-gray-600 font-medium text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-green-600 transition ${
                location.pathname === link.to ? "text-green-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop login button */}
        <div className="hidden lg:block">
          <Link
            to="/login"
            className="border border-gray-400 text-gray-700 px-4 py-1.5 rounded hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gray-700 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-3 bg-white">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`text-gray-700 font-medium py-1 hover:text-green-600 transition ${
                location.pathname === link.to ? "text-green-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="mt-2 text-center border border-gray-300 text-gray-700 py-2 rounded hover:border-green-500 hover:text-green-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;