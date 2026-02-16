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
import Close from '@mui/icons-material/Close';

// Domain Specific Icons
import Code from '@mui/icons-material/Code'; // For Dev
import Storage from '@mui/icons-material/Storage'; // For Infra/Cloud
import Psychology from '@mui/icons-material/Psychology'; // For AI/Consulting

// --- DATA CONFIGURATION ---

const SERVICE_PACKAGES = [
  {
    id: 1,
    name: "Development & Design",
    price: "From KSH 30,000",
    description: "For businesses needing custom software, websites, or mobile apps.",
    features: [
      "Custom Web & App Development",
      "UI/UX Design & Prototyping",
      "Software Testing & QA",
      "API Development",
      "Legacy Modernization",
      "Responsive Interfaces"
    ],
    mostPopular: false,
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
    icon: <Code fontSize="inherit" />
  },
  {
    id: 2,
    name: "Infrastructure & Cloud",
    price: "Custom Quote",
    description: "Reliable systems, database management, and hardware supply.",
    features: [
      "System Administration",
      "Cloud Management (AWS/Azure)",
      "Database Design (SQL/NoSQL)",
      "Network Security Setup",
      "IT Equipment Supply",
      "DevOps Automation"
    ],
    mostPopular: true,
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#f9f6f2]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
    icon: <Storage fontSize="inherit" />
  },
  {
    id: 3,
    name: "Strategy & Intelligence",
    price: "Consultation",
    description: "Advanced solutions utilizing AI and strategic IT audits.",
    features: [
      "AI & Machine Learning Integration",
      "IT Consultancy & Audits",
      "Digital Transformation Strategy",
      "Predictive Analytics",
      "Chatbot Implementation",
      "Architecture Design"
    ],
    mostPopular: false,
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#dfeae7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
    icon: <Psychology fontSize="inherit" />
  }
];

const SERVICE_OPTIONS = [
  "Web/App Development",
  "UI/UX Design",
  "System Administration",
  "Cloud Management",
  "Database Design",
  "AI Integration",
  "IT Consultancy",
  "IT Equipment Supply",
  "Software Testing"
];

const WHY_CHOOSE_US = [
  {
    icon: <Handshake className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Holistic Approach",
    description: "From hardware supply to AI code, we handle your entire tech stack."
  },
  {
    icon: <Lightbulb className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Tailored Solutions",
    description: "We don't just sell templates; we engineer systems for your specific needs."
  },
  {
    icon: <Check className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Transparent Pricing",
    description: "Clear cost breakdowns for hardware, cloud usage, and development hours."
  },
  {
    icon: <RocketLaunch className="text-gray-600" sx={{ fontSize: '2.25rem' }} />,
    title: "Scalable Tech",
    description: "Solutions designed to grow from startup to enterprise level."
  }
];

const FAQ_DATA = [
  {
    q: "Do you supply hardware as well as software?",
    a: "Yes. Our IT Equipment Supply service sources enterprise-grade laptops, servers, and networking gear."
  },
  {
    q: "How do you charge for Cloud Management?",
    a: "We offer both setup fees for architecture design and monthly management retainers for ongoing optimization."
  },
  {
    q: "Can you modernize our existing legacy software?",
    a: "Absolutely. We specialize in refactoring legacy systems and migrating them to modern cloud infrastructures."
  },
  {
    q: "What is included in AI Integration?",
    a: "Everything from simple customer service chatbots to complex predictive analytics models tailored to your data."
  }
];

// --- ANIMATION VARIANTS ---

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
  hidden: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3, ease: "easeIn" } },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9], staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- SUB-COMPONENTS ---

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
      } rounded-[50px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 transition-all duration-500 shadow-xl`}
    >
      {/* Icon/Image Container */}
      <div
        className={`relative w-60 h-60 md:w-80 md:h-80 rounded-full ${
          darkMode ? pkg.imgBgDark : pkg.imgBgLight
        } shadow-2xl mb-8 md:mb-0 ${
          index % 2 === 0 ? "md:mr-12" : "md:ml-12"
        } transition-all duration-500 shrink-0`}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
          <div className={`text-6xl md:text-7xl ${darkMode ? "text-white" : "text-black"}`}>
            {pkg.icon}
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className={`flex-1 max-w-xl text-center md:text-left ${
          index % 2 !== 0 ? "md:order-first md:text-right" : ""
        }`}
        variants={staggerItem}
      >
        <h3 className={`text-2xl md:text-3xl font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {pkg.name}
        </h3>
        <p className={`text-sm mb-4 ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
          {pkg.description}
        </p>
        <div className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {pkg.price}
        </div>
        
        <ul className={`space-y-3 mb-8 inline-block text-left ${darkMode ? "text-white/80" : "text-gray-700"}`}>
          {pkg.features.map((feature, i) => (
            <motion.li key={i} className="flex items-start" variants={staggerItem}>
              <span className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 shrink-0 ${darkMode ? "bg-yellow-400" : "bg-yellow-500"}`}></span>
              {feature}
            </motion.li>
          ))}
        </ul>

        <div className={`flex ${index % 2 !== 0 ? "md:justify-end" : "md:justify-start"} justify-center`}>
            <motion.button
            onClick={() => setShowModal(pkg.name)} // Pass package name to pre-fill
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            Get Started
            </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});

