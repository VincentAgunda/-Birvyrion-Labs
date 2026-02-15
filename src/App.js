import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: -30
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Component for the subtle loading indicator (keeping as is from your code)
const RouteTransitionIndicator = () => (
  <div className="route-transition-indicator" />
);

function App() {
  const location = useLocation();

  return (
    // MODIFICATION HERE: Added a subtle background color to the main app container.
    // This color will show during the brief moment between page transitions.
    <div className="app bg-gray-50 dark:bg-black min-h-screen"> 
      <ScrollToTop />
      <Header />

      <AnimatePresence mode="wait">
        <RouteTransitionIndicator key={`indicator-${location.pathname}`} />

        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/services"
            element={
              <motion.div
                key="services"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Services />
              </motion.div>
            }
          />
          <Route
            path="/pricing"
            element={
              <motion.div
                key="pricing"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Pricing />
              </motion.div>
            }
          />
          <Route
            path="/blogs"
            element={
              <motion.div
                key="blogs"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Blogs />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />

      <style jsx global>{`
        @keyframes fadePulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .route-transition-indicator {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          animation: fadePulse 1.2s ease-in-out infinite;
          z-index: 1000;
          pointer-events: none;
        }

        .page-content {
          min-height: calc(100vh - 120px);
        }
      `}</style>
    </div>
  );
}

export default App;