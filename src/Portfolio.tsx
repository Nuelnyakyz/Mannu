import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, ArrowUp, Github, Linkedin, Instagram, Menu, X, Pause, Play, Plus, Mail, Phone, RotateCcw } from 'lucide-react';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { FaPython, FaReact, FaJava, FaNodeJs, FaDocker, FaGitAlt, FaPhp } from 'react-icons/fa';
import { SiGo, SiDjango, SiTypescript, SiKotlin, SiFlutter, SiLaravel, SiPostgresql, SiMongodb, SiSupabase, SiRedis } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { Astronaut, BlackHole, Moon, Rocket, ShootingStars, ThoughtSketch } from './SpaceScenes';

const projects = [
  {
    number: '01', name: 'Sanaa', type: 'Art marketplace & social platform',
    headline: 'A fairer home for African art.',
    description: 'A full-stack digital marketplace and social platform helping African artists sell with low commissions, connect with their audience, and grow their creative businesses.',
    image: '/projects/sanaa-logo.webp', imageWidth: 273, imageHeight: 229,
    imageAlt: 'Sanaa African mask logo', imageCaption: 'Sanaa · Digital art & community',
    tags: ['React', 'Django', 'Python', 'PostgreSQL', 'M-Pesa Daraja', 'Paystack'],
    link: 'https://sanaa.art', linkKind: 'live', visual: 'sanaa', role: 'Full-stack development',
    sections: [
      { title: 'The problem', text: 'Traditional gallery markups limit what artists earn. Sanaa gives African artists a low-commission route to selling their work, alongside a community built around their creativity.' },
      { title: 'Marketplace & payments', text: 'Built the React and Django marketplace with PostgreSQL, custom shopping cart and checkout workflows, local M-Pesa STK Push through the Daraja API, and international payments through Paystack.' },
      { title: 'Community & creator tools', text: 'Integrated Posts, Stories, Reels, and direct messaging, plus creator analytics dashboards tracking views, conversions, and revenue.' },
    ],
  },
  {
    number: '02', name: 'SPESIS', type: 'Smart protocol seating intelligence',
    headline: 'Every guest. The right place.',
    description: 'An intelligent seating system for high-protocol government and diplomatic events, from guest-list import to contactless check-in and a live seat map.',
    image: '/projects/spesis-thumbnail.webp', imageWidth: 1536, imageHeight: 1024,
    imageSrcSet: '/projects/spesis-thumbnail-640.webp 640w, /projects/spesis-thumbnail-960.webp 960w, /projects/spesis-thumbnail.webp 1536w',
    imageAlt: 'Concept illustration of priority seating rows connected to a digital guest pass', imageCaption: 'Project concept illustration',
    tags: ['React', 'FastAPI', 'Python', 'PostgreSQL'],
    link: 'https://github.com/Nuelnyakyz/spesis', linkKind: 'source', visual: 'spesis', role: 'Web application development',
    sections: [
      { title: 'The problem', text: 'Government and diplomatic events need seating that respects protocol while remaining manageable for event staff. SPESIS brings guest allocation, check-in, and occupancy into one application.' },
      { title: 'Intelligent allocation', text: 'Administrators import a CSV guest list. The system parses guests and automatically assigns seats by category—VVIP, VIP, or Regular—and designation, including President, Minister, Diplomat, and MP.' },
      { title: 'On the day', text: 'Each guest receives a unique QR code for contactless check-in. A live interactive seat map lets staff visualise occupancy and apply seating overrides in real time.' },
    ],
  },
  {
    number: '03', name: 'SentinAI-Ops', type: 'Server monitoring & threat detection',
    headline: 'A closer watch on your servers.',
    description: 'A self-hosted intrusion detection and server-health monitoring proof of concept, combining three ML models with real-time alerts and local log processing.',
    image: '/projects/sentinai-thumbnail.webp', imageWidth: 1536, imageHeight: 1024,
    imageSrcSet: '/projects/sentinai-thumbnail-640.webp 640w, /projects/sentinai-thumbnail-960.webp 960w, /projects/sentinai-thumbnail.webp 1536w',
    imageAlt: 'Concept illustration of a protected server with telemetry streams and a flagged anomalous process', imageCaption: 'Project concept illustration',
    tags: ['Laravel', 'FastAPI', 'Prometheus', 'Loki', 'Isolation Forest', 'NLP'],
    link: 'https://github.com/Nuelnyakyz/SentinAI-Ops', linkKind: 'source', visual: 'sentinai', role: 'NIRU AI Hackathon · Team project · Jan 2026',
    sections: [
      { title: 'The problem', text: 'Detecting suspicious activity quickly while keeping server logs inside the client’s infrastructure. Built as a group project for the NIRU AI Hackathon in January 2026.' },
      { title: 'Three parallel models', text: 'The metrics model compares live CPU and RAM data from Prometheus against Isolation Forest predictions trained on historical behaviour. Log categorisation uses Loki and NLP similarity scoring for LAMP logs. The user-behaviour model builds a process whitelist and flags unauthorised process spawning, including reverse shells.' },
      { title: 'Local processing & alerts', text: 'A Laravel frontend and FastAPI backend, an AI chatbot for admin guidance, and Slack, email, and SMS alerts. Docker Compose supports a Zero-Egress architecture: logs remain within the client’s infrastructure.' },
      { title: 'Staging proof of concept', text: 'Validated on a staging LAMP server using a controlled reverse-shell attack simulation. Detection and alerting completed within the five-second target window.' },
    ],
  },
  {
    number: '04', name: 'AudioBook Generator', type: 'Python & speech technology',
    headline: 'Give written words a voice.',
    description: 'A Python audiobook generator that turns text into speech using Deepgram’s TTS API.',
    image: '/AudioBook.png', imageWidth: 259, imageHeight: 194,
    imageAlt: 'AudioBook Generator project preview', imageCaption: '',
    tags: ['Python', 'Deepgram', 'Text to speech'],
    link: 'https://github.com/Nuelnyakyz/pdf_reader', linkKind: 'source', visual: 'audio', role: '',
    sections: [
      { title: 'The problem', text: 'Making written material available as something you can listen to.' },
      { title: 'What I built', text: 'Connected a Python application to Deepgram’s text-to-speech API to generate audiobook audio.' },
      { title: 'The focus', text: 'Turning an external speech API into a useful tool.' },
    ],
  },
];

