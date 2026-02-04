import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sanityClient, urlFor } from '../lib/sanity.ts';
import type { Project } from '../types/index';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = ['All', 'Web App', 'Mobile App', 'UI/UX', 'E-commerce', 'API'];

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
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback demo data
        const demoProjects: Project[] = [
          {
            _id: '1',
            title: 'E-Commerce Platform',
            description: 'Full-featured online shopping platform with payment integration',
            image: { asset: { _ref: '', _type: 'image' } },
            category: 'E-commerce',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            projectUrl: '#',
            completedDate: '2024-01'
          },
          {
            _id: '2',
            title: 'Fitness Tracking App',
            description: 'Mobile app for tracking workouts and nutrition',
            image: { asset: { _ref: '', _type: 'image' } },
            category: 'Mobile App',
            technologies: ['React Native', 'Firebase', 'Redux'],
            githubUrl: '#',
            completedDate: '2023-12'
          },
          {
            _id: '3',
            title: 'SaaS Dashboard',
            description: 'Analytics dashboard with real-time data visualization',
            image: { asset: { _ref: '', _type: 'image' } },
            category: 'Web App',
            technologies: ['Next.js', 'TypeScript', 'Chart.js', 'PostgreSQL'],
            projectUrl: '#',
            completedDate: '2023-11'
          },
          {
            _id: '4',
            title: 'Restaurant Website',
            description: 'Modern restaurant website with online ordering',
            image: { asset: { _ref: '', _type: 'image' } },
            category: 'Web App',
            technologies: ['React', 'Tailwind CSS', 'Sanity CMS'],
            projectUrl: '#',
            completedDate: '2023-10'
          },
          {
            _id: '5',
            title: 'Design System',
            description: 'Comprehensive UI component library',
            image: { asset: { _ref: '', _type: 'image' } },
            category: 'UI/UX',
            technologies: ['Figma', 'React', 'Storybook'],
            completedDate: '2023-09'
          },
          {
            _id: '6',
            title: 'Payment Gateway API',
            description: 'Secure payment processing API',
            image: { asset: { _ref: '', _type: 'image' } },
            category: 'API',
            technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
            githubUrl: '#',
            completedDate: '2023-08'
          }
        ];
        setProjects(demoProjects);
        setFilteredProjects(demoProjects);
      }
    };

    fetchProjects();
  }, []);

  const handleFilter = (category: string) => {
    setActiveFilter(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  return (
    <section className="portfolio section" id="work" ref={ref}>
      <div className="container">
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Featured Work</h2>
          <p className="portfolio-subtitle">
            Showcasing projects that bring ideas to life
          </p>
        </motion.div>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div className="portfolio-grid">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                className="project-card card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <div className="project-image">
                  {project.image?.asset?._ref ? (
                    <img src={urlFor(project.image).width(600).url()} alt={project.title} />
                  ) : (
                    <div className="project-placeholder">
                      <span className="placeholder-icon">🚀</span>
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.projectUrl && (
                        <a href={project.projectUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                          <span>View Live</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
