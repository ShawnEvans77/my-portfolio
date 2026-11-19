import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import "./styles/portfolio.css";
import {
  activities, courses, email, experience, footerLinks, marqueeWords, navSections, projects, skills,
} from "./data";
import { useActiveSection, useCountUp, useInView, useNavHidden } from "./hooks";
import { Hero } from "./components/Hero";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { Timeline } from "./components/Timeline";
import { Reveal, SectionHeader, SplitText } from "./components/Primitives";

const sectionIds = navSections.map(s => s.id);


// ── Page chrome ───────────────────────────────────────────────────────────────

/** Gold bar across the top that tracks scroll position. */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      ref.current?.style.setProperty("transform", `scaleX(${p})`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

/** Soft gold light that trails the mouse (fine pointers only). */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: globalThis.PointerEvent) => {
      el.style.setProperty("--cx", `${e.clientX}px`);
      el.style.setProperty("--cy", `${e.clientY}px`);
      el.classList.add("is-on");
    };
    const onLeave = () => el.classList.remove("is-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}

function Nav() {
  const active = useActiveSection(sectionIds);
  const hidden = useNavHidden();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <nav className={`nav${hidden ? " is-hidden" : ""}${loaded ? " is-loaded" : ""}`}>
      <a href="#top" className="nav-name">Shawn Evans</a>
      <div className="nav-links">
        {navSections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`nav-link${active === s.id ? " is-active" : ""}`}
            aria-current={active === s.id ? "true" : undefined}
          >
            {s.label}
          </a>
        ))}
      </div>
      <a href={`mailto:${email}`} className="nav-contact">Contact</a>
    </nav>
  );
}

function Marquee() {
  const row = (hidden: boolean) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {marqueeWords.map((w, i) => (
        <span key={w} className="marquee-item">
          <span className={i % 2 ? "marquee-word marquee-word--outline" : "marquee-word"}>{w}</span>
          <span className="marquee-star" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}


// ── Sections ──────────────────────────────────────────────────────────────────

function Education() {
  const { ref, visible } = useInView<HTMLDivElement>(0.3);
  const gpa = useCountUp(3.486, visible, 3);

  return (
    <section id="education" className="section">
      <SectionHeader title="Education" />

      <div ref={ref} className={`edu${visible ? " is-visible" : ""}`}>
        <div className="edu-main">
          <span className="card-period">Aug 2021 – May 2025</span>
          <h3 className="edu-name">
            Brooklyn <span className="edu-name-accent">College</span>
          </h3>
          <p className="edu-degree">Bachelor of Science in Computer Science</p>
          <div className="edu-gpa-group">
            <span className="edu-gpa" aria-label="GPA 3.486">{gpa}</span>
            <span className="edu-gpa-label">GPA</span>
          </div>
          <span className="tag tag--faint">Brooklyn, NY</span>
        </div>

        <div className="edu-side">
          <p className="edu-section-label">Relevant coursework</p>
          <div className="tag-group tag-group--stagger edu-courses">
            {courses.map((c, i) => (
              <span key={c} className="tag" style={{ "--i": i } as CSSProperties}>{c}</span>
            ))}
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
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, index }: { group: typeof skills[number]; index: number }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal delay={index * 0.08} className="skill-card-wrap">
      <div className="skill-card" onPointerMove={onMove}>
        <p className="skill-group-label">{group.label}</p>
        <div className="skill-items tag-group--stagger">
          {group.items.map((item, i) => (
            <span key={item} className="skill-item" style={{ "--i": i } as CSSProperties}>{item}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function Footer() {
  const { ref, visible } = useInView<HTMLElement>(0.25);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer id="contact" ref={ref} className={`footer${visible ? " is-visible" : ""}`}>
      <h2 className="footer-heading" aria-label="Let's work together.">
        <SplitText text="Let's work" active={visible} stagger={0.035} />
        <SplitText text="together." active={visible} delay={0.35} stagger={0.045} className="footer-heading-italic" />
      </h2>

      <div className="footer-actions">
        <a href={`mailto:${email}`} className="footer-email">
          <span>{email}</span>
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <button type="button" className={`footer-copy-btn${copied ? " is-copied" : ""}`} onClick={copy}>
          {copied ? <Check size={15} strokeWidth={1.8} aria-hidden="true" /> : <Copy size={15} strokeWidth={1.6} aria-hidden="true" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
        </button>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">Shawn Anthony Evans, 2026</span>
        <div className="footer-links">
          {footerLinks.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">
              {l.label}
            </a>
          ))}
          <a href="#top" className="footer-link footer-top">
            Back to top <ArrowUp size={12} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}


// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div id="top" className="portfolio-root">
      <ScrollProgress />
      <CursorGlow />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Education />

        <section id="projects" className="section">
          <SectionHeader title="Projects" />
          <ProjectShowcase projects={projects} />
        </section>

        <section id="experience" className="section">
          <SectionHeader title="Experience" />
          <Timeline items={experience} />
        </section>

        <section id="skills" className="section section--skills">
          <SectionHeader title="Skills" />
          <div className="skills-grid">
            {skills.map((group, i) => <SkillCard key={group.label} group={group} index={i} />)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
