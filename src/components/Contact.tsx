import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - Replace with actual API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="contact section bg-gradient" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Let's Work Together</h2>
          <p className="contact-subtitle">
            Have a project in mind? Let's discuss how I can help bring your ideas to life
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-card card">
              <div className="info-icon">📧</div>
              <h3>Email Me</h3>
              <p>your.email@example.com</p>
              <a href="mailto:your.email@example.com" className="info-link">
                Send Email →
              </a>
            </div>

            <div className="info-card card">
              <div className="info-icon">💼</div>
              <h3>LinkedIn</h3>
              <p>Connect with me professionally</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="info-link">
                View Profile →
              </a>
            </div>

            <div className="info-card card">
              <div className="info-icon">💻</div>
              <h3>GitHub</h3>
              <p>Check out my code</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="info-link">
                View Projects →
              </a>
            </div>

            <div className="availability-badge">
              <div className="status-dot"></div>
              <span>Available for freelance work</span>
            </div>
          </motion.div>

          <motion.form
            className="contact-form card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project Inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <motion.div
                className="submit-message success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className="submit-message error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✗ Something went wrong. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
