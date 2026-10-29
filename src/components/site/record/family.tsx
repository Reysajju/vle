"use client";

import { FAMILY } from "@/lib/content";
import { useRevealOnView } from "../effects";

export default function FamilyView() {
  useRevealOnView();
  return (
    <div>
      <p className="eyebrow">The Family</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
        The people of the record.
      </h1>
      <p className="reading-measure mt-5 leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {FAMILY.intro}
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FAMILY.members.map((m, i) => (
          <article
            key={m.name}
            className={`fam-card glass sr sr-d${(i % 3) + 1} rounded-md p-6`}
            style={{ borderColor: "var(--hairline)" }}
            tabIndex={0}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>
                {m.name}
              </h2>
              {m.living && (
                <span
                  className="shrink-0 text-[0.6rem] uppercase tracking-[0.2em]"
                  style={{ color: "var(--gold)", border: "1px solid var(--hairline-strong)", borderRadius: 999, padding: "0.18rem 0.6rem" }}
                >
                  Living
                </span>
              )}
            </div>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: "var(--gold)" }}>
              {m.years}
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {m.epitaph}
            </p>
            <p className="mt-4 border-t pt-3 text-xs leading-relaxed" style={{ borderColor: "var(--hairline)", color: "var(--text-dim)" }}>
              {m.note}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
