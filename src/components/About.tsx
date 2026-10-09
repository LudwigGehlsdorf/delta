import { event } from "@/config/event";
import type { Dictionary } from "@/i18n/dictionaries";

const icons = ["{ }", "E:", "Δ"];

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="about" className="section">
      <div className="grid-bg" />
      <div className="container" style={{ position: "relative" }}>
        <span className="section-tag mono" data-reveal>
          {dict.about.tag}
        </span>
        <h2 className="section-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {dict.about.title}
        </h2>
        <div className="about-grid">
          <div className="about-body" data-reveal="left">
            {dict.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="terminal mono" aria-hidden="true">
              <div className="terminal-bar">
                <i />
                <i />
                <i />
              </div>
              <div className="terminal-body">
                <div>
                  <span className="k">$</span> delta --info
                </div>
                <div>
                  venue: <span className="s">&quot;{event.venue}&quot;</span>
                </div>
                <div>
                  audience: <span className="s">[&quot;D&quot;, &quot;C&quot;]</span>
                </div>
                <div>
                  date: <span className="s">{event.date.slice(0, 10)}</span>
                </div>
                <div>
                  status: <span className="k">registration_open</span>
                </div>
              </div>
            </div>
          </div>
          <div className="points">
            {dict.about.points.map((pt, i) => (
              <div
                className="point"
                key={pt.title}
                data-reveal
                style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
              >
                <div className="point-icon mono">{icons[i]}</div>
                <div>
                  <h3>{pt.title}</h3>
                  <p>{pt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
