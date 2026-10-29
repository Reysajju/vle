"use client";

import { useState } from "react";
import { DEMANDS } from "@/lib/content";
import { useRevealOnView } from "../effects";

export default function DemandsView() {
  useRevealOnView();
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  const progress = open.length / DEMANDS.items.length;
  const R = 26;
  const CIRC = 2 * Math.PI * R;

  return (
    <div>
      <p className="eyebrow">The Six Demands</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
        Six requests from Chapter 12.
      </h1>
      <p className="reading-measure mt-5 leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {DEMANDS.intro}
      </p>

      {/* progress ring */}
      <div className="sr mt-10 flex items-center gap-5">
        <svg width="64" height="64" viewBox="0 0 64 64" className="progress-ring" aria-hidden="true">
          <circle cx="32" cy="32" r={R} fill="none" stroke="var(--hairline)" strokeWidth="4" />
          <circle
            className="ring-fill"
            cx="32"
            cy="32"
            r={R}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
          />
        </svg>
        <p className="text-[0.7rem] uppercase tracking-[0.24em]" style={{ color: "var(--text-dim)" }}>
          {open.length} of 6 opened
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {DEMANDS.items.map((d, i) => {
          const isOpen = open.includes(i);
          return (
            <article
              key={d.num}
              className={`demand-card glass sr rounded-md`}
              data-open={isOpen}
              style={{ borderColor: isOpen ? "var(--hairline-strong)" : "var(--hairline)" }}
            >
              <span className="edge" aria-hidden="true" />
              <button
                type="button"
                className="flex w-full items-center gap-5 p-6 text-left"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span className="foil font-display text-3xl font-extrabold" aria-hidden="true">
                  {d.num}
                </span>
                <span className="flex-1">
                  <span className="font-display block text-lg font-bold leading-snug sm:text-xl" style={{ color: "var(--text)" }}>
                    {d.title}
                  </span>
                  <span className="mt-1 block text-[0.66rem] uppercase tracking-[0.22em]" style={{ color: "var(--gold)" }}>
                    {d.ref}
                  </span>
                </span>
                <svg
                  className="acc-chevron shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{ transform: isOpen ? "rotate(180deg)" : undefined, transition: "transform 0.4s ease", color: "var(--gold)" }}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="body">
                <div>
                  <p className="px-6 pb-6 pl-[4.75rem] text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                    {d.body}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="sr glass mt-12 rounded-md p-7">
        <h2 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>
          {DEMANDS.whatYouCanDo.title}
        </h2>
        <p className="reading-measure mt-4 leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {DEMANDS.whatYouCanDo.text}
        </p>
      </div>
    </div>
  );
}
