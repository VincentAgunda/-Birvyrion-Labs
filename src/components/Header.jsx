import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa"; 
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/#services", label: "Services" },
  { path: "/pricing", label: "Pricing" },
];

const Header = React.memo(({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();

  const closeAllMenus = useCallback(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      closeAllMenus();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [closeAllMenus]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    setDropdownOpen(false);
    setSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, []);

  // Custom Click Handler for Hash Links & Home
  const handleNavClick = useCallback((e, path) => {
    if (path === "/") {
      if (location.pathname === "/") {
        e.preventDefault(); // Stop default jump
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
        window.history.pushState(null, '', '/'); // Clean up URL hash visually
      }
    } else if (path.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = path.substring(2);
      const element = document.getElementById(id + "-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, '', path);
      }
    }
    closeAllMenus();
  }, [location.pathname, closeAllMenus]);

  const renderNavLinks = useMemo(() => (
    navLinks.map((link) => {
      const isActive = location.pathname === link.path || 
                       (link.path === '/#services' && location.hash === '#services');
                       
      return (
        <li key={link.path}>
          <Link
            to={link.path}
            className={`relative px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group ${
              isActive ? "font-medium text-gray-900 dark:text-white" : ""
            }`}
            onClick={(e) => handleNavClick(e, link.path)}
          >
            {link.label}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}></span>
          </Link>
        </li>
      );
    })
  ), [handleNavClick, location.pathname, location.hash]);

  const renderMobileMenuLinks = useMemo(() => (
    navLinks.map((link, index) => {
      const isActive = location.pathname === link.path || 
                       (link.path === '/#services' && location.hash === '#services');
                       
      return (
        <motion.li
          key={link.path}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 + 0.1 }}
        >
          <Link
            to={link.path}
            className={`block py-2 px-4 rounded-lg transition-colors text-sm ${
              isActive 
                ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
            }`}
            onClick={(e) => handleNavClick(e, link.path)}
          >
            {link.label}
          </Link>
        </motion.li>
      );
    })
  ), [handleNavClick, location.pathname, location.hash]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('[aria-label="Mobile menu"]')) {
        setMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          !event.target.closest('[aria-label="Search"]')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSearch]);

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrollY > 10 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" 
            : "bg-white dark:bg-gray-900"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              to="/" 
              onClick={(e) => handleNavClick(e, "/")}
              className="text-xl font-bold bg-[#6e6e73] bg-clip-text text-transparent"
            >
              BVL
              {/* Logo Text */}
            </Link>
          </motion.div>

          <ul className="hidden md:flex space-x-6 items-center">
            {renderNavLinks}
          </ul>

          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative"
              ref={searchRef}
              whileHover={{ scale: 1.1 }}
            >
              <button 
                aria-label="Search"
                onClick={toggleSearch}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaSearch className="text-gray-600 dark:text-gray-400" />
              </button>
              
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-2 flex items-center">
                      <FaSearch className="text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
                        autoFocus
                      />
                      <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        ⌘K
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <motion.button
                    aria-label="User menu"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                  </motion.button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
                      >
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
                        </div>
                        {user.email === "admin@loreinedigital.com" && (
                          <Link
                            to="/admin-dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={closeAllMenus}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={closeAllMenus} 
                  aria-label="Login"
                  className="flex items-center"
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaUserCircle className="text-gray-600 dark:text-gray-400" />
                  </motion.div>
                </Link>
              )}
            </div>

            <motion.button
              className="md:hidden focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Mobile menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-gray-600 dark:text-gray-400" />
              ) : (
                <FaBars className="text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 z-40 md:hidden"
                onClick={closeAllMenus}
              />
              <motion.div
                ref={menuRef}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
                className="fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg p-4 overflow-y-auto"
              >
                <div className="mb-4 px-2 py-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
                  {user ? (
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-3">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center"
                      onClick={closeAllMenus}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                        <FaUserCircle className="text-gray-600 dark:text-gray-400 text-xl" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Sign In</span>
                    </Link>
                  )}
                </div>

                <ul className="space-y-2">
                  {renderMobileMenuLinks}

                  {user && (
                    <>
                      {user.email === "admin@loreinedigital.com" && (
                        <motion.li
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.35 }}
                        >
                          <Link
                            to="/admin-dashboard"
                            className="block py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors text-sm"
                            onClick={closeAllMenus}
                          >
                            Admin Dashboard
                          </Link>
                        </motion.li>
                      )}
                      <motion.li
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="w-full text-left py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors text-sm"
                        >
                          Sign Out
                        </button>
                      </motion.li>
                    </>
                  )}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-16"></div>
    </>
  );
});

Header.displayName = "Header";
export default Header;