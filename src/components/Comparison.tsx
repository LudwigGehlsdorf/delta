"use client";

import { useState } from "react";
import { features, formatPrice, packages, type FeatureValue } from "@/data/packages";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Check } from "./icons";

const same = (vals: FeatureValue[]) =>
  vals.every((v) => JSON.stringify(v) === JSON.stringify(vals[0]));

export function Comparison({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [onlyDiff, setOnlyDiff] = useState(false);
  const [col, setCol] = useState<number | null>(null);

  const cell = (v: FeatureValue) => {
    if (v === true)
      return (
        <span className="yes" title={dict.compare.included}>
          <Check size={12} />
        </span>
      );
    if (v === false)
      return <span className="no" role="img" aria-label={dict.compare.notIncluded} />;
    return <span className="val">{v[lang]}</span>;
  };

  const hl = (i: number) => (col === i ? "col-hover" : "");

  return (
    <section id="compare" className="section section-alt">
      <div className="container">
        <div className="compare-head">
          <div>
            <span className="section-tag mono" data-reveal>
              {dict.compare.tag}
            </span>
            <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {dict.compare.title}
            </h2>
          </div>
          <label className="toggle" data-reveal>
            <input
              type="checkbox"
              checked={onlyDiff}
              onChange={(e) => setOnlyDiff(e.target.checked)}
            />
            <span className="track" />
            {dict.compare.onlyDiff}
          </label>
        </div>

        <div className="compare-wrap" data-reveal="scale" onMouseLeave={() => setCol(null)}>
          <div className="compare" role="table" aria-label={dict.compare.title}>
            <div className="c-row c-head" role="row">
              <div className="c-cell" role="columnheader">
                <span className="mono">{dict.compare.feature}</span>
              </div>
              {packages.map((p, i) => (
                <div
                  key={p.id}
                  className={`c-cell ${hl(i)}`}
                  role="columnheader"
                  onMouseEnter={() => setCol(i)}
                >
                  <strong>{p.name[lang]}</strong>
                  <span className="mono">
                    {formatPrice(p.price, lang)} {dict.packages.from}
                  </span>
                </div>
              ))}
            </div>
            {features.map((f) => {
              const vals = packages.map((p) => f.values[p.id]);
              const hidden = onlyDiff && same(vals);
              return (
                <div
                  key={f.label.sv}
                  className={`c-row ${hidden ? "hidden-row" : "enter"}`}
                  role="row"
                >
                  <div className="c-cell" role="rowheader">
                    {f.label[lang]}
                  </div>
                  {vals.map((v, i) => (
                    <div
                      key={packages[i].id}
                      className={`c-cell ${hl(i)}`}
                      role="cell"
                      onMouseEnter={() => setCol(i)}
                    >
                      {cell(v)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
