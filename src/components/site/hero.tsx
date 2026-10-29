"use client";

import { useRef } from "react";
import HeroScene from "./scene";
import Particles from "./particles";
import Book3d from "./book3d";
import { HERO } from "@/lib/content";
import { useMagnetic, usePointerVars, useReducedMotion } from "./effects";
import type { ImageProps } from "next/image";

export default function Hero({ cover }: { cover: ImageProps["src"] }) {
  const secRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  usePointerVars(secRef, !reduced);
  useMagnetic(!reduced);

  return (
    <section className="hero" id="top" ref={secRef} aria-label="Introduction">
      <HeroScene />
      <div className="hero-scrim" aria-hidden="true" />
      <Particles count={44} />

      <div className="hero-content mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <p className="eyebrow sr">{HERO.eyebrow}</p>

            <h1 className="hero-title font-display mt-5" style={{ color: "var(--text)" }}>
              <span className="rise-mask" aria-hidden="true">
                <span className="foil" style={{ animationDelay: "0.12s" }}>
                  {HERO.titleLines[0]}
                </span>
              </span>
              <span className="rise-mask" aria-hidden="true">
                <span className="foil" style={{ animationDelay: "0.26s" }}>
                  Curse{" "}
                  <span className="relative inline-block">
                    Breaker
                    {/* kintsugi crack — draws across the word, fills with light */}
                    <svg
                      className="kintsugi-crack pointer-events-none absolute left-0 top-0 h-full w-full"
                      viewBox="0 0 220 90"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M96 6 L108 26 L98 38 L116 52 L104 66 L118 84"
                        fill="none"
                        stroke="var(--gold-2)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 5px color-mix(in srgb, var(--gold) 70%, transparent))" }}
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="sr-only">{HERO.titleLines.join(" ")}</span>
            </h1>

            <p
              className="hero-sub sr sr-d1 mt-6 text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-dim)" }}
            >
              {HERO.subtitle}
            </p>

            <p className="sr sr-d2 reading-measure mt-6 font-display text-xl italic leading-snug sm:text-2xl" style={{ color: "var(--text)" }}>
              &ldquo;{HERO.hook}&rdquo;
            </p>

            <div className="sr sr-d3 mt-9 flex flex-wrap items-center gap-4">
              <a href={HERO.ctaPrimary.href} className="btn btn-gold" data-magnetic>
                {HERO.ctaPrimary.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={HERO.ctaSecondary.href} className="btn btn-ghost" data-magnetic>
                {HERO.ctaSecondary.label}
              </a>
            </div>
          </div>

          <div className="sr sr-d2 mx-auto hidden sm:block">
            <Book3d cover={cover} alt="The cover of The Generational Curse Breaker by Victor L. Evans" width={280} priority />
            <p className="mt-14 text-center text-[0.62rem] uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
              Click the book to turn it
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-6 lg:mt-10">
          <a href="#author" className="scroll-cue" aria-label="Scroll to About the Author" />
          <p className="text-[0.66rem] uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
            Storm to sunrise
          </p>
        </div>
      </div>

      {/* the quiet ticker */}
      <div className="ticker hairline-t relative z-[2] py-3.5" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {HERO.ticker.map((t, i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span className="px-7 text-[0.7rem] uppercase tracking-[0.34em]" style={{ color: "var(--text-dim)" }}>
                    {t}
                  </span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: "var(--gold)",
                      transform: "rotate(45deg)",
                      display: "inline-block",
                      opacity: 0.7,
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
