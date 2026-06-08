import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { navLinks } from '../data/content';
import DarkModeToggle from './DarkModeToggle';

export default function MobileMenu({ isOpen, onClose, activeSection }) {
  const drawerRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements = Array.from(drawer.querySelectorAll(focusableElementsString));
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    }

    const handleTabTrap = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    drawer.addEventListener('keydown', handleTabTrap);
    return () => drawer.removeEventListener('keydown', handleTabTrap);
  }, [isOpen]);

  const scrollToSection = (id) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300); // Wait for transition to finish
  };

  const containerVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    },
    exit: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3
      }
    }
  };

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#F9F9FB] dark:bg-[#030014] border-r border-gray-200/50 dark:border-white/10 z-50 flex flex-col p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-gray-950 to-gray-600 dark:from-white dark:to-accent-light bg-clip-text text-transparent">
                NavX
              </span>
              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors duration-200 cursor-pointer"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.div key={link.id} variants={linkVariants}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full text-left px-5 py-3.5 rounded-xl font-medium text-base transition-all duration-200 flex items-center min-h-[44px] cursor-pointer ${
                        isActive
                          ? 'bg-accent text-white shadow-lg shadow-accent/20'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer / Theme Toggle */}
            <div className="pt-6 border-t border-gray-200/50 dark:border-white/10 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
              <DarkModeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
