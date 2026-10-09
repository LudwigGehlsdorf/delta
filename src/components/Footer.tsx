import { event } from "@/config/event";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-big mono" aria-hidden="true">
          <span className="prompt">&gt;</span> DELTA
        </div>
        <div className="footer-row">
          <span>{dict.footer.org}</span>
          <span className="mono">
            {event.venue} · {event.address}
          </span>
          <a href={event.website} target="_blank" rel="noopener noreferrer">
            {dict.footer.links} ↗
          </a>
          <span>
            © {new Date(event.date).getFullYear()} D-sektionen inom TLTH. {dict.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
