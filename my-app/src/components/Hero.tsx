import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { socialLinks } from "../styles/portfolio-theme";
import { useTypewriter } from "../hooks";
import { SplitText } from "./Primitives";

const icons = {
  GitHub: GithubMark,
  LinkedIn: LinkedinMark,
  Email: () => <Mail size={15} strokeWidth={1.6} aria-hidden="true" />,
  Resume: () => <FileText size={15} strokeWidth={1.6} aria-hidden="true" />,
} as const;

const EYEBROW = "cs tutor @ brooklyn college";

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { typed, done } = useTypewriter(EYEBROW, 350, 45);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Spotlight that follows the pointer across the grid.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className={`hero${loaded ? " is-loaded" : ""}`} onPointerMove={onPointerMove}>
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-blob hero-blob--gold" />
        <span className="hero-blob hero-blob--blue" />
      </div>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-grid-spot" aria-hidden="true" />
      <div className="hero-line hero-line--top" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span className="sr-only">{EYEBROW}</span>
          {/* Invisible full-width copy keeps the centred line from shifting while typing. */}
          <span className="hero-eyebrow-ghost" aria-hidden="true">{EYEBROW}</span>
          <span className="hero-eyebrow-typed" aria-hidden="true">
            {typed}
            <span className={`hero-caret${done ? " is-done" : ""}`} />
          </span>
        </p>

        <h1 className="hero-name" aria-label="Shawn Anthony Evans">
          <SplitText text="Shawn" active={loaded} delay={0.25} stagger={0.05} />
          <SplitText text="Anthony" active={loaded} delay={0.45} stagger={0.05} className="hero-name-italic" />
          <SplitText text="Evans" active={loaded} delay={0.7} stagger={0.05} />
        </h1>

        <p className="hero-bio">
          Recent computer science graduate passionate about educating the next generation of engineers.
          Proven track record of helping students succeed academically.
        </p>

        <div className="social-links">
          {socialLinks.map((link, i) => {
            const Icon = icons[link.label];
            return (
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
                  "--i": i,
                } as CSSProperties}
              >
                <Icon />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <a href="#education" className="hero-scroll" aria-label="Scroll to content">
        <span className="hero-scroll-label">scroll</span>
        <span className="hero-scroll-track"><span className="hero-scroll-dot" /></span>
        <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  );
}

// Brand marks drawn inline (lucide is phasing out brand icons).
function GithubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
