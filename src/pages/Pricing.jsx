import React, { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

// Import Material-UI Icons
import Check from '@mui/icons-material/Check';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Handshake from '@mui/icons-material/Handshake';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import Lightbulb from '@mui/icons-material/Lightbulb';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import LaptopChromebook from '@mui/icons-material/LaptopChromebook';
import PhoneIphone from '@mui/icons-material/PhoneIphone';
import Brush from '@mui/icons-material/Brush';
import Close from '@mui/icons-material/Close';


// Static data moved outside component to prevent recreation on re-render
const SERVICE_PACKAGES = [
  {
    id: 1,
    name: "Starter Plan",
    features: [
      "Custom Design (Basic)",
      "Up to 5 Pages",
      "Responsive Design",
      "Basic SEO Setup",
      "Domain Hosting",
      "Contact Form Integration"
    ],
    mostPopular: false,
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    name: "E-commerce Website",
    features: [
      "Online Store Functionality",
      "Product Listings (Up to 50)",
      "Payment Gateway Integration",
      "Shopping Cart & Checkout",
      "Domain Hosting",
      "Order Management Dashboard"
    ],
    mostPopular: true,
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#f9f6f2]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
    color: "from-purple-500 to-indigo-400"
  },
  {
    id: 3,
    name: "Custom Solution",
    price: 'Quote',
    features: [
      "Tailored Design & Development",
      "Unlimited Pages",
      "Advanced Features",
      "API Development",
      "Dedicated Account Manager"
    ],
    mostPopular: false,
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#dfeae7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
    color: "from-pink-500 to-purple-400"
  }
];

// Updated with Material-UI Icons
const WHY_CHOOSE_US = [
  {
    icon: <Handshake className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Payment Upon Completion",
    description: "You only pay the final balance once you're satisfied"
  },
  {
    icon: <Lightbulb className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Free Consultation",
    description: "Get expert insights tailored to your business"
  },
  {
    icon: <Check className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Transparent Pricing",
    description: "Clear, upfront costs with no hidden fees"
  },
  {
    icon: <RocketLaunch className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Fast Delivery",
    description: "High-quality websites delivered efficiently"
  }
];

const FAQ_DATA = [
  {
    q: "What's the timeline for building a website?",
    a: "Basic websites take 2-4 weeks, e-commerce or custom solutions may take longer."
  },
  {
    q: "What's included in the quoted price?",
    a: "Design, development, basic SEO, responsiveness, and agreed features."
  },
  {
    q: "How does payment work?",
    a: "Initial deposit to begin, balance due after you're satisfied."
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes, optional ongoing maintenance packages available."
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.1
    }
  }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3, ease: "easeIn" }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Memoized components to prevent unnecessary re-renders
