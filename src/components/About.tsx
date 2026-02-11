import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { sanityClient} from '../lib/sanity'; // Adjust import path as needed

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  order?: number;
}

interface TeamMember {
  name: string;
  title: string;
  company?: string;
  image: string;
  type?: string;
  order?: number;
}

interface Investor {
  name: string;
  logo?: string;
  logoText?: string;
  isPrimary?: boolean;
  order?: number;
}

// Fallback dummy data
const dummyTimelineData: TimelineItem[] = [
  {
    year: '2026',
    title: 'Foundation & Software Focus',
    description:
      'In 2026, Malnut was established as an IT services and software development company with a clear focus on building scalable, high-performance digital solutions. The company brought together skilled engineers and technology specialists to deliver reliable, production-ready software tailored to modern business needs.'
  }
];

const dummyLeadershipTeam: TeamMember[] = [
  {
    name: 'Denis Dariotis',
    title: 'Founder & CEO',
    company: 'GoQuant',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Anthony Fiumidinisi',
    title: 'Director and President',
    company: 'GoQuant',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Daniel Cohen',
    title: 'Head of Sales',
    company: 'GoQuant',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Mradul Sahani',
    title: 'Head of Engineering',
    company: 'GoQuant',
    image: '/api/placeholder/300/300'
  }
];

const dummyAdvisors: TeamMember[] = [
  {
    name: 'Boris Bohrer-Bilowitzki',
    title: 'CEO, Concordium. Founding Partner, Copper',
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Petter Kolm',
    title: "Professor, NYU Courant Institute Mathematics in Finance Master's Program",
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Joe Zambrano',
    title: 'CTO, STS Capital. Former CTO, Pattern Research',
    image: '/api/placeholder/300/300'
  }
];

const dummyInvestors: Investor[] = [
  { name: 'TYR CAPITAL', logoText: 'TYR CAPITAL', isPrimary: true, order: 1 },
  { name: 'GSR', logoText: 'GSR', isPrimary: true, order: 2 },
  { name: 'Capital Union Bank', logoText: 'CAPITAL UNION BANK', isPrimary: false, order: 3 },
  { name: 'Lombard Odier', logoText: 'LOMBARD ODIER', isPrimary: false, order: 4 },
  { name: 'Concordium', logoText: 'CONCORDIUM', isPrimary: false, order: 5 },
  { name: 'copper.co', logoText: 'copper.co', isPrimary: false, order: 6 },
  { name: 'FRNT', logoText: 'FRNT', isPrimary: false, order: 7 }
];

