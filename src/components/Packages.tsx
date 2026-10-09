import { addons, formatPrice, packages } from "@/data/packages";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Arrow, Check } from "./icons";

export function TierBars({ level }: { level: number }) {
  return (
    <span className="tier-bars" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <i key={i} className={i <= level ? "on" : ""} style={{ height: 6 + i * 3 }} />
      ))}
    </span>
  );
}

export function Packages({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section id="packages" className="section">
      <div className="container">
        <span className="section-tag mono" data-reveal>
          {dict.packages.tag}
        </span>
        <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {dict.packages.title}
        </h2>
        <p className="section-lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          {dict.packages.lead}
        </p>

        <div className="packages">
          {packages.map((pkg, i) => (
            <article
              key={pkg.id}
              className={`pkg spot ${pkg.popular ? "featured" : ""}`}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
            >
              {pkg.popular && <span className="pkg-badge">{dict.packages.popular}</span>}
              {pkg.exclusive && (
                <span className="pkg-badge outline">{dict.packages.exclusive}</span>
              )}
              <div className="pkg-tier mono">
                <TierBars level={i} />
                tier_0{i + 1}
              </div>
              <h3>{pkg.name[lang]}</h3>
              <p className="tagline">{pkg.tagline[lang]}</p>
              <div className="price">
                <strong className="mono">{formatPrice(pkg.price, lang)}</strong>
                <span>{dict.packages.from}</span>
              </div>
              <ul>
                {pkg.highlights.map((h) => (
                  <li key={h.sv}>
                    <Check />
                    {h[lang]}
                  </li>
                ))}
              </ul>
              <a
                href={`#contact-${pkg.id}`}
                className={`btn ${pkg.popular ? "btn-primary" : ""}`}
              >
                {dict.packages.select} {pkg.name[lang]} <Arrow />
              </a>
            </article>
          ))}
        </div>

        <div className="addons" data-reveal>
          <div>
            <h3>{dict.packages.addonsTitle}</h3>
            <p>{dict.packages.addonsLead}</p>
          </div>
          <div className="addon-list">
            {addons.map((a) => (
              <span className="addon" key={a.name.sv}>
                {a.name[lang]}
                <span className="mono">
                  +{formatPrice(a.price, lang)} {dict.packages.from}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
