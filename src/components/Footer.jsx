import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaChevronRight,
} from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    const templateParams = {
      user_email: email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Email sending error:", error);
      setMessage("Subscription failed. Please try again.");
    }
  };

  const navigationItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Pricing', link: '/pricing' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 font-sf">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">
Birvyrion Labs</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We create digital experiences that transform brands and grow businesses.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group text-sm"
                  >
                    <FaChevronRight className="mr-2 text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-indigo-400 text-sm" />
                <div>
                  <p className="text-sm text-gray-400">+254 (792)-823-182</p>
                  <p className="text-xs text-gray-500">Mon-Sun, 7am-6pm</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-indigo-400 text-sm" />
                <div>
                  {/* <p className="text-sm text-gray-400">nexturetechdigital@gmail.com</p> */}
                  {/* <p className="text-xs text-gray-500">Email us anytime</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400">
              Subscribe to get updates on our latest projects and offers.
            </p>
            <form onSubmit={sendEmail} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700 text-sm placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              {message && (
                <p className={`text-xs ${message.includes('success') ? 'text-green-400' : 'text-indigo-400'}`}>
                  {message}
                </p>
              )}
            </form>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: <FaFacebookF />, label: "Facebook", link: "#" },
                { icon: <FaTwitter />, label: "Twitter", link: "#" },
                { icon: <FaLinkedinIn />, label: "LinkedIn", link: "#" },
                { icon: <FaInstagram />, label: "Instagram", link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                  aria-label={social.label}
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer" // Recommended for security with target="_blank"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BVL Labs. All rights reserved.
            <span className="mx-2">|</span>
            <a href="/privacy-policy" className="hover:text-indigo-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/terms-of-service" className="hover:text-indigo-400 transition-colors duration-200">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;