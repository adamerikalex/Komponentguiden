import type { Metadata } from "next";
import {
  Network, Scale, ShieldCheck, Award,
  FileText, Search, FileCheck, Settings, PackageCheck, Receipt,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Concierge — Komponentguiden",
  description:
    "Komponentguiden Concierge är er externa inköpsfunktion för legotillverkning. Vi sourcear, kvalificerar, beställer och följer upp — ni godkänner offerten och tar emot godset.",
};

export default function ConciergePage() {
  return (
    <>
      {/* Hero */}
      <section className="concierge-hero">
        <div className="container">
          <span className="metadata" style={{ color: "var(--turquoise)" }}>
            Concierge
          </span>
          <h1>Vi tar helhetsansvaret, från ritning till lastkaj.</h1>
          <p className="concierge-hero-intro">
            Komponentguiden Concierge är er externa inköpsfunktion för
            legotillverkning. Vi sourcear, kvalificerar, beställer och följer
            upp — ni godkänner offerten och tar emot godset.
          </p>
          <div className="concierge-hero-cta">
            <a
              href="mailto:info@komponentguiden.se?subject=Concierge"
              className="btn-concierge-hero"
            >
              Kontakta oss →
            </a>
            <p className="concierge-hero-subtext"><em>Vi återkommer inom en arbetsdag.</em></p>
          </div>
        </div>
      </section>

      {/* Qualifier */}
      <section className="concierge-qualifier">
        <div className="container">
          <h2 className="cat-section-heading">När passar Concierge?</h2>
          <div className="valueprops-grid">
            <div className="qualifier-card">
              <h3>Inköp som tar oproportionerlig tid</h3>
              <p>
                De inköp som är för små för att motivera en full
                leverantörsprocess, men för viktiga för att slarva med. Vi tar
                över ansvaret så att er inköpsavdelning kan fokusera på det
                strategiska.
              </p>
            </div>
            <div className="qualifier-card">
              <h3>Ni saknar kapacitet eller kompetens</h3>
              <p>
                Projektet kräver ett material eller en bearbetningsmetod som ni
                inte regelbundet handlar. Vi har redan nätverket med rätt
                förmåga — ni slipper bygga upp det.
              </p>
            </div>
            <div className="qualifier-card">
              <h3>Ni vill säkra leverantörskvaliteten</h3>
              <p>
                Vi granskar leverantörer på era uppdrag — teknisk kapabilitet,
                finansiell stabilitet och ägarstruktur mot er uppförandekod. Ni
                får ett validerat leverantörsunderlag utan att behöva genomföra
                revisionen själva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="concierge-process">
        <div className="container">
          <h2 className="cat-section-heading">Från ritning till lastkaj</h2>
          <div className="process-flow">
            <div className="process-step">
              <div className="process-step-number"><FileText size={20} /></div>
              <div className="process-step-body">
                <h3>Specifikation</h3>
                <p>
                  Ni skickar ritning, material, toleranskrav och volym — ett mail
                  räcker för att komma igång.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number"><Search size={20} /></div>
              <div className="process-step-body">
                <h3>Sourcing &amp; kvalificering</h3>
                <p>
                  Vi identifierar rätt leverantör ur vårt validerade nätverk. Ni
                  ser aldrig en okvalificerad leverantör.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number"><FileCheck size={20} /></div>
              <div className="process-step-body">
                <h3>Offert</h3>
                <p>
                  Ni får en offert som visar leverantörens pris och vårt påslag
                  separat.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number"><Settings size={20} /></div>
              <div className="process-step-body">
                <h3>Produktion &amp;<br />uppföljning</h3>
                <p>
                  Vi lägger ordern, kommunicerar med leverantören och hanterar
                  eventuella avvikelser.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number"><PackageCheck size={20} /></div>
              <div className="process-step-body">
                <h3>Leverans</h3>
                <p>
                  Komponenter levereras enligt spec. Vi bär kvalitetsansvaret och
                  hanterar avvikelser om något inte stämmer.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-step-number"><Receipt size={20} /></div>
              <div className="process-step-body">
                <h3>Betalning</h3>
                <p>
                  Ni betalar en faktura — från oss, inte från verkstaden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="concierge-pricing">
        <div className="container">
          <h2 className="cat-section-heading">Transparent prissättning</h2>
          <div className="pricing-highlight">
            <div className="pricing-highlight-badge">
              <span className="pricing-highlight-number">10%</span>
            </div>
            <div className="pricing-highlight-text">
              <p>
                Vi arbetar med ett fast påslag på <strong>10 %</strong> på
                leverantörens faktiska pris. Det finns inga startavgifter, inga
                abonnemang eller dolda avgifter.
              </p>
              <p>
                Ni ser alltid fördelningen — leverantörens pris och vårt påslag
                redovisas separat i offerten innan ni godkänner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="concierge-features-section">
        <div className="container">
          <h2 className="cat-section-heading">Det här ingår</h2>
          <div className="concierge-features-grid">
            <div className="concierge-feature-card">
              <Network size={24} className="concierge-feature-icon" />
              <h3>En enda motpart</h3>
              <p>
                Eliminera uppläggning av nya leverantörer i ert affärssystem.
                Komponentguiden är er enda motpart — en leverantör, en faktura,
                ett ansvar.
              </p>
            </div>
            <div className="concierge-feature-card">
              <Scale size={24} className="concierge-feature-icon" />
              <h3>Konkurrenskraftig prissättning</h3>
              <p>
                Vi matchar era behov mot verkstäder med outnyttjad kapacitet,
                vilket driver attraktiva grundpriser.
              </p>
            </div>
            <div className="concierge-feature-card">
              <ShieldCheck size={24} className="concierge-feature-icon" />
              <h3>Kvalitets- och leveransansvar</h3>
              <p>
                Vi bär det fulla ansvaret för att komponenten uppfyller
                specifikationen och levereras i tid. Avvikelser hanterar vi —
                inte ni.
              </p>
            </div>
            <div className="concierge-feature-card">
              <Award size={24} className="concierge-feature-icon" />
              <h3>Validerat nätverk</h3>
              <p>
                Vi använder noggrant utvalda leverantörer med vilka vi har ett
                nära samarbete. Platsbesök, revision och löpande kvalitetskontroll
                sköter vi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="concierge-bottom-cta">
        <div className="container">
          <h2>Redo att prova?</h2>
          <p>
            Dela er specifikation så återkommer vi med en offert inom en
            arbetsdag. Inget möte krävs för att komma igång.
          </p>
          <a
            href="mailto:info@komponentguiden.se?subject=Concierge"
            className="btn-concierge-hero"
          >
            Skicka specifikation →
          </a>
        </div>
      </section>
    </>
  );
}
