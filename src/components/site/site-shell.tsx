"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { ImageProps } from "next/image";
import Header from "./header";
import Hero from "./hero";
import AuthorSection from "./author";
import BookSection from "./book-section";
import Footer from "./footer";
import Intro from "./intro";
import RecordShell from "./record/record-shell";
import { useReducedMotion } from "./effects";

const TAB_IDS = ["timeline", "family", "system", "demands", "inside"];

function parseHashStr(hash: string): string | null {
  const m = hash.match(/^#\/record\/([a-z]+)/);
  if (m && TAB_IDS.includes(m[1])) return m[1];
  return null;
}

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener("gcb-navigate", cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("gcb-navigate", cb);
  };
}

export default function SiteShell({ cover }: { cover: ImageProps["src"] }) {
  const reduced = useReducedMotion();
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => ""
  );
  const tab = parseHashStr(hash);

  const openTab = useCallback((id: string) => {
    window.location.hash = `#/record/${id}`;
  }, []);

  const goHome = useCallback(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new Event("gcb-navigate"));
    }
  }, []);

  // in-page anchors from a record view route home first, then scroll
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#/") || href === "#" || href === "#top") return;
      if (!tab) return;
      const id = href.slice(1);
      if (!document.getElementById(id)) {
        e.preventDefault();
        goHome();
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        }, 140);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [tab, reduced, goHome]);

  // scroll to top when switching between home and a record view
  const prevTab = useRef<string | null>(null);
  useEffect(() => {
    if (prevTab.current !== tab) {
      prevTab.current = tab;
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [tab]);

  return (
    <>
      <Intro />
      <Header onNavigate={goHome} />
      <a
        href="#author"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded focus:px-4 focus:py-2"
        style={{ background: "var(--gold)", color: "#14100a" }}
      >
        Skip to content
      </a>
      <div className="sky-stage" aria-hidden="true">
        <div className="sky-storm" />
        <div className="sky-dawn" />
        <div className="sky-stars" />
      </div>

      {tab ? (
        <div className="view-enter pt-16">
          <RecordShell tab={tab} onTab={openTab} />
        </div>
      ) : (
        <main>
          <Hero cover={cover} />
          <AuthorSection />
          <BookSection cover={cover} />
        </main>
      )}
      <Footer onNavigate={goHome} />
    </>
  );
}
