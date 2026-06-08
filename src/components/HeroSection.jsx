import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function HeroSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const words = "Crafting Digital Experiences Beyond Tomorrow".split(" ");

  // Custom magnetic cursor tracking for headings
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateHeadingX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateHeadingY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let angleX = 0.002;
    let angleY = 0.003;
    let mouseAngleX = 0;
    let mouseAngleY = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Build 3D sphere vertices
    const points = [];
    const radius = 160;
    const layers = 12;
    const pointsPerLayer = 12;

    for (let i = 1; i < layers; i++) {
      const theta = (i * Math.PI) / layers;
      for (let j = 0; j < pointsPerLayer; j++) {
        const phi = (j * 2 * Math.PI) / pointsPerLayer;
        points.push({
          x: radius * Math.sin(theta) * Math.cos(phi),
          y: radius * Math.sin(theta) * Math.sin(phi),
          z: radius * Math.cos(theta),
        });
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Map cursor offsets to magnetic transformations
      mouseX.set(dx);
      mouseY.set(dy);

      // Map to 3D rotation angles
      mouseAngleY = dx * 0.00015;
      mouseAngleX = dy * 0.00015;
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      mouseAngleY = 0;
      mouseAngleX = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const project = (x, y, z) => {
      const scale = 400 / (400 + z);
      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 2 + y * scale,
      };
    };

    const rotateX = (point, rad) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
      };
    };

    const rotateY = (point, rad) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth interpolation toward cursor rotations
      angleX += (mouseAngleX - angleX) * 0.05;
      angleY += (mouseAngleY - angleY) * 0.05;

      // Base rotations
      const currentAngleX = angleX + 0.002;
      const currentAngleY = angleY + 0.003;

      // Rotate points
      const rotatedPoints = points.map((p) => {
        let rotated = rotateX(p, currentAngleX);
        rotated = rotateY(rotated, currentAngleY);
        return rotated;
      });

      // Project vertices to 2D
      const projected = rotatedPoints.map((p) => project(p.x, p.y, p.z));

      // Draw wireframe grid lines
      ctx.strokeStyle = 'rgba(90, 90, 102, 0.09)';
      ctx.lineWidth = 0.5;

      // Draw horizontal bands
      for (let i = 0; i < layers - 1; i++) {
        ctx.beginPath();
        for (let j = 0; j < pointsPerLayer; j++) {
          const idx = i * pointsPerLayer + j;
          const nextIdx = i * pointsPerLayer + ((j + 1) % pointsPerLayer);
          ctx.moveTo(projected[idx].x, projected[idx].y);
          ctx.lineTo(projected[nextIdx].x, projected[nextIdx].y);
        }
        ctx.stroke();
      }

      // Draw vertical ribs
      for (let j = 0; j < pointsPerLayer; j++) {
        ctx.beginPath();
        for (let i = 0; i < layers - 2; i++) {
          const idx = i * pointsPerLayer + j;
          const nextIdx = (i + 1) * pointsPerLayer + j;
          ctx.moveTo(projected[idx].x, projected[idx].y);
          ctx.lineTo(projected[nextIdx].x, projected[nextIdx].y);
        }
        ctx.stroke();
      }

      // Draw nodes
      projected.forEach((p, index) => {
        // Dynamic node sizes based on 3D depth
        const zDepth = rotatedPoints[index].z;
        const alpha = (160 - zDepth) / 320 * 0.45;
        const nodeRadius = Math.max(0.5, (160 - zDepth) / 80);

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90, 90, 102, ${alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollToExplore = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#F9F9FB] via-[#EEEDF5] to-[#F9F9FB] dark:from-[#030014] dark:via-[#0D0B26] dark:to-[#030014] overflow-hidden py-20 px-6 transition-colors duration-300"
    >
      {/* 3D Wireframe Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Dynamic Aurora Backlights */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl pointer-events-none animate-aurora-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/5 blur-3xl pointer-events-none animate-aurora-medium" />

      {/* Hero Content */}
      <motion.div 
        style={{ rotateX: rotateHeadingX, rotateY: rotateHeadingY, transformStyle: "preserve-3d" }}
        className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.span
            variants={itemVariants}
            className="text-xs tracking-[0.3em] text-accent font-semibold uppercase mb-4 block"
          >
            Design. Innovation. Engineering.
          </motion.span>

          {/* Staggered Word Reveal */}
          <h1 className="font-display text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight max-w-4xl tracking-tight">
            {words.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-3 py-1">
                <motion.span className="inline-block" variants={wordVariants}>
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mt-6 font-light leading-relaxed"
          >
            Crafting Digital Experiences Beyond Tomorrow
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={scrollToExplore}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(90,90,102,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              Explore Showcase
            </motion.button>
            <motion.button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(90,90,102,0.06)" }}
              whileTap={{ scale: 0.97 }}
              className="border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToExplore}
        >
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="7" y="3" width="10" height="18" rx="5" />
            <path d="M12 7v4" />
          </svg>
          <div className="w-5 h-8 border border-gray-300 dark:border-gray-500/30 rounded-full flex justify-center p-1">
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0], originY: [0, 0, 1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 h-2.5 bg-accent/60 rounded-full"
            />
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 tracking-wider">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