const ServiceCard = React.memo(({ pkg, index, darkMode, setShowModal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`relative overflow-hidden ${
        darkMode ? pkg.bgDark : pkg.bgLight
      } rounded-[50px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 transition-all duration-500`}
    >
      <div
        className={`relative w-60 h-60 md:w-80 md:h-80 rounded-full ${
          darkMode ? pkg.imgBgDark : pkg.imgBgLight
        } shadow-2xl mb-8 md:mb-0 ${
          index % 2 === 0 ? "md:mr-12" : "md:ml-12"
        } transition-all duration-500`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          {/* Material-UI Icons with inherited font size */}
          <div className={`text-5xl md:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
            {pkg.id === 1 ? <LaptopChromebook fontSize="inherit" /> : pkg.id === 2 ? <PhoneIphone fontSize="inherit" /> : <Brush fontSize="inherit" />}
          </div>
        </div>
      </div>
      <motion.div
        className={`flex-1 max-w-xl text-center md:text-left ${
          index % 2 !== 0 ? "md:order-first md:text-right" : ""
        }`}
        variants={staggerItem}
      >
        <h3 className={`text-2xl md:text-3xl font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {pkg.name}
        </h3>
        <div className={`text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {typeof pkg.price === 'number' ? `KSH ${pkg.price.toLocaleString()}` : pkg.price}
        </div>
        <ul className={`space-y-3 mb-8 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
          {pkg.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-start"
              variants={staggerItem}
            >
              <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${darkMode ? "bg-yellow-400" : "bg-yellow-500"}`}></span>
              {feature}
            </motion.li>
          ))}
        </ul>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Get started with ${pkg.name}`}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
});

const PricingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    message: ""
  });
  const [message, setMessage] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const formRef = useRef();

  // Memoize the background SVG to prevent recreation on re-render
  const backgroundPattern = useMemo(() => (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-5"></div>
    </div>
  ), []);

  // Unified handler for all form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Memoized email sending function
  const sendEmail = useCallback(async (e) => {
    e.preventDefault();
    setMessage("Sending message...");

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", plan: "", message: "" });
    } catch (error) {
      console.error("EMAILJS FAILED...", error);
      setMessage("Error sending message. Please try again.");
    }
  }, []); // Empty dependency array ensures the function is created only once

  return (
    <section
      className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {backgroundPattern}

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <motion.button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {/* Material-UI Theme Icons */}
            {darkMode ? <LightMode /> : <DarkMode />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </motion.button>
        </div>

        {/* Hero Section - Optimized Spacing */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto" // Reduced bottom margin
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-6xl font-bold tracking-tighter mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Launch Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Digital Presence
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`text-lg md:text-xl max-w-xl mx-auto mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We build stunning, high-performance websites—from sleek portfolios to
            powerful e-commerce stores.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all w-full sm:w-auto"
              aria-label="Request free consultation"
            >
              Request a Free Consultation
            </motion.button>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Starting from <strong className={darkMode ? "text-white/90" : "text-black/90"}>KSH 30,000</strong>
            </p>
          </motion.div>
        </motion.div>

        {/* Service Packages */}
        <motion.div
          className="space-y-24 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {SERVICE_PACKAGES.map((pkg, index) => (
            <ServiceCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              darkMode={darkMode}
              setShowModal={setShowModal}
            />
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-medium text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"}`}
            variants={fadeInUp}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Why Choose Us
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {WHY_CHOOSE_US.map((point, index) => (
              <motion.div
                key={index}
                className={`rounded-[10px] p-8 ${darkMode ? "bg-gray-900/50" : "bg-gray-100"} border ${darkMode ? "border-gray-800" : "border-gray-200"}`}
                variants={staggerItem}
                whileHover={{ y: -5 }}
              >
                <div className={`flex justify-center mb-4 ${darkMode ? "text-white" : "text-gray-600"}`}>{React.cloneElement(point.icon, { className: 'text-inherit' })}</div>
                <h3 className={`text-xl font-medium text-center mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {point.title}
                </h3>
                <p className={`text-center ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-medium text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"}`}
            variants={fadeInUp}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              FAQs
            </span>
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"} pb-4`}
                variants={staggerItem}
              >
                <button
                  className={`flex justify-between items-center w-full text-left py-4 ${darkMode ? "text-white" : "text-gray-900"}`}
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  aria-expanded={activeFAQ === index}
                  aria-controls={`faq-${index}`}
                >
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <div className={`transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}>
                    {/* Material-UI Chevron Icon */}
                    <ExpandMore className={darkMode ? "text-cyan-400" : "text-blue-500"} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      id={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className={`pb-4 ${darkMode ? "text-white/80" : "text-gray-700"}`}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={`rounded-[50px] p-12 text-center ${darkMode ? "bg-gray-900/50" : "bg-gray-100"} border ${darkMode ? "border-gray-800" : "border-gray-200"}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-medium mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
            variants={fadeInUp}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto mb-8 text-gray-500 dark:text-gray-400"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Contact us today to discuss your project requirements
          </motion.p>
          <motion.button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 active:scale-95 text-lg"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get a free quote"
          >
            Get a Free Quote
          </motion.button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`relative w-full max-w-md max-h-[90vh] rounded-3xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl flex flex-col`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                onClick={() => setShowModal(false)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
                aria-label="Close modal"
              >
                {/* Material-UI Close Icon */}
                <Close className="text-xl" />
              </button>

              <div className="overflow-y-auto flex-1 p-6">
                <motion.h2
                  id="modal-title"
                  className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  variants={staggerItem}
                >
                  Get a Free Quote
                </motion.h2>

                <form ref={formRef} onSubmit={sendEmail}>
                  <motion.div
                    className="space-y-4"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={staggerItem}>
                      <label htmlFor="name" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Your Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                        required
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <label htmlFor="email" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Email Address</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                        required
                      />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <label htmlFor="phone" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                      />
                    </motion.div>

                    <motion.div variants={staggerItem} className="relative">
                      <label htmlFor="plan" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Interested Service</label>
                      <select
                        id="plan"
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        className={`w-full rounded-lg px-4 py-3 pr-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition appearance-none`}
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="Basic Website">Basic Plan</option>
                        <option value="E-commerce Website">E-commerce Website</option>
                        <option value="Custom Solution">Custom Solution</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none top-7">
                        {/* Material-UI Chevron Icon for select */}
                        <ExpandMore className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <label htmlFor="message" className={`block text-sm mb-1 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>Project Details</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 outline-none transition`}
                        required
                      ></textarea>
                    </motion.div>
                  </motion.div>

                  {message && (
                    <motion.div
                      className={`mt-4 p-3 rounded-lg text-center ${message.includes("successfully") ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      {message}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {message.includes("Sending") ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingPage;