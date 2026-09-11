import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const categories = [
  "IT & Software",
  "Government",
  "Banking & Finance",
  "Healthcare",
  "Marketing & Sales",
  "Education",
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! You'll get job updates in your inbox.");
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & about */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="jobify-icon.png" alt="Jobify Logo" className="h-10 w-10 object-contain" />
            <div>
              <p className="font-bold tracking-widest text-white text-lg">JOBIFY</p>
              <p className="text-xs tracking-widest text-green-400">CLASSIC</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Job searching just got easy. Discover openings, apply in a click,
            and track every application in one place.
          </p>
          <div className="flex gap-3 mt-5 text-white">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-600 transition">
              <FaFacebookF size={14} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-600 transition">
              <FaTwitter size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-600 transition">
              <FaInstagram size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-600 transition">
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Site Map */}
        <div>
          <h3 className="font-bold text-base mb-4 text-white">Quick Links</h3>
          <ul className="text-sm space-y-2.5 text-gray-400">
            {[
              { label: "Home", to: "/" },
              { label: "Our Services", to: "/services" },
              { label: "Enquiry", to: "/enquiry" },
              { label: "Image Gallery", to: "/imagegallery" },
              { label: "Register", to: "/register" },
              { label: "View Jobs", to: "/viewjob" },
              { label: "Login", to: "/login" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-green-400 transition">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="font-bold text-base mb-4 text-white">Popular Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/viewjob"
                className="text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-full hover:bg-green-600 hover:text-white transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-base mb-4 text-white">Get in Touch</h3>
          <ul className="text-sm space-y-3 text-gray-400">
            <li className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-green-400 mt-1 flex-shrink-0" />
              <span>555 Madison Avenue, Suite F-2, Manhattan, New York 10282</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhoneAlt className="text-green-400 flex-shrink-0" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-green-400 flex-shrink-0" />
              <span>support@jobify.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white">Subscribe to our Newsletter</h3>
            <p className="text-sm text-gray-400">Get weekly job updates and tips straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-4 py-2.5 rounded-lg text-gray-900 bg-white w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/40 text-gray-400 py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-center">
        <p>© {new Date().getFullYear()} Jobify. All rights reserved.</p>
        <p>Made with care for job seekers everywhere.</p>
      </div>
    </footer>
  );
};

export default Footer;