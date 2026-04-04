import { useState, useEffect, useRef } from "react";
import "./styles/portfolio.css";
import { socialLinks } from "./styles/portfolio-theme";

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    slug: "maple",
    title: "maple",
    tech: ["React.js", "TypeScript"],
    description: "Built a website for Brooklyn College Computer Science students that lets them access modern study materials as opposed to dated ones. Cataloged several semesters worth of questions in one easy to navigate platform.",
    url: "https://github.com/ShawnEvans77",
    liveUrl: "https://cisc-1115.vercel.app/",
    year: "2025",
    tag: "Learning Platform",
  },
  {
    slug: "marnie",
    title: "marnie",
    tech: ["Python", "Docker", "Flask", "Pandas", "REST APIs"],
    description: "A Discord bot that returns information about Pokemon, perpetually hosted on Render. Features fuzzy string matching for autocorrect support and Pandas dataframes for query authentication.",
    url: "https://github.com/ShawnEvans77/marnie-bot",
    discordUrl: "https://discord.com/oauth2/authorize?client_id=1455036822014001168&permissions=68608&integration_type=0&scope=bot",
    year: "2025",
    tag: "Discord Bot",
  },
  {
    slug: "socks",
    title: "socks",
    tech: ["Python", "SQL", "SQLite"],
    description: "A Python CLI that generates tailored Brooklyn College tutor timesheets from user input. Backed by a SQLite database with a full CRUD interface for managing payroll information.",
    url: "https://github.com/ShawnEvans77/Socks",
    year: "2025",
    tag: "CLI Tool",
  },
] as const;

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
  { label: "Languages", items: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "SQL"] },
  { label: "Libraries",  items: ["NumPy", "Pandas", "React.js"] },
  { label: "Frameworks",  items: ["Flask", "Pytest"] },
  { label: "Tools",      items: ["Docker", "Git", "SQLite"] },
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

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
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
            href={"liveUrl" in project ? project.liveUrl : project.url}
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

      <p className="card-body">{project.description}</p>

      <div className="tag-group">
        {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="card-links">
        {"liveUrl" in project && project.liveUrl && (
          <div className="card-link-group">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="card-link card-link--blue">
              Website Link
            </a>
            <span className="card-link-arrow card-link-arrow--blue">→</span>
          </div>
        )}

        {"discordUrl" in project && project.discordUrl && (
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