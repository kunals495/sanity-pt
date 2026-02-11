import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sanityClient, urlFor } from '../lib/sanity';
import type { Testimonial } from '../types';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "testimonial"] | order(_createdAt desc) {
            _id,
            clientName,
            clientRole,
            clientCompany,
            testimonialText,
            rating,
            clientImage,
            projectType
          }
        `);
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback demo testimonials
        const demoTestimonials: Testimonial[] = [
          {
            _id: '1',
            clientName: 'Sarah Johnson',
            clientRole: 'CEO',
            clientCompany: 'TechVentures Inc.',
            testimonialText: 'The trading platform exceeded all our expectations. The performance is incredible and our clients love the intuitive interface. This has transformed how we operate in the digital assets space.',
            rating: 5,
            projectType: 'Trading Platform Development'
          },
          {
            _id: '2',
            clientName: 'Michael Chen',
            clientRole: 'CTO',
            clientCompany: 'CryptoFund',
            testimonialText: 'Outstanding work on our analytics dashboard. The real-time data visualization and performance metrics have given us a competitive edge. Highly professional team with deep technical expertise.',
            rating: 5,
            projectType: 'Analytics Dashboard'
          },
          {
            _id: '3',
            clientName: 'Emma Williams',
            clientRole: 'Product Director',
            clientCompany: 'DigitalAssets Pro',
            testimonialText: 'Working with this team was seamless from start to finish. They delivered a robust API infrastructure that scales perfectly with our growing user base. The documentation and support are exceptional.',
            rating: 5,
            projectType: 'API Development'
          },
          {
            _id: '4',
            clientName: 'David Rodriguez',
            clientRole: 'Founder',
            clientCompany: 'BlockChain Solutions',
            testimonialText: 'The mobile wallet app they built is secure, fast, and beautifully designed. Our users have given overwhelmingly positive feedback. The team\'s expertise in blockchain technology is evident.',
            rating: 5,
            projectType: 'Mobile Wallet Development'
          }
        ];
        setTestimonials(demoTestimonials);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials section bg-gradient" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Client Testimonials</h2>
          <p className="testimonials-subtitle">
            What our clients say about their experience working with us
          </p>
        </motion.div>

        <div className="testimonials-slider">
          <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous testimonial">
            ‹
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="quote-icon">"</div>
              
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                
                <p className="testimonial-text">
                  {testimonials[currentIndex].testimonialText}
                </p>
                
                <div className="client-info">
                  {testimonials[currentIndex].clientImage?.asset?._ref && (
                    <img 
                      src={urlFor(testimonials[currentIndex].clientImage).width(80).height(80).url()} 
                      alt={testimonials[currentIndex].clientName}
                      className="client-avatar"
                    />
                  )}
                  {!testimonials[currentIndex].clientImage && (
                    <div className="client-avatar-placeholder">
                      {testimonials[currentIndex].clientName.charAt(0)}
                    </div>
                  )}
                  <div className="client-details">
                    <h4 className="client-name">{testimonials[currentIndex].clientName}</h4>
                    <p className="client-position">
                      {testimonials[currentIndex].clientRole} at {testimonials[currentIndex].clientCompany}
                    </p>
                    <span className="project-type">{testimonials[currentIndex].projectType}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="slider-btn next" onClick={nextSlide} aria-label="Next testimonial">
            ›
          </button>
        </div>

        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;