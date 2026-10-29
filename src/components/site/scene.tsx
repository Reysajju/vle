"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./effects";

/**
 * The layered hero scene: clouds, the faceless watching figure,
 * the Capitol horizon with park lamps, the row house with one lit
 * window, the steps and the broken chain. Pointer parallax only —
 * transform-only, rAF-throttled, disabled for reduced motion.
 */
export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrapRef.current) return;
    const wrap = wrapRef.current;
    const layers = Array.from(wrap.querySelectorAll<SVGGraphicsElement | HTMLElement>("[data-depth]"));
    const windowEl = wrap.querySelector<SVGGraphicsElement>("[data-window-glow]");
    const halo = wrap.querySelector<SVGGraphicsElement>("[data-halo]");
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let boost = 0;

    const apply = () => {
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth || "0");
        l.style.transform = `translate3d(${(tx * d).toFixed(2)}px, ${(ty * d).toFixed(2)}px, 0)`;
      });
      if (windowEl) windowEl.style.opacity = String(0.75 + boost * 0.25);
      if (halo) halo.style.opacity = String(0.3 + boost * 0.4);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1; // -1..1
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      tx = nx * 7;
      ty = ny * 4;
      // window brightens as the cursor nears it
      if (windowEl) {
        const wb = windowEl.getBoundingClientRect();
        const wx = wb.left + wb.width / 2;
        const wy = wb.top + wb.height / 2;
        const dist = Math.hypot(e.clientX - wx, e.clientY - wy);
        boost = Math.max(0, 1 - dist / 380);
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      boost = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="hero-scene" ref={wrapRef} aria-hidden="true">
      {/* storm clouds — CSS bands, cheap and GPU-friendly */}
      <div data-depth="6" style={{ position: "absolute", inset: 0 }}>
        <div
          className="cloud-band"
          style={{ top: "7%", height: 130, background: "var(--cloud)", opacity: 0.55, animationDuration: "46s", animationDirection: "alternate" }}
        />
        <div
          className="cloud-band"
          style={{ top: "16%", height: 90, background: "var(--cloud-2)", opacity: 0.6, animationDuration: "60s", animationDirection: "alternate-reverse" }}
        />
        <div
          className="cloud-band"
          style={{ top: "26%", height: 150, background: "var(--cloud)", opacity: 0.34, animationDuration: "38s", animationDirection: "alternate" }}
        />
      </div>

      <svg
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        role="presentation"
      >
        <defs>
          <radialGradient id="windowHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--window-glow)" stopOpacity="0.85" />
            <stop offset="45%" stopColor="var(--window-glow)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--window-glow)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="domeSun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="streetWet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--street)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--street)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* the faceless watching figure — a slow presence in the clouds, never a face */}
        <g data-depth="12" style={{ filter: "blur(5px)" }} opacity="0.75">
          <g fill="var(--silhouette)">
            <ellipse cx="1005" cy="175" rx="64" ry="82" />
            <path d="M880 340 C895 235 950 195 1005 195 C1062 195 1116 238 1130 340 C1150 420 1120 470 1005 470 C890 470 862 424 880 340 Z" />
          </g>
          <ellipse cx="1005" cy="420" rx="230" ry="90" fill="var(--cloud)" opacity="0.55" />
        </g>

        {/* horizon: Capitol dome, trees, park lamps, wet street */}
        <g data-depth="18">
          <path d="M0 596 Q240 588 420 594 L1440 588 L1440 810 L0 810 Z" fill="var(--street)" opacity="0.35" />
          {/* dome glow — brightens with scroll (sky-dawn handles the rest) */}
          <ellipse cx="1180" cy="560" rx="150" ry="70" fill="url(#domeSun)" opacity="calc(0.25 + var(--sp) * 0.75)" />
          {/* Capitol */}
          <g fill="var(--dome)">
            <rect x="1105" y="545" width="150" height="52" />
            <rect x="1120" y="470" width="26" height="78" />
            <rect x="1214" y="470" width="26" height="78" />
            <rect x="1150" y="500" width="60" height="50" />
            <path d="M1150 502 A30 34 0 0 1 1210 502 Z" />
            <rect x="1176" y="452" width="8" height="18" />
            <circle cx="1180" cy="450" r="4.5" />
          </g>
          {/* trees */}
          <g fill="var(--dome)">
            <ellipse cx="560" cy="562" rx="66" ry="40" />
            <ellipse cx="680" cy="570" rx="52" ry="30" />
            <ellipse cx="905" cy="566" rx="58" ry="34" />
            <ellipse cx="1330" cy="568" rx="48" ry="28" />
          </g>
          {/* park lamps, lit one by one as the page scrolls */}
          {[
            { x: 630, i: 1 },
            { x: 770, i: 2 },
            { x: 900, i: 3 },
            { x: 1030, i: 4 },
            { x: 1275, i: 5 },
          ].map((l) => (
            <g key={l.x}>
              <rect x={l.x - 1.6} y={556} width="3.2" height="52" fill="var(--dome)" />
              <rect x={l.x - 7} y="550" width="14" height="7" rx="2.4" fill="var(--dome)" />
              {/* warm light when on */}
              <g className="lamp-lit" style={{ ["--lamp-i" as string]: l.i }}>
                <path d={`M${l.x - 7} 551 h14 l5 9 h-24 Z`} fill="var(--window-glow)" />
                <circle cx={l.x} cy={556} r="20" fill="var(--window-glow)" opacity="0.16" />
              </g>
            </g>
          ))}
          <path d="M0 640 Q720 626 1440 642 L1440 810 L0 810 Z" fill="url(#streetWet)" />
        </g>

        {/* the row house on Mills Avenue — set low, out of the text column */}
        <g transform="translate(10 150)">
        <g data-depth="26">
          <path d="M0 660 Q360 648 720 660 L720 810 L0 810 Z" fill="var(--street)" opacity="0.5" />
          {/* side neighbor suggestion */}
          <rect x="404" y="330" width="120" height="330" fill="var(--house)" opacity="0.55" />
          <rect x="-60" y="300" width="200" height="360" fill="var(--house)" opacity="0.5" />
          {/* main house */}
          <rect x="140" y="268" width="264" height="392" fill="var(--brick-face)" />
          <rect x="140" y="258" width="276" height="14" fill="var(--house-lit)" />
          {/* brick courses */}
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={i} x1="142" x2="402" y1={288 + i * 17} y2={288 + i * 17} stroke="var(--house)" strokeWidth="1" opacity="0.5" />
          ))}
          {/* cornice shadow */}
          <rect x="140" y="272" width="264" height="6" fill="var(--house)" opacity="0.7" />
          {/* second-floor windows */}
          <rect x="172" y="318" width="56" height="72" fill="var(--house)" />
          <rect x="168" y="314" width="64" height="80" fill="none" stroke="var(--house-lit)" strokeWidth="4" />
          <line x1="200" y1="318" x2="200" y2="390" stroke="var(--house-lit)" strokeWidth="3" />
          {/* THE lit window — the emotional anchor, with a sister's silhouette */}
          <g>
            <ellipse cx="330" cy="354" rx="86" ry="66" fill="url(#windowHalo)" className="window-halo" data-halo />
            <rect x="298" y="314" width="64" height="80" fill="var(--window-glow)" className="window-glow-el" data-window-glow />
            <rect x="294" y="310" width="72" height="88" fill="none" stroke="var(--house-lit)" strokeWidth="4" />
            <line x1="330" y1="314" x2="330" y2="394" stroke="var(--house-lit)" strokeWidth="3" />
            {/* a woman's silhouette — no face, always */}
            <path d="M330 332 c7 0 11 6 11 13 c0 6 -3 10 -6 12 c9 3 15 10 17 20 h-44 c2 -10 8 -17 17 -20 c-3 -2 -6 -6 -6 -12 c0 -7 4 -13 11 -13 Z" fill="var(--house)" opacity="0.92" />
          </g>
          {/* first-floor window */}
          <rect x="172" y="452" width="56" height="72" fill="var(--house)" />
          <rect x="168" y="448" width="64" height="80" fill="none" stroke="var(--house-lit)" strokeWidth="4" />
          <line x1="200" y1="452" x2="200" y2="524" stroke="var(--house-lit)" strokeWidth="3" />
          {/* door */}
          <rect x="288" y="456" width="58" height="132" fill="var(--house)" />
          <rect x="284" y="452" width="66" height="140" fill="none" stroke="var(--house-lit)" strokeWidth="4" />
          <rect x="294" y="460" width="46" height="8" fill="var(--house-lit)" opacity="0.8" />
          <circle cx="340" cy="528" r="2.6" fill="var(--gold)" opacity="0.75" />
          {/* steps */}
          {[0, 1, 2, 3].map((s) => (
            <rect key={s} x={284 - s * 8} y={596 + s * 15} width={72 + s * 16} height="15" fill="var(--house-lit)" opacity={0.85 - s * 0.14} />
          ))}
        </g>
        </g>

        {/* the broken chain on the sidewalk before the steps */}
        <g transform="translate(0 58)">
        <g data-depth="34">
          {[
            { x: 296, r: -8 },
            { x: 330, r: 6 },
            { x: 366, r: -4 },
            { x: 424, r: 10 },
            { x: 462, r: -8 },
          ].map((l, idx) => (
            <g key={idx} transform={`rotate(${l.r} ${l.x} 632)`}>
              <rect
                x={l.x - 13}
                y={632 - 8}
                width="26"
                height="16"
                rx="8"
                fill="none"
                stroke="#5a4a3a"
                strokeWidth="5"
              />
              <rect
                x={l.x - 13}
                y={632 - 8}
                width="26"
                height="16"
                rx="8"
                fill="none"
                stroke="#7a5c3a"
                strokeWidth="1.6"
                opacity="0.8"
              />
            </g>
          ))}
          {/* the snapped link — broken apart */}
          <g transform="rotate(-16 398 636)">
            <path d="M380 628 a9 9 0 0 1 18 0 v8" fill="none" stroke="#5a4a3a" strokeWidth="5" />
          </g>
          <g transform="rotate(14 412 640)">
            <path d="M420 640 a9 9 0 0 1 -18 0 v-8" fill="none" stroke="#5a4a3a" strokeWidth="5" transform="translate(11 0)" />
          </g>
          {/* traveling gold glint across the chain */}
          <path
            className="chain-glint"
            d="M283 630 L470 634"
            stroke="var(--gold-2)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </g>
        </g>
      </svg>

      {/* rare soft lightning (dark only, CSS-driven) */}
      <div className="lightning" />
    </div>
  );
}
