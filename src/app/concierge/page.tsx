import { Network, ShieldCheck, Award, Mail } from "lucide-react";

export default function ConciergePage() {
  return (
    <>
      <div className="concierge-hero">
        <span className="metadata" style={{ color: "var(--turquoise)" }}>
          Premium Sourcing
        </span>
        <h1>Låt oss ta helhetsansvaret.</h1>
        <p>
          För strategiska inköp och komplexa projekt där ni behöver en betrodd
          partner som eliminerar friktion. Vi stöttar i hela processen från
          uppladdad ritning till levererade komponenter på er lastkaj.
        </p>
        <button
          className="btn-primary"
          style={{
            background: "white",
            color: "var(--slate-navy)",
            boxShadow: "none",
          }}
        >
          Kontakta oss <Mail size={16} />
        </button>
      </div>

      <div className="container" style={{ marginBottom: "100px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto 60px auto",
            fontSize: "16px",
            color: "var(--slate-navy-light)",
          }}
        >
          <p style={{ marginBottom: "20px" }}>
            Svansen av spend och upphandlingar av små volymer kan vara
            utmanande i det dagliga arbetet. Oavsett om orsaken är begränsad
            intern kapacitet, oförutsedda produktionsstopp eller avsaknad av
            rätt produktionsförmåga skapar dessa inköp onödig belastning på er
            inköpsavdelning.
          </p>
          <p>
            Vi förstår processen för strategiskt inköp och har genom mängder av
            data och avancerade algoritmer lyckats kartlägga det industriella
            landskapet inom lego- och kontraktstillverkning. Vi ger er samma
            kontroll och precisa utförande av inköp i små volymer som ni själva
            tillämpar på era strategiska leverantörer. Allt som krävs är en
            tydlig specifikation, resten sköter vi.
          </p>
        </div>

        <div className="concierge-features">
          <div className="c-feat-card">
            <Network size={24} className="icon" />
            <h3>En enda motpart</h3>
            <p>
              Slipp administrationen med att lägga upp nya leverantörer i ert
              affärssystem. Vi tar plats som er huvudleverantör och
              konsoliderar små volymer.
            </p>
          </div>
          <div className="c-feat-card">
            <ShieldCheck size={24} className="icon" />
            <h3>Kvalitetsgaranti</h3>
            <p>
              Vi bär det fulla ansvaret. Vi kvalitetssäkrar produktionen,
              hanterar avvikelser och säkerställer att resultatet och
              leveransen möter era förväntningar.
            </p>
          </div>
          <div className="c-feat-card">
            <Award size={24} className="icon" />
            <h3>Validerat nätverk</h3>
            <p>
              Vi använder vårt noga utvalda leverantörer med vilka vi har ett
              nära samarbete. Överlåt platsbesök, revision och övergripande
              kvalitetskontroll till oss.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
