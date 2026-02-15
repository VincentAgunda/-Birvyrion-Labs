import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup
} from "framer-motion";
import emailjs from "@emailjs/browser";
import { Close } from "@mui/icons-material";

import Comprehensive from "./Comprehensive";
import NextureWork from "./NextureWork";
import Questions from "./Questions";
import Contact from "./Contact";

/* -------------------------------------------------- */
/* CONFIG */
/* -------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1]; // Apple-style cubic bezier
const SPRING = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 0.8
};

const FONT_STYLE = {
  fontFamily:
    "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
  fontWeight: 400
};

/* -------------------------------------------------- */
/* MOBILE MOCKUP */
/* -------------------------------------------------- */

const MobileMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: EASE }}
    className="relative will-change-transform"
  >
    <div
      className="
        relative mx-auto w-full max-w-[260px]
        aspect-[9/19]
        bg-white
        rounded-[28px] sm:rounded-[30px] md:rounded-[34px]
        overflow-hidden
        border-[8px] border-white
        shadow-[0_30px_80px_rgba(0,0,0,0.12)]
        transform-gpu
      "
    >
      <img
        src="camera1.webp"
        alt="App interface"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    {/* Soft Glow */}
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
  </motion.div>
);

/* -------------------------------------------------- */
/* HOME */
/* -------------------------------------------------- */

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef();

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const sendEmail = useCallback(async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setMessage("Success. We'll contact you shortly.");
      e.target.reset();
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }, []);

  return (
    <LayoutGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="min-h-screen bg-white text-gray-900 overflow-x-hidden"
        style={FONT_STYLE}
      >
        {/* -------------------------------------------------- */}
        {/* HERO */}
        {/* -------------------------------------------------- */}

        <section className="relative py-24 md:py-32 px-6 md:px-16 lg:px-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="camera1.webp"
              alt="Background"
              className="w-full h-full object-cover scale-105 transform-gpu"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold leading-[1.05] tracking-tighter text-[#1d1d1f] mb-6">
                Birvyrion Labs.
                <br />
                <span className="text-[#6e6e73]">
                  Engineering Future.
                </span>
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed font-normal text-[#2A2A2A] max-w-lg mx-auto lg:mx-0 mb-10 tracking-tight">
                We architect scalable infrastructure, intelligent automation,
                and secure digital systems designed for performance,
                longevity, and growth.
              </p>

              {/* FLIP BUTTON → MODAL MORPH */}
              <motion.button
                layoutId="modal-container"
                transition={SPRING}
                onClick={handleOpenModal}
                whileTap={{ scale: 0.96 }}
                className="
                  relative px-8 py-4
                  rounded-md
                  bg-black text-[#6F8FA6]
                  font-large
                  shadow-xl
                  transform-gpu
                "
              >
                Schedule a Consultation
              </motion.button>
            </motion.div>

            <MobileMockup />
          </div>
        </section>

        <Comprehensive onOpenModal={handleOpenModal} />
        <NextureWork />
        <Questions />
        <Contact />

        {/* -------------------------------------------------- */}
        {/* MODAL */}
        {/* -------------------------------------------------- */}

        <AnimatePresence>
          {showModal && (
            <>
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xl"
                onClick={() => setShowModal(false)}
              />

              {/* MORPHING CONTAINER */}
              <motion.div
                layoutId="modal-container"
                transition={SPRING}
                className="
                  fixed z-50
                  inset-6 sm:inset-12 md:inset-20
                  bg-white
                  rounded-[28px] sm:rounded-[32px] md:rounded-[36px]
                  shadow-[0_60px_140px_rgba(0,0,0,0.2)]
                  p-8 md:p-12
                  overflow-auto
                  transform-gpu
                "
              >
                {/* CLOSE */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <Close />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                >
                  <h2 className="text-3xl font-semibold mb-8 tracking-tight">
                    Get a Free Quote
                  </h2>

                  <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="space-y-6 max-w-xl"
                  >
                    {["name", "email", "phone"].map((field) => (
                      <input
                        key={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        className="
                          w-full px-5 py-4
                          rounded-2xl
                          border border-black/10
                          focus:ring-2 focus:ring-black/20
                          outline-none
                          transition
                          transform-gpu
                        "
                        required={field !== "phone"}
                      />
                    ))}

                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Project Details"
                      className="
                        w-full px-5 py-4
                        rounded-2xl
                        border border-black/10
                        focus:ring-2 focus:ring-black/20
                        outline-none
                        transition
                        transform-gpu
                      "
                      required
                    />

                    {message && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-600"
                      >
                        {message}
                      </motion.div>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="
                        w-full py-4
                        rounded-full
                        bg-black text-white
                        font-medium
                        shadow-lg
                        transform-gpu
                      "
                    >
                      {message === "Sending..."
                        ? "Sending..."
                        : "Send Message"}
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

export default Home;
