"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** True when the visitor asked for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduced;
}

/**
 * Global pointer position as percentages (0..100) written to CSS vars
 * --mx / --my on a target element. Passive + rAF-throttled.
 */
export function usePointerVars(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    let nx = 50;
    let ny = 50;
    const apply = () => {
      el.style.setProperty("--mx", nx.toFixed(1));
      el.style.setProperty("--my", ny.toFixed(1));
      raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = ((e.clientX - r.left) / r.width) * 100;
      ny = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}

/** Magnetic buttons — lean toward the cursor. Transform only. */
export function useMagnetic(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups: Array<() => void> = [];
    els.forEach((el) => {
      let raf = 0;
      let tx = 0;
      let ty = 0;
      const apply = () => {
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        raf = 0;
      };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const range = 90;
        if (dist < range) {
          const f = (1 - dist / range) * 0.32;
          tx = dx * f;
          ty = dy * f;
        } else {
          tx = 0;
          ty = 0;
        }
        if (!raf) raf = requestAnimationFrame(apply);
      };
      const onLeave = () => {
        tx = 0;
        ty = 0;
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      });
    });
    return () => cleanups.forEach((c) => c());
  }, [enabled]);
}

/**
 * Sets a CSS var on an element to the element's scroll progress (0..1)
 * as it travels through the viewport.
 */
export function useScrollVar(ref: RefObject<HTMLElement | null>, enabled: boolean, varName: string) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      const p = 1 - (r.bottom + window.innerHeight * 0.0) / total;
      // progress: 0 when top of el hits bottom of viewport, 1 when bottom leaves top
      const raw = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.setProperty(varName, Math.min(1, Math.max(0, raw)).toFixed(4));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, enabled, varName]);
}

/** Observes elements with .sr class and adds .in when they enter view. */
export function useRevealOnView() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".sr:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/** Count-up odometer when element enters view. */
export function useOdometer(ref: RefObject<HTMLElement | null>, target: number, run: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const el = ref.current;
    if (!el) return;
    let started = false;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const dur = 1100;
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, target, run]);
  return run ? val : target;
}
