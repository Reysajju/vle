"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { useReducedMotion } from "./effects";

type Props = {
  cover: ImageProps["src"];
  alt: string;
  mode?: "tilt" | "scroll";
  width?: number;
  priority?: boolean;
  /** for mode="scroll": 0..1 progress through the four poses */
  scrollProgress?: number;
};

/**
 * The 3D hardcover — CSS 3D only (front, spine, page edges, back).
 * tilt mode (hero): follows the cursor, click or tap flips to the back.
 * scroll mode (book section): rotates through four poses with scroll.
 */
export default function Book3d({ cover, alt, mode = "tilt", width = 300, priority, scrollProgress = 0 }: Props) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const H = Math.round(width * 1.5);
  const D = Math.round(width * 0.11);
  const pose = scrollProgress > 0.85 ? 3 : scrollProgress > 0.6 ? 2 : scrollProgress > 0.25 ? 1 : 0;

  useEffect(() => {
    if (reduced || !bookRef.current) return;
    const book = bookRef.current;
    if (mode === "scroll") {
      // four poses: front, three-quarter, spine, back
      const p = Math.min(1, Math.max(0, scrollProgress));
      const ry = -p * 180;
      book.style.transform = `rotateX(6deg) rotateY(${ry.toFixed(1)}deg)`;
      return;
    }
    let raf = 0;
    let rx = 5;
    let ry = -20;
    const apply = () => {
      book.style.transform = `rotateX(${rx.toFixed(1)}deg) rotateY(${(ry + (flipped ? 180 : 0)).toFixed(1)}deg)`;
      raf = 0;
    };
    apply();
    const stage = stageRef.current;
    if (!stage) return;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      ry = -20 + nx * 14;
      rx = 5 - ny * 10;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      rx = 5;
      ry = -20;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, mode, flipped, scrollProgress]);

  return (
    <div
      className="book-stage select-none"
      ref={stageRef}
      style={{ width, height: H, margin: "0 auto" }}
      onClick={() => mode === "tilt" && setFlipped((f) => !f)}
      role={mode === "tilt" ? "button" : undefined}
      tabIndex={mode === "tilt" ? 0 : undefined}
      onKeyDown={(e) => {
        if (mode === "tilt" && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      aria-label={mode === "tilt" ? "The book — activate to flip to the back cover" : alt}
    >
      <div className={reduced ? "" : "book-float"}>
        <div
          className="book3d"
          ref={bookRef}
          style={{
            width,
            height: H,
            transform: reduced
              ? mode === "scroll"
                ? `rotateX(6deg) rotateY(${-(Math.min(1, Math.max(0, scrollProgress))) * 180}deg)`
                : "rotateX(5deg) rotateY(-20deg)"
              : undefined,
            transition: reduced ? "none" : mode === "scroll" ? "transform 0.12s linear" : "transform 0.25s ease-out",
          }}
        >
          {/* front — the supplied cover */}
          <div className="face face-front" style={{ transform: `translateZ(${D / 2}px)` }}>
            <Image
              src={cover}
              alt={alt}
              fill
              sizes={`${width}px`}
              priority={priority}
              style={{ objectFit: "cover", borderRadius: "3px 8px 8px 3px" }}
            />
          </div>
          {/* back — placeholder panel in the cover's gold-on-night style (swap-ready) */}
          <div className="face face-back" style={{ transform: `rotateY(180deg) translateZ(${D / 2}px)` }}>
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-[9%] text-center"
              style={{ background: "linear-gradient(180deg, #0a1020, #141d36 55%, #0a1020)" }}>
              <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M32 6 L56 32 L32 58 L8 32 Z" fill="none" stroke="#F6C453" strokeWidth="3" />
                <path d="M32 18 L43 32 L32 46 L21 32 Z" fill="#F6C453" opacity="0.92" />
                <rect x="28.2" y="29.5" width="7.6" height="11.5" rx="1.4" fill="#0a1020" />
                <rect x="29.8" y="32.5" width="4.4" height="5.6" fill="#FFD9A0" />
              </svg>
              <p className="font-display text-[0.72em] leading-relaxed" style={{ color: "#F3EEE4" }}>
                A true account of one family&rsquo;s battle against undue influence, systemic neglect, and the theft of a legacy — documented across thirty years.
              </p>
              <p className="text-[0.58em] uppercase tracking-[0.28em]" style={{ color: "#F6C453" }}>
                Back cover [placeholder]
              </p>
            </div>
          </div>
          {/* spine */}
          <div
            className="face face-spine flex items-center justify-center"
            style={{ width: D, transform: `rotateY(-90deg) translateX(${D / 2}px)` }}
          >
            <span
              className="font-display whitespace-nowrap font-bold uppercase tracking-[0.2em]"
              style={{
                writingMode: "vertical-rl",
                fontSize: width * 0.052,
                color: "#F6C453",
                textShadow: "0 0 12px rgba(246,196,83,0.35)",
              }}
            >
              The Generational Curse Breaker
            </span>
          </div>
          {/* page edges */}
          <div
            className="face face-pages"
            style={{ width: D * 0.78, transform: `rotateY(90deg) translateX(${D * 0.39}px)` }}
          />
        </div>
      </div>
      <div className="book-shadow" aria-hidden="true" />
      {mode === "scroll" && (
        <span
          aria-hidden="true"
          className="mt-5 block text-center text-[0.62rem] uppercase tracking-[0.3em]"
          style={{ color: "var(--text-dim)" }}
        >
          {["front cover", "three-quarter", "spine", "back cover"][pose]}
        </span>
      )}
    </div>
  );
}
