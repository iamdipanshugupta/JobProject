import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          {/* Make sure this logo is placed in /public/classic-logo-new.svg */}
          <img 
            src="jobify-icon.png" 
            alt="Logo" 
            className="h-12 w-12 object-contain"
          />
          <div>
            <div className="font-semibold text-gray-800 text-lg leading-tight">JOBIFY</div>
            <span className="text-xs text-gray-500 tracking-widest">Find Your Dream Job</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium text-sm">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/services" className="hover:text-green-600">Our Services</Link>
          <Link to="/enquiry" className="hover:text-green-600">Enquiry</Link>
          <Link to="/imagegallery" className="hover:text-green-600">Image Gallery</Link>
          <Link to="/register" className="hover:text-green-600">Register</Link>
          <Link to="/viewjob" className="hover:text-green-600">View Job</Link>
        </div>

        {/* Login Button */}
        <div> 
          <Link
            to="/login"
            className="border border-gray-400 text-gray-700 px-4 py-1 rounded hover:border-green-500 hover:text-green-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
