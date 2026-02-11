import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sanityClient } from '../lib/sanity';
import type { Service } from '../types/index';
import Navbar from './Navbar';
import Footer from './Footer';
import './Services.css';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image?: string;
  readMoreUrl?: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll<HTMLElement>('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "service"] | order(_createdAt asc)`);
        setServices(data);
        
        // Transform services to blog posts format
        const posts: BlogPost[] = data.map((service: Service, index: number) => ({
          _id: service._id,
          title: service.title,
          description: service.description,
          category: 'Technology',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          image: service.icon,
        }));
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching services:', error);
        
        // Fallback demo blog posts
        const demoPosts: BlogPost[] = [
          {
            _id: '1',
            title: 'GoQuant, Copper, and GSR Partner to Launch GoDark — Crypto\'s First Institutional Dark Pool',
            description: 'Announcing the launch of GoDark, the first institutional dark pool for cryptocurrency trading.',
            category: 'Press Release',
            date: 'Oct. 31, 2025',
            image: '/api/placeholder/600/400',
          },
          {
            _id: '2',
            title: 'Building the Future of Digital Asset Infrastructure | TEDx Talk',
            description: 'Denis Dariotis shares insights on the evolution of digital asset trading infrastructure.',
            category: 'Technology',
            date: 'June 19, 2025',
            image: '/api/placeholder/600/400',
          },
          {
            _id: '3',
            title: 'PART 2 - Founder Insights: Denis on GoQuant\'s Evolution from Market Data to Advanced Execution Systems',
            description: 'Deep dive into GoQuant\'s journey from market data provider to comprehensive trading infrastructure.',
            category: 'Technology',
            date: 'Feb 19, 2025',
            image: '/api/placeholder/600/400',
          },
          {
            _id: '4',
            title: 'PART 3 - Founder Insights: Revolutionizing Digital Asset Trading Infrastructure',
            description: 'Exploring the future of institutional-grade cryptocurrency trading technology.',
            category: 'Technology',
            date: 'Aug 6, 2024',
            image: '/api/placeholder/600/400',
          },
        ];
        setBlogPosts(demoPosts);
      }
    };

    fetchServices();
  }, []);

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Navbar />
      
      <main className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero animate-on-scroll">
          <div className="container">
            <div className="blog-badge">Blog</div>
            <h1 className="hero-title">The latest insights</h1>
            <p className="hero-subtitle">Stay informed on GoQuant's latest updates.</p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="blog-content-section animate-on-scroll">
          <div className="container">
            <div className="blog-layout">
              {/* Blog Posts Grid */}
              <div className="blog-posts-area">
                <div className="blog-grid">
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post._id}
                      className="blog-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="blog-image">
                        {post.image ? (
                          <img src={post.image} alt={post.title} />
                        ) : (
                          <div className="blog-image-placeholder">
                            <span>📰</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="blog-content">
                        <div className="blog-meta">
                          <span className="blog-date">{post.date}</span>
                          <span className="blog-category">{post.category}</span>
                        </div>
                        
                        <h3 className="blog-title">{post.title}</h3>
                        
                        <a href={post.readMoreUrl || '#'} className="blog-read-more">
                          Read More
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="load-more-container">
                  <button className="load-more-btn">Load More</button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="blog-sidebar">
                {/* Search */}
                <div className="sidebar-search">
                  <input
                    type="text"
                    placeholder="Search Post  邮K"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-btn">
                    <span>🔍</span>
                  </button>
                </div>

                {/* Recent Posts */}
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Recent Posts</h3>
                  <div className="recent-posts">
                    {recentPosts.map((post) => (
                      <div key={post._id} className="recent-post-item">
                        {post.image && (
                          <div className="recent-post-image">
                            <img src={post.image} alt={post.title} />
                          </div>
                        )}
                        <div className="recent-post-content">
                          <h4 className="recent-post-title">{post.title}</h4>
                          <div className="recent-post-meta">
                            <span className="recent-post-date">{post.date}</span>
                            <span className="recent-post-category">{post.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Services;