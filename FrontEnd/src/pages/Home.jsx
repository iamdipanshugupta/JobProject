import Testimonials from "../componants/Testimonials.jsx";
import { motion } from "framer-motion";
const featuredJobs = [
  { logo: "company-logo-sspace-150x150-1-150x150.jpg",   title: "UX Designer",            company: "CodePen",          location: "Bangalore, Karnataka" },
  { logo: "company-logo-disqus-150x150-1-150x150.jpg",   title: "Web Designer / Developer", company: "Disney",          location: "Mumbai, Maharashtra" },
  { logo: "listing-codepen-logo-150x150.jpg",            title: "Graphic Designer",         company: "Creative Studio", location: "Pune, Maharashtra" },
  { logo: "company-logo-pinterest-300x300-1-150x150.jpg", title: "Senior Designer",         company: "Docker",          location: "Hyderabad, Telangana" },
  { logo: "company-logo-fitbit-300x300-1-150x150.jpg",   title: "Design Technologist",     company: "Fitbit",          location: "Gurgaon, Haryana" },
  { logo: "company-logo-paypal-300x300-1-150x150.jpg",   title: "Front-End Engineer",      company: "PayPal",          location: "Chennai, Tamil Nadu" },
];

const categories = [
  { icon: "🖥️", title: "IT & Software" }, { icon: "🎨", title: "Design" },
  { icon: "📈", title: "Marketing" },     { icon: "💼", title: "Business" },
  { icon: "🛠️", title: "Engineering" },  { icon: "📚", title: "Education" },
];

