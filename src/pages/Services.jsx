import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AdminPanelSettings, Storage, BugReport, Engineering, CloudDone, DashboardCustomize, ColorLens,
  AccountTree, Terminal, StayCurrentPortrait, BrandingWatermark, Insights, Psychology, Lightbulb,
  Close, WbSunny, ModeNight
} from "@mui/icons-material";

// Service data
const services = [
  {
    icon: <AdminPanelSettings />,
    title: "System Administration and Engineering",
    desc: "Professional system administration and engineering services to ensure your infrastructure runs smoothly and securely.",
    details: [
      "Server setup and maintenance",
      "Network configuration and security",
      "System monitoring and optimization",
      "Disaster recovery planning",
      "Performance tuning"
    ],
    bgDark: "bg-[#5A7F6B]",
    bgLight: "bg-[#E0E9F7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <Storage />,
    title: "Database Design",
    desc: "Custom database solutions tailored to your business needs with optimal performance and scalability.",
    details: [
      "Relational database design",
      "NoSQL database implementation",
      "Data modeling and optimization",
      "Database migration services",
      "Performance tuning and indexing"
    ],
    bgDark: "bg-[#5D5179]",
    bgLight: "bg-[#EDEAF2]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <BugReport />,
    title: "Software Testing",
    desc: "Comprehensive testing services to ensure your software is reliable, secure, and performs as expected.",
    details: [
      "Unit and integration testing",
      "Automated testing solutions",
      "Performance and load testing",
      "Security vulnerability testing",
      "QA process implementation"
    ],
    bgDark: "bg-[#8C5E58]",
    bgLight: "bg-[#F5EAE8]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <Engineering />,
    title: "Software and System Maintenance",
    desc: "Ongoing support and maintenance services to keep your systems running at peak performance.",
    details: [
      "Software updates and patches",
      "Bug fixes and troubleshooting",
      "Performance monitoring",
      "Technical support",
      "Documentation updates"
    ],
    bgDark: "bg-[#4D7C8A]",
    bgLight: "bg-[#E4F0F3]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <CloudDone />,
    title: "Cloud Management",
    desc: "Expert cloud solutions to help you migrate, optimize, and manage your cloud infrastructure.",
    details: [
      "Cloud architecture design",
      "AWS/Azure/GCP implementation",
      "Cost optimization strategies",
      "Security and compliance",
      "DevOps automation"
    ],
    bgDark: "bg-[#5A7F6B]",
    bgLight: "bg-[#E0ECF1]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <DashboardCustomize />,
    title: "UI/UX Design",
    desc: "User-centered design solutions that create intuitive and engaging digital experiences.",
    details: [
      "User research and testing",
      "Wireframing and prototyping",
      "Interaction design",
      "Usability evaluation",
      "Design system creation"
    ],
    bgDark: "bg-[#7D6B8D]",
    bgLight: "bg-[#F1EDF5]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <ColorLens />,
    title: "Graphic Design",
    desc: "Creative visual solutions that communicate your brand message effectively.",
    details: [
      "Print and digital media design",
      "Illustration and iconography",
      "Typography and layout",
      "Photo editing and manipulation",
      "Visual content creation"
    ],
    bgDark: "bg-[#9D6B53]",
    bgLight: "bg-[#F7EFEA]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <AccountTree />,
    title: "System Management",
    desc: "Comprehensive system management services to optimize your IT infrastructure.",
    details: [
      "IT infrastructure management",
      "Configuration management",
      "Patch management",
      "System health monitoring",
      "Incident management"
    ],
    bgDark: "bg-[#4A6FA5]",
    bgLight: "bg-[#E8F3EC]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <Terminal />,
    title: "Web Development",
    desc: "Cutting-edge web solutions with responsive design, performance optimization, and seamless UX.",
    details: [
      "Custom website development",
      "E-commerce solutions",
      "CMS integration (WordPress, Shopify)",
      "API development & integration",
      "Performance optimization"
    ],
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <StayCurrentPortrait />,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications with intuitive interfaces and robust functionality.",
    details: [
      "iOS and Android app development",
      "React Native cross-platform apps",
      "UI/UX mobile design",
      "App store optimization",
      "Push notification systems"
    ],
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#f9f6f2]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <BrandingWatermark />,
    title: "Brand Design",
    desc: "Cohesive visual identities that communicate your brand's essence across all touchpoints.",
    details: [
      "Logo design & branding",
      "Visual identity systems",
      "Marketing collateral",
      "Packaging design",
      "Brand guidelines"
    ],
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#dfeae7]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <Insights />,
    title: "Digital Strategy",
    desc: "Data-driven marketing strategies to amplify your reach and engagement across digital channels.",
    details: [
      "Social media strategy",
      "Content marketing plans",
      "SEO optimization",
      "Email marketing campaigns",
      "Analytics & reporting"
    ],
    bgDark: "bg-[#22344C]",
    bgLight: "bg-[#e0e5ea]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
  {
    icon: <Psychology />,
    title: "AI Integration",
    desc: "Intelligent automation and machine learning solutions to enhance your business processes and decision-making.",
    details: [
      "Custom AI solutions",
      "Machine learning models",
      "Chatbot development",
      "Predictive analytics",
      "Process automation"
    ],
    bgDark: "bg-[#6D466B]",
    bgLight: "bg-[#f0e6ef]",
    imgBgDark: "bg-gray-900",
    imgBgLight: "bg-white",
  },
  {
    icon: <Lightbulb />,
    title: "IT Consultancy",
    desc: "Expert guidance on technology stack selection, architecture design, and digital transformation strategies.",
    details: [
      "Technology audits",
      "System architecture design",
      "Cloud migration strategy",
      "DevOps implementation",
      "Team training & mentoring"
    ],
    bgDark: "bg-[#3A5A40]",
    bgLight: "bg-[#e6efe7]",
    imgBgDark: "bg-gray-800",
    imgBgLight: "bg-white",
  },
];

// Animation variants for modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.05 }
  }
};

