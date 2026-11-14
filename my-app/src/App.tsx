import { useState, useEffect, useRef } from "react";
import "./styles/portfolio.css";
import { socialLinks } from "./styles/portfolio-theme";

// ── Data ─────────────────────────────────────────────────────────────────────

type Project = {
  slug: string;
  title: string;
  tech: readonly string[];
  bullets: readonly string[];
  url: string;
  liveUrl?: string;
  discordUrl?: string;
  year: string;
  tag: string;
};

const projects = [
  {
    slug: "discord-bot",
    title: "Marnie, Discord Bot",
    tech: ["Python", "discord.py", "PokeAPI", "pandas", "Pillow", "Flask", "Docker", "Render"],
    bullets: [
      "Built and deployed a Python Discord bot with 17 commands, hosted 24/7 on Render with a Flask/Waitress health-check endpoint and a Docker image. It serves a 15-member community, which uses !muted regularly to see who is timed out.",
      "Split a single-file bot into discord.py cogs (Pokédex, chat stats, game, moderation, errors), with state kept on each cog. The pure logic sits in modules that can be tested without Discord, and about 100 pytest tests cover lookups, type matchups, embeds, word counts and game rounds.",
      "Built Pokémon lookup commands on PokeAPI and local CSV data (pandas), using fuzzy matching (thefuzz) and an alias table to handle typos and nicknames. !dex is a rich embed showing artwork, base-stat bars, type weaknesses and immunities from a type-effectiveness matrix, abilities, and evolution line. If data is missing, that field is left out instead of crashing.",
      "Moved blocking PokeAPI calls onto worker threads behind a shared HTTP session with a timeout and an automatic retry. This keeps the bot responsive while lookups run, and API failures become friendly messages for users.",
      "Made “Who’s That Pokémon?”, a timed guessing game. It draws silhouettes from official artwork with Pillow and checks answers in a way that ignores forms, punctuation, aliases and small typos, while still rejecting guesses that name a different Pokémon.",
      "Added word clouds (!wc) and top-chatter rankings (!top) over a shared cache of each channel’s last 10,000 messages. The cache fills in the background and stays correct as messages are sent, edited and deleted. The bot also announces timeouts automatically and re-checks active ones on startup.",
    ],
    url: "https://github.com/ShawnEvans77/marnie-bot",
    discordUrl: "https://discord.com/oauth2/authorize?client_id=1455036822014001168&permissions=68608&integration_type=0&scope=bot",
    year: "Dec. 2025 – Present",
    tag: "Discord Bot",
  },
  {
    slug: "timesheet-generator",
    title: "Socks, Timesheet Generator",
    tech: ["Python", "Flask", "Jinja", "SQLite", "pypdf", "ReportLab", "unittest"],
    bullets: [
      "Automated Brooklyn College part-time timesheet preparation end to end: detects the current pay period, collects schedule exceptions (missed days, missed split shifts, extra shifts), and generates a filled, flattened, print-ready PDF with EMPLID, department number, and due/pay dates.",
      "Designed a SQLite schema for employees, weekly split-shift schedules, pay periods, and holidays, with in-place migrations from legacy JSON and single-table schedules, deduplication, and unique constraints. Built CRUD workflows with date, time, and overlap validation.",
      "Built a local Flask web front end alongside the CLI, sharing one data layer: a 3-step timesheet flow, employee/pay period/holiday management, and saved-PDF history. Used server-rendered Jinja and CSS-only interactivity, with no JavaScript framework.",
      "Hardened the web app for local use: isolated per-request state instead of global caches, rejected non-localhost hosts and cross-origin POSTs, and limited file serving and deletion to the output folder to block path traversal.",
      "Shipped a starter database with the academic-year calendar, copied on first run, so personal data never enters version control. Added one-click restore for accidentally deleted pay periods.",
      "Filled and flattened PDF forms with pypdf, drawing ReportLab overlays for split-shift times the form couldn’t hold. Wrote an 81-test unittest suite covering CLI flows, migrations, validation, PDF output, and web routes.",
    ],
    url: "https://github.com/ShawnEvans77/Socks",
    year: "Nov. 2025 – Mar. 2026",
    tag: "Web App & CLI",
  },
  {
    slug: "maple",
    title: "Maple, CISC 1115 Learning Platform",
    tech: ["React 19", "TypeScript", "Vite", "React Router 7", "Vitest", "KaTeX", "Vercel"],
    bullets: [
      "Built a static study site for an intro Java course (CISC 1115) covering 5 past final exams with about 60 worked questions and solutions, plus notes on 5 topics, with client-side search and per-question progress tracking.",
      "Wrote 5 interactive learning tools: a step-through algorithm visualizer (binary and linear search, bubble and selection sort) that highlights the running line of Java, a binary/decimal/hex converter, a binary add/subtract calculator, a Java String method explorer and a printf playground.",
      "Re-implemented Java's printf formatting and String methods in TypeScript, including Java's exact exception messages and half-up rounding, and verified them against output from real Java 25 runs.",
      "Designed a small content markup language (code, monospace and table blocks with inline styles) and a Java syntax highlighter, so all content lives as typed TypeScript data with no backend or CMS.",
      "Wrote 135 Vitest tests, including an exhaustive check of all 65,536 8-bit pairs for the binary calculator and content tests that validate ids, markup and PDF paths, so a content mistake fails the build.",
      "Kept the tools and the written notes in sync through tests that fail when a worked example in a note stops matching what the tool produces.",
      "Built about 20 reusable UI components and a hand-written CSS design system (about 2,600 lines) with design tokens, cascade layers, a flash-free dark mode and a mobile layout.",
      "Persisted progress and theme in localStorage with cross-tab sync, and gated every change behind one lint, test and production build command.",
    ],
    url: "https://github.com/ShawnEvans77",
    liveUrl: "https://cisc-1115.vercel.app/",
    year: "2025",
    tag: "Learning Platform",
  },
] as const satisfies readonly Project[];

