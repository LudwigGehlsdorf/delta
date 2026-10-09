"use client";

import { useEffect } from "react";

/**
 * Adds `.is-visible` to every `[data-reveal]` / `[data-observe]` element
 * once it scrolls into view, and drives the cursor spotlight on `.spot`.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal], [data-observe]")
      .forEach((el) => observer.observe(el));

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(".spot");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
