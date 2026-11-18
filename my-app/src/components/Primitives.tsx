import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../hooks";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  style?: CSSProperties;
};

/** Fades/slides its children in the first time they scroll into view. */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0, variant = "up", style }: RevealProps) {
  const { ref, visible } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${visible ? " is-visible" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}s`, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds before the first letter animates. */
  delay?: number;
  stagger?: number;
  active: boolean;
};

/** Renders each letter in a mask so it can rise into place. */
export function SplitText({ text, className = "", delay = 0, stagger = 0.035, active }: SplitTextProps) {
  return (
    <span className={`split ${active ? "is-active" : ""} ${className}`.trim()} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="split-mask">
          <span className="split-char" style={{ "--i": i, "--d": `${delay}s`, "--s": `${stagger}s` } as CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeader({ index, title }: { index: string; title: string }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} className={`section-header${visible ? " is-visible" : ""}`}>
      <span className="section-index">{index}</span>
      <h2 className="section-heading" aria-label={title}>
        <SplitText text={title} active={visible} stagger={0.03} />
      </h2>
      <div className="section-heading-line" />
    </div>
  );
}