const Home = () => (
  <>
    {/* Hero */}
    <motion.div
      className="relative bg-cover bg-center min-h-screen text-center py-16 px-4"
      style={{ backgroundImage: "url('widget-search-background.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative z-20 p-8 rounded-lg max-w-6xl w-full mx-auto mt-20">
        <h1 className="text-3xl md:text-5xl text-gray-700 mb-4">The Easiest Way to Get Your New Job</h1>
        <p className="text-gray-600 mb-8 text-lg md:text-xl">Find jobs, create trackable resumes and enrich your applications.</p>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
          <input type="text" placeholder="Keywords" className="p-3 border border-gray-300 rounded w-full md:w-64 focus:outline-none placeholder-gray-600 text-gray-600" />
          <input type="text" placeholder="Location" className="p-3 border border-gray-300 rounded w-full md:w-64 focus:outline-none placeholder-gray-600 text-gray-600" />
          <select className="p-3 border border-gray-300 rounded w-full md:w-64 text-gray-600 focus:outline-none">
            <option value="">Choose a category...</option>
            <option value="it">IT</option>
            <option value="marketing">Marketing</option>
            <option value="design">Design</option>
          </select>
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-[#5bbc2e] text-white font-semibold px-6 py-3 rounded hover:bg-[#4ca923] transition">
            SEARCH JOBS
          </button>
        </div>
      </div>
    </motion.div>

    {/* Companies */}
    <motion.div className="bg-white py-12" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="relative z-20 p-4 sm:p-8 rounded-lg max-w-6xl w-full mx-auto">
        <h2 className="text-3xl md:text-4xl text-gray-600 mb-4 text-center">Companies We've Helped</h2>
        <p className="text-gray-600 mb-8 text-lg text-center">Some of the companies we've helped recruit excellent applicants over the years.</p>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <img key={i} src={`testimonial-company-${i}.png`} alt={`Company ${i}`} className="h-16 md:h-20 object-contain" />
          ))}
        </div>
      </div>
    </motion.div>

    {/* Recruiting Advantage */}
    <motion.div
      className="relative bg-fixed bg-cover bg-center h-[70vh] text-center px-4 py-16"
      style={{ backgroundImage: "url('hero-image-text-right-darker.jpg')" }}
      initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
    >
      <div className="flex justify-end px-4 py-16">
        <div className="max-w-2xl text-left">
          <h2 className="text-3xl md:text-4xl text-white mb-4">Make Recruiting Your Competitive Advantage</h2>
          <p className="text-white mb-8 text-lg">Talent is a top priority for all startup founders. Jobify offers a way to completely optimize your recruiting process.</p>
          <button className="bg-white text-gray-600 font-semibold px-6 py-3 rounded hover:bg-transparent hover:text-white hover:border-2 transition">
            Get Started
          </button>
        </div>
      </div>
    </motion.div>

    {/* Featured Jobs */}
    <motion.div className="bg-white py-12 px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h2 className="text-4xl text-center text-gray-600 mb-10">Hundreds of Jobs From All Over India</h2>
      <div className="space-y-4 max-w-7xl mx-auto">
        {featuredJobs.map((job, index) => (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-t last:border-b bg-white hover:bg-gray-50 hover:border-l-4 hover:border-[#5bbc2e] transition"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <img src={job.logo} alt="Company logo" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-semibold text-gray-800">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700 text-sm gap-1">
              <svg className="w-4 h-4 text-[#5bbc2e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 3.05a7 7 0 119.9 9.9l-4.95 4.95-4.95-4.95a7 7 0 010-9.9zm4.95 1.414a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd" />
              </svg>
              <span>{job.location}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a href="/viewjob" className="px-6 py-2 bg-[#5bbc2e] text-white font-semibold rounded hover:bg-[#4ca923] transition">
          Load More Listings
        </a>
      </div>
    </motion.div>

    {/* Join Section */}
    <motion.div className="relative bg-fixed bg-cover bg-center h-[70vh] text-center px-4 pt-32" style={{ backgroundImage: "url('hero-image-text-left-darker.jpg')" }}>
      <div className="max-w-2xl text-start pl-16">
        <h2 className="text-4xl font-semibold text-white mb-6">Join Thousands of Companies That Rely on Jobify</h2>
        <p className="text-white mb-8 text-lg">Jobify offers a way to completely optimize your entire recruiting process.</p>
        <button className="bg-white text-gray-700 font-bold px-6 py-3 rounded hover:bg-transparent hover:text-white hover:border hover:border-white transition">
          GET STARTED
        </button>
      </div>
    </motion.div>

    {/* Stats */}
    <motion.div className="bg-white py-20 px-4">
      <h2 className="text-center text-gray-700 text-4xl font-semibold">Jobify Site Stats</h2>
      <p className="text-center text-gray-500 text-lg mt-4 max-w-3xl mx-auto">Here we list our site stats and how many people we've helped find a job.</p>
      <div className="mt-12 flex flex-col md:flex-row justify-center items-center divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {[{ label: "Jobs Posted", value: 14 }, { label: "Jobs Filled", value: 0 }, { label: "Companies", value: 14 }, { label: "Members", value: 2482 }].map((stat, i) => (
          <div key={i} className="w-full md:w-1/4 text-center py-6 md:py-0">
            <h3 className="text-3xl font-bold text-gray-600">{stat.value}</h3>
            <p className="text-gray-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Categories */}
    <motion.div className="py-16 bg-gray-50" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2 className="text-3xl text-center font-bold text-gray-700 mb-10">Top Job Categories</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="w-40 h-40 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-center p-4 hover:shadow-xl transition"
            whileHover={{ scale: 1.1 }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="text-4xl">{cat.icon}</div>
            <p className="mt-3 font-semibold text-gray-600">{cat.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>

    <Testimonials />

    {/* FAQ */}
    <div className="w-full bg-gray-100 py-16 px-4">
      <div className="py-10 px-6 md:px-10 text-center max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Got a question?</h3>
        <p className="text-gray-600 text-base md:text-lg mb-6">
          We're here to help. Check out our{" "}
          <a href="/faqs" className="text-blue-600 underline hover:text-blue-800">FAQs</a>,
          send us an <a href="/enquiry" className="text-blue-600 underline hover:text-blue-800">enquiry</a>,
          or call us at <a href="tel:18005555555" className="text-blue-600 underline hover:text-blue-800">1 800 555 5555</a>.
        </p>
      </div>
    </div>
  </>
);

export default Home;