"use client";

import { useEffect, useRef } from "react";
import { RECORD_TABS } from "@/lib/content";
import TimelineView from "./timeline";
import FamilyView from "./family";
import SystemView from "./system";
import DemandsView from "./demands";
import InsideView from "./inside";

export default function RecordShell({ tab, onTab }: { tab: string; onTab: (id: string) => void }) {
  const barRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpan>(null);

  // sliding gold underline
  useEffect(() => {
    const bar = barRef.current;
    const ul = underlineRef.current;
    if (!bar || !ul) return;
    const active = bar.querySelector<HTMLAnchorElement>(`[data-tab="${tab}"]`);
    if (active) {
      const r = active.getBoundingClientRect();
      const br = bar.getBoundingClientRect();
      ul.style.left = `${r.left - br.left}px`;
      ul.style.width = `${r.width}px`;
      ul.style.opacity = "1";
    }
  }, [tab]);

  const View =
    tab === "family" ? FamilyView :
    tab === "system" ? SystemView :
    tab === "demands" ? DemandsView :
    tab === "inside" ? InsideView :
    TimelineView;

  const blurb = RECORD_TABS.find((t) => t.id === tab)?.blurb;

  return (
    <div className="relative" style={{ zIndex: 1 }}>
      <div className="tab-bar glass hairline-b" style={{ top: 64 }}>
        <div ref={barRef} className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex gap-7 overflow-x-auto" aria-label="The Record sections">
            {RECORD_TABS.map((t) => (
              <a
                key={t.id}
                href={`#/record/${t.id}`}
                data-tab={t.id}
                data-active={tab === t.id}
                className="tab-link"
                onClick={(e) => {
                  e.preventDefault();
                  onTab(t.id);
                }}
              >
                {t.label}
              </a>
            ))}
            <span ref={underlineRef} className="tab-underline" style={{ opacity: 0 }} aria-hidden="true" />
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6" id="record-main">
        <div key={tab} className="view-enter">
          <View />
          <p className="mt-16 text-center text-xs" style={{ color: "var(--text-dim)" }}>
            {blurb} Every fact on this page traces to a chapter of the book.
          </p>
        </div>
      </main>
    </div>
  );
}
