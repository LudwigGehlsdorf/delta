import { event } from "@/config/event";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Engage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "sv" ? "sv-SE" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Stockholm",
    });

  const dates = [
    { when: fmt(event.registrationOpens), what: dict.engage.timeline.opens },
    { when: fmt(event.registrationCloses), what: dict.engage.timeline.closes },
    { when: fmt(event.date), what: dict.engage.timeline.fair, highlight: true },
  ];

  return (
    <section id="engage" className="section section-alt">
      <div className="container">
        <span className="section-tag mono" data-reveal>
          {dict.engage.tag}
        </span>
        <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {dict.engage.title}
        </h2>
        <p className="section-lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          {dict.engage.lead}
        </p>

        <div className="steps" role="list" data-observe>
          <div className="steps-line" aria-hidden="true" />
          {dict.engage.steps.map((step, i) => (
            <div
              role="listitem"
              className="step"
              key={step.title}
              data-reveal
              style={{ "--d": `${i * 120}ms`, "--i": i } as React.CSSProperties}
            >
              <span className="step-num mono">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <h3 className="section-tag mono" style={{ marginTop: 72 }} data-reveal>
          {dict.engage.timelineTitle}
        </h3>
        <div className="dates" style={{ marginTop: 16 }} data-reveal>
          {dates.map((d) => (
            <div className={`date ${d.highlight ? "highlight" : ""}`} key={d.what}>
              <div className="when mono">{d.when}</div>
              <div className="what">{d.what}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
