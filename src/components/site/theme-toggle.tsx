"use client";

import { useCallback } from "react";
import { useReducedMotion } from "./effects";

export default function ThemeToggle() {
  const reduced = useReducedMotion();

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      const root = document.documentElement;
      const toDark = !root.classList.contains("dark");
      const next = toDark ? "dark" : "light";
      try {
        localStorage.setItem("gcb-theme", toDark ? "storm" : "dawn");
      } catch {
        /* private mode — session-only theme */
      }

      const apply = () => {
        root.classList.remove("dark", "light");
        root.classList.add(next);
        root.style.colorScheme = toDark ? "dark" : "light";
      };

      // Circular reveal from the toggle itself via View Transitions API
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
      };
      if (!reduced && doc.startViewTransition) {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        root.style.setProperty("--tx", `${r.left + r.width / 2}px`);
        root.style.setProperty("--ty", `${r.top + r.height / 2}px`);
        doc.startViewTransition(apply);
      } else {
        if (reduced) {
          apply();
        } else {
          root.classList.add("theme-fade");
          apply();
          window.setTimeout(() => root.classList.remove("theme-fade"), 320);
        }
      }
    },
    [reduced]
  );

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label="Switch between Storm (dark) and Dawn (light) themes"
      title="Storm / Dawn"
    >
      {/* moon (shown in dark) */}
      <svg className="icon-moon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6a8.5 8.5 0 1 0 10.6 10.6Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
      {/* sun (shown in light) */}
      <svg className="icon-sun" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
