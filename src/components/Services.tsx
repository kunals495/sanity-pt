import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sanityClient } from '../lib/sanity';
import type { Service } from '../types/index';
import './Services.css';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    // Fetch services from Sanity
    const fetchServices = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "service"] | order(_createdAt asc)`);
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback data if Sanity is not configured
        setServices([
          {
            _id: '1',
            title: 'Web Development',
            description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
            icon: '🌐',
            features: ['Responsive Design', 'Fast Performance', 'SEO Optimized', 'Cross-browser Compatible']
          },
          {
            _id: '2',
            title: 'UI/UX Design',
            description: 'Beautiful, intuitive interfaces that enhance user experience and drive engagement.',
            icon: '🎨',
            features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
          },
          {
            _id: '3',
            title: 'Mobile Development',
            description: 'Native and cross-platform mobile applications for iOS and Android.',
            icon: '📱',
            features: ['React Native', 'Flutter', 'Native Apps', 'App Store Deployment']
          },
          {
            _id: '4',
            title: 'E-commerce Solutions',
            description: 'Complete online store setup with payment integration and inventory management.',
            icon: '🛒',
            features: ['Product Management', 'Payment Gateway', 'Order Tracking', 'Analytics']
          },
          {
            _id: '5',
            title: 'API Development',
            description: 'RESTful and GraphQL APIs with robust security and scalability.',
            icon: '⚡',
            features: ['REST APIs', 'GraphQL', 'Authentication', 'Documentation']
          },
          {
            _id: '6',
            title: 'Consulting & Support',
            description: 'Technical consulting, code reviews, and ongoing maintenance support.',
            icon: '💡',
            features: ['Code Review', 'Performance Optimization', 'Bug Fixes', '24/7 Support']
          }
        ]);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="services section bg-gradient" id="services" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">What I Do</h2>
          <p className="services-subtitle">
            Comprehensive digital solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              className="service-card card"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="service-number">0{index + 1}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
