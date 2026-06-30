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
        <div className="footer-categories">
          <div className="footer-col">
            <h4>Bearbetningsmetoder</h4>
            <ul>
              <li><Link href="/cnc-bearbetning">CNC-bearbetning</Link></li>
              <li><Link href="/plat-och-svets">Plåt &amp; svets</Link></li>
              <li><Link href="/gjutning">Gjutning</Link></li>
              <li><Link href="/formsprutning">Formsprutning</Link></li>
              <li><Link href="/3d-printing">3D-printing</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Material</h4>
            <ul>
              <li><Link href="/legotillverkning-aluminium">Aluminium</Link></li>
              <li><Link href="/legotillverkning-rostfritt">Rostfritt stål</Link></li>
              <li><Link href="/titan-bearbetning">Titan</Link></li>
              <li><Link href="/legotillverkning-plast">Plast &amp; polymerer</Link></li>
              <li><Link href="/kompositmaterial">Komposit</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Regioner</h4>
            <ul>
              <li><Link href="/legotillverkare-goteborg">Göteborg</Link></li>
              <li><Link href="/legotillverkare-stockholm">Stockholm</Link></li>
              <li><Link href="/legotillverkare-smaland">Småland</Link></li>
              <li><Link href="/legotillverkare-skane">Skåne</Link></li>
              <li><Link href="/legotillverkare-blekinge">Blekinge</Link></li>
              <li><Link href="/legotillverkare-halland">Halland</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Branscher</h4>
            <ul>
              <li><Link href="/as9100-certifierade-leverantorer">Försvar &amp; flyg</Link></li>
              <li><Link href="/fordonsindustri">Fordonsindustri</Link></li>
              <li><Link href="/medicinteknik">Medicinteknik</Link></li>
              <li><Link href="/energi">Energi</Link></li>
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
