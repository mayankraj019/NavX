import React from 'react';
import { motion } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { navLinks } from '../data/content';
import { useScrolled } from '../hooks/useScrolled';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar({ activeSection, mobileOpen, setMobileOpen }) {
  const isScrolled = useScrolled();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 py-6 pointer-events-none"
      aria-label="Main navigation"
    >
      <div 
        className={`w-full max-w-5xl rounded-full glass-navbar shadow-md flex items-center justify-between transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'py-3.5 px-6 md:px-8 border-gray-200/50 dark:border-white/10 shadow-lg backdrop-blur-md mt-2'
            : 'py-5 px-8 border-transparent mt-0'
        }`}
      >
        {/* Logo */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-display text-2xl font-bold bg-gradient-to-r from-gray-950 to-gray-600 dark:from-white dark:to-accent-light bg-clip-text text-transparent cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
        >
          NavX
        </motion.button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 bg-gray-500/5 dark:bg-white/5 rounded-full p-1 border border-gray-200/20 dark:border-white/5 relative z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-full relative cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent ${
                  isActive 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Active sliding capsule pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm border border-gray-200/50 dark:border-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
