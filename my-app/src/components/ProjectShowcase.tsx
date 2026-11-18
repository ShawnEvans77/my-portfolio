import { useEffect, useId, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../data";
import { useOnScreen, useReducedMotion } from "../hooks";
import { Reveal } from "./Primitives";

const AUTOPLAY_MS = 4800;
const VISIBLE_BULLETS = 3;

function ShotCarousel({ project }: { project: Project }) {
  const { shots } = project;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, onScreen } = useOnScreen<HTMLDivElement>("-10% 0px");
  const reduced = useReducedMotion();

  const go = (dir: number) => setIndex(i => (i + dir + shots.length) % shots.length);

  useEffect(() => {
    if (!onScreen || paused || reduced || shots.length < 2) return;
    const id = window.setInterval(() => setIndex(i => (i + 1) % shots.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [onScreen, paused, reduced, shots.length]);

  // 3-D tilt toward the pointer.
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    setPaused(false);
  };

  const current = shots[index];

  return (
    <div
      ref={ref}
      className="frame-wrap"
      onPointerMove={onMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={onLeave}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <figure className="frame" aria-roledescription="carousel" aria-label={`${project.title} screenshots`}>
        <div className="frame-bar">
          <span className="frame-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="frame-label">{project.frameLabel}</span>
          <span className="frame-count" aria-hidden="true">
            {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
          </span>
        </div>

        <div className="frame-screen" style={{ background: project.frameBg }}>
          {shots.map((shot, i) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              aria-hidden={i !== index}
              loading="lazy"
              decoding="async"
              className={`frame-img${i === index ? " is-active" : ""}${shot.fit === "contain" ? " frame-img--contain" : ""}`}
            />
          ))}
          <span className="frame-glare" aria-hidden="true" />
          {!paused && !reduced && shots.length > 1 && onScreen && (
            <span key={index} className="frame-timer" style={{ "--t": `${AUTOPLAY_MS}ms` } as CSSProperties} aria-hidden="true" />
          )}
        </div>

        <figcaption className="frame-foot">
          <span key={current.src} className="frame-caption" aria-live="polite">{current.caption}</span>
          {shots.length > 1 && (
            <span className="frame-controls">
              <button type="button" className="frame-btn" onClick={() => go(-1)} aria-label="Previous screenshot">
                <ChevronLeft size={16} strokeWidth={1.6} />
              </button>
              <span className="frame-pips">
                {shots.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    className={`frame-pip${i === index ? " is-active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Show screenshot ${i + 1}: ${s.caption}`}
                    aria-current={i === index}
                  />
                ))}
              </span>
              <button type="button" className="frame-btn" onClick={() => go(1)} aria-label="Next screenshot">
                <ChevronRight size={16} strokeWidth={1.6} />
              </button>
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}

function Bullets({ bullets }: { bullets: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const head = bullets.slice(0, VISIBLE_BULLETS);
  const rest = bullets.slice(VISIBLE_BULLETS);

  const renderBullet = (b: string, j: number) => (
    <div key={j} className="bullet">
      <span className="bullet-dash">&#8212;</span>
      <p className="bullet-text">{b}</p>
    </div>
  );

  return (
    <div className="bullets-wrap">
      <div className="bullets">{head.map(renderBullet)}</div>
      {rest.length > 0 && (
        <>
          <div id={panelId} className={`bullets-more${open ? " is-open" : ""}`} inert={!open}>
            <div className="bullets-more-inner">
              <div className="bullets">{rest.map((b, j) => renderBullet(b, j + VISIBLE_BULLETS))}</div>
            </div>
          </div>
          <button
            type="button"
            className={`bullets-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(o => !o)}
          >
            <span className="bullets-toggle-icon" aria-hidden="true" />
            {open ? "Show less" : `${rest.length} more highlights`}
          </button>
        </>
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;

  return (
    <article className={`project${flip ? " project--flip" : ""}`}>
      <Reveal className="project-media" variant={flip ? "right" : "left"}>
        <ShotCarousel project={project} />
      </Reveal>

      <div className="project-body">
        <Reveal>
          <div className="project-meta">
            <span className="project-num">{num}</span>
            <span className="card-tag">{project.tag}</span>
            <span className="card-year">{project.year}</span>
          </div>
          <h3 className="project-title-wrap">
            <a href={project.liveUrl ?? project.url} target="_blank" rel="noopener noreferrer" className="card-title">
              {project.title}
            </a>
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <Bullets bullets={project.bullets} />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="tag-group tag-group--stagger">
            {project.tech.map((t, i) => (
              <span key={t} className="tag" style={{ "--i": i } as CSSProperties}>{t}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="card-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pill-link pill-link--blue">
                Website Link <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </a>
            )}
            {project.discordUrl && (
              <a href={project.discordUrl} target="_blank" rel="noopener noreferrer" className="pill-link pill-link--teal">
                Add to Server <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </a>
            )}
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="pill-link pill-link--gold">
              View on GitHub <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="projects">
      {projects.map((p, i) => <ProjectRow key={p.slug} project={p} index={i} />)}
    </div>
  );
}
