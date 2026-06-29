import { ArrowRight, Scale, Zap, Lock } from "lucide-react";
import ScrollyTelling from "@/components/ScrollyTelling";
import IntentForm from "@/components/IntentForm";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <h1>
              Inköp av industriell tillverkningsförmåga, helt utan friktion.
            </h1>
            <p>
              Vi matchar ert behov mot vårt nätverk av industriell
              legotillverkning över hela Sverige. Vår databas täcker alla
              företag inom industriell kontraktstillverkning, oavsett maskinpark,
              ISO-certifieringar eller storlek på produktion. Allt du behöver
              göra är att definiera krav, ladda upp ritning och få 5 validerade
              matchningar inom 48 timmar.
            </p>
            <a href="#intent-form" className="btn-primary">
              Starta matchning <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-image-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/part.png"
              alt="Mekanisk komponent"
              className="hero-img blend-img"
            />
          </div>
        </div>
      </section>

      <ScrollyTelling />

      <section className="security-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "50px" }}>
            <h2>Vårt löfte till er</h2>
          </div>
          <div className="security-grid">
            <div className="sec-card">
              <Scale size={28} className="icon" />
              <h3>Oberoende aktör</h3>
              <p>
                Vi är agnostiska och matchar enbart baserat på era krav och
                leverantörens faktiska förmåga.
              </p>
            </div>
            <div className="sec-card">
              <Zap size={28} className="icon" />
              <h3>Eliminerad admin</h3>
              <p>
                Vår databas och proprietära algoritm ersätter tidskrävande
                research och garanterar ett anpassat urval redo för er att
                utforska.
              </p>
            </div>
            <div className="sec-card">
              <Lock size={28} className="icon" />
              <h3>Säkerhet i fokus</h3>
              <p>
                Ritningar hanteras med sekretess, lagras krypterat och raderas
                enligt uppsatta tidsramar. Leverantörer måste godkänna NDA för
                att ta del av ritningsunderlag.
              </p>
            </div>
          </div>
        </div>
      </section>

      <IntentForm />
    </>
  );
}
