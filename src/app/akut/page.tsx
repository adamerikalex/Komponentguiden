import type { Metadata } from "next";
import { AlertTriangle, XCircle, Clock, Network, Zap, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Akut behov av legotillverkare? Vi hjälper er idag — Komponentguiden",
  description:
    "Leverantören har strulit, produktionen står still eller lanseringen är hotad. Vi svarar inom två timmar och mobiliserar rätt verkstad för er situation.",
};

export default function AkutPage() {
  return (
    <>
      {/* Hero */}
      <section className="akut-hero">
        <div className="container">
          <div className="akut-hero-inner">
            <span className="metadata" style={{ color: "var(--urgent)" }}>
              Akut leverantörsbehov
            </span>
            <h1 className="akut-h1">
              Oväntade bekymmer.
              <br />
              Ni behöver hjälp. Nu.
            </h1>
            <p className="akut-intro">
              Produktionen står still, lanseringen är hotad eller er ordinarie
              leverantör kan inte leverera i tid. Vi svarar inom två timmar och
              mobiliserar rätt verkstad för er situation.
            </p>
            <div className="akut-cta-block">
              {/* TODO: replace email when your address is ready */}
              <a
                href="mailto:info@komponentguiden.se?subject=Akut%20leverant%C3%B6rsbehov"
                className="btn-urgent"
              >
                Kontakta oss direkt →
              </a>
              <p className="akut-cta-sub"><em>Vi svarar inom två timmar på vardagar.</em></p>
            </div>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="akut-situations">
        <div className="container">
          <div className="situation-frame">
            <div className="situation-aligned-grid">

              {/* Column headers */}
              <div className="situation-header-cell situation-header-cell--problem">
                <h2>Ert bekymmer</h2>
              </div>
              <div className="situation-header-cell situation-header-cell--solution situation-cell--right">
                <h2>Vår lösning</h2>
              </div>

              {/* Row 1 */}
              <div className="situation-content-cell">
                <div className="situation-row-header">
                  <div className="situation-badge"><AlertTriangle size={15} /></div>
                  <span className="situation-row-heading">Leverantören kan inte leverera</span>
                </div>
                <p className="situation-row-body">
                  Er befintliga leverantör har kapacitetsproblem, kvalitetsavvikelser
                  eller har meddelat att de inte kan hålla tidplanen. Produktionsstart är hotad.
                </p>
              </div>
              <div className="situation-content-cell situation-cell--right">
                <div className="solution-row-header">
                  <div className="solution-badge"><Network size={15} /></div>
                  <span className="solution-row-heading">Brett utbud</span>
                </div>
                <p className="solution-row-body">
                  Med hjälp av vårt etablerade leverantörsnätverk och nära samarbete
                  kan vi alltid hitta ledig kapacitet med kort varsel.
                </p>
              </div>

              {/* Row 2 */}
              <div className="situation-content-cell">
                <div className="situation-row-header">
                  <div className="situation-badge"><XCircle size={15} /></div>
                  <span className="situation-row-heading">Produktionen är stoppad</span>
                </div>
                <p className="situation-row-body">
                  En komponent saknas och linan står still. Varje dag kostar. Ni
                  behöver en verkstad som kan starta omgående — inte om tre veckor.
                </p>
              </div>
              <div className="situation-content-cell situation-cell--right">
                <div className="solution-row-header">
                  <div className="solution-badge"><Zap size={15} /></div>
                  <span className="solution-row-heading">Digital förmedlare</span>
                </div>
                <p className="solution-row-body">
                  Vi tar del av ert underlag digitalt och säkerställer att rätt
                  leverantör får rätt information i rätt tid.
                </p>
              </div>

              {/* Row 3 — no bottom border */}
              <div className="situation-content-cell situation-content-cell--last">
                <div className="situation-row-header">
                  <div className="situation-badge"><Clock size={15} /></div>
                  <span className="situation-row-heading">Lansering under tidspress</span>
                </div>
                <p className="situation-row-body">
                  Den första batchen måste ut nu. Ordinarie process hinner inte — ni
                  behöver en parallell genväg med rätt leverantör.
                </p>
              </div>
              <div className="situation-content-cell situation-content-cell--last situation-cell--right">
                <div className="solution-row-header">
                  <div className="solution-badge"><Layers size={15} /></div>
                  <span className="solution-row-heading">Praktisk förståelse</span>
                </div>
                <p className="solution-row-body">
                  Vår specialisering inom legotillverkning skapar djup förståelse.
                  Vi ser detaljerna som gör skillnad.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="akut-process">
        <div className="container">
          <h2 className="cat-section-heading">Från kontakt till bekräftad leverantör — på 24 timmar</h2>
          <div className="akut-steps-row">
            <div className="akut-step">
              <div className="akut-step-badge">1</div>
              <h3 className="akut-step-heading">Kontakta oss</h3>
              <p>
                Berätta kort vad ni behöver — detalj, material, volym och
                tidskrav. Ritning behövs inte i första kontakten.
              </p>
            </div>
            <div className="akut-step">
              <div className="akut-step-badge">2</div>
              <h3 className="akut-step-heading">Vi bedömer och matchar</h3>
              <p>
                Vi svarar inom två timmar och matchar mot verkstäder med ledig
                kapacitet och rätt kompetens för er specifika situation.
              </p>
            </div>
            <div className="akut-step">
              <div className="akut-step-badge">3</div>
              <h3 className="akut-step-heading">Bekräftad plan</h3>
              <p>
                Ni godkänner matchningen och vi koordinerar med leverantören.
                Ni har en bekräftad plan inom 24 timmar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="akut-bottom-cta">
        <div className="container">
          <div className="akut-bottom-inner">
            <h2>Kontakta oss nu</h2>
            <p>
              Skriv ett mejl och beskriv er situation — detalj, material,
              tidskrav och övrig relevant info. Vi svarar inom två timmar på
              vardagar och mobiliserar rätt leverantör för er.
            </p>
            {/* TODO: replace email when your address is ready */}
            <a
              href="mailto:info@komponentguiden.se?subject=Akut%20leverant%C3%B6rsbehov"
              className="btn-urgent-inverse"
            >
              Skicka mejl →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