const experience = [
  {
    role: "Computer Science Tutor",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Sep 2025 - Present",
    bullets: [
      "Enhanced students' understanding of Java concepts through creative tutoring sessions that focused on algorithmic thinking rather than rote syntax memorization.",
      "Demystified common programming patterns using focused one-on-one guidance, robust whiteboard demonstrations, and informational lectures. Easily managed high attendance sessions by donating an equal amount of time to all students irregardless of their skill level.",
    ],
  },
  {
    role: "Computer Science Teaching Assistant",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Fostered an engaging classroom environment by supplementing faculty instruction of two undergraduate computer science classes. Created passionate students excited about course material by periodically hosting study sessions throughout the semester, granting students a relaxing space to socialize with peers and work collaboratively.",
      "Contributed to an improvement in course grades by providing substantial availability outside of class, tutoring students remotely or in person upon their request. Received overwhelmingly positive performance reviews from both students and faculty.",
    ],
  },
  {
    role: "Peer Mentor",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Supported the mental, social, and academic well being of a cohort comprised of STEM students as part of a broader effort to improve CUNY graduation rates.",
      "Provided mentees with much needed socialization during nightly online conversations and in-person study sessions, with talks ranging from academic struggles to personal life aspirations.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Barclays",
    location: "Whippany, NJ",
    period: "Jan 2023",
    bullets: [
      "Engineered an enhancement to the Barclays development team's workflow alongside an agile team of four university students. Upgraded the proprietary Barclays code editor by writing a JavaScript algorithm that used regular expressions to detect erroneous function calls.",
      "Decreased development time by automating the syntax validation portion of the debugging process, thereby allowing resources to be allotted elsewhere.",
      "Successfully shipped the editor enhancement within a tight one-month deadline through careful time management, assistance of team members as necessary, and communication of project proposals during daily standup meetings.",
      "Delivered an engaging, comprehensive oral presentation detailing the project's purpose, scope, implementation, and potential use cases to an audience of Barclays developers at the internship's conclusion.",
    ],
  },
] as const;

const skills = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "SQL"] },
  { label: "AI-Assisted Development", items: ["Claude Code", "OpenAI Codex"] },
  { label: "Libraries & Frameworks", items: ["pandas", "NumPy", "React.js", "Flask", "Jinja", "discord.py", "pypdf", "ReportLab", "Pytest", "unittest"] },
  { label: "Tools", items: ["Git", "Docker", "SQLite", "MongoDB", "Render", "REST APIs", "Microsoft Office", "Google Suite"] },
] as const;

const courses = [
  "Data Structures", "Calculus", "Operating Systems", "Databases",
  "Theoretical Computer Science",
];

const activities = ["Black & Latino Male Initiative", "Computer Science Club"];

