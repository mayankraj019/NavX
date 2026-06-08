import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { stats } from '../data/content';

function StatCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const end = parseInt(value, 10);
    if (isNaN(end) || end <= 0) {
      setCount(value);
      return;
    }

    const fps = 60;
    const totalTicks = Math.min(end, Math.floor((duration / 1000) * fps));
    const tickDuration = duration / totalTicks;
    const increment = end / totalTicks;

    let current = 0;
    let tick = 0;

    const timer = setInterval(() => {
      tick++;
      current = Math.min(Math.round(tick * increment), end);
      setCount(current);

      if (tick >= totalTicks) {
        clearInterval(timer);
      }
    }, tickDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const statVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <section 
      id="about" 
      className="py-32 px-6 md:px-12 bg-[#F9F9FB] dark:bg-[#030014] transition-colors duration-300 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00F2FE]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column - Content */}
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-3 block"
          >
            About Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            Building Tomorrow's Web, Today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 mt-6 text-base md:text-lg font-light leading-relaxed"
          >
            We believe that navigation isn't just a list of links; it is the skeleton of the user experience. Our mission is to build highly responsive, elegant, and interactive web architectures that guide users with grace and clarity.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 dark:text-gray-400 mt-4 text-sm md:text-base font-light leading-relaxed"
          >
            Our dedicated team of designers and developers blends state-of-the-art frameworks with creative motion design to establish premium online destinations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <motion.button 
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200 cursor-pointer text-sm md:text-base"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Our Story <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column - Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => {
            // Map index to different visual percentages
            const percentages = ['80%', '98%', '65%', '75%'];
            return (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ y: -4, boxShadow: "0 15px 30px rgba(90,90,102,0.08)" }}
                className="glass-panel rounded-3xl p-6 md:p-8 border border-gray-200/50 dark:border-white/5 flex flex-col justify-center transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual card corner aura */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#00F2FE]/5 dark:bg-[#00F2FE]/10 rounded-full blur-xl pointer-events-none" />

                <div className="font-display text-4xl md:text-5xl font-black text-accent flex items-baseline relative z-10">
                  <StatCounter value={stat.value} />
                  <span className="text-2xl md:text-3xl text-accent ml-0.5">{stat.suffix}</span>
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium relative z-10">
                  {stat.label}
                </span>

                {/* Viewport aware progress bar indicators */}
                <div className="w-full h-1 bg-gray-200 dark:bg-zinc-800/60 rounded-full mt-4 overflow-hidden relative z-10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: percentages[index] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 + 0.1 * index }}
                    className="h-full bg-gradient-to-r from-accent to-[#00F2FE] rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