const toolIcons: Record<string, IconType> = {
  Go: SiGo, Python: FaPython, Django: SiDjango, PHP: FaPhp, Laravel: SiLaravel,
  'Node.js': FaNodeJs, TypeScript: SiTypescript, React: FaReact, Kotlin: SiKotlin,
  Java: FaJava, Flutter: SiFlutter, PostgreSQL: SiPostgresql, MongoDB: SiMongodb,
  Supabase: SiSupabase, Docker: FaDocker, Git: FaGitAlt, 'React Native': FaReact, Redis: SiRedis,
};
const toolConnections = [
  { label: 'Behind Sanaa & SPESIS', href: '#project-02', note: 'The engines underneath.' },
  { label: 'Inside the Sanaa experience', href: '#project-01', note: 'Where people meet the software.' },
  { label: 'Inside SentinAI-Ops', href: '#project-03', note: 'Keeping everything connected.' },
];
const skills = [
  { name: 'Backend & APIs', tools: ['Go', 'Python', 'Django', 'PHP', 'Laravel', 'Node.js'] },
  { name: 'Web & mobile', tools: ['TypeScript', 'React', 'React Native', 'Kotlin', 'Java', 'Flutter'] },
  { name: 'Data & tooling', tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Docker', 'Git'] },
];
const journey = [
  { date: '2023 — Present', title: 'Software Developer', place: 'Freelance & independent projects', description: 'Building web applications, cloud-connected IoT systems, and AI platforms with React, Django, FastAPI, Laravel, and PHP.' },
  { date: 'May — Aug 2025', title: 'ICT Intern', place: 'Kenya Bureau of Standards', description: 'IT support, hardware troubleshooting, database maintenance, and software documentation.' },
  { date: '2022 — 2026 (expected)', title: 'BSc Computer Science', place: 'Kenyatta University', description: 'Software engineering, data structures, and database systems. Projects spanning student portals and IoT soil testing.' },
  { date: '2021', title: 'Web Development & Python', place: 'Power Learn Project', description: 'Training in web development, Python, and entrepreneurship.' },
];
const stars = Array.from({ length: 65 }, (_, i) => ({
  left: `${(i * 73.37 + 11) % 100}%`, top: `${(i * 37.71 + 7) % 100}%`,
  '--star-size': `${i % 9 === 0 ? 2 : 1}px`, '--star-delay': `${-(i % 7)}s`,
} as CSSProperties));

function useMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('nuel-motion-paused') === 'true'; } catch { return false; }
  });
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  function toggle() {
    setPaused(value => {
      try { localStorage.setItem('nuel-motion-paused', String(!value)); } catch { /* Storage may be unavailable. */ }
      return !value;
    });
  }
  return { motion: !reduced && !paused, reduced, toggle };
}

