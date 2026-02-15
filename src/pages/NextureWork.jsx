import React, { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"

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

const PortfolioModal = ({ item, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

    <motion.div
      initial={{ scale: 0.96, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.96, y: 20 }}
      transition={{ duration: 0.35, ease: easing }}
      className="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.18)]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
      >
        <X size={18} />
      </button>

      <div
        className="h-64 w-full flex items-end justify-center"
        style={{ backgroundColor: item.bg }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full object-contain object-bottom"
        />
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-500 mb-1">{item.category}</p>
        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </motion.div>
  </motion.div>
)

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

    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const card = el.querySelector("[data-snap]")
          if (!card) return

          const cardWidth = card.offsetWidth
          const gap = 24
          const index = Math.round(el.scrollLeft / (cardWidth + gap))
          setActive(index)
          ticking = false
        })
        ticking = true
      }
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="py-28 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20 tracking-tight">
          Selected Work.
        </h2>

        <div className="relative">
          <div
            ref={carouselRef}
            className="overflow-x-auto scrollbar-none snap-x snap-mandatory grid auto-cols-[minmax(280px,1fr)] md:auto-cols-[minmax(360px,1fr)] grid-flow-col gap-6"
          >
            {portfolio.map((item, i) => (
              <motion.div
                key={item.id}
                data-snap
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, ease: easing }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="snap-center relative rounded-2xl overflow-hidden h-[440px] group cursor-pointer will-change-transform"
                style={{ backgroundColor: item.bg }}
                onClick={() => setSelectedItem(item)}
              >
                <div className={`p-6 relative z-10 ${item.text}`}>
                  <p className="text-sm mb-1 opacity-80">
                    {item.category}
                  </p>
                  <h3 className="text-2xl font-semibold">
                    {item.title}
                  </h3>
                </div>

                <motion.div
                  className="absolute inset-x-0 bottom-0 h-4/5 pointer-events-none"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: easing }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-contain object-bottom"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItem(item)
                  }}
                  className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    item.button === "dark"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <Plus size={18} strokeWidth={3} />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-12">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
              onClick={handlePrev}
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex space-x-3">
              {portfolio.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === active
                      ? "w-6 bg-black"
                      : "w-2.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
              onClick={handleNext}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
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
