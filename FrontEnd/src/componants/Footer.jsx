import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaVimeoV, FaLinkedinIn, FaXing } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-[#585B61] text-white">
    <div className="container mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src="jobify-icon.png" alt="Jobify Logo" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-bold tracking-widest text-white text-lg">JOBIFY</p>
            <p className="text-xs tracking-widest text-gray-300">CLASSIC</p>
          </div>
        </div>
        <p className="text-sm text-gray-300">
          Job Searching Just Got Easy.<br />
          Use Jobify to run a hiring site<br />
          and earn money in the process!
        </p>
      </div>

      {/* Site Map */}
      <div>
        <h3 className="font-bold text-lg mb-2">Site Map</h3>
        <ul className="text-sm space-y-1 text-gray-300">
          {[
            { label: "Home",          to: "/" },
            { label: "Our Services",  to: "/services" },
            { label: "Enquiry",       to: "/enquiry" },
            { label: "Image Gallery", to: "/imagegallery" },
            { label: "Register",      to: "/register" },
            { label: "View Jobs",     to: "/viewjob" },
            { label: "Login",         to: "/login" },
          ].map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="hover:text-green-500">{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* News */}
      <div>
        <h3 className="font-bold text-lg mb-2">Recent News Articles</h3>
        <ul className="text-sm space-y-3 text-gray-300">
          <li>The Best Canadian Merchant Account Providers</li>
          <li>Do you have a job the average person doesn't know exists?</li>
          <li>DigitalOcean launches first Canadian data centre in Toronto</li>
          <li>Outsourcing vs. In-House Digital Marketing for Small Business</li>
          <li>Canada adds 12,500 jobs in modest July rebound</li>
        </ul>
      </div>

      {/* Office */}
      <div>
        <h3 className="font-bold text-lg mb-2">Jobify Offices</h3>
        <p className="text-sm text-gray-300 mb-4">
          Jobify Inc. 555 Madison Avenue,<br />
          Suite F-2 Manhattan,<br />
          New York 10282
        </p>
        <p className="text-sm text-gray-300">
          Jobify Inc Canada. 545 Yonge St,<br />
          Suite 11 Toronto, Ontario M4K 6F4
        </p>
      </div>
    </div>

    {/* Newsletter */}
    <div className="border-t border-gray-600 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold">Subscribe to our Newsletter</h3>
          <p className="text-sm text-gray-300">Get weekly job updates and tips straight to your inbox.</p>
        </div>
        <form className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered text-black bg-white w-full sm:w-72"
            required
          />
          <button type="submit" className="btn bg-lime-500 hover:bg-lime-600 text-[#585B61] font-bold">
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-lime-500 text-[#585B61] py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
      <p className="font-semibold">© 2025 — ALL RIGHTS RESERVED</p>
      <div className="flex gap-3 text-white text-lg mt-2 md:mt-0">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF className="hover:text-[#4267B2]" /></a>
        <a href="https://x.com"            target="_blank" rel="noopener noreferrer"><FaTwitter   className="hover:text-[#1DA1F2]" /></a>
        <a href="https://instagram.com"    target="_blank" rel="noopener noreferrer"><FaInstagram className="hover:text-[#C13584]" /></a>
        <a href="https://pinterest.com"    target="_blank" rel="noopener noreferrer"><FaPinterestP className="hover:text-[#E60023]" /></a>
        <a href="https://vimeo.com"        target="_blank" rel="noopener noreferrer"><FaVimeoV    className="hover:text-[#1AB7EA]" /></a>
        <a href="https://linkedin.com"     target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="hover:text-[#0077B5]" /></a>
        <a href="https://xing.com"         target="_blank" rel="noopener noreferrer"><FaXing      className="hover:text-[#026466]" /></a>
      </div>
    </div>
  </footer>
);

export default Footer;