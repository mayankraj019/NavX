import React from 'react';
import { motion } from 'framer-motion';
import { FiTwitter, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { navLinks } from '../data/content';

export default function Footer() {
  const handleLinkClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#030014] text-white py-16 px-6 md:px-12 border-t border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-white to-accent-light bg-clip-text text-transparent">
              NavX
            </span>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs">
              Designing immersive navigation layouts that elevate the digital journey and delight users.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    onClick={() => handleLinkClick(link.id)}
                    whileHover={{ x: 3 }}
                    className="text-sm text-gray-400 hover:text-accent font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Services</h4>
            <ul className="flex flex-col gap-3.5">
              {[
                'Web Development',
                'Mobile Apps',
                'UI/UX Design',
                'Cloud Solutions',
                'Cybersecurity',
                'Growth Analytics'
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-sm text-gray-400">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">Contact</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
              Mayank Raj<br />
              Warje, Pune 411058<br />
              <span className="mt-2 block font-normal">mayankrafiganj19@gmail.com</span>
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: FiTwitter, label: 'Twitter', url: '#' },
                { icon: FiGithub, label: 'GitHub', url: '#' },
                { icon: FiLinkedin, label: 'LinkedIn', url: '#' },
                { icon: FiInstagram, label: 'Instagram', url: '#' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ y: -3, color: '#5A5A66' }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
          <span>© 2025 NavX. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with React + Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
