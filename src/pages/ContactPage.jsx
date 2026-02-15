// Blogs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Blogs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Latest Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Blog Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/600/f0f0f0/808080?Text=Blog+Image+1"
              alt="Blog Post 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">The Future of Digital Marketing in 2025</h2>
              <p className="text-gray-600 text-sm mb-4">
                Explore the emerging trends and innovative strategies that will shape the digital marketing landscape in the coming year.
              </p>
              <Link to="/blog/future-of-digital-marketing" className="text-pink-500 hover:text-pink-700 font-semibold">
                Read More
              </Link>
            </div>
          </div>

          {/* Example Blog Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/600/e0e0e0/707070?Text=Blog+Image+2"
              alt="Blog Post 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Mastering SEO for Increased Organic Traffic</h2>
              <p className="text-gray-600 text-sm mb-4">
                Learn practical tips and techniques to optimize your website for search engines and drive more organic traffic.
              </p>
              <Link to="/blog/mastering-seo" className="text-pink-500 hover:text-pink-700 font-semibold">
                Read More
              </Link>
            </div>
          </div>

          {/* Example Blog Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/600/d0d0d0/606060?Text=Blog+Image+3"
              alt="Blog Post 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">The Power of Social Media Engagement</h2>
              <p className="text-gray-600 text-sm mb-4">
                Discover how building a strong social media presence and engaging with your audience can boost your brand.
              </p>
              <Link to="/blog/social-media-engagement" className="text-pink-500 hover:text-pink-700 font-semibold">
                Read More
              </Link>
            </div>
          </div>

          {/* You can add more blog posts here */}
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;