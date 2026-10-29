"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg className="logo-diamond" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6 L56 32 L32 58 L8 32 Z" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <path d="M32 18 L43 32 L32 46 L21 32 Z" fill="var(--gold)" opacity="0.92" />
      <rect x="28.2" y="29.5" width="7.6" height="11.5" rx="1.4" fill="var(--bg, #070B14)" />
      <rect x="29.8" y="32.5" width="4.4" height="5.6" fill="var(--window)" />
    </svg>
  );
}

const NAV = [
  { label: "Author", href: "#author" },
  { label: "Book", href: "#book" },
  { label: "The Record", href: "#/record/timeline" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Header({ onNavigate }: { onNavigate?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="logo-mark"
          onClick={(e) => {
            // from a record view, go home first, then to the top
            if (window.location.hash.startsWith("#/")) {
              e.preventDefault();
              onNavigate?.();
              window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 120);
            }
            setOpen(false);
          }}
          aria-label="The Generational Curse Breaker — home"
        >
          <LogoMark />
          <span className="hidden font-display text-[0.95rem] font-semibold tracking-wide sm:block" style={{ color: "var(--text)" }}>
            The Generational <span style={{ color: "var(--gold)" }}>Curse Breaker</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.label} href={n.href} className="nav-link">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#get-the-book" className="btn btn-gold hidden !px-5 !py-2.5 !text-[0.7rem] sm:inline-flex" data-magnetic>
            Get the Book
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border md:hidden"
            style={{ borderColor: "var(--hairline)" }}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="glass mx-4 mb-3 grid gap-1 rounded-md p-4 md:hidden"
          style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)" }}
          aria-label="Mobile"
        >
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="nav-link !text-[0.85rem]"
              onClick={() => setOpen(false)}
              style={{ padding: "0.7rem 0.4rem" }}
            >
              {n.label}
            </a>
          ))}
          <a href="#get-the-book" className="btn btn-gold mt-2 justify-center !text-[0.72rem]" onClick={() => setOpen(false)}>
            Get the Book
          </a>
        </nav>
      )}
    </header>
  );
}
