import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

function ImageGallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    { url: "modenoffice.jpg", caption: "Modern Office Space" },
    { url: "Amazing-Team.jpg", caption: "Our Amazing Team" },
    { url: "creative-workspace.jpg", caption: "Creative Workspaces" },
    { url: "collervative.jpg", caption: "Collaborative Environment" },
    { url: "techinical.jpg", caption: "Tech-Driven Setup" },
    { url: "meeting.jpg", caption: "Interactive Meetings" },
  ];

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white py-20 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Image Gallery</h2>
      <p className="text-center text-gray-600 mb-12">Explore our team, spaces, and culture in action.</p>

      {/* Image Grid */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group cursor-pointer relative"
            onClick={() => setSelectedImg(img)}
          >
            <div className="overflow-hidden rounded-xl shadow hover:shadow-lg transition">
              <img
                src={img.url}
                alt={img.caption}
                loading="lazy"
                className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold transition">
                {img.caption}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700 text-center">{img.caption}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-10 right-0 text-white text-2xl hover:text-green-400 transition"
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <img
                src={selectedImg.url}
                alt={selectedImg.caption}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-center text-white mt-4 text-sm">{selectedImg.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ImageGallery;