function OrbitDrawing() {
  return <div className="orbital-art">
    <div className="orbital-grid" aria-hidden="true" />
    <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" /><div className="orbit orbit-three" aria-hidden="true" />
    <div className="orbit-center"><img src="/og-profile.jpg" alt="Nuel at the center of his little universe" width="104" height="104" fetchPriority="high" /></div>
    <span className="little-sun" aria-hidden="true" /><Moon className="hero-moon" />
    <span className="orbit-label orbit-label-top">A LITTLE PERSPECTIVE</span>
    <span className="orbit-label orbit-label-bottom">MY SMALL CORNER OF THE COSMOS</span>
    <span className="orbit-cross cross-one" aria-hidden="true">+</span><span className="orbit-cross cross-two" aria-hidden="true">+</span>
  </div>;
}

function GravitySketch({ motion }: { motion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const [position, setPosition] = useState(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let width = 1, height = 1, frame = 0, active = false, lastTime = 0;
    const particles = Array.from({ length: 24 }, (_, i) => ({ x: 0, y: 0, vx: 0, vy: 0, radius: 1 + (i % 3) * 0.45 }));
    function seed() {
      particles.forEach((p, i) => {
        const angle = i * Math.PI * 2 / particles.length;
        const spread = 0.35 + (i % 6) * 0.12;
        p.x = width / 2 + Math.cos(angle) * width * 0.44 * spread;
        p.y = height / 2 + Math.sin(angle) * height * 0.42 * spread;
        p.vx = -Math.sin(angle) * 1.25; p.vy = Math.cos(angle) * 1.25;
      });
    }
    function draw(time: number) {
      if (!context || !canvas) return;
      const step = Math.min((time - lastTime) / 16.67 || 1, 2);
      lastTime = time;
      context.clearRect(0, 0, width, height);
      const cx = target.current.x * width, cy = target.current.y * height;
      context.strokeStyle = '#a6c6e01c'; context.lineWidth = 1;
      for (let ring = 1; ring <= 4; ring += 1) {
        context.beginPath(); context.ellipse(cx, cy, width * 0.105 * ring, height * 0.1 * ring, 0, 0, Math.PI * 2); context.stroke();
      }
      for (const p of particles) {
        if (motion && active) {
          const dx = cx - p.x, dy = cy - p.y;
          const force = 180 / Math.pow(dx * dx + dy * dy + 450, 1.5);
          p.vx = (p.vx + dx * force * step) * 0.998;
          p.vy = (p.vy + dy * force * step) * 0.998;
          p.x += p.vx * step; p.y += p.vy * step;
          if (p.x < 0 || p.x > width) { p.vx *= -0.8; p.x = Math.max(0, Math.min(width, p.x)); }
          if (p.y < 0 || p.y > height) { p.vy *= -0.8; p.y = Math.max(0, Math.min(height, p.y)); }
        }
        context.fillStyle = '#b9d6f2'; context.beginPath(); context.arc(p.x, p.y, p.radius, 0, Math.PI * 2); context.fill();
      }
      context.fillStyle = '#e6bf8b'; context.shadowColor = '#e6bf8b'; context.shadowBlur = 18;
      context.beginPath(); context.arc(cx, cy, 5, 0, Math.PI * 2); context.fill(); context.shadowBlur = 0;
      if (active && motion) frame = requestAnimationFrame(draw);
    }
    function resize() {
      if (!canvas || !context) return;
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed(); cancelAnimationFrame(frame); draw(performance.now());
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting && !document.hidden;
      cancelAnimationFrame(frame); lastTime = performance.now(); draw(lastTime);
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(canvas);
    const visibility = () => {
      active = !document.hidden && canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < window.innerHeight;
      cancelAnimationFrame(frame); lastTime = performance.now(); draw(lastTime);
    };
    const pointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.current = { x: Math.max(0.15, Math.min(0.85, (event.clientX - rect.left) / rect.width)), y: Math.max(0.2, Math.min(0.8, (event.clientY - rect.top) / rect.height)) };
      if (!motion) draw(performance.now());
    };
    canvas.addEventListener('pointerdown', pointer);
    document.addEventListener('visibilitychange', visibility);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect(); canvas.removeEventListener('pointerdown', pointer); document.removeEventListener('visibilitychange', visibility); };
  }, [motion, position]);
  return <div className="gravity-sketch">
    <div className="sketch-heading"><span className="eyebrow">A small gravity sketch</span><span className="sketch-dot" /></div>
    <canvas ref={canvasRef} role="img" aria-label="An illustrative particle field around an attraction point. Tap to move the point, or use the Shift gravity button." />
    <div className="sketch-footer"><span>Tap the field. Change the pull.</span><button type="button" className="text-button" onClick={() => { target.current = position % 2 === 0 ? { x: 0.7, y: 0.4 } : { x: 0.5, y: 0.5 }; setPosition(p => p + 1); }}><RotateCcw size={14} /> Shift gravity</button></div>
  </div>;
}

