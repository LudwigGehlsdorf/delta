"use client";

import { useEffect, useState } from "react";
import { event } from "@/config/event";
import { packages, type PackageId } from "@/data/packages";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Arrow } from "./icons";

export function Contact({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [pkg, setPkg] = useState<PackageId | "">("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // Links like #contact-gold or #contact-bronze-B3 preselect a package/booth.
  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(/^#contact-(\w+?)(?:-(\w+))?$/);
      if (!m) return;
      if (packages.some((p) => p.id === m[1])) setPkg(m[1] as PackageId);
      if (m[2]) setMessage(`${dict.map.booth} ${m[2]}\n`);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [dict]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const chosen = packages.find((p) => p.id === pkg)?.name[lang] ?? dict.contact.undecided;
    const body = [
      `${dict.contact.company}: ${data.get("company")}`,
      `${dict.contact.name}: ${data.get("name")}`,
      `${dict.contact.email}: ${data.get("email")}`,
      `${dict.contact.package}: ${chosen}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    const subject = `${dict.contact.subject} – ${data.get("company")}`;
    window.location.href = `mailto:${event.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="grid-bg" />
      <div className="container contact-grid" style={{ position: "relative" }}>
        <div>
          <span className="section-tag mono" data-reveal>
            {dict.contact.tag}
          </span>
          <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {dict.contact.title}
          </h2>
          <p className="section-lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            {dict.contact.lead}
          </p>
          <a
            href={`mailto:${event.email}`}
            className="contact-mail mono"
            data-reveal
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            {event.email} <Arrow />
          </a>
        </div>

        <form className="form" onSubmit={onSubmit} data-reveal="scale">
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-company" className="mono">{dict.contact.company}</label>
              <input id="f-company" name="company" required autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="f-name" className="mono">{dict.contact.name}</label>
              <input id="f-name" name="name" required autoComplete="name" />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-email" className="mono">{dict.contact.email}</label>
              <input id="f-email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="f-pkg" className="mono">{dict.contact.package}</label>
              <select
                id="f-pkg"
                name="package"
                value={pkg}
                onChange={(e) => setPkg(e.target.value as PackageId | "")}
              >
                <option value="">{dict.contact.undecided}</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name[lang]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-msg" className="mono">{dict.contact.message}</label>
            <textarea
              id="f-msg"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={dict.contact.messagePlaceholder}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {dict.contact.submit} <Arrow />
          </button>
          {sent && <p className="form-note mono">✓ {dict.contact.sent}</p>}
        </form>
      </div>
    </section>
  );
}
