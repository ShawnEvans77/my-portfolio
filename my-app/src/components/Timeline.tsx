import { useEffect, useRef } from "react";
import type { Experience } from "../data";
import { useInView } from "../hooks";

function TimelineItem({ exp }: { exp: Experience }) {
  const { ref, visible } = useInView<HTMLLIElement>(0.25);

  return (
    <li ref={ref} className={`tl-item${visible ? " is-visible" : ""}`}>
      <span className="tl-node" aria-hidden="true" />
      <div className="tl-card">
        <div className="tl-aside">
          <span className="tl-period">{exp.period}</span>
          <div className="tag-group">
            <span className="tag tag--gold">{exp.org}</span>
            <span className="tag tag--faint">{exp.location}</span>
          </div>
        </div>

        <div className="tl-main">
          <h3 className="tl-role">{exp.role}</h3>
          <div className="bullets">
            {exp.bullets.map((b, j) => (
              <div key={j} className="bullet">
                <span className="bullet-dash">&#8212;</span>
                <p className="bullet-text">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Vertical timeline whose rail fills in as the reader scrolls through it. */
export function Timeline({ items }: { items: readonly Experience[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      el.style.setProperty("--fill", p.toFixed(4));
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

  return (
    <div ref={listRef} className="timeline">
      <span className="tl-rail" aria-hidden="true"><span className="tl-rail-fill" /></span>
      <ol className="tl-list">
        {items.map(exp => <TimelineItem key={`${exp.role}-${exp.period}`} exp={exp} />)}
      </ol>
    </div>
  );
}
