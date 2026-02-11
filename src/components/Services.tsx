import React, { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';
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
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "service"] | order(_createdAt asc)`);

        const posts: BlogPost[] = data.map((service: any) => ({
          _id: service._id,
          title: service.title,
          description: service.description,
          category: 'Technology',
          date: new Date(service._createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          image: service.icon,
        }));

        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="container">
            <div className="blog-badge">Blog</div>
            <h1 className="hero-title">The latest insights</h1>
            <p className="hero-subtitle">Stay informed on GoQuant's latest updates.</p>
          </div>
        </section>

        {/* Content */}
        <section className="blog-content-section">
          <div className="container">
            <div className="blog-layout">
              {/* Blog Posts */}
              <div className="blog-posts-area">
                <div className="blog-grid">
                  {filteredPosts.map((post) => (
                    <article key={post._id} className="blog-card">
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
                    </article>
                  ))}
                </div>

                <div className="load-more-container">
                  <button className="load-more-btn">Load More</button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="blog-sidebar">
                <div className="sidebar-search">
                  <input
                    type="text"
                    placeholder="Search Post"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button className="search-btn">
                    <span>🔍</span>
                  </button>
                </div>

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
