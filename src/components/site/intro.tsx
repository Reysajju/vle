"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** One-time decision: play the chain-break intro? (first visit, motion allowed) */
function introSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  let skip = false;
  try {
    skip = sessionStorage.getItem("gcb-intro") === "1";
  } catch {
    skip = true;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !skip && !reduced;
}

/**
 * First-visit intro: a single gold chain link draws itself, cracks with a
 * flash of light, embers float — under 1.4s, skippable by click, never shown
 * to reduced-motion visitors or on return visits.
 */
export default function Intro() {
  const shouldPlay = useSyncExternalStore(emptySubscribe, introSnapshot, () => false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!shouldPlay) return;
    try {
      sessionStorage.setItem("gcb-intro", "1");
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setDone(true), 1600);
    return () => window.clearTimeout(t);
  }, [shouldPlay]);

  if (done || !shouldPlay) return null;

  return (
    <div
      className="intro-overlay"
      role="presentation"
      onClick={() => setDone(true)}
      onKeyDown={() => setDone(true)}
      aria-hidden="true"
    >
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
        {/* the single chain link */}
        <rect
          className="intro-link-path"
          x="38"
          y="52"
          width="74"
          height="46"
          rx="23"
          stroke="var(--gold)"
          strokeWidth="5"
        />
        {/* the crack flash */}
        <g className="intro-crack">
          <path d="M75 46 L70 66 L80 72 L72 104" stroke="#fff7e0" strokeWidth="3" strokeLinecap="round" />
          <circle cx="75" cy="75" r="34" fill="url(#introFlash)" />
        </g>
        {/* embers floating up */}
        <g className="intro-spark">
          <circle cx="60" cy="70" r="2.4" fill="var(--ember)" />
          <circle cx="78" cy="82" r="1.8" fill="var(--gold)" />
          <circle cx="90" cy="66" r="2.1" fill="var(--gold-2)" />
          <circle cx="70" cy="90" r="1.5" fill="var(--ember)" />
        </g>
        <defs>
          <radialGradient id="introFlash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE08A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFE08A" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <span className="absolute bottom-10 text-[0.68rem] uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
        Skip
      </span>
    </div>
  );
}
