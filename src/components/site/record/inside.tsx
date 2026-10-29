"use client";

import { useState } from "react";
import { BOOK_SECTION, INSIDE } from "@/lib/content";
import { useRevealOnView } from "../effects";

export default function InsideView() {
  useRevealOnView();
  const [openPart, setOpenPart] = useState<number | null>(0);
  const [turned, setTurned] = useState<number[]>([]);

  return (
    <div>
      <p className="eyebrow">Read Inside</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
        The parts, the chapters, three excerpts.
      </h1>
      <p className="reading-measure mt-5 leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {INSIDE.intro}
      </p>

      {/* parts accordion */}
      <div className="mt-12 overflow-hidden rounded-md" style={{ border: "1px solid var(--hairline)" }}>
        {BOOK_SECTION.parts.map((p, i) => {
          const isOpen = openPart === i;
          return (
            <div
              key={p.part}
              className={`acc-item sr ${i ? "border-t" : ""}`}
              data-open={isOpen}
              style={{ borderColor: "var(--hairline)", background: isOpen ? "color-mix(in srgb, var(--surface) 60%, transparent)" : "transparent" }}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                onClick={() => setOpenPart(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>
                  <span className="text-[0.64rem] uppercase tracking-[0.26em]" style={{ color: "var(--gold)" }}>
                    {p.part}
                  </span>
                  <span className="font-display mt-1 block text-lg font-bold sm:text-xl" style={{ color: "var(--text)" }}>
                    {p.title}
                  </span>
                </span>
                <svg
                  className="acc-chevron shrink-0"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: "var(--gold)" }}
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="acc-body">
                <div>
                  <ul className="space-y-2.5 px-6 pb-6 text-sm leading-snug" style={{ color: "var(--text-dim)" }}>
                    {p.chapters.map((c) => (
                      <li key={c} className="flex items-baseline gap-3">
                        <span aria-hidden="true" style={{ color: "var(--gold)", fontSize: "0.6em" }}>◆</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* excerpts — a page-turn reveal on each */}
      <h2 className="sr font-display mt-16 text-3xl font-extrabold" style={{ color: "var(--text)" }}>
        Three excerpts
      </h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {INSIDE.excerpts.map((ex, i) => {
          const isTurned = turned.includes(i);
          return (
            <button
              key={ex.label}
              type="button"
              className={`excerpt-card sr sr-d${i + 1} block text-left`}
              data-turned={isTurned}
              onClick={() => setTurned((t) => (t.includes(i) ? t.filter((x) => x !== i) : [...t, i]))}
              aria-label={`${ex.label} — activate for a page-turn reveal`}
            >
              <div className={`excerpt-page glass rounded-md p-6 min-h-[260px] ${isTurned ? "turned" : ""}`} style={{ borderColor: "var(--hairline)" }}>
                <p className="text-[0.64rem] uppercase tracking-[0.26em]" style={{ color: "var(--gold)" }}>
                  {ex.label}
                </p>
                <blockquote className="font-display mt-4 text-[1.05rem] leading-relaxed" style={{ color: "var(--text)" }}>
                  {ex.text}
                </blockquote>
                <p className="mt-5 text-[0.66rem] uppercase tracking-[0.22em]" style={{ color: "var(--text-dim)" }}>
                  {ex.ref}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* FAQ */}
      <h2 className="sr font-display mt-16 text-3xl font-extrabold" style={{ color: "var(--text)" }}>
        Questions, answered by the book
      </h2>
      <div className="mt-8 space-y-4">
        {INSIDE.faq.map((f, i) => (
          <div key={f.q} className={`sr sr-d${(i % 2) + 1} rounded-md p-6`} style={{ border: "1px solid var(--hairline)" }}>
            <h3 className="font-display text-lg font-bold" style={{ color: "var(--text)" }}>
              {f.q}
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {f.a}
            </p>
          </div>
        ))}
      </div>

      {/* the same quiet call to action */}
      <div className="glass sr mt-14 flex flex-col items-center gap-5 rounded-md p-10 text-center">
        <p className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>
          {INSIDE.cta.text}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#get-the-book" className="btn btn-gold !px-5 !py-2.5 !text-[0.7rem]">
            {INSIDE.cta.primary.label}
          </a>
          <a href="#review-copy" className="btn btn-ghost !px-5 !py-2.5 !text-[0.7rem]">
            {INSIDE.cta.secondary.label}
          </a>
        </div>
      </div>
    </div>
  );
}
