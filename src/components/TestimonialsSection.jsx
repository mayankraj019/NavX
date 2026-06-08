import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { testimonials } from '../data/content';

function TestimonialCard({ item }) {
  return (
    <div className="bg-white dark:bg-[#141414] rounded-2xl p-8 border border-gray-100 dark:border-white/5 flex flex-col justify-between h-full shadow-sm">
      <div>
        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(item.rating)].map((_, i) => (
            <FiStar key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
          ))}
        </div>

        {/* Text */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic mb-6 text-sm md:text-base">
          "{item.text}"
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div 
          style={{ backgroundColor: item.color }} 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base"
        >
          {item.initials}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
            {item.name}
          </h4>
          <p className="text-xs md:text-sm text-gray-400">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const firstItem = testimonials[currentIndex];
  const secondItem = testimonials[(currentIndex + 1) % testimonials.length];

  return (
    <section 
      id="testimonials" 
      className="py-32 px-6 md:px-12 bg-[#F1F0F5] dark:bg-[#09061F] transition-colors duration-300 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-3 block"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        {/* Carousel Area */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-5xl mx-auto px-4 md:px-12"
        >
          {/* Main Slider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[350px] items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
              >
                <div className="h-full">
                  <TestimonialCard item={firstItem} />
                </div>
                <div className="hidden md:block h-full">
                  <TestimonialCard item={secondItem} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side Chevron Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md cursor-pointer z-10 focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-20px] md:right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md cursor-pointer z-10 focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                  isActive ? 'bg-accent w-6' : 'bg-gray-300 dark:bg-zinc-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
