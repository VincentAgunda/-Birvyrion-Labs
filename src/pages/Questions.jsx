import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";

const easing = [0.16, 1, 0.3, 1];

const FAQ_DATA = [
  {
    q: "Do you provide end-to-end system architecture and infrastructure setup?",
    a: "Yes. We design, deploy, and manage complete system architectures including server configuration, database design, cloud infrastructure, security hardening, and performance optimization to ensure scalability and reliability."
  },
  {
    q: "Can you migrate our existing systems to the cloud?",
    a: "Absolutely. We handle full cloud migration strategies including architecture redesign, AWS/Azure/GCP implementation, cost optimization, security compliance, and post-migration performance tuning."
  },
  {
    q: "How do you ensure software quality and system reliability?",
    a: "We implement structured QA processes including unit testing, integration testing, automated pipelines, load testing, and vulnerability assessments to guarantee stable and secure deployments."
  },
  {
    q: "Do you offer ongoing system monitoring and maintenance?",
    a: "Yes. We provide continuous monitoring, patch management, performance tracking, incident management, and long-term technical support to keep your systems operating at peak performance."
  },
  {
    q: "Can you integrate AI or automation into our business processes?",
    a: "Yes. We develop custom AI models, predictive analytics systems, chatbots, and intelligent automation workflows tailored to enhance operational efficiency and decision-making."
  },
  {
    q: "Do you offer strategic IT consultancy and digital transformation guidance?",
    a: "We provide expert advisory services including technology audits, stack selection, DevOps implementation, architecture design, and digital transformation roadmaps aligned with your business goals."
  }
];

const FAQItem = ({ item, index, isActive, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: easing }}
      className="border-b border-black/5"
    >
      <button
        onClick={() => onClick(index)}
        className="w-full text-left py-6 flex justify-between items-center group"
      >
        <h3 className="text-lg md:text-xl font-medium text-gray-900 tracking-tight pr-6">
          {item.q}
        </h3>

        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.35, ease: easing }}
          className="text-gray-400 group-hover:text-black transition-colors"
        >
          <ExpandMore fontSize="medium" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easing }}
            className="pb-6 pr-10"
          >
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Questions = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = useCallback((index) => {
    setActiveFAQ(prev => (prev === index ? null : index));
  }, []);

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Frequently
            </span>{" "}
            Asked Questions
          </h2>

          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Clear answers about our engineering methodology, infrastructure
            strategy, and digital transformation expertise.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-2">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isActive={activeFAQ === index}
              onClick={toggleFAQ}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;
