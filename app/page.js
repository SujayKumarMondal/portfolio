 'use client';

 'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GithubContributionsClient from './GithubContributionsClient';
import profileImage from '../assets/img bg.png';

const skills = [
  // Languages
  { name: "Python", icon: "https://img.icons8.com/color/48/python.png" },
  { name: "SQL", icon: "https://img.icons8.com/color/48/sql.png" },

  // Backend
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "REST API", icon: "https://img.icons8.com/color/48/api.png" },

  // Databases
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "SQLite", icon: "https://cdn.simpleicons.org/sqlite/003B57" },
  { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D" },

  // Messaging
  { name: "Apache Kafka", icon: "https://cdn.simpleicons.org/apachekafka/231F20" },

  // Authentication & Security
  { name: "JWT", icon: "https://img.icons8.com/color/48/security-checked.png" },
  { name: "OAuth2", icon: "https://cdn.simpleicons.org/oauth/EB5424" },

  // DevOps
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717" },

  // Frontend
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },

  // Cloud & Deployment
  { name: "NeonDB", icon: "https://cdn.simpleicons.org/neondb/000000" },
  { name: "Railway", icon: "https://cdn.simpleicons.org/railway/0B0D0E" },
  { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7" },
  { name: "Netlify", icon: "https://cdn.simpleicons.org/netlify/00C7B7" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000" },

  // AI
  { name: "OpenAI API", icon: "https://cdn.simpleicons.org/openai/412991" },
  { name: "Groq API", icon: "https://cdn.simpleicons.org/groq/F55036" },

  // Tools
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "DBeaver", icon: "https://cdn.simpleicons.org/dbeaver/372923" },
];

const expertise = [
  {
    title: 'Backend Development',
    description:
      'Develop scalable and maintainable backend applications using FastAPI and Python, following clean architecture and RESTful API best practices.',
    tags: ['Python', 'FastAPI', 'REST API'],
  },
  {
    title: 'Authentication & Security',
    description:
      'Implement secure authentication systems with JWT, OAuth2, RBAC, Multi-Factor Authentication (MFA), email verification, and password recovery workflows.',
    tags: ['JWT', 'OAuth2', 'MFA'],
  },
  {
    title: 'Database Engineering',
    description:
      'Design efficient relational databases using PostgreSQL and MySQL, with SQLAlchemy ORM, indexing, query optimization, and Alembic migrations.',
    tags: ['PostgreSQL', 'MySQL', 'SQLAlchemy'],
  },
  {
    title: 'AI & API Integration',
    description:
      'Integrate AI services and third-party APIs to build intelligent applications, chatbots, and automation workflows with modern backend architectures.',
    tags: ['OpenAI', 'Groq API', 'AI Integration'],
  },
  {
    title: 'Deployment & DevOps',
    description:
      'Containerize applications with Docker and deploy production-ready services on Render, Railway, Netlify, and Vercel using Git-based workflows.',
    tags: ['Docker', 'Render', 'Railway'],
  },
  {
    title: 'Performance & Scalability',
    description:
      'Optimize backend performance using Redis caching, asynchronous programming, background tasks, and event-driven communication with Kafka.',
    tags: ['Redis', 'Kafka', 'AsyncIO'],
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

  // Ensure the page starts at the top on hard refresh / direct open.
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      const prev = history.scrollRestoration;
      try {
        history.scrollRestoration = 'manual';
      } catch (e) {}
      // Force scroll to top on initial load to avoid restored scroll positions
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return () => {
        try {
          history.scrollRestoration = prev;
        } catch (e) {}
      };
    }
    return undefined;
  }, []);

  const [sending, setSending] = useState(false);

  async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message'),
    };

    setSending(true);
    try {
      const resp = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (resp.ok) {
        alert('Message sent — Please check the email inbox.');
        form.reset();
      } else {
        const j = await resp.json();
        alert('Error sending message: ' + (j.error || resp.statusText));
      }
    } catch (err) {
      alert('Error sending message: ' + err.message);
    } finally {
      setSending(false);
    }
  }

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
            <a href="https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.89 6 2.49 6S0 4.88 0 3.5 1.09 1 2.49 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM7 8h4.8v2.2h.1c.7-1.3 2.4-2.2 4-2.2 3.3 0 6 2.6 6 6.8V24h-5v-8.3c0-2-1-3.3-2.6-3.3-1.5 0-2.4 1-2.8 2v9.6H7V8z" />
              </svg>
            </a>
            <a href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 .5C5.73.5.75 5.48.75 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.36-1.29-1.72-1.29-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.69.42.36.79 1.07.79 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56C20 21.39 23.25 17.08 23.25 12 23.25 5.5 18.27.5 12 .5z" />
              </svg>
            </a>
            <a href="mailto:sujay.mondal.10.01.1998@gmail.com" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4h16v16H4z" fill="currentColor" opacity="0" />
                <path d="M22 6L12 13 2 6" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="profile-frame">
            <Image src={profileImage} alt="Sujay profile" fill className="profile-pic" priority />
          </div>
          <div className="hero-badge">
            <strong>Available for opportunities</strong>
            <span>Backend • APIs • Auth</span>
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

      <section className="section reveal" id="contributions">
        <div className="container">
          <h2 className="section-heading"><span>02</span> GitHub Contributions</h2>
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

      <section className="section reveal" id="skills">
        <div className="container">
          <h2 className="section-heading"><span>03</span> Skills & Abilities</h2>
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
          <h2 className="section-heading"><span>04</span> Backend Expertise</h2>
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
          <h2 className="section-heading"><span>05</span> Featured Projects</h2>
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

      

      <section className="section reveal" id="experience">
        <div className="container grid-2">
          <div className="info-card">
            <h2 className="section-heading"><span>06</span> Education</h2>
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
            <h2 className="section-heading"><span>07</span> Why Work With Me</h2>
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
            <h2 className="section-heading"><span>08</span> Connect With Me</h2>
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
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Tell me about your project or opportunity" required></textarea>
              <button type="submit" className="btn btn-primary" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} Sujay Kumar Mondal. Built with Next.js for a modern professional portfolio.</div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.89 6 2.49 6S0 4.88 0 3.5 1.09 1 2.49 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM7 8h4.8v2.2h.1c.7-1.3 2.4-2.2 4-2.2 3.3 0 6 2.6 6 6.8V24h-5v-8.3c0-2-1-3.3-2.6-3.3-1.5 0-2.4 1-2.8 2v9.6H7V8z" />
              </svg>
            </a>
            <a href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 .5C5.73.5.75 5.48.75 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.36-1.29-1.72-1.29-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.69.42.36.79 1.07.79 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56C20 21.39 23.25 17.08 23.25 12 23.25 5.5 18.27.5 12 .5z" />
              </svg>
            </a>
            <a href="mailto:sujay.mondal.10.01.1998@gmail.com" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4h16v16H4z" fill="currentColor" opacity="0" />
                <path d="M22 6L12 13 2 6" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
