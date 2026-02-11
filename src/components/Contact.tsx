import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Contact.css';
import { sanityClient } from '../lib/sanity';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    interests: [] as string[],
    message: '',
    newsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'newsletter') {
        setFormData({
          ...formData,
          newsletter: checkbox.checked
        });
      } else {
        const updatedInterests = checkbox.checked
          ? [...formData.interests, value]
          : formData.interests.filter(item => item !== value);
        setFormData({
          ...formData,
          interests: updatedInterests
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {

      // Submit to Sanity
      const doc = {
        _type: 'contactSubmission',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        companyName: formData.companyName,
        interests: formData.interests,
        message: formData.message,
        newsletter: formData.newsletter,
        submittedAt: new Date().toISOString(),
        status: 'new'
      };

      await sanityClient.create(doc);

      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        interests: [],
        message: '',
        newsletter: false
      });

      // Clear checkboxes
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = false;
      });

    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Provide specific error messages
      let errorMessage = 'There was an error submitting your message. Please try again or email us directly at sales@goquant.io';
      
      if (error.message?.includes('token')) {
        errorMessage = 'Configuration error. Please contact the site administrator.';
      } else if (error.message?.includes('permission')) {
        errorMessage = 'Permission error. Please contact the site administrator.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="contact-page">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-badge">Contact</div>
            <h1 className="contact-title">Get in touch</h1>
            <p className="contact-subtitle">Questions or feedback? Our team is here to help.</p>
          </div>
        </section>

        <section className="contact-content-section">
          <div className="container">
            <div className="contact-grid">
              {/* Left Side - Form */}
              <div className="contact-form-wrapper">
                <form onSubmit={handleSubmit} className="contact-form">
                  {submitStatus.type && (
                    <div className={`submit-status ${submitStatus.type}`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="companyName">
                      Company Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Interested in <span className="required">*</span>
                    </label>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="interest"
                          value="Market data"
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        <span className="checkbox-custom"></span>
                        Market data
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="interest"
                          value="OEMS"
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        <span className="checkbox-custom"></span>
                        OEMS
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="interest"
                          value="RMS/PMS"
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                        <span className="checkbox-custom"></span>
                        RMS/PMS
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter message"
                      rows={5}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      <span className="checkbox-custom"></span>
                      Subscribe to Newsletter
                    </label>
                  </div>

                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>

              {/* Right Side - Chat Info */}
              <div className="contact-info-wrapper">
                <div className="chat-card">
                  <div className="chat-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="chat-title">Chat with us</h3>
                  <p className="chat-description">Get in touch over email.</p>
                  <a href="mailto:sales@goquant.io" className="chat-email">
                    sales@goquant.io
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;