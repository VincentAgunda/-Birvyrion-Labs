import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaChevronLeft, FaBookmark, FaShare } from "react-icons/fa";

// Optimized animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.98,
    transition: { 
      duration: 0.15,
      ease: "easeIn"
    }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Complete blog posts data
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Web Design in 2025",
    date: "April 12, 2025",
    author: "Dr. Elena Voss",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop",
    excerpt: "How neural interfaces and quantum computing are reshaping digital experiences",
    content: `
      <h2 class="text-2xl font-medium mb-4">The New Design Paradigm</h2>
      <p>As we approach 2025, web design is undergoing its most radical transformation since the advent of mobile. The convergence of several emerging technologies is creating entirely new canvas for digital experiences.</p>
      
      <h3 class="text-xl font-medium mt-8 mb-4">Key Developments</h3>
      <ul class="space-y-3 mb-6">
        <li><strong>Neural Interface Design:</strong> With direct brain-computer interfaces becoming commercially viable, designers must now consider thought-driven navigation patterns and neural feedback loops.</li>
        <li><strong>Quantum Layout Systems:</strong> New CSS frameworks leverage quantum computing principles to generate dynamic, context-aware layouts that adapt to users' cognitive states.</li>
        <li><strong>Holographic UI Patterns:</strong> Spatial computing requires entirely new interaction models that account for depth, perspective, and physical space.</li>
      </ul>

      <div class="p-6 rounded-xl border my-8">
        <h4 class="text-lg font-medium mb-3">Case Study: Tesla's Neural Dashboard</h4>
        <p>Tesla's 2025 vehicle interface demonstrates how thought-controlled navigation reduces cognitive load by 47% compared to traditional touchscreens.</p>
      </div>

      <h3 class="text-xl font-medium mt-8 mb-4">Implementation Challenges</h3>
      <p>While exciting, these new paradigms present significant challenges:</p>
      <ol class="list-decimal list-inside space-y-2 mt-3">
        <li>Ethical considerations around neural data privacy</li>
        <li>Cross-platform compatibility in a fragmented spatial computing market</li>
        <li>Accessibility requirements for users without neural implants</li>
      </ol>

      <p class="mt-8">The designers who will thrive in this new era are those who can blend technical understanding with deep empathy for human cognition.</p>
    `,
    tags: ["Design", "Future Tech", "UX"]
  },
  {
    id: 2,
    title: "React 19: The Quantum Component Revolution",
    date: "April 5, 2025",
    author: "Mark Chen",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    excerpt: "How quantum principles are transforming component architecture",
    content: `
      <h2 class="text-2xl font-medium mb-4">Beyond Hooks: The New Frontier</h2>
      <p>React 19 introduces quantum-inspired component models that fundamentally change how we think about state management and rendering.</p>

      <h3 class="text-xl font-medium mt-8 mb-4">Core Features</h3>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="p-4 rounded-lg">
          <h4 class="font-medium mb-2">Superposition States</h4>
          <p class="text-sm">Components can now exist in multiple states simultaneously until observed by the user.</p>
        </div>
        <div class="p-4 rounded-lg">
          <h4 class="font-medium mb-2">Entanglement Hooks</h4>
          <p class="text-sm">New useEntangle() hook creates instantaneous connections between distant components.</p>
        </div>
      </div>

      <h3 class="text-xl font-medium mt-8 mb-4">Performance Benchmarks</h3>
      <p>Early tests show remarkable improvements:</p>
      <table class="w-full border-collapse mt-4 mb-8">
        <thead>
          <tr class="border-b">
            <th class="text-left py-2">Operation</th>
            <th class="text-right py-2">React 18</th>
            <th class="text-right py-2">React 19</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="py-2">Component Render</td>
            <td class="text-right">4.2ms</td>
            <td class="text-right">0.7ms</td>
          </tr>
          <tr class="border-b">
            <td class="py-2">State Update</td>
            <td class="text-right">3.8ms</td>
            <td class="text-right">0.3ms</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-xl font-medium mt-8 mb-4">Migration Path</h3>
      <p>For teams considering adoption:</p>
      <ul class="space-y-3">
        <li>Start with non-critical components to test quantum behavior</li>
        <li>Use the new Quantum DevTools extension for debugging</li>
        <li>Expect a 2-3 week learning curve for senior developers</li>
      </ul>
    `,
    tags: ["React", "Quantum", "Performance"]
  },
  {
    id: 3,
    title: "Neural Interface Design Patterns",
    date: "March 29, 2025",
    author: "Sarah Nakamura",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop",
    excerpt: "Principles for designing thought-controlled interfaces",
    content: `
      <h2 class="text-2xl font-medium mb-4">The Mind-Computer Continuum</h2>
      <p>Neural interfaces have moved beyond medical applications into mainstream computing, requiring entirely new design patterns.</p>

      <h3 class="text-xl font-medium mt-8 mb-4">Core Principles</h3>
      <div class="space-y-6 mb-8">
        <div>
          <h4 class="font-medium text-lg mb-2">1. Cognitive Load Management</h4>
          <p>Thought-controlled interfaces must account for the "mental weight" of commands. Best practices include:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Implementing neural command queuing</li>
            <li>Providing subconscious feedback loops</li>
            <li>Limiting choice paralysis through progressive disclosure</li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium text-lg mb-2">2. Intent Decoupling</h4>
          <p>Unlike physical interfaces, neural inputs often contain multiple simultaneous intentions. Effective designs:</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Separate primary from secondary neural signals</li>
            <li>Implement probabilistic interaction models</li>
            <li>Provide clear "intention confirmation" states</li>
          </ul>
        </div>
      </div>

      <div class="p-6 rounded-xl border my-8">
        <h4 class="text-lg font-medium mb-3">Real-World Example: Facebook's MindScroll</h4>
        <p>Facebook's neural scrolling implementation reduced accidental activations by 72% through:</p>
        <ul class="list-disc list-inside mt-2 space-y-1">
          <li>Dual-layer intent verification</li>
          <li>Micro-calibration during use</li>
          <li>Context-aware sensitivity adjustment</li>
        </ul>
      </div>

      <h3 class="text-xl font-medium mt-8 mb-4">Ethical Considerations</h3>
      <p>Designers must navigate complex new territory:</p>
      <ul class="space-y-3">
        <li><strong>Privacy:</strong> Neural data is the most personal information imaginable</li>
        <li><strong>Accessibility:</strong> Not all users can or want to use neural interfaces</li>
        <li><strong>Addiction:</strong> The dopamine effects of direct mind-computer interaction</li>
      </ul>

      <p class="mt-8">The next decade will see neural design become its own specialized discipline within UX.</p>
    `,
    tags: ["Neural", "UX", "Ethics"]
  },
  {
    id: 4,
    title: "The Rise of AI-Assisted Development",
    date: "March 15, 2025",
    author: "Alex Rivera",
    image: "camera1.webp",
    excerpt: "How AI pair programmers are changing software development workflows",
    content: `
      <h2 class="text-2xl font-medium mb-4">The New Development Workflow</h2>
      <p>AI-assisted development tools have evolved from simple code completion to full project collaborators.</p>
      
      <h3 class="text-xl font-medium mt-8 mb-4">Key Benefits</h3>
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="p-4 rounded-lg">
          <h4 class="font-medium mb-2">Context-Aware Suggestions</h4>
          <p class="text-sm">AI now understands project-specific patterns and can suggest architecture improvements.</p>
        </div>
        <div class="p-4 rounded-lg">
          <h4 class="font-medium mb-2">Bug Prediction</h4>
          <p class="text-sm">Machine learning models can anticipate potential bugs before code is even run.</p>
        </div>
      </div>

      <h3 class="text-xl font-medium mt-8 mb-4">Developer Experience</h3>
      <p>Surveys show developers report:</p>
      <ul class="space-y-3 mb-6">
        <li>40% reduction in debugging time</li>
        <li>30% faster feature implementation</li>
        <li>Improved code consistency across teams</li>
      </ul>
    `,
    tags: ["AI", "Development", "Productivity"]
  },
  {
    id: 5,
    title: "Sustainable Web Practices for 2025",
    date: "February 28, 2025",
    author: "Jamie Patel",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop",
    excerpt: "Reducing the environmental impact of modern web applications",
    content: `
      <h2 class="text-2xl font-medium mb-4">The Carbon Footprint of Digital</h2>
      <p>With internet usage accounting for 3.7% of global emissions, sustainable web practices are becoming crucial.</p>
      
      <h3 class="text-xl font-medium mt-8 mb-4">Key Strategies</h3>
      <ul class="space-y-3 mb-6">
        <li><strong>Efficient Asset Delivery:</strong> Next-gen compression algorithms reducing payload sizes by 40%</li>
        <li><strong>Green Hosting:</strong> Data centers powered by renewable energy</li>
        <li><strong>Performance Budgets:</strong> Strict limits on page weight and complexity</li>
      </ul>

      <div class="p-6 rounded-xl border my-8">
        <h4 class="text-lg font-medium mb-3">Case Study: Eco-Ecommerce</h4>
        <p>An online retailer reduced their carbon emissions by 62% through optimized images, lazy loading, and renewable hosting.</p>
      </div>
    `,
    tags: ["Sustainability", "Web Dev", "Green Tech"]
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setPosts(BLOG_POSTS);
  }, []);

  // Image preloading
  useEffect(() => {
    const preloadImages = () => {
      BLOG_POSTS.forEach(post => {
        const img = new Image();
        img.src = post.image;
      });
    };
    
    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full text-sm transition-all"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className={`text-4xl md:text-5xl font-medium mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Nexture Insights
            </span>
          </motion.h1>
          <motion.p
            className={`text-xl max-w-2xl mx-auto ${darkMode ? "text-white/80" : "text-gray-700"}`}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Exploring the bleeding edge of digital innovation
          </motion.p>
        </motion.div>

        {/* Blog Posts */}
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="blog-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={staggerItem}
                  className={`rounded-[30px] overflow-hidden ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white border border-gray-200"} transition-all duration-200 hover:shadow-lg flex flex-col`}
                  whileHover={{ y: -3 }}
                  layoutId={`post-${post.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                    <motion.img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span 
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-100 text-blue-600"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className={`text-xl font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                      {post.excerpt}
                    </p>
                    <div className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {post.date}
                    </div>
                  </div>
                  <div className={`px-6 pb-6 pt-2 flex justify-end ${darkMode ? "text-cyan-400" : "text-blue-600"}`}>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.article
              key="blog-detail"
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              layoutId={`post-${selectedPost.id}`}
            >
              <motion.button
                onClick={() => setSelectedPost(null)}
                className={`flex items-center mb-8 ${darkMode ? "text-cyan-400 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaChevronLeft className="mr-2" />
                All Articles
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map(tag => (
                    <span 
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${darkMode ? "bg-gray-800 text-cyan-400" : "bg-gray-100 text-blue-600"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className={`text-3xl md:text-4xl font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {selectedPost.title}
                </h2>
                <p className={`mb-6 ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                  By {selectedPost.author} · {selectedPost.date}
                </p>
              </motion.div>

              <motion.div
                className="aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-200 dark:bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </motion.div>

              <motion.div
                className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <motion.div
                className={`mt-16 pt-8 ${darkMode ? "border-t border-gray-800" : "border-t border-gray-200"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  About the Author
                </h3>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                    {selectedPost.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {selectedPost.author}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-white/80" : "text-gray-700"}`}>
                      Senior Researcher at NeuroTech Labs
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                  >
                    <FaBookmark />
                    Save
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}`}
                  >
                    <FaShare />
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BlogPage;