// Service card
const ServiceSection = ({ service, index, darkMode, openServiceDetailsModal }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`relative overflow-hidden ${
      darkMode ? service.bgDark : service.bgLight
    } rounded-[50px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-20 will-change-transform`}
  >
    <div
      className={`relative w-60 h-60 md:w-80 md:h-80 rounded-full ${
        darkMode ? service.imgBgDark : service.imgBgLight
      } shadow-xl mb-8 md:mb-0 ${
        index % 2 === 0 ? "md:mr-12" : "md:ml-12"
      } flex items-center justify-center`}
    >
      <div className={`text-5xl md:text-6xl ${darkMode ? "text-white" : "text-black"}`}>
        {React.cloneElement(service.icon, { style: { fontSize: "inherit" } })}
      </div>
    </div>
    <div
      className={`flex-1 max-w-xl text-center md:text-left ${
        index % 2 !== 0 ? "md:order-first md:text-right" : ""
      }`}
    >
      <h3 className={`text-2xl md:text-3xl font-normal mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
        {service.title}
      </h3>
      <p className={`text-base md:text-lg mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
        {service.desc}
      </p>
      <button
        onClick={() => openServiceDetailsModal(service)}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        Show me more
      </button>
    </div>
  </motion.div>
);

const ServicesPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openServiceDetailsModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeServiceDetailsModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-500`}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; backface-visibility: hidden; }
      `}</style>

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-sm transition-all"
          >
            {darkMode ? <WbSunny /> : <ModeNight />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-medium text-center mb-24 tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Services
          </span>
        </motion.h2>

        <div className="space-y-24">
          {services.map((service, index) => (
            <ServiceSection
              key={index}
              service={service}
              index={index}
              darkMode={darkMode}
              openServiceDetailsModal={openServiceDetailsModal}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
            onClick={closeServiceDetailsModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`relative max-w-2xl w-full rounded-2xl shadow-2xl flex flex-col max-h-[90vh] ${
                darkMode ? "bg-gray-900" : "bg-white"
              } p-8 overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeServiceDetailsModal}
                className={`absolute top-3 right-3 z-20 p-2 rounded-full ${
                  darkMode
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 hover:bg-black/10"
                }`}
              >
                <Close style={{ fontSize: 24 }} />
              </button>

              <h2
                className={`text-2xl md:text-3xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {selectedService.title}
              </h2>
              <p className={`${darkMode ? "text-white/80" : "text-gray-700"} mb-6`}>
                {selectedService.desc}
              </p>

              <ul className="space-y-3">
                {selectedService.details.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start text-base ${
                      darkMode ? "text-white/90" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full mt-2 mr-3 ${
                        darkMode ? "bg-yellow-400" : "bg-yellow-500"
                      }`}
                    ></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesPage;
