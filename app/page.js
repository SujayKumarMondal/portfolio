'use client';

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GithubContributionsClient from './GithubContributionsClient';
import profileImage from '../assets/img bg.png';

const skills = [
  { name: 'Python', icon: 'https://img.icons8.com/color/48/000000/python--v1.png' },
  { name: 'FastAPI', icon: 'https://img.icons8.com/color/48/000000/fastapi.png' },
  { name: 'Django', icon: 'https://img.icons8.com/color/48/000000/django.png' },
  { name: 'PostgreSQL', icon: 'https://img.icons8.com/color/48/000000/postgreesql.png' },
  { name: 'Redis', icon: 'https://img.icons8.com/color/48/000000/redis.png' },
  { name: 'Kafka', icon: 'https://img.icons8.com/ios-filled/50/000000/apache-kafka.png' },
  { name: 'Docker', icon: 'https://img.icons8.com/color/48/000000/docker.png' },
  { name: 'AWS', icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png' },
];

const expertise = [
  {
    title: 'API Design',
    description: 'Scalable REST and WebSocket APIs built with FastAPI, clear versioning, validation, and secure auth.',
    tags: ['FastAPI', 'REST', 'WebSockets'],
  },
  {
    title: 'Database Architecture',
    description: 'PostgreSQL and MySQL schema design, indexing, and query optimization for robust backend systems.',
    tags: ['PostgreSQL', 'MySQL', 'SQLAlchemy'],
  },
  {
    title: 'Security & Identity',
    description: 'JWT/OAuth2 flows, RBAC, SSO integrations, and secure password handling for production services.',
    tags: ['JWT', 'OAuth2', 'SSO'],
  },
  {
    title: 'Performance & Reliability',
    description: 'Redis caching, Kafka event flows, observability, and CI/CD practices for reliable deployment.',
    tags: ['Redis', 'Kafka', 'CI/CD'],
  },
];

const projects = [
  {
    name: 'Chatbot Platform',
    description: 'A full-stack AI chatbot application combining Django backend services with a modern frontend experience.',
    category: 'Full-Stack AI Web Application',
    links: {
      view: 'https://chatpaat.netlify.app/',
      code: 'https://github.com/SujayKumarMondal/ChatBot-FastAPI-NextJS',
    },
  },
  {
    name: 'FastAPI OAuth2 Service',
    description: 'A secure OAuth2 implementation for FastAPI applications with comprehensive user management and token handling.',
    category: 'Python FastAPI Project',
    links: {
      view: 'https://github.com/SujayKumarMondal/FastAPI-OAuth2',
      code: 'https://github.com/SujayKumarMondal/FastAPI-OAuth2',
    },
  },
  {
    name: 'FastAPI MFA',
    description: 'Secure authentication architecture using FastAPI, OAuth2, JWT, and bcrypt-based password handling.',
    category: 'Backend Security',
    links: {
      view: 'https://github.com/SujayKumarMondal/FastAPI-MFA',
      code: 'https://github.com/SujayKumarMondal/FastAPI-MFA',
    },
  },
  {
    name: 'Market Data Platform',
    description: 'An e-commerce and analytics platform built around FastAPI microservices and live data integration.',
    category: 'Microservices',
    links: {
      view: 'https://github.com/SujayKumarMondal/finhub-market-data',
      code: 'https://github.com/SujayKumarMondal/finhub-market-data',
    },
  },
];

const timeline = [
  {
    title: 'MCA — Brainware University',
    meta: '2021 – 2023 · 88.74%',
    description: 'Completed my Master of Computer Applications with strong focus on software engineering and backend systems.',
  },
  {
    title: 'B.Sc. in Computer Science — Syamaprasad College',
    meta: '2018 – 2021 · 65%',
    description: 'Built a solid foundation in programming, algorithms, databases, and system design.',
  },
  {
    title: 'Higher Secondary — Tiljala High School',
    meta: '2015 – 2016 · 65.6%',
    description: 'Completed school education with consistent academic progress and early exposure to technology.',
  },
];

export default function Home() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header reveal">
        <div className="container navbar">
          <Link href="#home" className="logo">SUJAY</Link>
          <nav className="nav-links" aria-label="Primary">
            <Link href="#about" className="active">About</Link>
            <Link href="#skills">Skills</Link>
            <Link href="#projects">Projects</Link>
            <Link href="#experience">Experience</Link>
            <Link href="#contact">Contact</Link>
          </nav>
        </div>
      </header>

      <section className="container hero reveal" id="home">
        <div>
          <div className="eyebrow">Python Backend Developer • FastAPI • PostgreSQL</div>
          <h1>
            Building reliable backend systems with <span>clean architecture</span> and modern engineering practices.
          </h1>
          <p>
            I’m Sujay Kumar Mondal, a backend developer with 3+ years of experience crafting production-ready APIs,
            secure authentication systems, and scalable services for real-world products.
          </p>
          <div className="hero-actions">
            <Link href="#projects" className="btn btn-primary">View Projects</Link>
            <Link href="#contact" className="btn btn-secondary">Connect With Me</Link>
            <a href="/SKM_CV_2026.html" target="_blank" rel="noreferrer" className="btn btn-secondary">Check my resume</a>
            <a href="/SKM_CV_2026.html?download=1" target="_blank" rel="noreferrer" className="btn btn-primary">Download resume</a>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer" aria-label="GitHub">gh</a>
            <a href="mailto:sujay.mondal.10.01.1998@gmail.com" aria-label="Email">mail</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="profile-frame">
            <Image src={profileImage} alt="Sujay profile" fill className="profile-pic" priority />
          </div>
          <div className="hero-badge">
            <strong>Available for opportunities</strong>
            <span>Backend • APIs • System Design</span>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container grid-2">
          <div className="info-card">
            <h2 className="section-heading"><span>01</span> About Me</h2>
            <p className="section-subtext">
              I specialize in building secure, maintainable, and high-performance backend systems using Python, FastAPI,
              PostgreSQL, Redis, and cloud-friendly tooling.
            </p>
            <ul className="about-list">
              <li>3+ years of hands-on backend engineering experience.</li>
              <li>Strength in API design, auth systems, and scalable database architecture.</li>
              <li>Comfortable working across microservices, integrations, and deployment pipelines.</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Quick Facts</h3>
            <p><strong>Phone:</strong> +91 8617228703</p>
            <p><strong>Location:</strong> Kolkata, India</p>
            <p><strong>Email:</strong> sujay.mondal.10.01.1998@gmail.com</p>
            <p><strong>GitHub:</strong> github.com/SujayKumarMondal</p>
            <div className="tag-row">
              <span className="tag">Backend Engineering</span>
              <span className="tag">System Design</span>
              <span className="tag">Scalable APIs</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="skills">
        <div className="container">
          <h2 className="section-heading"><span>02</span> Skills & Abilities</h2>
          <p className="section-subtext">
            My toolkit focuses on backend engineering, API reliability, and production-grade data systems.
          </p>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <img src={skill.icon} alt={skill.name} />
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="expertise">
        <div className="container">
          <h2 className="section-heading"><span>03</span> Backend Expertise</h2>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <div className="expertise-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="projects">
        <div className="container">
          <h2 className="section-heading"><span>04</span> Featured Projects</h2>
          <p className="section-subtext">
            A curated set of projects that reflect my experience in backend engineering, integrations, and full-stack collaboration.
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-icon">⚙️</div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tag">{project.category}</div>
                <div className="project-links">
                  <a href={project.links.view} target="_blank" rel="noreferrer">Live / Repo</a>
                  <a href={project.links.code} target="_blank" rel="noreferrer">Source Code</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="contributions">
        <div className="container">
          <h2 className="section-heading"><span>05</span> GitHub Contributions</h2>
          <p className="section-subtext">
            Live activity from my GitHub profile, shown in a yearly contribution board style.
          </p>
          <div className="contributions-card">
            <div className="contributions-header">
              <div>
                <h3>GitHub contribution heatmap</h3>
                <p>Track commits, PRs, and issue activity across the year.</p>
              </div>
              <a className="btn btn-secondary" href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer">
                View GitHub Profile
              </a>
            </div>
            <div className="contributions-board">
              <GithubContributionsClient />
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="experience">
        <div className="container grid-2">
          <div className="info-card">
            <h2 className="section-heading"><span>05</span> Education</h2>
            <div className="timeline-list">
              {timeline.map((item) => (
                <div className="timeline-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p><strong>{item.meta}</strong></p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="info-card">
            <h2 className="section-heading"><span>06</span> Why Work With Me</h2>
            <p className="section-subtext">
              I focus on writing maintainable code, understanding business requirements, and delivering products that are stable,
              secure, and ready for growth.
            </p>
            <ul className="about-list">
              <li>Problem-first engineering mindset with strong debugging ability.</li>
              <li>Clear communication and ownership from planning to deployment.</li>
              <li>Passion for building systems that scale cleanly over time.</li>
              <li>Deliver pragmatic solutions balancing speed and long-term maintainability.</li>
              <li>Emphasis on automated testing and reliable CI pipelines.</li>
              <li>Experience with observability, logging, and performance tuning.</li>
              <li>Security-first approach with threat modeling and secure defaults.</li>
              <li>Fast ramp-up and clear technical documentation for teams.</li>
              <li>Collaborative team player who mentors and shares knowledge.</li>
              <li>Focus on measurable outcomes and shipping customer value quickly.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section reveal" id="contact">
        <div className="container contact-grid">
          <div className="contact-card">
            <h2 className="section-heading"><span>07</span> Connect With Me</h2>
            <p>
              Whether you want to discuss a product idea, explore a collaboration, or discuss a backend opportunity,
              I’m always open to a conversation.
            </p>
            <p><strong>Email:</strong> sujay.mondal.10.01.1998@gmail.com</p>
            <p><strong>Phone:</strong> +91 8617228703</p>
            <p><strong>Location:</strong> Kolkata, India</p>
          </div>
          <div className="contact-card">
            <h3>Send a message</h3>
            <p>Leave your details and I’ll get back to you about your project, role, or collaboration idea.</p>
            <form className="contact-form" action="https://formsubmit.co/sujay.mondal.10.01.1998@gmail.com" method="POST">
              <input type="hidden" name="_subject" value="New portfolio enquiry from your website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Tell me about your project or opportunity" required></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">© 2026 Sujay Kumar Mondal. Built with Next.js for a modern professional portfolio.</div>
      </footer>
    </main>
  );
}
