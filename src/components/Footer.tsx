import Link from "next/link";
import { Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo" style={{ marginBottom: "16px" }}>
              <Layers size={20} className="logo-icon" />
              Komponentguiden
            </Link>
            <p style={{ fontSize: "14px", maxWidth: "300px" }}>
              Vi kopplar samman industriella inköpare med Sveriges främsta
              legotillverkare. Säker, datadriven och friktionsfri sourcing.
            </p>
          </div>
          <div className="footer-col">
            <h4>Plattformen</h4>
            <ul>
              <li>
                <Link href="/">Start</Link>
              </li>
              <li>
                <Link href="/concierge">Concierge</Link>
              </li>
              <li>
                <Link href="/about">Om oss</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <ul>
              <li>
                <a href="mailto:hej@komponentguiden.se">
                  hej@komponentguiden.se
                </a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Sekretesspolicy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Komponentguiden AB. Alla rättigheter reserverade.</span>
          <span style={{ display: "flex", gap: "16px" }}>
            <a
              href="#"
              style={{
                color: "var(--slate-navy-light)",
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
