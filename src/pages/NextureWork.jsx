  import React, { useRef, useState, useEffect, useCallback } from "react"
  import { motion, AnimatePresence } from "framer-motion"
  import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"

  const spring = {
    type: "spring",
    stiffness: 220,
    damping: 26,
    mass: 0.9,
  }

  const easing = [0.16, 1, 0.3, 1]

  const cardColors = [
    { bg: "#000000", text: "text-white", button: "light" },
    { bg: "#F5F5F7", text: "text-black", button: "dark" },
    { bg: "#979797", text: "text-white", button: "light" },
    { bg: "#FAFAFA", text: "text-black", button: "dark" },
  ]

  const portfolio = [
    {
      id: 1,
      title: "Quantum UI Framework",
      category: "Web Design",
      image: "/website1.png",
      description:
        "Next-gen interface system leveraging quantum computing principles.",
      link: "https://tax-act.vercel.app/",
      ...cardColors[0],
    },
    {
      id: 2,
      title: "Neural Commerce App",
      category: "Mobile App",
      image: "/camera4.webp",
      description:
        "Thought-controlled shopping experience with biometric feedback.",
      link: "https://echelon-ecommerce-platform.onrender.com/",
      ...cardColors[1],
    },
    {
      id: 3,
      title: "Marketing Suite",
      category: "Marketing",
      image: "/website2.png",
      description:
        "Self-optimizing campaign system with predictive analytics.",
      link: "https://echelon-ecommerce-platform.onrender.com/",
      ...cardColors[2],
    },
    {
      id: 4,
      title: "Digital Branding",
      category: "Branding",
      image: "/website1.png",
      description:
        "3D identity system for spatial computing platforms.",
      link: "https://echelon-ecommerce-platform.onrender.com/",
      ...cardColors[3],
    },
  ]

  /* ------------------ Modal ------------------ */

  const PortfolioModal = ({ item, onClose }) => {
    // Lock body scroll (Apple feel)
    useEffect(() => {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }, [])

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-xl"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={spring}
          className="relative z-10 w-full max-w-xl bg-white rounded-[32px] overflow-hidden
                    shadow-[0_40px_120px_rgba(0,0,0,0.25)]
                    will-change-transform transform-gpu"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full 
                      bg-black/5 backdrop-blur-md 
                      flex items-center justify-center
                      hover:bg-black/10 transition"
          >
            <X size={18} />
          </motion.button>

          {/* Image Section */}
          <div
            className="h-[320px] flex items-end justify-center"
            style={{ backgroundColor: item.bg }}
          >
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: easing }}
              src={item.image}
              alt={item.title}
              className="h-full object-contain object-bottom"
            />
          </div>

          {/* Content */}
          <div className="p-10">
            <p className="text-sm text-gray-500 mb-2 tracking-wide">
              {item.category}
            </p>
            <h3 className="text-3xl font-semibold mb-4 tracking-tight">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>

            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm font-medium underline"
            >
              View Project →
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  /* ------------------ Main Component ------------------ */

  const NextureWork = () => {
    const carouselRef = useRef(null)
    const [active, setActive] = useState(0)
    const [selectedItem, setSelectedItem] = useState(null)

    const scrollToIndex = useCallback((index) => {
      const el = carouselRef.current
      if (!el) return
      const card = el.querySelector("[data-snap]")
      if (!card) return

      const cardWidth = card.offsetWidth
      const gap = 24

      el.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      })
    }, [])

    const handlePrev = () =>
      scrollToIndex(Math.max(0, active - 1))

    const handleNext = () =>
      scrollToIndex(Math.min(portfolio.length - 1, active + 1))

    useEffect(() => {
      const el = carouselRef.current
      if (!el) return

      const onScroll = () => {
        const card = el.querySelector("[data-snap]")
        if (!card) return

        const cardWidth = card.offsetWidth
        const gap = 24
        const index = Math.round(el.scrollLeft / (cardWidth + gap))
        setActive(index)
      }

      el.addEventListener("scroll", onScroll, { passive: true })
      return () => el.removeEventListener("scroll", onScroll)
    }, [])

    return (
      <section className="py-32 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-6">

          <h2 className="text-5xl font-semibold text-black text-center mb-24 tracking-tight">
            Selected Work.
          </h2>

          <div className="relative">
            <div
              ref={carouselRef}
              className="overflow-x-auto scrollbar-none snap-x snap-mandatory 
                        grid auto-cols-[minmax(380px,1fr)] 
                        grid-flow-col gap-10"
            >
              {portfolio.map((item, i) => (
                <motion.div
                  key={item.id}
                  data-snap
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: easing }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="snap-center relative rounded-[28px] overflow-hidden 
                            h-[460px] group cursor-pointer 
                            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                            hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                            transition-shadow duration-500
                            will-change-transform transform-gpu"
                  style={{ backgroundColor: item.bg }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className={`p-8 relative z-10 ${item.text}`}>
                    <p className="text-sm opacity-80 mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: easing }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-contain object-bottom"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/5 transition"

                  />

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className={`absolute bottom-8 right-8 w-11 h-11 rounded-full
                      flex items-center justify-center shadow-xl
                      opacity-0 group-hover:opacity-100
                      transition duration-300 ${
                        item.button === "dark"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                  >
                    <Plus size={20} strokeWidth={3} />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mt-14">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white shadow-md
                          flex items-center justify-center
                          hover:shadow-lg transition"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex space-x-3">
                {portfolio.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === active
                        ? "w-7 bg-black"
                        : "w-2.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white shadow-md
                          flex items-center justify-center
                          hover:shadow-lg transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedItem && (
            <PortfolioModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </AnimatePresence>
      </section>
    )
  }

  export default NextureWork
