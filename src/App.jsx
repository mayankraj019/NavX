import React, { useState, useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider, ThemeContext } from './context/ThemeContext'
import { useActiveSection } from './hooks/useActiveSection'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import NeuralBackground from './components/NeuralBackground'
import HeroSection from './components/HeroSection'
import HomeSection from './components/HomeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import ProjectTimeline from './components/ProjectTimeline'
import ProjectDetail from './components/ProjectDetail'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

const SECTION_IDS = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact']

function AppContent() {
  const { isDark } = useContext(ThemeContext)
  const activeSection = useActiveSection(SECTION_IDS)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Immersive Neural Background */}
      <NeuralBackground />

      {/* Accessibility: Skip to Content */}
      <a 
        href="#home" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-semibold focus:shadow-lg focus:shadow-accent/30"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <Navbar activeSection={activeSection} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} activeSection={activeSection} />
      
      {/* Page Content */}
      <main role="main">
        <HeroSection />
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection onSelectProject={setSelectedProject} />
        <ProjectTimeline />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Immersive Project Showcase Expander */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
