"use client";

import { useEffect, useRef, useState } from "react";
import { BOOK_SECTION } from "@/lib/content";
import Book3d from "./book3d";
import { useReducedMotion, useRevealOnView } from "./effects";
import type { ImageProps } from "next/image";

const CHAIN_LINKS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function BookSection({ cover }: { cover: ImageProps["src"] }) {
  const secRef = useRef<HTMLElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);
  const bookProgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [snapped, setSnapped] = useState(false);
  const [bookP, setBookP] = useState(0);
  useRevealOnView();

  // drives --snap (chain) and the book rotation pose from scroll
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const wh = window.innerHeight;
      if (chainRef.current) {
        const r = chainRef.current.getBoundingClientRect();
        // 0 when the chain row enters from below, 1 when it passes the upper third
        const p = Math.min(1, Math.max(0, (wh * 0.78 - r.top) / (wh * 0.52)));
        secRef.current?.style.setProperty("--snap", p.toFixed(3));
        setSnapped(p > 0.62);
      }
      if (bookProgRef.current) {
        const r = bookProgRef.current.getBoundingClientRect();
        const total = r.height - wh * 0.4;
        const p = Math.min(1, Math.max(0, (wh * 0.75 - r.top) / Math.max(1, total)));
        setBookP(p);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const snap = snapped ? 1 : 0;

  return (
    <section id="book" ref={secRef} className="relative overflow-clip py-28 sm:py-36" aria-label="About the book">
      {/* the section brightens from storm to sunrise as the chain snaps */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: "calc(clamp(0, var(--snap, 0), 1) * 0.5)",
          background:
            "radial-gradient(90% 70% at 50% 62%, color-mix(in srgb, var(--ember) 26%, transparent), transparent 70%)",
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6" style={{ zIndex: 1 }}>
        <p className="eyebrow sr">{BOOK_SECTION.eyebrow}</p>
        <h2 className="sr sr-d1 font-display mt-4 max-w-3xl text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
          {BOOK_SECTION.heading}
        </h2>

        {/* beats with the sticky 3D book */}
        <div ref={bookProgRef} className="mt-16 grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <Book3d cover={cover} alt="The Generational Curse Breaker — front cover" width={320} mode="scroll" scrollProgress={bookP} />
            </div>
          </div>

          <div className="flex flex-col">
            {BOOK_SECTION.beats.map((b) => (
              <article key={b.id} className="beat sr flex min-h-[52vh] flex-col justify-center py-10" data-on="true">
                <p className="font-display text-sm font-bold tracking-[0.4em]" style={{ color: "var(--gold)" }}>
                  {b.num}
                </p>
                <h3 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: "var(--text)" }}>
                  {b.title}
                </h3>
                <p className="reading-measure mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-dim)" }}>
                  {b.text}
                </p>
                <p className="mt-4 text-[0.66rem] uppercase tracking-[0.24em]" style={{ color: "var(--gold)" }}>
                  {b.ref}
                </p>
              </article>
            ))}

            {/* the chain moment — scroll-scrubbed, decorative, skippable */}
            <div className="relative py-10">
              <div
                ref={chainRef}
                className="chain-row"
                data-snapped={snap ? "true" : "false"}
                role="img"
                aria-label="A gold-lit chain breaks apart — the site's signature moment. Decorative."
              >
                <svg viewBox="0 0 900 74" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <defs>
                    <linearGradient id="chainGold" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#C98A1B" />
                      <stop offset="50%" stopColor="#FFE08A" />
                      <stop offset="100%" stopColor="#C98A1B" />
                    </linearGradient>
                  </defs>
                  {CHAIN_LINKS.map((i) => {
                    const x = 70 + i * 95;
                    const isSnap = i === 4;
                    const dir = i < 4 ? -1 : 1;
                    if (isSnap) {
                      // the link that breaks in two
                      return (
                        <g key={i}>
                          <g style={{ transform: `translate(calc(var(--snap, 0) * -46px), calc(var(--snap, 0) * 10px)) rotate(calc(var(--snap, 0) * -38deg))`, transformOrigin: `${x}px 37px`, transformBox: "fill-box" }}>
                            <path d={`M${x - 26} 20 a17 17 0 0 1 24 0 v8`} fill="none" stroke="url(#chainGold)" strokeWidth="7" strokeLinecap="round" />
                          </g>
                          <g style={{ transform: `translate(calc(var(--snap, 0) * 46px), calc(var(--snap, 0) * 16px)) rotate(calc(var(--snap, 0) * 44deg))`, transformOrigin: `${x}px 37px`, transformBox: "fill-box" }}>
                            <path d={`M${x + 26} 54 a17 17 0 0 1 -24 0 v-8`} fill="none" stroke="url(#chainGold)" strokeWidth="7" strokeLinecap="round" />
                          </g>
                          {/* the flash at the break point */}
                          <circle
                            cx={x}
                            cy={37}
                            r={26}
                            fill="url(#chainGold)"
                            opacity="calc(clamp(0, (var(--snap, 0) - 0.5) * 4, 1) * 0.55)"
                            style={{ filter: "blur(7px)" }}
                          />
                        </g>
                      );
                    }
                    return (
                      <g
                        key={i}
                        className="chain-link-el"
                        style={{
                          transform: `translate(calc(var(--snap, 0) * ${dir * Math.abs(i - 4) * 9}px), calc(var(--snap, 0) * ${i % 2 ? 6 : -4}px)) rotate(calc(var(--snap, 0) * ${dir * Math.abs(i - 4) * 3}deg))`,
                          transformOrigin: `${x}px 37px`,
                          transformBox: "fill-box",
                        }}
                      >
                        <rect x={x - 26} y={19} width={52} height={36} rx={18} fill="none" stroke="url(#chainGold)" strokeWidth="7" />
                        <rect x={x - 26} y={19} width={52} height={36} rx={18} fill="none" stroke="#5a4a3a" strokeWidth="1.4" opacity="0.6" />
                      </g>
                    );
                  })}
                </svg>
                {/* sparks at the snap */}
                {[
                  { l: "48%", d: "-30px", dy: "-40px", dl: "0s" },
                  { l: "50%", d: "36px", dy: "-30px", dl: "0.05s" },
                  { l: "52%", d: "-20px", dy: "-48px", dl: "0.02s" },
                  { l: "49%", d: "44px", dy: "-44px", dl: "0.08s" },
                  { l: "51%", d: "-40px", dy: "-26px", dl: "0.11s" },
                  { l: "53%", d: "22px", dy: "-52px", dl: "0.04s" },
                ].map((s, i) => (
                  <span
                    key={i}
                    className="snap-spark"
                    style={{ left: s.l, top: "42%", ["--dx" as string]: s.d, ["--dy" as string]: s.dy, animationDelay: s.dl }}
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-[0.64rem] uppercase tracking-[0.3em]" style={{ color: "var(--text-dim)" }}>
                The chain breaks
              </p>
              <div className="mt-3 text-center">
                <a
                  href="#book-parts"
                  className="inline text-[0.66rem] uppercase tracking-[0.2em] underline underline-offset-4"
                  style={{ color: "var(--text-dim)" }}
                >
                  Skip past this moment
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* the four parts as hover cards */}
        <div id="book-parts" className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {BOOK_SECTION.parts.map((p, i) => (
            <article
              key={p.part}
              className={`part-card glass sr rounded-md p-6 sr-d${(i % 3) + 1}`}
              style={{ background: "color-mix(in srgb, var(--surface) 80%, transparent)" }}
              tabIndex={0}
            >
              <p className="text-[0.66rem] uppercase tracking-[0.28em]" style={{ color: "var(--gold)" }}>
                {p.part}
              </p>
              <h3 className="font-display mt-2 text-xl font-bold leading-tight" style={{ color: "var(--text)" }}>
                {p.title}
              </h3>
              <div className="chapters">
                <ul className="mt-4 space-y-2.5 border-t pt-4 text-[0.82rem] leading-snug" style={{ borderColor: "var(--hairline)", color: "var(--text-dim)" }}>
                  {p.chapters.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.24em]" style={{ color: "var(--text-dim)" }}>
                Hover or focus for chapters
              </p>
            </article>
          ))}
        </div>

        {/* who it is for + details */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="sr glass rounded-md p-7">
            <h3 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>
              {BOOK_SECTION.audience.title}
            </h3>
            <p className="mt-4 leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {BOOK_SECTION.audience.text}
            </p>
          </div>
          <div className="sr sr-d1 rounded-md p-7" style={{ border: "1px solid var(--hairline)", background: "color-mix(in srgb, var(--surface-2) 40%, transparent)" }}>
            <h3 className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>
              The record, in brief
            </h3>
            <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-3 text-sm">
              {BOOK_SECTION.details.map((d) => (
                <div key={d.k} className="contents">
                  <dt className="text-[0.66rem] uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
                    {d.k}
                  </dt>
                  <dd style={{ color: "var(--text-dim)" }}>{d.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#get-the-book" className="btn btn-gold !px-5 !py-2.5 !text-[0.7rem]" data-magnetic>
                Get the Book
              </a>
              <a href="#review-copy" className="btn btn-ghost !px-5 !py-2.5 !text-[0.7rem]" data-magnetic>
                Request a Review Copy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
