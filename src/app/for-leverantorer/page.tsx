import type { Metadata } from "next";
import SupplierForm from "@/components/SupplierForm";

export const metadata: Metadata = {
  title: "För leverantörer — få kostnadsfria förfrågningar | Komponentguiden",
  description:
    "Är ni legotillverkare inom metall, plast eller komposit? Registrera er kapacitetsprofil kostnadsfritt och matchas mot köpare som söker just er förmåga.",
};

const benefits: { title: string; body: string }[] = [
  {
    title: "Kostnadsfria förfrågningar",
    body: "Vi matchar er mot köpare som aktivt söker er bearbetningsmetod, material och kapacitet — ni betalar inget för att synas.",
  },
  {
    title: "Rätt förfrågningar, inte fler",
    body: "Matchningen bygger på maskinpark, certifieringar och kapacitet — så ni får förfrågningar ni faktiskt kan svara på, inte brus.",
  },
  {
    title: "Ni behåller kundrelationen",
    body: "Vi kopplar ihop er med köparen. Inget mellanled i affären, ingen bindning.",
  },
];

export default function ForLeverantorerPage() {
  return (
    <>
      <section className="cat-hero">
        <div className="container">
          <div className="cat-hero-inner">
            <span className="metadata">För leverantörer</span>
            <h1 className="cat-h1">Få rätt köpare att hitta er</h1>
            <p className="cat-intro">
              Komponentguiden matchar industriella köpare mot svenska legotillverkare inom
              metall, plast och komposit. Registrera er kapacitetsprofil så dyker ni upp när
              en köpare söker just er förmåga — kostnadsfritt.
            </p>
            <a href="#leverantor-form" className="btn-primary">
              Registrera profil →
            </a>
          </div>
        </div>
      </section>

      <section className="cat-valueprops">
        <div className="container">
          <h2 className="cat-section-heading">Varför registrera er?</h2>
          <div className="valueprops-grid">
            {benefits.map((b) => (
              <div key={b.title} className="valueprop-card">
                <h3 className="valueprop-heading">{b.title}</h3>
                <p className="valueprop-body">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupplierForm />
    </>
  );
}
