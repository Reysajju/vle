"use client";

import { useEffect, useRef, useState } from "react";
import { SYSTEM } from "@/lib/content";
import { useOdometer, useReducedMotion, useRevealOnView } from "../effects";

function Balance({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const v = useOdometer(ref, value, !reduced);
  return (
    <div ref={ref} className="text-center">
      <div className="ledger-num font-display text-6xl font-extrabold sm:text-7xl" aria-label={`${value} ${label}`}>
        <span aria-hidden="true">{v}</span>
      </div>
      <p className="mt-2 text-[0.68rem] uppercase tracking-[0.24em]" style={{ color: "var(--text-dim)" }}>
        {label}
      </p>
    </div>
  );
}

export default function SystemView() {
  useRevealOnView();
  return (
    <div>
      <p className="eyebrow">The System</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
        What was sent. What came back.
      </h1>
      <p className="reading-measure mt-5 leading-relaxed" style={{ color: "var(--text-dim)" }}>
        {SYSTEM.intro}
      </p>

      {/* the balance sheet */}
      <div
        className="sr mt-12 grid grid-cols-2 gap-8 rounded-md p-8 sm:grid-cols-5 sm:gap-4"
        style={{ border: "1px solid var(--hairline)", background: "color-mix(in srgb, var(--surface) 55%, transparent)" }}
      >
        <Balance value={SYSTEM.balanceSheet[0].value} label={SYSTEM.balanceSheet[0].label} />
        {SYSTEM.ledger.map((l) => (
          <div key={l.label} className="text-center">
            <div className="ledger-num font-display text-4xl font-extrabold sm:text-5xl">{l.value}</div>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.24em]" style={{ color: "var(--text-dim)" }}>
              {l.label}
            </p>
          </div>
        ))}
        <Balance value={SYSTEM.balanceSheet[1].value} label={SYSTEM.balanceSheet[1].label} />
      </div>
      <p className="sr mt-4 text-right text-xs italic" style={{ color: "var(--text-dim)" }}>
        &ldquo;That is the balance sheet. This book is the audit.&rdquo; — Foreword
      </p>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {SYSTEM.institutions.map((s, i) => (
          <article
            key={s.name}
            className={`sys-card glass sr sr-d${(i % 2) + 1} rounded-md p-6`}
            style={{ borderColor: "var(--hairline)" }}
          >
            <h2 className="font-display text-xl font-bold" style={{ color: "var(--text)" }}>
              {s.name}
            </h2>
            <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.22em]" style={{ color: "var(--gold)" }}>
              {s.sub}
            </p>
            <dl className="mt-5 grid gap-4 text-sm leading-relaxed">
              <div>
                <dt className="text-[0.64rem] uppercase tracking-[0.24em]" style={{ color: "var(--ember)" }}>
                  What he sent
                </dt>
                <dd className="mt-1.5" style={{ color: "var(--text-dim)" }}>
                  {s.sent}
                </dd>
              </div>
              <div>
                <dt className="text-[0.64rem] uppercase tracking-[0.24em]" style={{ color: "var(--gold)" }}>
                  What came back
                </dt>
                <dd className="mt-1.5" style={{ color: "var(--text-dim)" }}>
                  {s.received}
                </dd>
              </div>
            </dl>
            <p className="mt-4 border-t pt-3 text-[0.66rem] uppercase tracking-[0.24em]" style={{ borderColor: "var(--hairline)", color: "var(--gold)" }}>
              {s.ref}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
