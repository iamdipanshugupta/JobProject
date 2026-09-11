import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaSearch, FaBriefcase, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import Testimonials from "../componants/Testimonials.jsx";
import API_BASE_URL from "../config/api.js";

const categories = [
  { icon: "🖥️", title: "IT & Software" },
  { icon: "🎨", title: "Design" },
  { icon: "📈", title: "Marketing" },
  { icon: "💼", title: "Business" },
  { icon: "🛠️", title: "Engineering" },
  { icon: "📚", title: "Education" },
];

const Home = () => {
  const navigate = useNavigate();

  // Hero search state
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  // Real jobs pulled from the backend — no more fake placeholder listings
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`);
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    navigate(`/viewjob?${params.toString()}`);
  };

  const featuredJobs = jobs.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <motion.div
        className="relative bg-cover bg-center min-h-screen flex items-center"
        style={{ backgroundImage: "url('widget-search-background.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-5xl w-full mx-auto px-4 text-center py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            The Easiest Way to Get Your New Job
          </h1>
          <p className="text-gray-200 mb-8 text-lg md:text-xl">
            Find jobs, track applications, and land your next opportunity — all in one place.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto"
          >
            <div className="flex items-center flex-1 gap-2 border border-gray-200 rounded-lg px-3">
              <FaSearch className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title or keyword"
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-gray-600 focus:outline-none md:w-48"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.title} value={c.title}>{c.title}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-700 transition whitespace-nowrap"
            >
              Search Jobs
            </button>
          </form>
        </div>
      </motion.div>

      {/* Companies strip */}
      <motion.div
        className="bg-white py-12"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl w-full mx-auto px-4">
          <p className="text-gray-400 text-sm uppercase tracking-widest text-center mb-8">
            Trusted by job seekers across India
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`testimonial-company-${i}.png`}
                alt="Partner logo"
                className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Jobify — job-seeker focused */}
      <motion.div
        className="bg-green-600 py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your career search, simplified</h2>
          <p className="text-green-50 text-lg mb-12 max-w-2xl mx-auto">
            Everything you need to find, apply to, and land your next job — without the chaos of spreadsheets and forgotten follow-ups.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 rounded-xl p-6">
              <FaSearch className="text-2xl mb-3" />
              <h3 className="font-bold text-lg mb-2">Search smarter</h3>
              <p className="text-green-50 text-sm">Filter by role, location, and category to find jobs that actually fit.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <FaBriefcase className="text-2xl mb-3" />
              <h3 className="font-bold text-lg mb-2">Apply in one click</h3>
              <p className="text-green-50 text-sm">Upload your resume once, apply to as many roles as you like.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <FaMoneyBillWave className="text-2xl mb-3" />
              <h3 className="font-bold text-lg mb-2">Track every application</h3>
              <p className="text-green-50 text-sm">See exactly where you stand — applied, shortlisted, or selected.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Jobs — real data from the backend */}
      <motion.div
        className="bg-white py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl text-center text-gray-800 font-bold mb-2">Latest Openings</h2>
        <p className="text-center text-gray-500 mb-10">Freshly posted roles, updated in real time</p>

        <div className="space-y-4 max-w-5xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-400 py-10">Loading jobs…</p>
          ) : featuredJobs.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              <FaBriefcase className="text-4xl mx-auto mb-3" />
              <p>No jobs posted yet — check back soon!</p>
            </div>
          ) : (
            featuredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-5 border border-gray-100 rounded-xl bg-white hover:shadow-md hover:border-green-200 transition"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <FaBuilding />
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{job.title}</h4>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-green-600" /> {job.location}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1.5">
                      <FaMoneyBillWave className="text-green-600" /> {job.salary}
                    </span>
                  )}
                  <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full capitalize">{job.jobType}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/viewjob"
            className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            View All Jobs
          </Link>
        </div>
      </motion.div>

      {/* Stats — real numbers only */}
      <motion.div
        className="bg-gray-50 py-16 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-gray-800 text-3xl font-bold">Jobify by the numbers</h2>
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center divide-y md:divide-y-0 md:divide-x divide-gray-300 max-w-3xl mx-auto">
          <div className="w-full md:w-1/2 text-center py-6 md:py-0">
            <h3 className="text-4xl font-bold text-green-600">{loading ? "…" : jobs.length}</h3>
            <p className="text-gray-500 mt-2">Live Job Openings</p>
          </div>
          <div className="w-full md:w-1/2 text-center py-6 md:py-0">
            <h3 className="text-4xl font-bold text-green-600">{categories.length}</h3>
            <p className="text-gray-500 mt-2">Categories to Explore</p>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-10">Top Job Categories</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              onClick={() => navigate(`/viewjob?category=${encodeURIComponent(cat.title)}`)}
              className="w-40 h-40 bg-gray-50 shadow-sm rounded-xl flex flex-col items-center justify-center text-center p-4 hover:shadow-md hover:bg-green-50 cursor-pointer transition"
              whileHover={{ scale: 1.05 }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="text-4xl">{cat.icon}</div>
              <p className="mt-3 font-semibold text-gray-700">{cat.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Join CTA */}
      <motion.div
        className="relative bg-fixed bg-cover bg-center py-24 px-4 text-center"
        style={{ backgroundImage: "url('hero-image-text-left-darker.jpg')" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to find your next role?
          </h2>
          <p className="text-gray-200 mb-8 text-lg">
            Create your free profile in minutes and start applying today.
          </p>
          <Link
            to="/register"
            className="inline-block bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Get Started — It's Free
          </Link>
        </div>
      </motion.div>

      <Testimonials />

      {/* FAQ / Contact */}
      <div className="w-full bg-gray-100 py-16 px-4">
        <div className="py-10 px-6 md:px-10 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Got a question?</h3>
          <p className="text-gray-600 text-base md:text-lg">
            We're here to help. Send us an{" "}
            <Link to="/enquiry" className="text-green-600 font-medium underline hover:text-green-700">
              enquiry
            </Link>{" "}
            and we'll get back to you shortly.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;