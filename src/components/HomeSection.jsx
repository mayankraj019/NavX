import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { features } from '../data/content';

export default function HomeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <section 
      id="home" 
      className="py-32 px-6 md:px-12 bg-[#F1F0F5] dark:bg-[#09061F] transition-colors duration-300 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-3 block"
          >
            Core Vision
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Crafting Digital Experiences That Matter
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 mt-6 text-lg font-light leading-relaxed"
          >
            We focus on creating digital interfaces that are not only highly functional but also beautiful and delightful to interact with. Elevating navigation into an art form.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => {
            const Icon = FiIcons[feature.icon];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, translate: -2, boxShadow: "0 20px 45px rgba(90,90,102,0.1)" }}
                className="glass-panel rounded-3xl p-8 flex flex-col items-start transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle internal aura radial glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 dark:bg-accent/10 rounded-full blur-2xl pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 relative z-10">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