// --- MAIN COMPONENT ---

const PricingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // Can be boolean or string (package name)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "", // Changed from 'plan' to 'service'
    message: ""
  });
  const [message, setMessage] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const formRef = useRef();

  // Handle modal open with optional pre-selected package
  const handleOpenModal = (preSelectedService = "") => {
    if (typeof preSelectedService === 'string' && preSelectedService) {
        setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
    setShowModal(true);
  };

  const backgroundPattern = useMemo(() => (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-5"></div>
    </div>
  ), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      console.error("EMAILJS FAILED...", error);
      setMessage("Error sending message. Please try again.");
    }
  }, []);

  return (
    <section
      className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {backgroundPattern}

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        
        {/* Top Controls */}
        <div className="flex justify-end mb-6">
          <motion.button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </motion.button>
        </div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          <motion.h1
            variants={fadeInUp}
            className={`text-4xl md:text-6xl font-bold tracking-tighter mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Solutions for
            <span className="block text-[#6e6e73] bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Every Stage of Growth
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            From enterprise hardware supply to AI-driven software, we provide the full spectrum of digital and infrastructure services.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenModal()}
              className="px-7 py-3 bg-black rounded-full text-[#6F8FA6] font-semibold shadow-lg hover:shadow-blue-500/30 transition-all w-full sm:w-auto"
            >
              Request Consultation
            </motion.button>
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
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {SERVICE_PACKAGES.map((pkg, index) => (
            <ServiceCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              darkMode={darkMode}
              setShowModal={handleOpenModal}
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
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Why Partner With Us
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
                <div className={`flex justify-center mb-4 ${darkMode ? "text-white" : "text-gray-600"}`}>
                  {React.cloneElement(point.icon, { className: 'text-inherit' })}
                </div>
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
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              FAQs
            </span>
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
                >
                  <h3 className="text-lg font-medium">{faq.q}</h3>
                  <div className={`transition-transform ${activeFAQ === index ? 'rotate-180' : ''}`}>
                    <ExpandMore className={darkMode ? "text-cyan-400" : "text-blue-500"} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
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
          >
            Have a specific requirement?
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto mb-8 text-gray-500 dark:text-gray-400"
          >
            Whether it's custom APIs, server procurement, or user research.
          </motion.p>
          <motion.button
            onClick={() => handleOpenModal()}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 active:scale-95 text-lg"
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
            >
              <button
                onClick={() => setShowModal(false)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
              >
                <Close className="text-xl" />
              </button>

              <div className="overflow-y-auto flex-1 p-6">
                <motion.h2
                  className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  variants={staggerItem}
                >
                  Request a Quote
                </motion.h2>

                <form ref={formRef} onSubmit={sendEmail}>
                  <motion.div
                    className="space-y-4"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Name */}
                    <motion.div variants={staggerItem}>
                      <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:ring-2 focus:ring-opacity-50 outline-none transition-colors`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={staggerItem}>
                      <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:ring-2 focus:ring-opacity-50 outline-none transition-colors`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={staggerItem}>
                      <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:ring-2 focus:ring-opacity-50 outline-none transition-colors`}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </motion.div>

                    {/* Service Selection - New Feature */}
                    <motion.div variants={staggerItem}>
                      <label htmlFor="service" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Service Interest</label>
                      <div className="relative">
                        <select
                          name="service"
                          id="service"
                          required
                          className={`w-full px-4 py-2 rounded-lg border appearance-none ${darkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:ring-2 focus:ring-opacity-50 outline-none transition-colors`}
                          value={formData.service}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Select a service...</option>
                          <option value="General Inquiry">General Inquiry</option>
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                          {/* Fallback if a specific package name was passed via props/state that isn't in the list */}
                          {!SERVICE_OPTIONS.includes(formData.service) && formData.service && formData.service !== "General Inquiry" && (
                             <option value={formData.service}>{formData.service}</option>
                          )}
                        </select>
                         <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ExpandMore className={darkMode ? "text-gray-400" : "text-gray-500"} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={staggerItem}>
                      <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Project Details</label>
                      <textarea
                        name="message"
                        id="message"
                        rows="3"
                        required
                        className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-cyan-400' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'} focus:ring-2 focus:ring-opacity-50 outline-none transition-colors resize-none`}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                      ></textarea>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      variants={staggerItem}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg shadow-lg transform transition-all"
                    >
                      Send Request
                    </motion.button>

                    {/* Status Message */}
                    {message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-center text-sm mt-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
                      >
                        {message}
                      </motion.p>
                    )}
                  </motion.div>
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