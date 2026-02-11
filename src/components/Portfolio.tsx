import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sanityClient, urlFor } from '../lib/sanity';
import type { Project } from '../types/index';
import Navbar from './Navbar';
import Footer from './Footer';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-in');
            
            // Trigger line animations when section becomes visible
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              setVisibleSections(prev => new Set(prev).add(sectionId));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll<HTMLElement>('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Featured products data
  const featuredProducts = [
    {
      id: 'trade-execution',
      badge: 'DISCOVER THE ADVANTAGE',
      title: 'High-Performance Trade Execution',
      description: 'Execute trades instantly with ultra-low latency, private infrastructure, and fixed predictable pricing.',
      features: [
        'Low-latency execution with co-located access and rapid compute speeds to reduce slippage',
        'Private trading through self-hosted infrastructure to protect sensitive IP and reduce front-running risk',
        'Sensible fees without volume-based fees, so clients can focus on what matters most: delivering alpha'
      ],
      image: '/api/placeholder/700/500'
    },
    {
      id: 'market-data',
      badge: 'MARKET DATA',
      title: 'Low-Latency Market Data',
      description: 'Access clean, historical market data delivered reliably through redundant, high-speed infrastructure systems.',
      features: [
        'Clean data with standardized formatting across exchanges and trading venues resulting in less time and resources allotted to data cleaning',
        'Fast data utilizing direct connection to enable swift trade execution and data processing times'
      ],
      image: '/api/placeholder/700/500'
    }
  ];

  // Venue integrations
  const venues = [
    'BYBIT', 'coinbase', 'KuCoin', 'BINANCE',
    'OKX', 'UNISWAP', 'BITFINEX', 'Hyperliquid'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "project"] | order(completedDate desc) {
            _id,
            title,
            description,
            image,
            category,
            technologies,
            projectUrl,
            githubUrl,
            completedDate
          }
        `);
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      
      <main className="portfolio-page">
        {/* Hero Section */}
        <section className="portfolio-hero animate-on-scroll">
          <div className="container">
            <div className="hero-badge">DISCOVER THE ADVANTAGE</div>
            <h1 className="hero-title">Products</h1>
          </div>
        </section>

        {/* Product Sections */}
        {featuredProducts.map((product, index) => (
          <section 
            key={product.id}
            data-section-id={product.id}
            className={`product-section animate-on-scroll ${index % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="container">
              <div className="product-layout">
                <div className="product-visual">
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.title} />
                  </div>
                </div>

                <div className="product-content">
                  <div className="product-badge">{product.badge}</div>
                  <h2 className="product-title">{product.title}</h2>
                  <p 
                    className={`product-description ${visibleSections.has(product.id) ? 'animate-line' : ''}`}
                    style={{ animationDelay: '0.2s' }}
                  >
                    {product.description}
                  </p>
                  
                  <div className="product-features">
                    {product.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className={`feature-item ${visibleSections.has(product.id) ? 'animate-line' : ''}`}
                        style={{ animationDelay: `${0.4 + (idx * 0.15)}s` }}
                      >
                        <div className="feature-icon">
                          <div className="icon-circle"></div>
                        </div>
                        <p className="feature-text">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Venue Integrations Section */}
        <section className="venues-section animate-on-scroll">
          <div className="container">
            <div className="venues-badge">VENUE INTEGRATIONS</div>
            <h2 className="venues-title">
              Integrated with the largest Sources<br />of liquidity
            </h2>
            
            <div className="venues-grid">
              {venues.map((venue, index) => (
                <div 
                  key={index} 
                  className="venue-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="venue-logo">{venue}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Portfolio;