import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sekretesspolicy — Komponentguiden",
  description:
    "Komponentguidens sekretesspolicy — hur vi samlar in, hanterar och skyddar dina personuppgifter i enlighet med GDPR.",
};

export default function SekretesspolicyPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--surface)", padding: "72px 0 48px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="metadata">Integritet &amp; GDPR</span>
          <h1
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              color: "var(--slate-navy)",
              fontWeight: 800,
              marginTop: "12px",
            }}
          >
            Sekretesspolicy
          </h1>
          <p style={{ fontSize: "16px", color: "var(--slate-navy-light)", marginTop: "12px" }}>
            Senast uppdaterad: januari 2026
          </p>
        </div>
      </section>

      {/* Policy content */}
      <section style={{ background: "var(--canvas)", padding: "64px 0" }}>
        <div className="container">
          <div
            className="form-card prose"
            style={{ maxWidth: "720px", padding: "48px" }}
          >
            <h2 style={{ marginTop: 0 }}>Personuppgiftsansvarig</h2>
            <p>
              Komponentguiden AB (org. nr. XXXXXX-XXXX) är personuppgiftsansvarig
              för behandlingen av dina personuppgifter. Kontakta oss vid frågor
              om denna policy på info@komponentguiden.se.
            </p>

            <h2>Vilka uppgifter samlar vi in?</h2>
            <p>
              När du skickar en förfrågan via vår plattform samlar vi in följande
              uppgifter:
            </p>
            <ul>
              <li>Företagsnamn och organisationsnummer</li>
              <li>Kontaktuppgifter: e-postadress och telefonnummer</li>
              <li>
                Projektinformation: projektnamn, bearbetningsmetod, materialval,
                toleranskrav, ytbehandlingskrav, certifieringskrav, volym och
                önskad tidsram
              </li>
              <li>
                Filer och ritningar som laddas upp i samband med förfrågan
                (frivilligt)
              </li>
            </ul>
            <p>
              Vi samlar inte in personuppgifter via cookies eller
              spårningsverktyg för annonsering.
            </p>

            <h2>Varför behandlar vi dina uppgifter?</h2>
            <p>Vi behandlar dina uppgifter för att:</p>
            <ul>
              <li>
                Matcha din förfrågan mot relevanta legotillverkare i vårt nätverk
                (fullgörande av åtagande)
              </li>
              <li>
                Återkoppla till dig med matchningsresultat och relevant
                information (berättigat intresse)
              </li>
              <li>
                Förbättra vår matchningsalgoritm och tjänstens kvalitet
                (berättigat intresse)
              </li>
            </ul>

            <h2>Delar vi dina uppgifter med tredje part?</h2>
            <p>
              Din förfrågan och dina underlag delas med upp till fem utvalda
              leverantörer i syfte att genomföra matchningen. Detta sker under
              sekretess i enlighet med det sekretessgodkännande du lämnar i
              formuläret.
            </p>
            <p>
              Vi använder Supabase som teknisk plattform för datalagring. Supabase
              är ett EU-baserat alternativ och uppfyller GDPR:s krav på
              databehandling inom EU/EES.
            </p>
            <p>
              Vi säljer aldrig dina uppgifter till tredje part och delar dem inte
              för marknadsföringsändamål.
            </p>

            <h2>Hur länge sparar vi dina uppgifter?</h2>
            <p>
              Vi sparar dina uppgifter i 24 månader från det att förfrågan
              skickades, eller tills du begär att de raderas. Uppladdade filer och
              ritningar raderas inom 12 månader om ingen aktiv affärsrelation har
              etablerats.
            </p>

            <h2>Dina rättigheter</h2>
            <p>Enligt GDPR har du rätt att:</p>
            <ul>
              <li><strong>Få tillgång</strong> till de uppgifter vi har om dig</li>
              <li><strong>Rätta</strong> felaktiga uppgifter</li>
              <li><strong>Radera</strong> dina uppgifter ("rätten att bli glömd")</li>
              <li><strong>Begränsa</strong> behandlingen av dina uppgifter</li>
              <li>
                <strong>Invända</strong> mot behandling som baseras på berättigat
                intresse
              </li>
              <li>
                <strong>Dataportabilitet</strong> — få ut dina uppgifter i ett
                maskinläsbart format
              </li>
            </ul>
            <p>
              För att utöva dina rättigheter, kontakta oss på
              info@komponentguiden.se. Vi svarar inom 30 dagar.
            </p>
            <p>
              Du har också rätt att lämna klagomål till
              Integritetsskyddsmyndigheten (IMY) på imy.se.
            </p>

            <h2>Säkerhet</h2>
            <p>
              Vi vidtar tekniska och organisatoriska åtgärder för att skydda dina
              uppgifter mot obehörig åtkomst, förlust eller missbruk. All
              dataöverföring sker krypterat via HTTPS.
            </p>

            <h2>Ändringar i denna policy</h2>
            <p>
              Vi kan komma att uppdatera denna sekretesspolicy. Vid väsentliga
              ändringar meddelar vi dig via e-post om vi har dina
              kontaktuppgifter. Den senaste versionen finns alltid tillgänglig på
              denna sida.
            </p>

            <h2>Kontakt</h2>
            <p>
              Har du frågor om hur vi hanterar dina personuppgifter? Kontakta oss
              på:
            </p>
            <p>
              <strong>Komponentguiden AB</strong>
              <br />
              info@komponentguiden.se
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
