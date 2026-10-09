"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { DeltaMark } from "./icons";

const sections = ["about", "engage", "packages", "compare", "map", "faq"] as const;

export function Nav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      navRef.current?.style.setProperty("--p", String(max > 0 ? y / max : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            setHash(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header ref={navRef} className={`nav ${scrolled || open ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#top" className="brand mono" onClick={() => setOpen(false)}>
            <DeltaMark className="brand-delta" />
            <span>
              <span className="prompt">&gt;</span> DELTA
            </span>
          </a>
          <nav className="nav-links" aria-label={dict.nav.menu}>
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${active === id ? "active" : ""}`}
              >
                {dict.nav[id]}
              </a>
            ))}
          </nav>
          <div className="lang-switch mono" role="group" aria-label="Language">
            {(["sv", "en"] as const).map((l) => (
              <a key={l} href={`/${l}${hash}`} aria-current={l === lang}>
                {l.toUpperCase()}
              </a>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary btn-sm">
            {dict.nav.cta}
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
          </button>
        </div>
        <div className="progress" aria-hidden="true" />
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} inert={!open}>
        {[...sections, "contact" as const].map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setOpen(false)}
          >
            {id === "contact" ? dict.nav.cta : dict.nav[id]}
            <span className="mono">0{i + 1}</span>
          </a>
        ))}
      </div>
    </>
  );
}
