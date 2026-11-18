import { useEffect, useRef, useState } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_QUERY).matches;
}

/** Live value of the user's reduced-motion preference. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Flips to true the first time the element scrolls into view. */
export function useInView<T extends Element = HTMLDivElement>(threshold = 0.15, rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T>(null);
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
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

/** Tracks whether an element is currently on screen (both directions). */
export function useOnScreen<T extends Element = HTMLDivElement>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return { ref, onScreen };
}

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const obs = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach(el => obs.observe(el));

    // Clear the highlight when back at the hero.
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}

/** Hides the nav while scrolling down past the hero, shows it on the way up. */
export function useNavHidden() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      setHidden(delta > 0 && y > window.innerHeight * 0.6);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

/** Counts up to `target` once `start` becomes true. */
export function useCountUp(target: number, start: boolean, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value.toFixed(decimals);
}

/** Types `text` out one character at a time after `delay` ms. */
export function useTypewriter(text: string, delay = 0, speed = 55) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let interval = 0;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount(c => {
          if (c >= text.length) {
            window.clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, delay, speed]);

  return { typed: text.slice(0, count), done: count >= text.length };
}
