import { useState, useEffect, useRef } from "react";

const projects = [
  {
    slug: "marnie",
    title: "marnie",
    tech: ["Python", "Docker", "Flask", "Pandas", "REST APIs", "Render"],
    description:
      "A Discord bot that returns information about Pokemon, perpetually hosted on Render. Features fuzzy string matching for autocorrect support and Pandas dataframes for query authentication.",
    url: "https://github.com/ShawnEvans77/marnie-bot",
    year: "2025",
    tag: "Discord Bot",
  },
  {
    slug: "socks",
    title: "socks",
    tech: ["Python", "PyPDF", "SQL", "SQLite"],
    description:
      "A Python CLI that generates tailored Brooklyn College tutor timesheets from user input. Backed by a SQLite database with a full CRUD interface for managing payroll information.",
    url: "https://github.com/ShawnEvans77/Socks",
    year: "2025",
    tag: "CLI Tool",
  },
];

const experience = [
  {
    role: "Java Tutor",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Sep 2025 - Present",
    bullets: [
      "Enhanced students' understanding of Java concepts through creative tutoring sessions that focused on algorithmic thinking rather than rote syntax memorization.",
      "Demystified common programming patterns using focused one-on-one guidance, robust whiteboard demonstrations, and informational lectures. Easily managed high attendance sessions by donating an equal amount of time to all students irregardless of their skill level.",
    ],
  },
  {
    role: "Java Teaching Assistant",
    org: "Brooklyn College",
    location: "Brooklyn, NY",
    period: "Aug 2024 - May 2025",
    bullets: [
      "Improved student grades by supplementing faculty instruction of two undergraduate Java classes. Created passionate students excited about course material by periodically hosting fun study sessions outside of class.",
      "Received overwhelmingly positive performance reviews from students and faculty during end of semester surveys.",
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
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ShawnEvans77", color: "#f0ede6", bg: "rgba(240,237,230,0.1)", border: "rgba(240,237,230,0.35)" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shawn85", color: "#7eb8d4", bg: "rgba(126,184,212,0.1)", border: "rgba(126,184,212,0.45)" },
  { label: "Email", href: "mailto:shawnevans328@gmail.com", color: "#c8b98a", bg: "rgba(200,185,138,0.1)", border: "rgba(200,185,138,0.45)" },
];

type Project = typeof projects[0];
type Experience = typeof experience[0];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        padding: "2.5rem 0",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", flexWrap: "wrap" }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 700,
              color: hovered ? "#c8b98a" : "#f0ede6",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              transition: "color 0.25s ease",
            }}
          >
            {project.title}
          </a>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.8rem",
              color: "#c8b98a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              paddingTop: "0.1rem",
            }}
          >
            {project.tag}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.8rem",
            color: "rgba(240,237,230,0.35)",
            letterSpacing: "0.08em",
          }}
        >
          {project.year}
        </span>
      </div>

      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: "clamp(1.05rem, 2.2vw, 1.15rem)",
          lineHeight: 1.8,
          color: "rgba(240,237,230,0.7)",
          marginBottom: "1.4rem",
        }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
        {project.tech.map((t: string) => (
          <span
            key={t}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(240,237,230,0.5)",
              border: "1px solid rgba(240,237,230,0.18)",
              padding: "0.3rem 0.75rem",
              borderRadius: "2px",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "1.4rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c8b98a",
              textDecoration: "none",
              borderBottom: "1px solid rgba(200,185,138,0.4)",
              paddingBottom: "1px",
            }}
          >
            View on GitHub
          </a>
          <span style={{ color: "rgba(200,185,138,0.5)", fontSize: "0.8rem" }}>&#8594;</span>
        </div>

        {project.slug === "marnie" && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <a
              href="https://discord.com/oauth2/authorize?client_id=1455036822014001168&permissions=68608&integration_type=0&scope=bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8ab4c8",
                textDecoration: "none",
                borderBottom: "1px solid rgba(138,180,200,0.4)",
                paddingBottom: "1px",
              }}
            >
              Add to Server
            </a>
            <span style={{ color: "rgba(138,180,200,0.5)", fontSize: "0.8rem" }}>&#8594;</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        padding: "2.5rem 0",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Title row — mirrors ProjectCard header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: hovered ? "#c8b98a" : "#f0ede6",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            transition: "color 0.25s ease",
            margin: 0,
          }}
        >
          {exp.role}
        </h3>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.8rem",
            color: "rgba(240,237,230,0.35)",
            letterSpacing: "0.08em",
            paddingTop: "0.55rem",
          }}
        >
          {exp.period}
        </span>
      </div>

      {/* Bullets */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.85rem",
          marginBottom: "1.75rem",
        }}
      >
        {exp.bullets.map((b: string, j: number) => (
          <div key={j} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
            <span
              style={{
                color: "#c8b98a",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                paddingTop: "0.38rem",
                flexShrink: 0,
              }}
            >
              &#8212;
            </span>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: "clamp(1rem, 1.8vw, 1.08rem)",
                lineHeight: 1.82,
                color: "rgba(240,237,230,0.65)",
                margin: 0,
              }}
            >
              {b}
            </p>
          </div>
        ))}
      </div>

      {/* Footer meta — org + location as tags, echoes project tech pill style */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexWrap: "wrap" }}>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c8b98a",
            border: "1px solid rgba(200,185,138,0.35)",
            padding: "0.3rem 0.75rem",
            borderRadius: "2px",
          }}
        >
          {exp.org}
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(240,237,230,0.4)",
            border: "1px solid rgba(240,237,230,0.12)",
            padding: "0.3rem 0.75rem",
            borderRadius: "2px",
          }}
        >
          {exp.location}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { ref: expRef, visible: expVisible } = useInView();
  const { ref: contactRef, visible: contactVisible } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital@0;1&family=DM+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
        body { background-color: #0d0c0b; color: #f0ede6; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        ::selection { background: rgba(200,185,138,0.25); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0c0b; }
        ::-webkit-scrollbar-thumb { background: rgba(200,185,138,0.3); border-radius: 2px; }
        a:hover { opacity: 0.8; }
        .exp-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 2.5rem 0;
        }
        .skills-grid {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
        }
        @media (max-width: 640px) {
          .exp-row { grid-template-columns: 1fr; gap: 1rem; }
          .skills-grid { gap: 2.5rem; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", backgroundColor: "#0d0c0b" }}>

        {/* Nav */}
        <nav
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            padding: "1.4rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center",
            backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "rgba(13,12,11,0.85)",
            opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease",
          }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,237,230,0.5)" }}>
            Shawn Evans
          </span>
          <a href="mailto:shawnevans328@gmail.com" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8b98a", textDecoration: "none" }}>
            Contact
          </a>
        </nav>

        {/* Hero */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "clamp(6rem, 12vw, 9rem) clamp(1.5rem, 6vw, 6rem)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,185,138,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(200,185,138,0.09) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)" }} />
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: loaded ? "80px" : "0", backgroundColor: "#c8b98a", transition: "height 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }} />
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: loaded ? "80px" : "0", backgroundColor: "#c8b98a", transition: "height 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }} />

          <div style={{ position: "relative", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.72rem, 1.8vw, 0.85rem)", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8b98a", marginBottom: "1.75rem" }}>
              java tutor @ brooklyn college
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.2rem, 9vw, 7.5rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.03em", color: "#f0ede6", marginBottom: "2.5rem" }}>
              Shawn<br /><span style={{ fontStyle: "italic", fontWeight: 400 }}>Anthony</span><br />Evans
            </h1>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)", lineHeight: 1.8, color: "rgba(240,237,230,0.55)", maxWidth: "480px", marginBottom: "3rem" }}>
              Recent computer science graduate passionate about educating the next generation of engineers. Proven track record of helping students succeed academically.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label} href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredLink(link.label)} onMouseLeave={() => setHoveredLink(null)}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.72rem, 1.4vw, 0.82rem)", letterSpacing: "0.15em", textTransform: "uppercase", color: hoveredLink === link.label ? "#0d0c0b" : link.color, textDecoration: "none", padding: "0.6rem 1.4rem", border: `1px solid ${link.border}`, backgroundColor: hoveredLink === link.label ? link.color : link.bg, transition: "background-color 0.2s ease, color 0.2s ease" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ marginBottom: "3.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0ede6" }}>Education</h2>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.1)", maxWidth: "300px" }} />
          </div>

          <div className="exp-row" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ paddingTop: "0.15rem" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.72rem, 1.4vw, 0.8rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8b98a", marginBottom: "0.9rem" }}>Aug 2021 – May 2025</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)", fontWeight: 700, color: "#f0ede6", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
                Brooklyn<br /><span style={{ fontStyle: "italic", fontWeight: 400, color: "#c8b98a" }}>College</span>
              </p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.72rem, 1.3vw, 0.78rem)", color: "rgba(240,237,230,0.35)", letterSpacing: "0.06em" }}>Brooklyn, NY</p>
            </div>
            <div style={{ paddingTop: "0.15rem" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", fontWeight: 700, color: "#f0ede6", marginBottom: "0.6rem", lineHeight: 1.3 }}>Bachelor of Science in Computer Science</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "2rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,237,230,0.4)" }}>GPA</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#c8b98a", letterSpacing: "-0.02em", lineHeight: 1 }}>3.486</span>
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,237,230,0.28)", marginBottom: "0.7rem" }}>Relevant Coursework</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {["Data Structures","Algorithms","Operating Systems","Database Systems","Software Engineering","Computer Architecture","Discrete Mathematics"].map((course) => (
                  <span key={course} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.08em", color: "rgba(240,237,230,0.5)", border: "1px solid rgba(240,237,230,0.12)", padding: "0.25rem 0.65rem", borderRadius: "2px" }}>{course}</span>
                ))}
              </div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,237,230,0.28)", marginBottom: "0.7rem" }}>Activities</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Black & Latino Male Initiative","Computer Science Club"].map((activity) => (
                  <div key={activity} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "#c8b98a", fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", flexShrink: 0 }}>&#8212;</span>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", color: "rgba(240,237,230,0.6)", lineHeight: 1.5 }}>{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </section>

        {/* Projects */}
        <section style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ marginBottom: "3.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0ede6" }}>Projects</h2>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.1)", maxWidth: "300px" }} />
          </div>
          <div>
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section
          ref={expRef}
          style={{ padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: expVisible ? 1 : 0, transform: expVisible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
        >
          <div style={{ marginBottom: "3.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0ede6" }}>Experience</h2>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.1)", maxWidth: "300px" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((e, i) => (
              <ExperienceCard key={i} exp={e} index={i} />
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
          </div>
        </section>

        {/* Skills */}
        <section style={{ padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 6vw, 6rem)", borderTop: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(200,185,138,0.025)", textAlign: "center" }}>
          <div className="skills-grid">
            {[
              { label: "Languages", items: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "SQL"] },
              { label: "Libraries", items: ["React.js", "Pandas", "PyPDF", "Pygame"] },
              { label: "Tools", items: ["Docker", "Flask", "Git", "SQLite", "Render"] },
            ].map((group) => (
              <div key={group.label} style={{ minWidth: "120px" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.72rem, 1.5vw, 0.82rem)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8b98a", marginBottom: "1.25rem" }}>{group.label}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center" }}>
                  {group.items.map((item) => (
                    <span key={item} style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1rem, 2vw, 1.1rem)", color: "rgba(240,237,230,0.6)" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          ref={contactRef}
          style={{ padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)", borderTop: "1px solid rgba(255,255,255,0.08)", opacity: contactVisible ? 1 : 0, transform: contactVisible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
        >
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8b98a", marginBottom: "1.5rem" }}>Get in Touch</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, color: "#f0ede6", marginBottom: "2.5rem" }}>
            Let's work<br /><span style={{ fontStyle: "italic", fontWeight: 400 }}>together.</span>
          </h2>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(0.78rem, 1.6vw, 0.88rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f0ede6", border: "1px solid rgba(240,237,230,0.25)", padding: "0.9rem 2rem", display: "inline-block", userSelect: "all", cursor: "text" }}>
            shawnevans328@gmail.com
          </span>
          <div style={{ marginTop: "5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", color: "rgba(240,237,230,0.25)" }}>Shawn Anthony Evans, 2026</span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[{ label: "GitHub", href: "https://github.com/ShawnEvans77" }, { label: "LinkedIn", href: "https://linkedin.com/in/shawn85" }].map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,237,230,0.3)", textDecoration: "none" }}>{l.label}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}