function ProjectSignal({ type }: { type: string }) {
  return <div className={`project-signal signal-${type}`} aria-hidden="true">
    {Array.from({ length: type === 'audio' ? 19 : 5 }, (_, i) => <span key={i} style={{ '--signal-height': `${12 + ((i * 17) % 33)}px`, '--signal-delay': `${i * 0.08}s` } as CSSProperties} />)}
  </div>;
}

function ToolkitCards({ motion }: { motion: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = Array.from(track.children) as HTMLElement[];
      const first = cards[0].offsetLeft;
      const distances = cards.map(card => Math.abs(card.offsetLeft - first - track.scrollLeft));
      setActive(distances.indexOf(Math.min(...distances)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    track.addEventListener('scroll', schedule, { passive: true });
    update();
    return () => { observer.disconnect(); track.removeEventListener('scroll', schedule); cancelAnimationFrame(frame); };
  }, []);
  function showCard(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement;
    const card = track.children[index] as HTMLElement;
    track.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: motion ? 'smooth' : 'auto' });
  }
  return <div className="toolkit-cards">
          <div ref={trackRef} className="skill-groups" id="toolkit-track" role="region" aria-label="Technology toolkit">{skills.map((group, i) => <article className="skill-group" key={group.name} aria-label={`${i + 1} of ${skills.length}: ${group.name}`}>
            <div className="tool-group-heading"><span className="tool-index">0{i + 1}</span><h3>{group.name}</h3><span className="tool-status" aria-hidden="true" /></div>
            <p className="tool-note">{toolConnections[i].note}</p>
            <ul>{group.tools.map(tool => { const Icon = toolIcons[tool]; return <li key={tool}><Icon aria-hidden="true" /><span>{tool}</span></li>; })}</ul>
            <a className="tool-connection" href={toolConnections[i].href}>{toolConnections[i].label}<ArrowUpRight size={14} /></a>
          </article>)}</div>
    <div className="toolkit-pagination">
      <span className="swipe-hint">Swipe to explore</span>
      <div className="toolkit-dots" aria-label="Choose a toolkit card">{skills.map((group, index) => <button key={group.name} type="button" aria-label={`Show ${group.name}`} aria-current={active === index ? 'true' : undefined} aria-controls="toolkit-track" onClick={() => showCard(index)}><span /></button>)}</div>
      <span className="toolkit-count" aria-live="polite">{active + 1} / {skills.length}</span>
    </div>
  </div>;
}

