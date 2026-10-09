import type { Dictionary } from "@/i18n/dictionaries";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section id="faq" className="section section-alt">
      <div className="container">
        <span className="section-tag mono" data-reveal>
          {dict.faq.tag}
        </span>
        <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {dict.faq.title}
        </h2>
        <div className="faq">
          {dict.faq.items.map((item, i) => (
            <details
              key={item.q}
              data-reveal
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              <summary>
                <span className="idx mono">0{i + 1}</span>
                {item.q}
                <span className="plus" aria-hidden="true" />
              </summary>
              <p className="answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
