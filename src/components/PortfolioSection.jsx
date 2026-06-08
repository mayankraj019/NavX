import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { portfolio } from '../data/content';

function ProjectCard({ item, onClick }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXVal = e.clientX - rect.left - width / 2;
    const mouseYVal = e.clientY - rect.top - height / 2;

    x.set(mouseXVal / width);
    y.set(mouseYVal / height);

    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const initials = item.title
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="rounded-3xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-white dark:bg-[#141414]/40 backdrop-blur-md shadow-md hover:shadow-2xl hover:border-accent/30 transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full relative"
    >
      {/* Spotlight highlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.08), transparent 80%)'
        }}
      />

      <div>
        {/* Card Image Area */}
        <div className="h-48 relative overflow-hidden bg-gray-150 dark:bg-zinc-800/10 border-b border-gray-100 dark:border-white/5">
          {/* Dynamic background layout */}
          <motion.div
            layoutId={`project-bg-${item.title}`}
            style={{ backgroundColor: item.color }}
            className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-5xl font-black text-white/10 select-none tracking-widest uppercase">
              {initials}
            </span>
          </div>

          {/* Glowing Status Indicator */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-green-400 border border-green-500/20">
              <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" />
              {item.status}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiExternalLink className="w-6 h-6 text-white" />
            <span className="text-white text-sm font-semibold">Explore Project</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <motion.span
              layoutId={`project-category-${item.title}`}
              className="text-[10px] font-semibold tracking-wider text-accent-light bg-accent/20 border border-accent/20 px-2.5 py-1 rounded-full inline-block uppercase"
            >
              {item.category}
            </motion.span>
          </div>

          <motion.h3
            layoutId={`project-title-${item.title}`}
            className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors duration-200"
          >
            {item.title}
          </motion.h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Tech Badges Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-150 dark:border-white/5 flex flex-wrap gap-1.5">
        {item.techStack.slice(0, 3).map((tech, i) => (
          <span
            key={i}
            className="text-[9px] font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg border border-gray-200/50 dark:border-white/5"
          >
            {tech}
          </span>
        ))}
        {item.techStack.length > 3 && (
          <span className="text-[9px] font-semibold text-accent bg-accent/5 px-2 py-1 rounded-lg">
            +{item.techStack.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web Apps', 'Full Stack', 'E-Commerce', 'SaaS'];

  const filterMatches = (item, filter) => {
    if (filter === 'All') return true;
    if (filter === 'Web Apps') {
      return ['Web App', 'Platform'].includes(item.category);
    }
    if (filter === 'Full Stack') {
      return item.techStack.includes('Node.js') || item.techStack.includes('Express') || item.techStack.includes('PostgreSQL');
    }
    if (filter === 'E-Commerce') {
      return item.category === 'E-Commerce';
    }
    if (filter === 'SaaS') {
      return item.category === 'SaaS';
    }
    return false;
  };

  const filteredItems = portfolio.filter((item) => filterMatches(item, activeFilter));

  return (
    <section
      id="portfolio"
      className="py-32 px-6 md:px-12 bg-white dark:bg-[#030014] transition-colors duration-300 scroll-mt-20 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-3 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Work We're Proud Of
          </motion.h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 bg-gray-500/5 dark:bg-white/5 rounded-full p-1 border border-gray-200/20 dark:border-white/5 max-w-xl mx-auto backdrop-blur-sm">
          {filters.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                  isSelected
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <span className="relative z-10">{filter}</span>
                {isSelected && (
                  <motion.div
                    layoutId="active-filter-pill"
                    className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm border border-gray-200/50 dark:border-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProjectCard item={item} onClick={() => onSelectProject(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
