import { motion } from "framer-motion";

const testimonials = [
  { name: "Ravi Sharma",   feedback: "Thanks to this platform, I found my dream job in just 2 weeks!",              photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Anjali Verma",  feedback: "The registration was quick, and the support team was very helpful.",           photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Suresh Patel",  feedback: "This job portal is the most user-friendly I've ever used!",                   photo: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Priya Mehra",   feedback: "I got multiple interview calls within days of registering!",                   photo: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Vikas Yadav",   feedback: "The resume upload feature and UI are top-notch.",                              photo: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Sneha Kapoor",  feedback: "Excellent experience overall. Found a job within a week.",                     photo: "https://randomuser.me/api/portraits/women/55.jpg" },
];

const Testimonials = () => (
  <motion.div
    className="bg-white py-16 px-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">Success Stories</h2>
    <motion.div
      className="flex overflow-x-auto space-x-6 px-2 scroll-smooth snap-x"
      drag="x"
      dragConstraints={{ left: -500, right: 0 }}
      whileTap={{ cursor: "grabbing" }}
      style={{ cursor: "grab" }}
    >
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          className="bg-gray-50 shadow-md rounded-lg p-6 min-w-[280px] md:min-w-[320px] text-center flex-shrink-0 snap-start"
          whileHover={{ scale: 1.05 }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <img src={t.photo} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 italic mb-3">"{t.feedback}"</p>
          <h4 className="font-semibold text-gray-800">{t.name}</h4>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default Testimonials;