const footerLinks = [
  { label: "GitHub",   href: "https://github.com/ShawnEvans77" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shawn85" },
];


// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}


// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="section-header">
      <h2 className="section-heading">{title}</h2>
      <div className="section-heading-line" />
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className="card"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      <div className="card-top-row">
        <div className="card-title-group">
          <a
            href={project.liveUrl ?? project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title"
          >
            {project.title}
          </a>
          <span className="card-tag">{project.tag}</span>
        </div>
        <span className="card-year">{project.year}</span>
      </div>

      <div className="bullets">
        {project.bullets.map((b, j) => (
          <div key={j} className="bullet">
            <span className="bullet-dash">&#8212;</span>
            <p className="bullet-text">{b}</p>
          </div>
        ))}
      </div>

      <div className="tag-group">
        {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="card-links">
        {project.liveUrl && (
          <div className="card-link-group">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link card-link--blue">
              Website Link
            </a>
            <span className="card-link-arrow card-link-arrow--blue">→</span>
          </div>
        )}

        {project.discordUrl && (
          <div className="card-link-group">
            <a href={project.discordUrl} target="_blank" rel="noopener noreferrer" className="card-link card-link--teal">
              Add to Server
            </a>
            <span className="card-link-arrow card-link-arrow--teal">→</span>
          </div>
        )}

        <div className="card-link-group">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="card-link card-link--gold">
            View on GitHub
          </a>
          <span className="card-link-arrow card-link-arrow--gold">→</span>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof experience[number]; index: number }) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className="card"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="card-top-row">
        <h3 className="card-title">{exp.role}</h3>
        <span className="card-period">{exp.period}</span>
      </div>

      <div className="bullets">
        {exp.bullets.map((b, j) => (
          <div key={j} className="bullet">
            <span className="bullet-dash">&#8212;</span>
            <p className="bullet-text">{b}</p>
          </div>
        ))}
      </div>

      <div className="tag-group">
        <span className="tag tag--gold">{exp.org}</span>
        <span className="tag tag--faint">{exp.location}</span>
      </div>
    </div>
  );
}


// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { ref: eduRef,     visible: eduVisible     } = useInView();
  const { ref: expRef,     visible: expVisible     } = useInView();
  const { ref: contactRef, visible: contactVisible } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <div className="portfolio-root">

      <nav className="nav" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <span className="nav-name">Shawn Evans</span>
        <a href="mailto:shawnevans328@gmail.com" className="nav-contact">Contact</a>
      </nav>

      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-line hero-line--top"    style={{ height: loaded ? "80px" : "0" }} />
        <div className="hero-line hero-line--bottom" style={{ height: loaded ? "80px" : "0" }} />

        <div className="hero-content" style={fadeIn(0.2)}>
          <p className="hero-eyebrow">cs tutor @ brooklyn college</p>
          <h1 className="hero-name">
            Shawn<br />
            <span className="hero-name-italic">Anthony</span><br />
            Evans
          </h1>
          <p className="hero-bio">
            Recent computer science graduate passionate about educating the next generation of engineers.
            Proven track record of helping students succeed academically.
          </p>
          <div className="social-links">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={"target" in link ? link.target : link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="social-link"
                style={{
                  "--link-color":  link.color,
                  "--link-bg":     link.bg,
                  "--link-border": link.border,
                } as React.CSSProperties}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader title="Education" />
        <div
          ref={eduRef}
          className="card"
          style={{
            opacity:   eduVisible ? 1 : 0,
            transform: eduVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="card-top-row" style={{ marginBottom: "0.6rem" }}>
            <h3 className="edu-name">
              Brooklyn <span className="edu-name-accent">College</span>
            </h3>
            <span className="card-period">Aug 2021 – May 2025</span>
          </div>

          <div className="edu-meta-row">
            <p className="edu-degree">Bachelor of Science in Computer Science</p>
            <div className="edu-gpa-group">
              <span className="edu-gpa-label">GPA</span>
              <span className="edu-gpa">3.486</span>
            </div>
          </div>

          <p className="edu-section-label">Relevant Coursework</p>
          <div className="tag-group" style={{ marginBottom: "2rem" }}>
            {courses.map(c => <span key={c} className="tag">{c}</span>)}
          </div>

          <p className="edu-section-label">Activities</p>
          <div className="activities">
            {activities.map(a => (
              <div key={a} className="activity">
                <span className="activity-dash">&#8212;</span>
                <span className="activity-text">{a}</span>
              </div>
            ))}
          </div>

          <div className="tag-group">
            <span className="tag tag--gold">Brooklyn College</span>
            <span className="tag tag--faint">Brooklyn, NY</span>
          </div>
        </div>
        <div className="card-divider" />
      </section>

      <section className="section">
        <SectionHeader title="Projects" />
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </section>

      <section
        ref={expRef}
        className="section"
        style={{
          opacity:   expVisible ? 1 : 0,
          transform: expVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <SectionHeader title="Experience" />
        {experience.map((e, i) => <ExperienceCard key={i} exp={e} index={i} />)}
        <div className="card-divider" />
      </section>

      <section className="section section--skills">
        <div className="skills-grid">
          {skills.map(group => (
            <div key={group.label} className="skill-group">
              <p className="skill-group-label">{group.label}</p>
              <div className="skill-items">
                {group.items.map(item => <span key={item} className="skill-item">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        ref={contactRef}
        className="footer"
        style={{
          opacity:   contactVisible ? 1 : 0,
          transform: contactVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <p className="footer-eyebrow">Get in Touch</p>
        <h2 className="footer-heading">
          Let's work<br />
          <span className="footer-heading-italic">together.</span>
        </h2>
        <span className="footer-email">shawnevans328@gmail.com</span>
        <div className="footer-bottom">
          <span className="footer-copy">Shawn Anthony Evans, 2026</span>
          <div className="footer-links">
            {footerLinks.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
