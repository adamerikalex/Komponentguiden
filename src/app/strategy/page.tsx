export default function StrategyPage() {
  return (
    <div className="container">
      <div className="page-header">
        <span className="metadata">Intern roadmap</span>
        <h1>Det asymmetriska värdet</h1>
        <p>
          Så bygger vi en oöverträffad vallgrav genom data och industriell
          konsolidering.
        </p>
      </div>

      <div className="strategy-timeline">
        <div className="strategy-card">
          <span className="metadata" style={{ color: "var(--slate-navy-light)" }}>
            Steg 1
          </span>
          <h2>Intent-motorn</h2>
          <p>
            Vi erbjuder gratis matchning för att samla &ldquo;Intent-data&rdquo;.
            Vi kartlägger exakt vilka material, volymer och ISO-certifikat som
            saknar kapacitet på marknaden.
          </p>
        </div>

        <div className="strategy-card">
          <span className="metadata" style={{ color: "var(--slate-navy-light)" }}>
            Steg 2
          </span>
          <h2>Den hanterade marknadsplatsen (concierge)</h2>
          <p>
            Vi agerar huvudleverantör för stora OEM:s tail-spend. Vi tar en
            transaktionsmarginal, sköter QA och använder exklusivt vår shortlist
            av validerade leverantörer.
          </p>
        </div>

        <div className="strategy-card">
          <span className="metadata" style={{ color: "var(--indigo)" }}>
            Steg 3
          </span>
          <h2>Datadriven M&amp;A</h2>
          <p>
            Med full förståelse för utbudet (Metal Base) och efterfrågan
            (Komponentguiden) vet vi exakt vilken nisch som är underförsörjd. Vi
            identifierar &ldquo;Lazy Twins&rdquo;, förvärvar dem och fyller dem
            omedelbart med vår orderbok.
          </p>
        </div>
      </div>
    </div>
  );
}
