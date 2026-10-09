"use client";

import { useMemo, useRef, useState } from "react";
import {
  booths,
  entrance,
  viewBox,
  zones,
  type Booth,
  type Offer,
} from "@/data/floorplan";
import { packages } from "@/data/packages";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Arrow } from "./icons";

type Filter = "all" | "free" | Offer;

const offerKeys: Offer[] = ["thesis", "summer", "internship", "trainee", "fulltime", "parttime"];

const tierName = (tier: Booth["tier"], lang: Locale) =>
  packages.find((p) => p.id === tier)!.name[lang];

/** Fit a company name inside a booth of the given width. */
function fitLabel(name: string, width: number, charWidth = 7.4) {
  const max = Math.floor((width - 8) / charWidth);
  if (name.length <= max) return name;
  const first = name.split(" ")[0];
  if (first.length <= max) return first;
  return first.slice(0, max - 1) + "…";
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export function FloorMap({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return new Set(
      booths
        .filter((b) => {
          const c = b.company;
          if (filter === "free" && c) return false;
          if (filter !== "all" && filter !== "free" && !c?.offers.includes(filter))
            return false;
          if (!q) return true;
          if (!c) return false;
          return (
            c.name.toLowerCase().includes(q) ||
            dict.industries[c.industry].toLowerCase().includes(q)
          );
        })
        .map((b) => b.id),
    );
  }, [filter, query, dict]);

  const select = (id: string) => {
    setSelected((cur) => (cur === id ? null : id));
    if (window.innerWidth < 1000) {
      requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }),
      );
    }
  };

  const current = booths.find((b) => b.id === selected);
  const hovered = booths.find((b) => b.id === hover);

  return (
    <section id="map" className="section">
      <div className="container">
        <span className="section-tag mono" data-reveal>
          {dict.map.tag}
        </span>
        <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {dict.map.title}
        </h2>
        <p className="section-lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          {dict.map.lead}
        </p>

        <div className="map-toolbar" data-reveal>
          <div className="search">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.map.search}
              aria-label={dict.map.search}
            />
          </div>
          <div className="chips" role="group">
            {(["all", ...offerKeys, "free"] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? dict.map.filterAll : f === "free" ? dict.map.available : dict.offers[f]}
              </button>
            ))}
          </div>
          <span className="map-count mono" aria-live="polite">
            {matches.size}/{booths.length} {dict.map.results}
          </span>
        </div>

        <div className="map-layout" data-reveal="scale">
          <div className="map-frame">
            <div className="map-scroll">
              <div className="map-canvas">
                <svg
                  className="map-svg"
                  viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
                  role="group"
                  aria-label={dict.map.title}
                >
                  {zones.map((z) => (
                    <g key={z.id}>
                      <rect
                        className={`zone ${z.kind ?? ""}`}
                        x={z.x}
                        y={z.y}
                        width={z.w}
                        height={z.h}
                        rx="10"
                      />
                      <text
                        className="zone-label mono"
                        x={z.lx}
                        y={z.ly}
                        textAnchor={z.kind === "room" ? "middle" : "start"}
                      >
                        {dict.map.zones[z.id]}
                      </text>
                    </g>
                  ))}

                  {/* Opening between the foyer and the corridor */}
                  <line
                    x1="520"
                    x2="520"
                    y1="222"
                    y2="378"
                    stroke="var(--bg)"
                    strokeWidth="4"
                  />

                  <line
                    className="entrance"
                    x1={entrance.x}
                    x2={entrance.x + entrance.w}
                    y1={560}
                    y2={560}
                  />
                  <path
                    className="entrance-arrow"
                    d={`M${entrance.x + entrance.w / 2} 572 l-8 12 h16 z`}
                  />
                  <text
                    className="entrance-label mono"
                    x={entrance.x + entrance.w / 2}
                    y={604}
                    textAnchor="middle"
                  >
                    {dict.map.zones.entrance}
                  </text>

                  {booths.map((b) => {
                    const c = b.company;
                    const dimmed = !matches.has(b.id);
                    const label = c
                      ? fitLabel(c.name, b.w, b.tier === "bronze" ? 5.9 : 7.4)
                      : dict.map.available;
                    return (
                      <g
                        key={b.id}
                        className={[
                          "booth",
                          `tier-${b.tier}`,
                          c ? "" : "free",
                          dimmed ? "dimmed" : "",
                          selected === b.id ? "selected" : "",
                        ].join(" ")}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected === b.id}
                        aria-label={`${dict.map.booth} ${b.id}: ${c ? c.name : dict.map.available}`}
                        onClick={() => select(b.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            select(b.id);
                          }
                        }}
                        onMouseEnter={() => setHover(b.id)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(b.id)}
                        onBlur={() => setHover(null)}
                      >
                        <rect className="ring" x={b.x} y={b.y} width={b.w} height={b.h} rx="6" />
                        <rect className="body" x={b.x} y={b.y} width={b.w} height={b.h} rx="6" />
                        <text className="b-id mono" x={b.x + 7} y={b.y + 14}>
                          {b.id}
                        </text>
                        <text
                          className="b-name"
                          x={b.x + b.w / 2}
                          y={b.y + b.h / 2 + (b.tier === "bronze" ? 9 : 8)}
                          textAnchor="middle"
                        >
                          {b.tier === "bronze" && !c ? "+" : label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div
                  className="map-tip"
                  aria-hidden="true"
                  style={{
                    opacity: hovered ? 1 : 0,
                    left: hovered ? `${((hovered.x + hovered.w / 2) / viewBox.w) * 100}%` : undefined,
                    top: hovered ? `${(hovered.y / viewBox.h) * 100}%` : undefined,
                  }}
                >
                  {hovered && (
                    <>
                      <strong>{hovered.company?.name ?? dict.map.availableTitle}</strong>
                      <small className="mono">
                        {hovered.id} · {tierName(hovered.tier, lang)}
                        {hovered.company && ` · ${dict.industries[hovered.company.industry]}`}
                      </small>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="legend mono">
              <span>{dict.map.legend}:</span>
              {packages
                .slice()
                .reverse()
                .map((p) => (
                  <span key={p.id}>
                    <i
                      style={{
                        background:
                          p.id === "main"
                            ? "var(--pink)"
                            : p.id === "gold"
                              ? "rgba(242,128,161,.55)"
                              : p.id === "silver"
                                ? "rgba(242,128,161,.28)"
                                : "rgba(242,128,161,.1)",
                      }}
                    />
                    {p.name[lang]}
                  </span>
                ))}
              <span>
                <i style={{ borderStyle: "dashed", borderColor: "var(--dim)" }} />
                {dict.map.available}
              </span>
            </div>
          </div>

          <aside className="panel" ref={panelRef} aria-live="polite">
            {!current && (
              <div className="panel-empty panel-inner">
                <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    d="M24 6 L43 40 H5 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="29" r="3" fill="currentColor" />
                </svg>
                <strong>{dict.map.selectPrompt}</strong>
                <p>{dict.map.selectHint}</p>
              </div>
            )}

            {current && !current.company && (
              <div className="panel-inner" key={current.id}>
                <div className="panel-head">
                  <div
                    className="logo-badge mono"
                    style={{ background: "transparent", border: "1px dashed var(--dim)", color: "var(--dim)" }}
                  >
                    {current.id}
                  </div>
                  <div>
                    <h3>{dict.map.availableTitle}</h3>
                    <div className="meta mono">
                      {dict.map.booth} {current.id} · {tierName(current.tier, lang)}
                    </div>
                  </div>
                </div>
                <p className="desc">{dict.map.availableText}</p>
                <a href={`#contact-${current.tier}-${current.id}`} className="btn btn-primary">
                  {dict.map.bookThis} <Arrow />
                </a>
              </div>
            )}

            {current?.company && (
              <div className="panel-inner" key={current.id}>
                <div className="panel-head">
                  <div className="logo-badge" style={{ background: current.company.color }}>
                    {initials(current.company.name)}
                  </div>
                  <div>
                    <h3>{current.company.name}</h3>
                    <div className="meta mono">
                      {dict.map.booth} {current.id} · {tierName(current.tier, lang)}
                    </div>
                  </div>
                </div>
                <p className="desc">{current.company.description[lang]}</p>
                <dl className="kv">
                  <div>
                    <dt className="mono">{dict.map.industry}</dt>
                    <dd>{dict.industries[current.company.industry]}</dd>
                  </div>
                  <div>
                    <dt className="mono">{dict.map.offers}</dt>
                    <dd className="tags">
                      {current.company.offers.map((o) => (
                        <span className="tag" key={o}>
                          {dict.offers[o]}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="mono">{dict.map.programs}</dt>
                    <dd className="mono">{current.company.programs.join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="mono">{dict.map.locations}</dt>
                    <dd>{current.company.locations}</dd>
                  </div>
                  <div>
                    <dt className="mono">{dict.map.employees}</dt>
                    <dd className="mono">{current.company.employees}</dd>
                  </div>
                </dl>
                <a
                  href={current.company.website}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.map.visit} <Arrow />
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
