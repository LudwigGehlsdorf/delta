"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/config/event";
import type { Dictionary } from "@/i18n/dictionaries";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1800;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 4))));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value.toLocaleString("sv-SE")}
      {suffix && <em>{suffix}</em>}
    </span>
  );
}

const marqueeWords = [
  "C++", "Rust", "Python", "Embedded", "Machine Learning", "Kotlin", "Networks",
  "Security", "Cloud", "FPGA", "TypeScript", "Distributed Systems", "Haskell",
  "Computer Vision", "5G", "DevOps", "Compilers", "UX",
];

export function Stats({ dict }: { dict: Dictionary }) {
  const items = [
    { value: event.stats.students, suffix: "+", label: dict.stats.students },
    { value: event.stats.companies, suffix: "", label: dict.stats.companies },
    { value: event.stats.programs, suffix: "", label: dict.stats.programs },
    { value: event.stats.hours, suffix: "h", label: dict.stats.hours },
  ];

  return (
    <section aria-label="DELTA in numbers">
      <div className="stats">
        <div className="container stats-grid">
          {items.map((item, i) => (
            <div
              className="stat"
              key={item.label}
              data-reveal
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="value mono">
                <CountUp to={item.value} suffix={item.suffix} />
              </div>
              <div className="label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="marquee mono" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