export default function Portfolio() {
  const { motion, reduced, toggle } = useMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const page = pageRef.current;
    if (!motion || !page) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (entry.boundingClientRect.top > 0) {
          animations.push(entry.target.animate([
            { opacity: 0.55, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 550, easing: 'ease-out' }));
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    page.querySelectorAll('.project, .section-heading, .about-grid, .skill-group, .experience-item').forEach(element => observer.observe(element));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [motion]);
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    let scheduled = 0;
    const update = () => {
      scheduled = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      page.style.setProperty('--reading-progress', String(distance > 0 ? window.scrollY / distance : 0));
    };
    const scroll = () => { if (!scheduled) scheduled = requestAnimationFrame(update); };
    window.addEventListener('scroll', scroll, { passive: true });
    const resize = new ResizeObserver(scroll); resize.observe(page); update();
    return () => { window.removeEventListener('scroll', scroll); resize.disconnect(); cancelAnimationFrame(scheduled); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    const breakpoint = window.matchMedia('(min-width: 761px)');
    const onResize = () => { if (breakpoint.matches) setMenuOpen(false); };
    breakpoint.addEventListener('change', onResize);
    return () => { window.removeEventListener('keydown', close); breakpoint.removeEventListener('change', onResize); };
  }, [menuOpen]);
  return <div ref={pageRef} className={`observatory ${motion ? 'motion-on' : 'motion-off'}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="star-field" aria-hidden="true">{stars.map((style, i) => <span key={i} style={style} />)}</div>
    <ShootingStars motion={motion} />
    <div className="reading-progress" aria-hidden="true" />
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Nuel, home">nuel<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#projects">Work</a><a href="#about">About</a><a href="#skills">Toolkit</a><a href="#contact">Let’s talk <ArrowUpRight size={14} /></a></nav>
      <div className="header-actions"><button type="button" className="motion-control" onClick={toggle} disabled={reduced} aria-label={reduced ? 'Motion disabled by your system preference' : motion ? 'Pause animations' : 'Enable animations'} aria-pressed={!motion}>{motion ? <Pause size={13} /> : <Play size={13} />}<span>Motion {motion ? 'on' : 'off'}</span></button><button ref={menuButton} type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>{[['projects', 'Selected work'], ['about', 'About me'], ['skills', 'Toolkit'], ['contact', 'Let’s talk']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={18} /></a>)}</nav>
    </header>
    <main id="main">
      <section className="hero section-shell" id="home">
        <div className="shooting-star" aria-hidden="true" />
        <div className="shooting-star shooting-star-companion" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="tiny-star">✦</span> Nuel’s observatory / Software developer</p>
          <h1>A curious mind.<br />A universe of<br /><em>possibilities.</em></h1>
        </div>
        <OrbitDrawing />
        <div className="hero-description">
          <p className="hero-intro">I’m Nuel. I build software, ask questions, and follow my curiosity—from the universe to the systems we create.</p>
          <div className="hero-actions"><a className="primary-link" href="#projects">Explore my work <ArrowDown size={17} /></a><a className="quiet-link" href="https://github.com/Nuelnyakyz" target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="hero-footnote"><span>Curiosity, grounded in code.</span><a href="#projects">Scroll to explore <ArrowDown size={13} /></a></div>
      </section>
      <div className="journey-body section-shell">
        <span className="trajectory-light" aria-hidden="true" />
        <section className="work-section connected-section" id="projects">
          <div className="section-heading"><div><p className="eyebrow section-marker">01 / Selected work</p><h2>Ideas become<br /><em>useful things.</em></h2></div><p>A few problems I’ve explored through code.<br className="desktop-break" /> Here’s what I built along the way.</p></div>
          <div className="project-list">{projects.map(project => <article id={`project-${project.number}`} key={project.number} className={`project project-${project.visual}`}>
            <div className="project-image">
              <div className="image-topline"><span>{project.number} / {project.type}</span><span aria-hidden="true">↗</span></div>
              <a className={project.visual === 'sanaa' ? 'sanaa-brand' : undefined} href={project.link} target="_blank" rel="noopener noreferrer" aria-label={project.linkKind === 'live' ? `Visit ${project.name}` : `View ${project.name} source on GitHub`}>
                <img src={project.image} srcSet={project.imageSrcSet} sizes={project.imageSrcSet ? '(min-width: 1272px) 538px, (min-width: 761px) 44vw, calc(100vw - 80px)' : undefined} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt} loading="lazy" decoding="async" />
                {project.visual === 'sanaa' && <span className="sanaa-wordmark" aria-hidden="true">SANAA.ART</span>}
              </a>
              {project.imageCaption && <p className="project-image-caption">{project.imageCaption}</p>}
              <ProjectSignal type={project.visual} />
            </div>
            <div className="project-copy">
              <p className="eyebrow project-name">{project.name}</p><h3>{project.headline}</h3><p>{project.description}</p>
              {project.role && <span className="project-role">{project.role}</span>}
              <ul className="tech-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              <details className="build-details"><summary>Explore the build <Plus size={17} /></summary><div className="build-notes">{project.sections.map(section => <div key={section.title}><h4>{section.title}</h4><p>{section.text}</p></div>)}</div></details>
              <a className="source-link" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkKind === 'source' && <Github size={16} />}{project.linkKind === 'live' ? 'Visit sanaa.art' : 'View source'}<ArrowUpRight size={16} /></a>
            </div>
          </article>)}</div>
          <a className="all-work-link" href="https://github.com/Nuelnyakyz?tab=repositories" target="_blank" rel="noopener noreferrer">More explorations on GitHub <ArrowUpRight size={17} /></a>
        </section>
        <section className="about-section connected-section" id="about">
          <p className="eyebrow section-marker">02 / Behind the code</p>
          <div className="about-grid"><div><h2>Always<br />asking <em>why.</em></h2><div className="personal-intro"><img src="/og-profile.jpg" alt="Nuel, software developer" width="72" height="72" loading="lazy" /><div><span>Emmanuel Nyabicha</span><span className="muted">You can call me Nuel.</span></div></div><p>I’m fascinated by how things work. That curiosity takes me from physics and cosmology to mathematics, philosophy, and the practical challenges of building software.</p><p>I like breaking problems down to their foundations, questioning assumptions, and turning what I learn into something useful. Code is one of the ways I explore.</p><div className="interest-list"><span>Physics & cosmology</span><span>First principles</span><span>Art & innovation</span></div></div><div className="about-aside"><ThoughtSketch motion={motion} /><p className="aside-note">A little room for wonder.<br />There’s always another question worth asking.</p></div></div>
          <div className="about-gravity"><GravitySketch motion={motion} /></div>
          <div className="communities">
            <span className="eyebrow">In good company</span>
            <div className="community"><span className="community-logo"><img src="/IEEE.png" alt="" width="40" height="40" loading="lazy" /></span><span>IEEE <span className="muted">/ Technical community</span></span></div>
            <div className="community"><span className="community-logo"><img src="/AfricasTalking.png" alt="" width="40" height="40" loading="lazy" /></span><span>Africa’s Talking <span className="muted">/ ML & AI community</span></span></div>
          </div>
        </section>
        <section className="toolkit-section connected-section" id="skills">
          <div className="section-heading toolkit-heading">
            <div><p className="eyebrow section-marker">03 / The toolkit</p><h2>My kind of<br /><em>building blocks.</em></h2><p className="section-intro">A small constellation of tools. Each with a purpose.</p></div>
            <div className="toolkit-companion"><Astronaut /><span className="hand-note">a few tools for the trip.</span></div>
          </div>
          <ToolkitCards motion={motion} />
        </section>
        <section className="experience-section connected-section" id="experience">
          <div className="section-heading journey-heading"><div><p className="eyebrow section-marker">04 / The journey so far</p><h2>Still learning.<br /><em>Still in orbit.</em></h2></div><div className="journey-illustration"><Rocket /><span className="hand-note">a work in progress, always.</span></div></div>
          <div className="experience-list">{journey.map((item, i) => <article className={`experience-item ${i === 0 ? 'current-mission' : ''}`} key={item.title}>
            <div className="mission-marker" aria-hidden="true"><span /></div>
            <div className="mission-date"><span className="mission-number">LOG / 0{journey.length - i}</span><p className="experience-date">{item.date}</p>{i === 0 && <span className="current-label">Currently exploring</span>}</div>
            <div className="mission-copy"><h3>{item.title}</h3><p className="experience-place">{item.place}</p><p>{item.description}</p></div>
          </article>)}</div>
          <p className="journey-end"><span aria-hidden="true">✦</span> It started with a question. It usually does.</p>
        </section>
        <section className="contact-section connected-section" id="contact">
          <p className="eyebrow section-marker">05 / Make contact</p>
          <div className="contact-layout"><div className="contact-copy"><h2>What are you<br /><em>working on?</em></h2><p>A useful idea, an interesting problem, or a question that won’t leave you alone. I’d love to hear it.</p><a className="contact-email" href="mailto:nuelmanu265@gmail.com">nuelmanu265@gmail.com <ArrowUpRight /></a><div className="contact-actions"><a href="mailto:nuelmanu265@gmail.com"><Mail size={16} /> Email</a><a href="https://wa.me/254714346619" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={17} /> WhatsApp</a><a href="tel:+254714346619"><Phone size={15} /> +254 714 346 619</a></div></div><BlackHole motion={motion} /></div>
        </section>
      </div>
    </main>
    <footer className="site-footer section-shell"><div><a className="wordmark" href="#home">nuel<span>.</span></a><p>A small corner of a very big universe.</p></div><div className="footer-right"><div className="social-links"><a href="https://github.com/Nuelnyakyz" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/emmanuel-nyabicha-411879239/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="https://x.com/nue1manu" target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter size={17} /></a><a href="https://www.instagram.com/nu_el_n/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href="#home" aria-label="Back to top"><ArrowUp size={18} /></a></div><p>© {new Date().getFullYear()} Nuel. Made with curiosity.</p></div></footer>
  </div>;
}
