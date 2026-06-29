export default function AboutPage() {
  return (
    <>
      <section
        className="om-oss-section"
        style={{ background: "var(--surface)" }}
      >
        <div className="container om-oss-grid text-left">
          <div className="om-oss-text">
            <span className="metadata">Vårt syfte</span>
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
              Att bevara svenskt industrihantverk
            </h2>
            <div
              style={{
                fontSize: "15px",
                color: "var(--slate-navy-light)",
                lineHeight: "1.6",
              }}
            >
              <p style={{ marginBottom: "15px" }}>
                Den svenska tillverkningsindustrin står inför ett paradigmskifte.
                Verkstäder och tillverkande företag med årtionden av erfarenhet
                genomgår just nu utmanande generationsskiften. Dessutom bromsas
                deras utveckling av en begränsad marknadsförings- och
                säljförmåga, även om den industriella och produktionstekniska
                kunskapen är hög.
              </p>
              <p style={{ marginBottom: "15px" }}>
                Konsekvensen blir att dessa företag inte kan dra nytta av de
                strukturella trenderna i form av hemtagning av produktion,
                försvarsupprustning och infrastrukturinvesteringar. Uppsidan
                tillfaller endast de företag som har resurser och kompetens att
                investera i affärsutveckling – Det vill vi ändra på.
              </p>
              <p>
                På andra sidan kämpar industriella köpare på stora bolag med
                tid- och resursbrist. Att upphandla prototypserier eller hitta ny
                kapacitet för mindre projekt driver administration. Ute i landet
                står samtidigt tusentals skickliga SME-verkstäder med avancerade
                maskinparker, men som saknar den digitala infrastrukturen för att
                fånga dessa förfrågningar.
              </p>
            </div>
          </div>
          <div className="om-oss-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/map.png"
              alt="Sverigekarta"
              className="blend-img"
              style={{ maxWidth: "320px" }}
            />
          </div>
        </div>
      </section>

      <section
        className="om-oss-section"
        style={{
          background: "var(--canvas)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container om-oss-grid text-right">
          <div className="om-oss-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/network.png"
              alt="Fabriksnätverk"
              className="blend-img"
              style={{ maxWidth: "450px" }}
            />
          </div>
          <div className="om-oss-text">
            <span className="metadata">Produkt</span>
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
              Vi stänger gapet
            </h2>
            <div
              style={{
                fontSize: "15px",
                color: "var(--slate-navy-light)",
                lineHeight: "1.6",
              }}
            >
              <p style={{ marginBottom: "15px" }}>
                Komponentguiden agerar som den digitala förmedlaren mellan
                inköparens tekniska krav och verkstadsgolvets faktiska förmåga.
              </p>
              <p>
                Vår matchningstjänst är helt gratis för inköpare då vårt primära
                mål är att sänka trösklarna för svensk produktion och säkra det
                industriella arvet. Genom att ta bort friktionen frigör vi tid
                för inköparna och ger SME-företagen tillgång till ordervolymer de
                annars aldrig hade fått chans att lämna anbud på. Vi bygger
                ekosystemet som låter industrin växa in i framtiden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="om-oss-section"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container om-oss-grid text-left">
          <div className="om-oss-text">
            <span className="metadata">Incitament</span>
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Win win</h2>
            <div
              style={{
                fontSize: "15px",
                color: "var(--slate-navy-light)",
                lineHeight: "1.6",
              }}
            >
              <p>
                Utöver att koppla samman köpare och säljare finns även en
                ekonomisk vinning, som gynnar alla. Genom att dra nytta av ett
                stort fragmenterat supply kan underutnyttjad kapacitet i
                produktion skapa affärer till attraktiva priser. Nyckeln är
                teknik, data och en marknadsplats som skapar förutsättningar.
              </p>
            </div>
          </div>
          <div className="om-oss-visual" />
        </div>
      </section>

      <section
        className="om-oss-section"
        style={{
          background: "var(--canvas)",
          borderTop: "1px solid var(--border)",
          paddingBottom: "100px",
        }}
      >
        <div className="container om-oss-grid text-right">
          <div className="om-oss-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team.png"
              alt="Vårt Team"
              style={{
                width: "100%",
                maxWidth: "450px",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.08))",
              }}
            />
          </div>
          <div className="om-oss-text">
            <span className="metadata">Team</span>
            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
              Personerna bakom tjänsten
            </h2>
            <div
              style={{
                fontSize: "15px",
                color: "var(--slate-navy-light)",
                lineHeight: "1.6",
              }}
            >
              <p style={{ marginBottom: "15px" }}>
                Vi är två nyfikna entreprenörer som drivs av att tillämpa ny
                teknik i gott syfte. Vi ser styrkan i digital distribution
                samtidigt som vi är stolta över den svenska kulturen av
                industriell produktion som satt Sverige på kartan och skapat
                förutsättningar för så mycket annat.
              </p>
              <p>
                Komponentguiden är ett koncept som gynnar alla inblandade, och
                &ldquo;Concierge&rdquo; är erbjudandet där vi själva på sikt
                ska bli en del av ekosystemet – Genom att eliminera friktion och
                administration för köparna skapar vi ytterligare värde.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