const About: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // State for Sanity data - Initialize with dummy data immediately
  const [timelineData, setTimelineData] = useState<TimelineItem[]>(dummyTimelineData);
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>(dummyLeadershipTeam);
  const [advisors, setAdvisors] = useState<TeamMember[]>(dummyAdvisors);
  const [investors, setInvestors] = useState<Investor[]>(dummyInvestors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Timeline
        const timelineQuery = `*[_type == "timeline"] | order(order asc) {
          year,
          title,
          description,
          order
        }`;
        const timelineResult = await sanityClient.fetch(timelineQuery);
        
        // Fetch Team Members
        const teamQuery = `*[_type == "teamMember"] | order(order asc) {
          name,
          title,
          company,
          "image": image.asset->url,
          type,
          order
        }`;
        const teamResult = await sanityClient.fetch(teamQuery);
        
        // Fetch Investors
        const investorQuery = `*[_type == "investor"] | order(order asc) {
          name,
          "logo": logo.asset->url,
          logoText,
          isPrimary,
          order
        }`;
        const investorResult = await sanityClient.fetch(investorQuery);

        // Replace with real data only if available
        if (timelineResult && timelineResult.length > 0) {
          setTimelineData(timelineResult);
        }
        
        if (teamResult && teamResult.length > 0) {
          const leadership = teamResult.filter((member: TeamMember) => member.type === 'leadership');
          const advisorList = teamResult.filter((member: TeamMember) => member.type === 'advisor');
          
          if (leadership.length > 0) {
            setLeadershipTeam(leadership);
          }
          
          if (advisorList.length > 0) {
            setAdvisors(advisorList);
          }
        }
        
        if (investorResult && investorResult.length > 0) {
          setInvestors(investorResult);
        }
        
      } catch (error) {
        console.error('Error fetching Sanity data:', error);
        // Keep dummy data on error - no action needed as state already has dummy data
      }
    };

    fetchData();
  }, []);

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
  }, [timelineData, leadershipTeam, advisors, investors]); // Re-run when data changes

  const primaryInvestors = investors.filter(inv => inv.isPrimary);
  const supportedInvestors = investors.filter(inv => !inv.isPrimary);

  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero animate-on-scroll">
          <div className="container">
            <div className="hero-badge">Who we are</div>
            <h1 className="hero-title">About Us</h1>
          </div>
        </section>

        <section className="story-section animate-on-scroll">
          <div className="container">
            <div className="story-grid">
              <div className="story-content">
                <div className="section-label">STORY</div>
                <h2 className="story-title">
                  Our <span className="highlight">Journey</span>
                </h2>
                <p className="story-description">
                  <b>Malnut</b> is an IT services and software development company founded in 2026. The company
                  focuses on delivering scalable, high-performance software solutions and digital systems for
                  startups and enterprises across industries.
                </p>
              </div>

              <div className="timeline">
                {timelineData.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="timeline-dot"></div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-year">{item.year}</div>
                      <h3 className="timeline-title">{item.title}</h3>
                      <p className="timeline-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section animate-on-scroll">
          <div className="container">
            <div className="mission-badge">Our Drive</div>
            <h2 className="mission-title">Mission</h2>
            <p className="mission-statement">
              Malnut's mission is to build, deliver,
              and maintain enterprise-grade
              software and IT solutions
              that power modern digital businesses.
            </p>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="team-section animate-on-scroll">
          <div className="container">
            <div className="team-badge">Team</div>
            <h2 className="team-title">Leadership Team</h2>
            <div className="team-grid">
              {leadershipTeam.map((member, index) => (
                <div 
                  key={index} 
                  className="team-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="team-image">
                    <img 
                      src={member.image || '/api/placeholder/300/300'} 
                      alt={member.name} 
                    />
                  </div>
                  <div className="team-info">
                    <div className="team-role">{member.title}</div>
                    <h3 className="team-name">{member.name}</h3>
                    {member.company && (
                      <div className="team-company">{member.company}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisors Section */}
        <section className="advisors-section animate-on-scroll">
          <div className="container">
            <div className="advisors-badge">Team</div>
            <h2 className="advisors-title">Advisors</h2>
            <div className="advisors-grid">
              {advisors.map((advisor, index) => (
                <div 
                  key={index} 
                  className="advisor-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="advisor-image">
                    <img 
                      src={advisor.image || '/api/placeholder/300/300'} 
                      alt={advisor.name} 
                    />
                  </div>
                  <div className="advisor-info">
                    <h3 className="advisor-name">{advisor.name}</h3>
                    <p className="advisor-title">{advisor.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investors Section */}
        <section className="investors-section animate-on-scroll">
          <div className="container">
            <div className="investors-badge">OUR INVESTORS</div>
            <h2 className="investors-title">Backed by</h2>
            
            {primaryInvestors.length > 0 && (
              <div className="investors-primary">
                {primaryInvestors.map((investor, index) => (
                  <div key={index} className="investor-logo primary">
                    {investor.logo ? (
                      <img src={investor.logo} alt={investor.name} />
                    ) : (
                      investor.logoText || investor.name
                    )}
                  </div>
                ))}
              </div>
            )}

            {supportedInvestors.length > 0 && (
              <div className="investors-supported">
                <h3 className="supported-title">Supported by members of</h3>
                <div className="investors-grid">
                  {supportedInvestors.map((investor, index) => (
                    <div key={index} className="investor-logo">
                      {investor.logo ? (
                        <img src={investor.logo} alt={investor.name} />
                      ) : (
                        investor.logoText || investor.name
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default About;