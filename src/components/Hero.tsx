import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import './Hero.css';
import Footer from './Footer';
import Navbar from './Navbar';

const Hero: React.FC = () => {
  // Refs for scroll animations
  const heroTopRef = useRef(null);
  const whySectionRef = useRef(null);
  const featureCard1Ref = useRef(null);
  const featureCard2Ref = useRef(null);
  const featureCard3Ref = useRef(null);

  // InView hooks
  const whySectionInView = useInView(whySectionRef, { once: true, margin: "-100px" });
  const featureCard1InView = useInView(featureCard1Ref, { once: true, margin: "-50px" });
  const featureCard2InView = useInView(featureCard2Ref, { once: true, margin: "-50px" });
  const featureCard3InView = useInView(featureCard3Ref, { once: true, margin: "-50px" });

  // Animation variants for top-drop effect
  const dropIn: Variants = {
    hidden: { 
      y: -100, 
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Animation variants for scroll-triggered elements

  return (
    <>
      <Navbar />
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-gradient-1"></div>
          <div className="hero-gradient-2"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="hero-container">
          {/* Hero Top Section - Drops from top on page load */}
          <div ref={heroTopRef}>
            {/* Announcement Badge with Border Animation */}
            <motion.div 
              className="hero-announcement"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0 * 0.15 }}
            >
              <span className="announcement-border-animation"></span>
              <span className="announcement-border-animation-2"></span>
              <span className="announcement-text">
                Next-Gen IT & Software Solutions
              </span>
              <span className="announcement-arrow">→</span>
            </motion.div>

            {/* Small Label */}
            <motion.div 
              className="hero-label"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 * 0.15 }}
            >
              Technology Partner
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="hero-headline"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2 * 0.15 }}
            >
              High-Performance Software<br />
              Built for Modern Business
            </motion.h1>

            {/* CTA Buttons with Border Animation */}
            <motion.div 
              className="hero-cta"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 3 * 0.15 }}
            >
              <a href="#learn" className="btn btn-primary-green">
                <span className="btn-border-animation"></span>
                <span className="btn-border-animation-2"></span>
                <span className="btn-text">Start Building</span>
              </a>
            </motion.div>
          </div>

          {/* Why Section - Animates on scroll */}
          <motion.div 
            ref={whySectionRef}
            className="hero-why-section"
            initial={{ opacity: 0, y: 100 }}
            animate={whySectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="why-badge">Features</div>
            <h2 className="why-title">Why Malnut?</h2>

            <div className="features-grid">
              {/* Feature Card 1 - Animates on scroll */}
              <motion.div 
                ref={featureCard1Ref}
                className="feature-card"
                initial={{ opacity: 0, y: 100 }}
                animate={featureCard1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                <div className="feature-icon">
                  <div className="icon-circle"></div>
                </div>
                <h3 className="feature-title">Engineering with Purpose</h3>
                <p className="feature-description">
                  Every solution is designed with intent clean architecture, clear logic, and long-term scalability
at the core.
                </p>
              </motion.div>

              {/* Feature Card 2 - Animates on scroll */}
              <motion.div 
                ref={featureCard2Ref}
                className="feature-card"
                initial={{ opacity: 0, y: 100 }}
                animate={featureCard2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="feature-icon">
                  <div className="icon-circle"></div>
                </div>
                <h3 className="feature-title">Built on Trust</h3>
                <p className="feature-description">
                  We prioritize security, transparency, and reliability, treating your product and data as if it were
our own.
                </p>
              </motion.div>

              {/* Feature Card 3 - Animates on scroll */}
              <motion.div 
                ref={featureCard3Ref}
                className="feature-card"
                initial={{ opacity: 0, y: 100 }}
                animate={featureCard3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              >
                <div className="feature-icon">
                  <div className="icon-circle"></div>
                </div>
                <h3 className="feature-title">Execution over Noise</h3>
                <p className="feature-description">
                  No buzzwords. No overengineering. Just focused delivery that turns ideas into dependable
software.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hero;