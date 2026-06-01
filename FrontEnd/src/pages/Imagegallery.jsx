import { useState } from 'react';
function ImageGallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    { url: 'modenoffice.jpg', caption: 'Modern Office Space' },
    { url: 'Amazing-Team.jpg', caption: 'Our Amazing Team' },
    { url: 'creative-workspace.jpg', caption: 'Creative Workspaces' },
    { url: 'collervative.jpg', caption: 'Collaborative Environment' },
    { url: 'techinical.jpg', caption: 'Tech-Driven Setup' },
    { url: 'meeting.jpg', caption: 'Interactive Meetings' },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <>
    <div className="bg-white py-16 px-4">
      <br></br>
      <br></br>
      <br></br>
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Image Gallery</h2>
      <p className="text-center text-gray-600 mb-12">Explore our team, spaces, and culture in action.</p>

      {/* Image Grid with Framer Motion */}
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
            onClick={() => setSelectedImg(img.url)}
          >
            <div className="overflow-hidden rounded-xl shadow hover:shadow-lg transition">
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold transition">
                {img.caption}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700 text-center">{img.caption}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full px-4">
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold"
            >
              ×
            </button>
            <img
              src={selectedImg}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-xl border"
            />
          </div>
        </div>
      )}
     
    </div>
    </>
  );
}

export default ImageGallery;
