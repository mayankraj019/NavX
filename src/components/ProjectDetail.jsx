import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiCpu, FiLayers, FiAlertCircle } from 'react-icons/fi';

export default function ProjectDetail({ project, onClose }) {
  const containerRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Trap focus inside overlay
  useEffect(() => {
    const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = Array.from(container.querySelectorAll(focusableElementsString));
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

    container.addEventListener('keydown', handleTabTrap);
    return () => container.removeEventListener('keydown', handleTabTrap);
  }, []);

  const initials = project.title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#F9F9FB] dark:bg-[#030014] text-gray-900 dark:text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      {/* Floating Close Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full glass-panel text-gray-700 dark:text-gray-300 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/10 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Close project showcase"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Banner Grid */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Dynamic Morph Background */}
        <motion.div
          layoutId={`project-bg-${project.title}`}
          style={{ backgroundColor: project.color }}
          className="absolute inset-0 w-full h-full"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F9FB] dark:from-[#030014] via-black/20 to-black/45" />

        {/* Large Centered Initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[15vw] font-black text-white/5 select-none tracking-widest">
            {initials}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span
            layoutId={`project-category-${project.title}`}
            className="text-xs md:text-sm font-semibold tracking-[0.2em] text-accent-light bg-accent/20 border border-accent/30 px-4 py-1.5 rounded-full inline-block mb-6 uppercase"
          >
            {project.category}
          </motion.span>
          <motion.h1
            layoutId={`project-title-${project.title}`}
            className="font-display text-4xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-md"
          >
            {project.title}
          </motion.h1>
          <p className="text-white/90 mt-6 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            {project.description}
          </p>
        </div>
      </div>

      {/* Detail Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 flex flex-col gap-16">
            {/* Features Section */}
            <div>
              <h2 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                <FiLayers className="text-accent animate-pulse" /> Key Features
              </h2>
              <ul className="flex flex-col gap-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex gap-4 items-start bg-white dark:bg-white/5 rounded-2xl p-5 border border-gray-200/50 dark:border-white/5 shadow-sm hover:border-accent/30 transition-all duration-300">
                    <span className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Section */}
            <div>
              <h2 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                <FiCpu className="text-accent animate-pulse" /> Architecture & Data Flow
              </h2>
              <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-white/5 shadow-sm">
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed font-light">
                  {project.architecture}
                </p>
              </div>
            </div>

            {/* Challenges Section */}
            <div>
              <h2 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
                <FiAlertCircle className="text-accent animate-pulse" /> Engineering Challenges Solved
              </h2>
              <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-200/50 dark:border-white/5 shadow-sm">
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed font-light">
                  {project.challenges}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Specifications */}
          <div className="flex flex-col gap-10">
            {/* Tech Stack Box */}
            <div className="glass-panel rounded-2xl p-8 flex flex-col gap-6 shadow-md">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Status</h3>
                <span className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {project.status}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/5 px-3.5 py-2 rounded-xl transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent hover:bg-accent-dark text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer min-h-[44px] text-sm md:text-base focus-visible:outline-2 focus-visible:outline-accent text-center hover:shadow-lg hover:shadow-accent/20"
                >
                  Launch Live Preview <FiExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl py-3.5 flex items-center justify-center gap-2 font-semibold transition-colors duration-200 cursor-pointer min-h-[44px] text-sm md:text-base focus-visible:outline-2 focus-visible:outline-accent text-center"
                >
                  GitHub Repository <FiGithub className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
