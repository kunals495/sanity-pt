import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Database (SQL/NoSQL)', level: 82 },
    { name: 'Cloud Services (AWS/Azure)', level: 80 }
  ];

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="about-text">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="about-description">
                I'm a passionate full-stack developer and designer with over 5 years of experience 
                crafting beautiful, high-performance digital solutions. My journey in tech has been 
                driven by a love for creating intuitive user experiences and solving complex problems.
              </p>
              
              <p className="about-description">
                I specialize in modern web technologies and have a proven track record of delivering 
                projects that not only meet but exceed client expectations. From concept to deployment, 
                I'm committed to quality, innovation, and user satisfaction.
              </p>
              
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🎯</div>
                  <div>
                    <h4>Mission-Driven</h4>
                    <p>Focused on creating meaningful digital experiences that make a difference</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">⚡</div>
                  <div>
                    <h4>Fast & Reliable</h4>
                    <p>Delivering high-quality work on time, every time</p>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">🤝</div>
                  <div>
                    <h4>Collaborative</h4>
                    <p>Working closely with clients to bring their vision to life</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="about-skills">
            <motion.h3
              className="skills-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Technical Skills
            </motion.h3>
            
            <div className="skills-list">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-progress"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
