import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sanityClient } from '../lib/sanity';
import './Footer.css';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

interface FooterLink {
  _id: string;
  name: string;
  href: string;
  category: 'company' | 'social' | 'legal';
  order: number;
}

interface CompanyLinks {
  _id: string;
  name: string;
  href: string;
  category: 'company';
  order: number;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [companyLinks, setCompanyLinks] = useState<CompanyLinks[]>([]);

  // Refs for scroll animations
  const faqRef = useRef(null);
  const demoRef = useRef(null);
  const footerRef = useRef(null);

  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const demoInView = useInView(demoRef, { once: true, margin: "-100px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-100px" });

  // Dummy data as fallback
  const dummyFaqs: FAQ[] = [
    {
      _id: '1',
      question: 'How does Malnut deliver high-quality software?',
      answer: 'Malnut follows an engineering-first approach using modern architectures, clean code practices, and scalable technology stacks. Every solution is built for performance, security, and long-term maintainability.',
      order: 1
    },
    {
      _id: '2',
      question: 'Why is scalability important in software development?',
      answer: "Scalable systems allow businesses to grow without re-engineering their core products. Malnutdesigns applications that handle increased users, data, and complexity while maintaining consistent performance.",
      order: 2
    },
    {
      _id: '3',
      question: 'How does Malnut’s engagement model benefit clients?',
      answer: 'Malnut focuses on transparent, outcome-driven pricing rather than hidden costs or unnecessary complexity. This allows clients to plan confidently while receiving enterprise-grade development and support.',
      order: 3
    },
    {
      _id: '4',
      question: "What does Malnut’s onboarding process look like?",
      answer: 'Malnut’s onboarding process is simple and efficient. We quickly understand your requirements, align on goals, and begin development with minimal setup—so you can move from idea to execution fast.',
      order: 4
    }
  ];

  const dummyFooterLinks: FooterLink[] = [
    // Social links
    { _id: 's1', name: 'LinkedIn', href: 'https://www.linkedin.com/company/malnut/', category: 'social', order: 1 },
    { _id: 's2', name: 'Instagram', href: 'https://www.instagram.com/malnutglobal/', category: 'social', order: 2 },
    { _id: 's3', name: 'Malnut on X', href: 'https://x.com/malnutglobal', category: 'social', order: 3 },
    // Legal links
    { _id: 'l1', name: 'Terms & Conditions', href: '#', category: 'legal', order: 1 },
    { _id: 'l2', name: 'Privacy Policy', href: '#', category: 'legal', order: 2 }
  ];

  const companyLinksDum : CompanyLinks[] = 
    [
          { _id: 'c1', name: 'Home', href: '/', category: 'company', order: 1 },
          { _id: 'c2', name: 'Projects', href: '/Portfolio', category: 'company', order: 2 },
          { _id: 'c3', name: 'Services', href: '/Services', category: 'company', order: 3 },
          { _id: 'c4', name: 'About', href: '/about', category: 'company', order: 4 },
          { _id: 'c5', name: 'Contact', href: '/contact', category: 'company', order: 5 },
    ];

  useEffect(() => {
    // Set dummy data immediately
    setFaqs(dummyFaqs);
    setFooterLinks(dummyFooterLinks);
    setCompanyLinks(companyLinksDum);

    // Fetch real data from Sanity
    const fetchData = async () => {
      try {
        // Fetch FAQs
        const faqData = await sanityClient.fetch(`
          *[_type == "faq"] | order(order asc) {
            _id,
            question,
            answer,
            order
          }
        `);

        // Fetch Footer Links
        const linksData = await sanityClient.fetch(`
          *[_type == "footerLink"] | order(order asc) {
            _id,
            name,
            href,
            category,
            order
          }
        `);

        // Replace dummy data with real data when available
        if (faqData && faqData.length > 0) {
          setFaqs(faqData);
        }

        if (linksData && linksData.length > 0) {
          setFooterLinks(linksData);
        }
      } catch (error) {
        console.error('Error fetching footer data from Sanity:', error);
        // Keep dummy data on error
      }
    };

    fetchData();
  }, []);

  // Filter links by category
  const socialLinks = footerLinks.filter(link => link.category === 'social');
  const legalLinks = footerLinks.filter(link => link.category === 'legal');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <footer className="footer-new">
      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        className="faq-section-new"
        initial={{ opacity: 0, y: 100 }}
        animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container-new">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq._id}
                className={`faq-card ${openFaq === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  className="faq-header"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-toggle">+</span>
                </button>
                <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Schedule Demo Section */}
      <motion.section 
        ref={demoRef}
        className="demo-section-new"
        initial={{ opacity: 0, y: 100 }}
        animate={demoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="container-new">
          <div className="demo-card">
            <div className="demo-content">
              <h2 className="demo-title">Schedule a Demo</h2>
              <p className="demo-subtitle">Realize The Advantage</p>
            </div>
            <button className="demo-btn">Book Demo Now</button>
          </div>
        </div>
      </motion.section>

      {/* Footer Bottom Section */}
      <motion.section 
        ref={footerRef}
        className="footer-bottom-section"
        initial={{ opacity: 0, y: 100 }}
        animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <div className="container-new">
          <div className="footer-grid">
            {/* About Us */}
            <div className="footer-column">
              <h3 className="footer-column-title">About Us</h3>
              <div className="footer-email">
                <span>Email</span>
                <a href="mailto:sales@freelancer.io">
                  malnutglobal@gmail.com
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-links">
                {companyLinks.map((link) => (
                  <li key={link._id}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="footer-column">
              <h3 className="footer-column-title">Social Media</h3>
              <ul className="footer-links">
                {socialLinks.map((link) => (
                  <li key={link._id}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-column">
              <h3 className="footer-column-title">Legal</h3>
              <ul className="footer-links">
                {legalLinks.map((link) => (
                  <li key={link._id}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; {currentYear} Malnut. All rights reserved.</p>
          </div>
        </div>
      </motion.section>
    </footer>
  );
};

export default Footer;