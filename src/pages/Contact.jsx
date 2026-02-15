import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import emailjs from "@emailjs/browser";

const easing = [0.22, 1, 0.36, 1]; // Apple-style cubic bezier

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("Contact");
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const formRef = useRef(null);
  const sectionRef = useRef(null);

  /* ---------------------------------- */
  /* Responsive Detection */
  /* ---------------------------------- */

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------------------------- */
  /* Scroll 3D Effect */
  /* ---------------------------------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  /* ---------------------------------- */
  /* Validation */
  /* ---------------------------------- */

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.message.trim())
      newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ---------------------------------- */
  /* Email Send */
  /* ---------------------------------- */

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  /* ---------------------------------- */
  /* Open Modal Variants */
  /* ---------------------------------- */

  const openContact = () => {
    setInquiryType("Contact");
    setOpen(true);
  };

  const openPartner = () => {
    setInquiryType("Partnership");
    setOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative max-w-7xl mx-auto my-32 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.12)]"
      style={{ perspective: 1200 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-orange-500"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Content Card */}
      <motion.div
        style={
          isMobile
            ? {}
            : {
                scale,
                rotateX,
                y,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
        }
        className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-10 py-28 bg-white/60 backdrop-blur-xl rounded-3xl"
      >
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
            Let’s build something extraordinary.
          </h2>

          <p className="text-lg text-gray-700 mb-10">
            Architect scalable, secure and beautifully engineered digital
            systems.
          </p>

          {/* BUTTON STACK */}
          <div className="flex flex-col items-start gap-4">
            {/* Primary Button */}
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: easing }}
              onClick={openContact}
              className="
                bg-black text-white
                px-8 py-3
                rounded-full
                font-medium
                shadow-lg
                w-80
              "
            >
              Contact Us
            </motion.button>

            {/* Smaller Secondary Button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: easing }}
              onClick={openPartner}
              className="
                text-black
                border border-black/20
                bg-white/70 backdrop-blur-md
                px-5 py-2
                rounded-full
                text-sm font-medium
                w-40
              "
            >
              Partner With Us
            </motion.button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/calltoaction.png"
            alt="Contact"
            className="w-80 h-80 object-contain drop-shadow-2xl"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* ---------------------------------- */}
      {/* MODAL */}
      {/* ---------------------------------- */}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: easing }}
              className="bg-white rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-8 w-full max-w-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                {inquiryType === "Partnership"
                  ? "Partnership Inquiry"
                  : "Send a Message"}
              </h3>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                <input
                  type="hidden"
                  name="inquiry_type"
                  value={inquiryType}
                />

                {["name", "email", "phone"].map((field) => (
                  <div key={field}>
                    <input
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      onChange={handleChange}
                      className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none ${
                        errors[field]
                          ? "border-red-400 focus:ring-2 focus:ring-red-400"
                          : "border-gray-200 focus:ring-2 focus:ring-black/80"
                      }`}
                    />
                    {errors[field] && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder={
                      inquiryType === "Partnership"
                        ? "Tell us about your company and collaboration idea"
                        : "Message"
                    }
                    onChange={handleChange}
                    className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none ${
                      errors.message
                        ? "border-red-400 focus:ring-2 focus:ring-red-400"
                        : "border-gray-200 focus:ring-2 focus:ring-black/80"
                    }`}
                  />
                </div>

                {status === "success" && (
                  <p className="text-green-600 text-sm">
                    Message sent successfully.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-500 text-sm">
                    Failed to send. Try again.
                  </p>
                )}

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600"
                  >
                    Cancel
                  </button>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2, ease: easing }}
                    type="submit"
                    disabled={status === "sending"}
                    className="px-6 py-2 rounded-lg bg-black text-white font-medium disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
