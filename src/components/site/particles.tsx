"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./effects";

type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number };

/**
 * Rising embers (Storm) / golden dust motes (Dawn).
 * One canvas, capped particle count, paused off-screen and when hidden.
 */
export default function Particles({ count = 46 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const N = isMobile ? Math.min(24, count) : count;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let parts: P[] = [];
    let running = true;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(1.75, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (anywhere = false): P => ({
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 8,
      r: 0.7 + Math.random() * 1.7,
      vy: 0.22 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.22,
      a: 0.25 + Math.random() * 0.55,
      tw: Math.random() * Math.PI * 2,
    });

    const init = () => {
      resize();
      parts = Array.from({ length: N }, () => spawn(true));
    };
    init();

    const dark = () => document.documentElement.classList.contains("dark");

    const frame = (t: number) => {
      if (!running) return;
      if (visible) {
        ctx.clearRect(0, 0, W, H);
        const isDark = dark();
        for (const p of parts) {
          p.y -= p.vy;
          p.x += p.vx + Math.sin(t / 2600 + p.tw) * 0.14;
          if (p.y < -8 || p.x < -8 || p.x > W + 8) Object.assign(p, spawn());
          const flick = 0.72 + 0.28 * Math.sin(t / 640 + p.tw * 3);
          if (isDark) {
            // embers — warm, glowing
            ctx.beginPath();
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.4);
            g.addColorStop(0, `rgba(255,150,70,${p.a * flick})`);
            g.addColorStop(0.45, `rgba(255,122,69,${p.a * flick * 0.5})`);
            g.addColorStop(1, "rgba(255,122,69,0)");
            ctx.fillStyle = g;
            ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // golden dust motes
            ctx.beginPath();
            ctx.fillStyle = `rgba(183,121,31,${p.a * 0.5 * flick})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
    });
    io.observe(canvas);

    const onVis = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => init();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, count]);

  if (reduced) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
    />
  );
}
