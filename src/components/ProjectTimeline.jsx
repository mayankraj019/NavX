import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { milestones } from '../data/content';

export default function ProjectTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-32 px-6 md:px-12 bg-white dark:bg-[#030014] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-3 block">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Evolution & Milestones
          </h2>
        </div>

        {/* Timeline Stem & Cards Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Stem Background Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-zinc-800 -translate-x-1/2" />

          {/* Animated Scroll Progress Stem Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-accent-light -translate-x-1/2"
          />

          {/* Milestone Items */}
          <div className="flex flex-col gap-20">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 rounded-full bg-[#F9F9FB] dark:bg-[#030014] border-4 border-accent -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 flex"
                  >
                    <div className="glass-panel w-full p-6 md:p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm hover:border-accent/30 transition-all duration-300 relative flex flex-col gap-4">
                      {/* Highlight Year */}
                      <span className="font-display text-4xl font-black text-accent/20 dark:text-accent/10 absolute top-4 right-6 select-none">
                        {milestone.year}
                      </span>
                      
                      <div className="flex flex-col gap-2 relative z-10">
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                          Milestone {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-light leading-relaxed relative z-10">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
