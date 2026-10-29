"use client";

import { useEffect, useRef, useState } from "react";
import { AUTHOR } from "@/lib/content";
import { useOdometer, useReducedMotion, useRevealOnView, useScrollVar } from "./effects";

function Odo({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const val = useOdometer(ref, target, !reduced);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <div
        className="odo-num foil font-display text-5xl font-extrabold sm:text-6xl"
        aria-label={`${target} ${label}`}
      >
        <span aria-hidden="true">{val}</span>
      </div>
      <p className="mt-2 text-[0.68rem] uppercase tracking-[0.22em]" style={{ color: "var(--text-dim)" }}>
        {label}
      </p>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? text.length : 0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let interval = 0;
    const io = new IntersectionObserver(
      (e) => {
        if (!e[0].isIntersecting) return;
        io.disconnect();
        interval = window.setInterval(() => {
          i += 1;
          setN(i);
          if (i >= text.length) window.clearInterval(interval);
        }, 62);
      },
      { threshold: 0.6 }
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      window.clearInterval(interval);
    };
  }, [reduced, text]);
  const done = n >= text.length;
  return (
    <span ref={ref} className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--text)" }}>
      <span aria-hidden="true">&ldquo;{text.slice(0, n)}</span>
      {done ? (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.5em",
            height: "0.5em",
            marginLeft: "0.18em",
            background: "var(--gold)",
            transform: "rotate(45deg)",
            verticalAlign: "0.06em",
          }}
        />
      ) : (
        <span className="caret" aria-hidden="true" />
      )}
      <span className="sr-only">&ldquo;{text}&rdquo;</span>
    </span>
  );
}

export default function AuthorSection() {
  const paraRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  useScrollVar(paraRef, !reduced, "--p");
  useRevealOnView();

  const words = AUTHOR.revealText.split(" ");
  const n = words.length;

  return (
    <section id="author" className="relative py-28 sm:py-36" aria-label="About the author">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* portrait — placeholder, swap-ready */}
          <div className="sr lg:sticky lg:top-28 lg:self-start">
            <div className="portrait-frame mx-auto max-w-[380px]">
              <div
                className="relative aspect-[4/5] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(165deg, var(--surface-2), var(--surface) 60%)",
                  border: "1px solid var(--hairline)",
                }}
              >
                {/* refined placeholder — swap /src/assets/author.* to replace */}
                <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="authorBg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--surface-2)" />
                      <stop offset="100%" stopColor="var(--surface)" />
                    </linearGradient>
                    <radialGradient id="authorGlow" cx="50%" cy="34%" r="55%">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#authorBg)" />
                  <rect width="400" height="500" fill="url(#authorGlow)" />
                  {/* a faceless silhouette — no face, per the rules */}
                  <g fill="var(--text)" opacity="0.16">
                    <circle cx="200" cy="185" r="58" />
                    <path d="M96 500 C96 380 142 318 200 318 C258 318 304 380 304 500 Z" />
                  </g>
                  <rect x="46" y="46" width="308" height="408" fill="none" stroke="var(--hairline-strong)" />
                </svg>
                <span
                  className="absolute bottom-3 left-0 right-0 text-center text-[0.6rem] uppercase tracking-[0.28em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {AUTHOR.portraitCaption}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow sr">{AUTHOR.eyebrow}</p>
            <h2 className="sr sr-d1 font-display mt-4 text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
              {AUTHOR.name}
            </h2>

            {/* scroll-scrubbed word illumination */}
            <p
              ref={paraRef}
              className="reveal-words mt-8 font-display text-2xl leading-snug sm:text-[1.7rem]"
              style={{ color: "var(--text)", ["--n" as string]: n }}
            >
              {words.map((w, i) => (
                <span key={i} className="w" style={{ ["--i" as string]: i }} aria-hidden="true">
                  {w}{" "}
                </span>
              ))}
              <span className="sr-only">{AUTHOR.revealText}</span>
            </p>

            <dl className="sr sr-d2 mt-10 grid gap-0 overflow-hidden rounded-md" style={{ border: "1px solid var(--hairline)" }}>
              {AUTHOR.facts.map((f, i) => (
                <div
                  key={f.k}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-4 text-sm sm:grid-cols-[9rem_1fr]"
                  style={{
                    background: i % 2 ? "transparent" : "color-mix(in srgb, var(--surface) 55%, transparent)",
                    borderTop: i ? "1px solid var(--hairline)" : undefined,
                  }}
                >
                  <dt className="text-[0.68rem] uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
                    {f.k}
                  </dt>
                  <dd style={{ color: "var(--text-dim)" }}>{f.v}</dd>
                </div>
              ))}
            </dl>

            {/* the numbers — a mechanical odometer */}
            <div className="sr sr-d3 mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {AUTHOR.numbers.map((num) => (
                <Odo key={num.label} target={num.value} label={num.label} />
              ))}
            </div>

            <div className="sr mt-14">
              <Typewriter text={AUTHOR.pullQuote} />
              <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                {AUTHOR.pullQuoteContext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
