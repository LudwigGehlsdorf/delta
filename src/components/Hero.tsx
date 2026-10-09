"use client";

import { useEffect, useRef, useState } from "react";
import { event } from "@/config/event";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Arrow } from "./icons";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Types out each line, pauses, deletes it and moves on to the next. */
function useTypewriter(lines: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let line = 0;
    let pos = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    if (reducedMotion()) {
      timer = setTimeout(() => setText(lines[0]), 0);
      return () => clearTimeout(timer);
    }

    const tick = () => {
      const current = lines[line];
      pos += deleting ? -1 : 1;
      setText(current.slice(0, pos));

      let delay = deleting ? 22 : 45 + Math.random() * 40;
      if (!deleting && pos === current.length) {
        deleting = true;
        delay = 2600;
      } else if (deleting && pos === 0) {
        deleting = false;
        line = (line + 1) % lines.length;
        delay = 400;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, [lines]);

  return text;
}

function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(target).getTime();
    const update = () => setLeft(Math.max(0, end - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

/** Slowly drifting network of nodes — a quiet "data" backdrop. */
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number };
    let points: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const max = 140;
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < max) {
            ctx.strokeStyle = `rgba(242,128,161,${(1 - d / max) * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        const near = md < 180;
        if (near) {
          ctx.strokeStyle = `rgba(242,128,161,${(1 - md / 180) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = near ? "rgba(255,157,186,0.9)" : "rgba(255,255,255,0.25)";
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    resize();
    if (reducedMotion()) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    // Pause the animation when the hero is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !reducedMotion()) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const typed = useTypewriter(dict.hero.lines);
  const left = useCountdown(event.date);
  const date = new Date(event.date).toLocaleDateString(
    lang === "sv" ? "sv-SE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Stockholm" },
  );

  return (
    <section className="hero" id="top">
      <NetworkCanvas />
      <div className="container hero-grid">
        <div>
          <span className="kicker mono">
            <span className="dot" />
            {dict.hero.kicker}
          </span>
          <h1 className="hero-title mono" aria-label="> DELTA">
            <span className="prompt">&gt;</span>
            <span className="word" aria-hidden="true">
              {"DELTA".split("").map((ch, i) => (
                <span key={i} style={{ "--i": i } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
            <span className="cursor" aria-hidden="true" />
          </h1>
          <p className="typed mono" aria-live="off">
            <span className="sr-only">{dict.hero.lines[0]}</span>
            <span aria-hidden="true">
              {typed}
              <span className="caret" />
            </span>
          </p>
          <p className="hero-lead" data-reveal style={{ "--d": "300ms" } as React.CSSProperties}>
            {dict.hero.lead}
          </p>
          <div className="hero-actions" data-reveal style={{ "--d": "450ms" } as React.CSSProperties}>
            <a href="#packages" className="btn btn-primary">
              {dict.hero.primary} <Arrow />
            </a>
            <a href="#map" className="btn">
              {dict.hero.secondary}
            </a>
          </div>
        </div>

        <div className="hero-side">
          <svg className="big-delta" viewBox="0 0 400 360" aria-hidden="true">
            <defs>
              <linearGradient id="scan-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#f280a1" stopOpacity="0" />
                <stop offset="1" stopColor="#f280a1" stopOpacity="0.25" />
              </linearGradient>
              <clipPath id="delta-clip">
                <path d="M200 20 L380 330 H20 Z" />
              </clipPath>
            </defs>
            <path className="inner" d="M200 90 L320 296 H80 Z" />
            <path className="inner" d="M200 160 L260 263 H140 Z" />
            <g clipPath="url(#delta-clip)">
              <rect className="scan" x="0" y="0" width="400" height="60" />
            </g>
            <path className="stroke" d="M200 20 L380 330 H20 Z" />
            {[
              { x: 200, y: 20, lx: 214, ly: 24, l: "0x00" },
              { x: 380, y: 330, lx: 352, ly: 356, l: "0xFF" },
              { x: 20, y: 330, lx: 16, ly: 356, l: "0x7F" },
            ].map((n, i) => (
              <g key={n.l}>
                <circle
                  className="node"
                  cx={n.x}
                  cy={n.y}
                  r="6"
                  style={{ animationDelay: `${1.6 + i * 0.25}s` }}
                />
                <text
                  className="label mono"
                  x={n.lx}
                  y={n.ly}
                  style={{ animationDelay: `${1.8 + i * 0.25}s` }}
                >
                  {n.l}
                </text>
              </g>
            ))}
            <text
              className="label mono"
              x="200"
              y="352"
              textAnchor="middle"
              style={{ animationDelay: "2.4s" }}
            >
              Δ = f(students, industry)
            </text>
          </svg>

          <div className="countdown mono" data-reveal style={{ "--d": "600ms" } as React.CSSProperties}>
            <div className="countdown-head">
              <span>{dict.hero.countdownLabel}</span>
              <span>
                {date} · {event.venue}
              </span>
            </div>
            <div className="countdown-grid">
              {(["d", "h", "m", "s"] as const).map((u) => (
                <div className="countdown-cell" key={u}>
                  <span className="num">{left ? pad(left[u]) : "--"}</span>
                  <span className="unit">{dict.hero.units[u]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-hint mono" aria-hidden="true">
        {dict.hero.scroll}
        <i />
      </div>
    </section>
  );
}
