import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="container hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span 
            className="hero-greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            👋 Hey there!
          </motion.span>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I'm Your <span className="gradient-text">Creative Partner</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transforming ideas into stunning digital experiences.
            Specialized in full-stack development, UI/UX design, and bringing your vision to life.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a href="#contact" className="btn btn-primary">
              Let's Work Together
            </a>
            <a href="#work" className="btn btn-outline">
              View My Work
            </a>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="stat-item">
              <span className="stat-number gradient-text">50+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number gradient-text">40+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number gradient-text">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="floating-card card-1">
            <div className="card-icon">💻</div>
            <div className="card-text">Web Development</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🎨</div>
            <div className="card-text">UI/UX Design</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">📱</div>
            <div className="card-text">Mobile Apps</div>
          </div>
          <div className="hero-circle"></div>
        </motion.div>
      </div>
      
      <div className="scroll-indicator">
        <motion.div 
          className="scroll-mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-wheel"></div>
        </motion.div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
