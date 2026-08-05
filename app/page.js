 'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GithubContributionsClient from './GithubContributionsClient';
import profileImage from '../assets/img bg.png';

const skills = [
  { name: 'Python', icon: 'https://img.icons8.com/color/48/python.png' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
  { name: 'REST APIs', icon: 'https://img.icons8.com/color/48/api.png' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'SQLite', icon: 'https://cdn.simpleicons.org/sqlite/003B57' },
  { name: 'SQLAlchemy', icon: 'https://cdn.simpleicons.org/sqlalchemy/F00000' },
  { name: 'Alembic', icon: 'https://cdn.simpleicons.org/alembic/2B6DA1' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
  { name: 'Kafka', icon: 'https://cdn.simpleicons.org/apachekafka/231F20' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717' },
  { name: 'JWT', icon: 'https://img.icons8.com/color/48/security-checked.png' },
  { name: 'OAuth2', icon: 'https://cdn.simpleicons.org/oauth/EB5424' },
  { name: 'MFA', icon: 'https://cdn.simpleicons.org/1password/6E4BFF' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'OpenAI API', icon: 'https://cdn.simpleicons.org/openai/412991' },
  { name: 'Groq API', icon: 'https://cdn.simpleicons.org/groq/F55036' },
  { name: 'Render', icon: 'https://cdn.simpleicons.org/render/46E3B7' },
  { name: 'Railway', icon: 'https://cdn.simpleicons.org/railway/0B0D0E' },
  { name: 'Netlify', icon: 'https://cdn.simpleicons.org/netlify/00C7B7' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' },
];

const expertise = [
  {
    title: 'Backend Development',
    description: 'Designing clean, testable APIs and backend services with Python, FastAPI, and maintainable architecture patterns.',
    tags: ['Python', 'FastAPI', 'REST API'],
  },
  {
    title: 'Authentication & Security',
    description: 'Building secure auth flows with JWT, OAuth2, RBAC, MFA, and pragmatic security defaults across services.',
    tags: ['JWT', 'OAuth2', 'MFA'],
  },
  {
    title: 'Database Engineering',
    description: 'Structuring relational data models, migrations, and performant data access using PostgreSQL and SQLAlchemy.',
    tags: ['PostgreSQL', 'SQLAlchemy', 'Alembic'],
  },
  {
    title: 'AI & API Integration',
    description: 'Integrating external AI and API services into backend systems to ship useful, connected product experiences.',
    tags: ['OpenAI', 'Groq API', 'AI Integration'],
  },
  {
    title: 'Deployment & DevOps',
    description: 'Shipping containerized and cloud-native services with Git-based delivery pipelines and resilient deployment workflows.',
    tags: ['Docker', 'Render', 'Railway'],
  },
  {
    title: 'Performance & Scalability',
    description: 'Balancing async execution, caching, and event-driven communication for reliable and scalable backend growth.',
    tags: ['Redis', 'Kafka', 'AsyncIO'],
  },
];

const projects = [
  {
    name: 'ChatPaat',
    description: 'A deployed AI chatbot platform with a modern frontend, FastAPI-based backend, and real product workflows.',
    category: 'AI Web Application',
    tags: ['FastAPI', 'Next.js', 'AI', 'PostgreSQL'],
    links: {
      view: 'https://chatpaat.netlify.app/',
      code: 'https://github.com/SujayKumarMondal/ChatBot-FastAPI-NextJS',
    },
  },
  {
    name: 'FastAPI OAuth2 Service',
    description: 'A secure OAuth2 implementation for FastAPI applications with comprehensive user management and token handling.',
    category: 'Python FastAPI Project',
    tags: ['FastAPI', 'OAuth2', 'JWT', 'Security'],
    links: {
      view: 'https://github.com/SujayKumarMondal/FastAPI-OAuth2',
      code: 'https://github.com/SujayKumarMondal/FastAPI-OAuth2',
    },
  },
  {
    name: 'FastAPI MFA',
    description: 'Secure authentication architecture using FastAPI, OAuth2, JWT, and bcrypt-based password handling.',
    category: 'Backend Security',
    tags: ['FastAPI', 'MFA', 'JWT', 'Auth'],
    links: {
      view: 'https://github.com/SujayKumarMondal/FastAPI-MFA',
      code: 'https://github.com/SujayKumarMondal/FastAPI-MFA',
    },
  },
  {
    name: 'Market Data Platform',
    description: 'An analytics and market-data focused backend project built around FastAPI and live integration patterns.',
    category: 'Microservices',
    tags: ['FastAPI', 'Redis', 'APIs', 'Data'],
    links: {
      view: 'https://github.com/SujayKumarMondal/finhub-market-data',
      code: 'https://github.com/SujayKumarMondal/finhub-market-data',
    },
  },
];

const careerTimeline = [
  {
    company: 'Surelia Infosystems',
    role: 'System Engineer',
    meta: '2023 – Present',
    description: 'Working as a System Engineer with focus on backend systems, workflows, integrations, and production-ready technical delivery.',
  },
];

const timeline = [
  {
    title: 'MCA — Brainware University',
    meta: '2021 – 2023 · 88.74%',
    description: 'Completed my Master of Computer Applications with a strong focus on software engineering and backend systems.',
  },
  {
    title: 'B.Sc. in Computer Science — Syamaprasad College',
    meta: '2018 – 2021 · 65%',
    description: 'Built solid foundations in programming, algorithms, systems, and database design.',
  },
  {
    title: 'Higher Secondary — Tiljala High School',
    meta: '2015 – 2016 · 65.6%',
    description: 'Completed early academic years with consistent progress and an early interest in technology.',
  },
];

const handleNavigate = (targetId) => {
  const element = document.getElementById(targetId);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Home() {
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorMode, setCursorMode] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchMedia = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchMedia);

    if (!reduceMotion) {
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
        { threshold: 0.14 }
      );
      revealElements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const prev = history.scrollRestoration;
    try {
      history.scrollRestoration = 'manual';
    } catch (error) {}
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => {
      try {
        history.scrollRestoration = prev;
      } catch (error) {}
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isTouchDevice) return undefined;

    const moveCursor = (event) => {
      const ring = document.querySelector('.cursor-ring');
      const dot = document.querySelector('.cursor-dot');
      if (ring) {
        ring.style.transform = `translate(${event.clientX - 12}px, ${event.clientY - 12}px)`;
      }
      if (dot) {
        dot.style.transform = `translate(${event.clientX - 2}px, ${event.clientY - 2}px)`;
      }
    };

    const targetEvents = ['a', 'button', '.project-card', '.skill-card', '.expertise-card', '.btn', '.cursor-target'];

    const setMode = (mode) => setCursorMode(mode);
    const onPointerOver = (event) => {
      const clicked = event.target.closest('.project-card');
      if (clicked) {
        setMode('project');
        return;
      }
      if (event.target.closest('a, button')) {
        setMode('link');
      }
    };

    const onPointerLeave = () => setMode('default');

    document.addEventListener('mousemove', moveCursor);
    document.querySelectorAll(targetEvents.join(',')).forEach((element) => {
      element.addEventListener('mouseenter', onPointerOver);
      element.addEventListener('mouseleave', onPointerLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll(targetEvents.join(',')).forEach((element) => {
        element.removeEventListener('mouseenter', onPointerOver);
        element.removeEventListener('mouseleave', onPointerLeave);
      });
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message'),
    };

    setSending(true);
    setToast('');

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setToast('Message sent successfully. Please check your inbox.');
        form.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        setToast(errorData.error || 'Unable to send your message right now.');
      }
    } catch (error) {
      setToast(error.message || 'Unable to send your message right now.');
    } finally {
      setSending(false);
    }
  }

  const stats = useMemo(
    () => [
      { value: '3+', label: 'Years Experience' },
      { value: '20+', label: 'Technologies' },
      { value: '4+', label: 'Projects' },
      { value: '100%', label: 'Backend Focus' },
    ],
    []
  );

  return (
    <main className="page-shell">
      {!isTouchDevice && (
        <>
          <div className="cursor-dot" />
          <div className="cursor-ring" />
        </>
      )}

      <div className="scroll-progress-shell" aria-hidden="true">
        <div className="scroll-progress-track" />
        <div className="scroll-progress-bar" style={{ height: `${Math.max(scrollProgress * 100, 6)}%` }} />
        <div className="scroll-progress-meta">
          <span>TOP</span>
          <button type="button" className="mini-control" onClick={() => handleNavigate('home')}>
            ↑
          </button>
          <button type="button" className="mini-control" onClick={() => handleNavigate('contact')}>
            ↓
          </button>
          <span>END</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container navbar">
          <Link href="#home" className="logo" onClick={() => setMenuOpen(false)}>
            Sujay.
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
              </Link>
            ))}
          </nav>

          <div className="nav-cta">
            <a href="mailto:sujay.mondal.10.01.1998@gmail.com" className="btn btn-secondary btn-compact">
              Let’s Talk →
            </a>
          </div>

          <button
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
            <div className="mobile-menu-card">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((id) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className={activeSection === id ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {id === 'home' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="container hero reveal" id="home">
        <div className="hero-copy">
          <div className="eyebrow">● AVAILABLE FOR BACKEND OPPORTUNITIES</div>
          <h1>
            Python Backend Engineer
            <br />
            <span>Building Systems That Scale.</span>
          </h1>
          <p>
            3+ years building production-ready APIs, authentication systems, scalable backend services and modern cloud-native applications.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary cursor-target">View My Work</a>
            <a href="/SKM_CV_2026.html" target="_blank" rel="noreferrer" className="btn btn-secondary cursor-target">
              Download Resume
            </a>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.89 6 2.49 6S0 4.88 0 3.5 1.09 1 2.49 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM7 8h4.8v2.2h.1c.7-1.3 2.4-2.2 4-2.2 3.3 0 6 2.6 6 6.8V24h-5v-8.3c0-2-1-3.3-2.6-3.3-1.5 0-2.4 1-2.8 2v9.6H7V8z" />
              </svg>
            </a>
            <a href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.75 5.48.75 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.36-1.29-1.72-1.29-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.69.42.36.79 1.07.79 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56C20 21.39 23.25 17.08 23.25 12 23.25 5.5 18.27.5 12 .5z" />
              </svg>
            </a>
            <a href="mailto:sujay.mondal.10.01.1998@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16v16H4z" fill="currentColor" opacity="0" />
                <path d="M22 6L12 13 2 6" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <Image
          src={profileImage}
          alt="Sujay profile"
          width={540}
          height={540}
          className="hero-profile-image"
          priority
        />
      </section>

      <section className="section reveal" id="about">
        <div className="container grid-2">
          <div className="glass-card">
            <h2 className="section-heading"><span>01</span> Engineer. Problem Solver. Builder.</h2>
            <p className="section-subtext">
              I build API-first systems, secure authentication experiences, and scalable backend services that stay clean as products grow.
            </p>
            <div className="stats-grid">
              {stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <div className="profile-summary">
              {/* <div className="profile-photo-shell">
                <Image
                  src={profileImage}
                  alt="Sujay Kumar Mondal"
                  width={180}
                  height={180}
                  priority
                  className="profile-photo"
                />
              </div> */}
              <div className="profile-meta">
                <h3>Professional Summary</h3>
                <p>
                  Python Backend Engineer focused on FastAPI, secure authentication, PostgreSQL, scalable API design, and dependable cloud deployment workflows.
                </p>
              </div>
            </div>
            <p>
              I build API-first systems that are secure, maintainable, and production-minded — from clean service architecture and data modeling to performance-aware delivery and long-term reliability. My work blends backend engineering fundamentals with practical ownership across integrations, infrastructure, and modern product features.
            </p>
            <div className="pipeline">
              <span>Design</span>
              <span>Build</span>
              <span>Test</span>
              <span>Deploy</span>
              <span>Scale</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="skills">
        <div className="container">
          <h2 className="section-heading"><span>02</span> Technology Ecosystem</h2>
          <p className="section-subtext">
            I work across Python, FastAPI, cloud services, and data pipelines with an emphasis on secure, maintainable backend systems.
          </p>
          <div className="skills-layout">
            <div className="skills-panel glass-card">
              <div className="skills-grid">
                {skills.map((skill) => (
                  <div className="skill-card cursor-target" key={skill.name}>
                    <img src={skill.icon} alt={skill.name} loading="lazy" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="expertise">
        <div className="container">
          <h2 className="section-heading"><span>04</span> Expertise</h2>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article className="expertise-card cursor-target" key={item.title}>
                <span className="expertise-number">0{expertise.indexOf(item) + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="projects">
        <div className="container">
          <h2 className="section-heading"><span>05</span> Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card cursor-target" key={project.name}>
                <div className="project-body">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>Case Study</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.links.view} target="_blank" rel="noreferrer">Live Demo →</a>
                    <a href={project.links.code} target="_blank" rel="noreferrer">View Source →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="contributions">
        <div className="container">
          <h2 className="section-heading"><span>06</span> Open Source & Activity</h2>
          <div className="contributions-card">
            <div className="contributions-header">
              <div>
                <h3>GitHub contribution graph</h3>
                <p>Live activity, contribution rhythm, and repository footprint.</p>
              </div>
              <a className="btn btn-secondary" href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer">
                View GitHub →
              </a>
            </div>
            <div className="contributions-board">
              <GithubContributionsClient />
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" id="experience">
        <div className="container">
          <h2 className="section-heading"><span>07</span> Career Journey</h2>
          <div className="timeline-rail">
            <div className="timeline-line" />
            {careerTimeline.map((item) => (
              <div className="timeline-entry" key={`${item.company}-${item.role}`}>
                <div className="timeline-year">{item.meta}</div>
                <div className="timeline-card glass-card">
                  <h3>{item.company}</h3>
                  <p><strong>{item.role}</strong></p>
                  <p>{item.description}</p>
                  <div className="tag-row">
                    <span className="tag">Backend Systems</span>
                    <span className="tag">Production Support</span>
                    <span className="tag">Technical Delivery</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="education">
        <div className="container">
          <h2 className="section-heading"><span>08</span> Education</h2>
          <div className="education-grid">
            {timeline.map((item) => (
              <article key={item.title} className="education-card glass-card">
                <div className="education-meta">{item.meta}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" id="contact">
        <div className="container contact-grid">
          <div className="glass-card contact-cta">
            <h2 className="section-heading"><span>10</span> Have a system to build?</h2>
            <p>Let’s turn the idea into something reliable, scalable and production-ready.</p>
            <div className="contact-cta-actions">
              <a href="mailto:sujay.mondal.10.01.1998@gmail.com" className="btn btn-primary">Email Me →</a>
              <a href="https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/" className="btn btn-secondary" target="_blank" rel="noreferrer">LinkedIn →</a>
              <a href="https://github.com/SujayKumarMondal" className="btn btn-secondary" target="_blank" rel="noreferrer">GitHub →</a>
            </div>
          </div>

          <div className="glass-card contact-form-shell">
            <h3>Send a message</h3>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your Name" required aria-label="Your Name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="Your Email" required aria-label="Your Email" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" placeholder="Tell me about your project or opportunity" required aria-label="Your Message" />
              </label>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
              </button>
              {toast && <p className="form-status" role="status">{toast}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-title">Sujay Kumar Mondal</div>
            <div className="footer-subtitle">Python Backend Engineer</div>
          </div>
          <div className="footer-links">
            <a href="https://github.com/SujayKumarMondal" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:sujay.mondal.10.01.1998@gmail.com">Email</a>
          </div>
          <div className="footer-right">© 2026 · Built with Next.js + ❤️</div>
        </div>
      </footer>
    </main>
  );
}
