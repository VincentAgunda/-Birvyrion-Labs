import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AdminPanelSettings,
  Storage,
  BugReport,
  Engineering,
  CloudDone,
  DashboardCustomize,
  ColorLens,
  AccountTree,
  Terminal,
  StayCurrentPortrait,
  BrandingWatermark,
  Insights,
  Psychology,
  Lightbulb,
  Close,
  WbSunny,
  ModeNight,
} from "@mui/icons-material";

/* ================================================= */
/* SERVICES DATA                  */
/* ================================================= */

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
      "Performance tuning",
    ],
    bgDark: "bg-[#5A7F6B]",
    bgLight: "bg-[#E0E9F7]",
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
      "Performance tuning and indexing",
    ],
    bgDark: "bg-[#5D5179]",
    bgLight: "bg-[#EDEAF2]",
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
      "QA process implementation",
    ],
    bgDark: "bg-[#8C5E58]",
    bgLight: "bg-[#F5EAE8]",
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
      "Documentation updates",
    ],
    bgDark: "bg-[#4D7C8A]",
    bgLight: "bg-[#E4F0F3]",
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
      "DevOps automation",
    ],
    bgDark: "bg-[#5A7F6B]",
    bgLight: "bg-[#E0ECF1]",
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
      "Design system creation",
    ],
    bgDark: "bg-[#7D6B8D]",
    bgLight: "bg-[#F1EDF5]",
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
      "Visual content creation",
    ],
    bgDark: "bg-[#9D6B53]",
    bgLight: "bg-[#F7EFEA]",
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
      "Incident management",
    ],
    bgDark: "bg-[#4A6FA5]",
    bgLight: "bg-[#E8F3EC]",
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
      "Performance optimization",
    ],
    bgDark: "bg-[#7B93AA]",
    bgLight: "bg-[#E3EDF7]",
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
      "Push notification systems",
    ],
    bgDark: "bg-[#E7E1DA]",
    bgLight: "bg-[#F9F6F2]",
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
      "Brand guidelines",
    ],
    bgDark: "bg-[#5E7B80]",
    bgLight: "bg-[#DFEAE7]",
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
      "Analytics & reporting",
    ],
    bgDark: "bg-[#22344C]",
    bgLight: "bg-[#E0E5EA]",
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
      "Process automation",
    ],
    bgDark: "bg-[#6D466B]",
    bgLight: "bg-[#F0E6EF]",
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
      "Team training & mentoring",
    ],
    bgDark: "bg-[#3A5A40]",
    bgLight: "bg-[#E6EFE7]",
  },
];

/* ================================================= */
/* ANIMATION SETTINGS                 */
/* ================================================= */

// Card hover & scroll animations
const cardSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

// Apple-like Critically Damped Spring for the Modal
// High stiffness + calculated damping removes wobble while keeping it snappy.
// restDelta/restSpeed forces the animation to snap precisely at the end.
const appleSpring = {
  type: "spring",
  stiffness: 350,
  damping: 32,
  mass: 0.8,
  restDelta: 0.001, 
  restSpeed: 0.001, 
};

// Fluid ease out for fading elements (like backdrops)
const fadeTransition = {
  duration: 0.3,
  ease: [0.32, 0.72, 0, 1], // Apple-like ease-out curve
};

/* ================================================= */
/* SERVICE COMPONENT                  */
/* ================================================= */

const ServiceCard = ({ service, darkMode, openModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={cardSpring}
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden rounded-[48px] px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] ${
        darkMode ? service.bgDark : service.bgLight
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40 pointer-events-none" />

      <motion.div
        whileHover={{ scale: 1.04 }}
        transition={cardSpring}
        className={`w-56 h-56 md:w-72 md:h-72 rounded-full backdrop-blur-xl ${
          darkMode ? "bg-white/10" : "bg-white/70"
        } flex items-center justify-center shadow-2xl`}
      >
        <div className={`text-6xl ${darkMode ? "text-white" : "text-black"}`}>
          {React.cloneElement(service.icon, {
            style: { fontSize: "inherit" },
          })}
        </div>
      </motion.div>

      <div className="flex-1 max-w-xl text-center md:text-left z-10">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
          {service.title}
        </h3>

        <p className="text-lg leading-relaxed opacity-80 mb-8">
          {service.desc}
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={cardSpring}
          onClick={() => openModal(service)}
          className="px-8 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium shadow-lg"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ================================================= */
/* MAIN PAGE                      */
/* ================================================= */

const Services = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section
      className={`${
        darkMode ? "bg-black text-white" : "bg-[#fbfbfd] text-black"
      } min-h-screen transition-colors duration-700`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-32">
        <div className="flex flex-row justify-between items-center mb-20 md:mb-28">
          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={cardSpring}
            className="text-4xl md:text-6xl font-semibold tracking-tight text-[#6e6e73]"
          >
            Services.
          </motion.h1>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md h-fit transition-colors hover:bg-black/10 dark:hover:bg-white/20"
          >
            {darkMode ? <WbSunny fontSize="small" /> : <ModeNight fontSize="small" />}
            <span className="hidden sm:inline font-medium text-sm">
              {darkMode ? "Light" : "Dark"}
            </span>
          </motion.button>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              darkMode={darkMode}
              openModal={setSelectedService}
            />
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              // Apple typically scales up from slightly smaller (0.85) to full size (1)
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={appleSpring}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl rounded-[32px] p-8 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.2)] ${
                darkMode
                  ? "bg-[#1c1c1e]/90 backdrop-blur-3xl text-white border border-white/10"
                  : "bg-white/90 backdrop-blur-3xl text-black border border-black/5"
              }`}
              style={{ willChange: "transform, opacity" }} // Optimization hint for browsers
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-semibold tracking-tight leading-tight pr-4">
                  {selectedService.title}
                </h2>

                <button
                  onClick={() => setSelectedService(null)}
                  className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                    darkMode ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
                  }`}
                >
                  <Close fontSize="small" />
                </button>
              </div>

              <p className="mb-8 text-[1.1rem] leading-relaxed opacity-80">
                {selectedService.desc}
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider opacity-60 mb-2">
                  Key Deliverables
                </h4>
                <ul className="space-y-3">
                  {selectedService.details.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      // Staggered list items make the entrance feel organic
                      transition={{ delay: i * 0.04 + 0.1, ...fadeTransition }}
                      className="flex items-start gap-3 text-[1.05rem]"
                    >
                      <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-current opacity-60 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;