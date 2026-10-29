"use client";

import { useEffect, useRef, useState } from "react";
import { FOOTER } from "@/lib/content";
import { LogoMark } from "./header";
import { useReducedMotion, useRevealOnView } from "./effects";

export default function Footer({ onNavigate }: { onNavigate?: () => void }) {
  const bigRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const [fill, setFill] = useState(reduced ? 1 : 0);
  useRevealOnView();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = bigRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.82 - r.top) / (r.height + window.innerHeight * 0.24)));
      setFill(p);
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
    <footer
      id="contact"
      className="relative mt-10 hairline-t"
      style={{
        background:
          "linear-gradient(180deg, color-mix(in srgb, var(--bg) 30%, transparent), color-mix(in srgb, var(--bg) 62%, transparent) 45%, color-mix(in srgb, var(--bg) 74%, transparent))",
      }}
      aria-label="Footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        {/* the line that fills with gold */}
        <p
          ref={bigRef}
          className="fill-line sr font-display text-center leading-none"
          style={{ fontSize: "clamp(2.6rem, 8.2vw, 7rem)", fontWeight: 800, ["--fill" as string]: fill.toFixed(3) }}
        >
          {FOOTER.bigLine}
        </p>
        <p className="sr sr-d1 mt-4 text-center text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
          From the final reckoning — Chapter 12
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_repeat(3,0.7fr)]">
          <div className="sr">
            <div className="logo-mark">
              <LogoMark size={30} />
              <span className="font-display text-base font-semibold" style={{ color: "var(--text)" }}>
                The Generational <span style={{ color: "var(--gold)" }}>Curse Breaker</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: "color-mix(in srgb, var(--text) 82%, var(--text-dim))" }}>
              {FOOTER.nonfictionNote}
            </p>
            <p id="press" className="mt-4 text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--text) 75%, var(--text-dim))" }}>
              Press and media: contact details to be confirmed. [placeholder]
            </p>
          </div>

          {FOOTER.columns.map((col, ci) => (
            <nav key={col.title} className={`sr sr-d${ci + 1}`} aria-label={col.title}>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.26em]" style={{ color: "var(--gold)" }}>
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: "color-mix(in srgb, var(--text) 80%, var(--text-dim))" }}
                      onClick={() => onNavigate?.()}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "color-mix(in srgb, var(--text) 80%, var(--text-dim))")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          id="privacy"
          className="mt-14 flex flex-col items-start justify-between gap-8 border-t pt-8 sm:flex-row sm:items-center"
          style={{ borderColor: "var(--hairline)" }}
        >
          <div className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--text) 75%, var(--text-dim))" }}>
            <p>{FOOTER.credit}</p>
            <p id="get-the-book" className="mt-1.5">
              Retailer links, ISBN and price pending publication details. [placeholders]
            </p>
          </div>
          <div id="review-copy" />
          {/* back to the steps */}
          <a
            href="#top"
            className="group inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em]"
            style={{ color: "var(--text-dim)" }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.();
              window.setTimeout(() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }), 60);
            }}
          >
            <span className="steps-climb relative h-6" aria-hidden="true">
              <span className="absolute bottom-0 left-0 h-1.5 w-3" style={{ background: "var(--hairline-strong)" }} />
              <span className="absolute bottom-1.5 left-2.5 h-1.5 w-3" style={{ background: "var(--hairline-strong)" }} />
              <span className="absolute bottom-3 left-5 h-1.5 w-3" style={{ background: "var(--hairline-strong)" }} />
              <span
                className="diamond absolute left-1.5"
                style={{ bottom: "3px", transition: "bottom 0.9s cubic-bezier(0.22,1,0.36,1)" }}
              />
            </span>
            <span className="group-hover:underline">{FOOTER.backToTop}</span>
          </a>
        </div>

        <p className="mt-10 border-t pt-6 text-xs leading-relaxed" style={{ borderColor: "var(--hairline)", color: "color-mix(in srgb, var(--text) 75%, var(--text-dim))" }}>
          {FOOTER.resources}
        </p>
      </div>
    </footer>
  );
}
