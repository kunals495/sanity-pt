import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container navbar-content">
        <a href="#home" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">
            Your<span className="gradient-text">Portfolio</span>
          </span>
        </a>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={handleLinkClick}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={handleLinkClick}>
            Hire Me
          </a>
        </div>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
