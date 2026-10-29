"use client";

import { useEffect, useRef } from "react";
import { TIMELINE } from "@/lib/content";
import { useReducedMotion, useRevealOnView } from "../effects";

export default function TimelineView() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useRevealOnView();

  // the gold thread draws down the page with scroll
  useEffect(() => {
    if (reduced) return;
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - r.top) / r.height));
      list.style.setProperty("--tlp", p.toFixed(4));
      // entries emerge as they clear the fog line
      list.querySelectorAll<HTMLElement>(".tl-item").forEach((el) => {
        const er = el.getBoundingClientRect();
        el.classList.toggle("on", er.top < window.innerHeight * 0.8);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div>
      <p className="eyebrow">The Timeline</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
        The record, year by year.
      </h1>
      <p className="reading-measure mt-5 leading-relaxed" style={{ color: "var(--text-dim)" }}>
        Every date below is quoted as the manuscript states it. Where the book itself gives differing
        dates, the entry is flagged for the author&rsquo;s confirmation — nothing here is guessed.
      </p>

      <div ref={listRef} className="relative mt-14 pl-8 sm:pl-12">
        <div className="tl-thread" aria-hidden="true" />
        <div className="tl-thread-fill" aria-hidden="true" />
        <ol className="space-y-14">
          {TIMELINE.map((t) => (
            <li key={t.year + t.title} className="tl-item relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1.5 block h-3 w-3 sm:-left-12"
                style={{ background: "var(--gold)", transform: "rotate(45deg)", boxShadow: "0 0 12px color-mix(in srgb, var(--gold) 60%, transparent)" }}
              />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h2 className="tl-year font-display text-2xl font-extrabold sm:text-3xl">{t.year}</h2>
                {t.flagged && <span className="tl-flag">Date under review</span>}
              </div>
              <h3 className="font-display mt-1.5 text-xl font-bold" style={{ color: "var(--text)" }}>
                {t.title}
              </h3>
              <p className="reading-measure mt-3 leading-relaxed" style={{ color: "var(--text-dim)" }}>
                {t.text}
              </p>
              <p className="mt-3 text-[0.66rem] uppercase tracking-[0.24em]" style={{ color: "var(--gold)" }}>
                {t.ref}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
