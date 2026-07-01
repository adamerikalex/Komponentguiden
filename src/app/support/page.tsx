import type { Metadata } from "next";
import { Mail, Search, Award, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Support — Komponentguiden",
  description: "Kontakta Komponentguiden. Vi svarar på frågor om matchning, Concierge och tekniska frågor.",
};

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="cat-hero">
        <div className="cat-hero-inner" style={{ maxWidth: "640px" }}>
          <span className="metadata">Support</span>
          <h1 className="cat-h1">Hur kan vi hjälpa er?</h1>
          <p className="cat-intro" style={{ marginBottom: 0 }}>
            Vi svarar på alla frågor om matchning, Concierge och hur plattformen
            fungerar. Hör av er — vi återkommer inom en arbetsdag.
          </p>
        </div>
      </section>

      {/* Contact card */}
      <section style={{ background: "var(--canvas)", padding: "64px 0" }}>
        <div className="container">
          <div
            className="form-card text-center"
            style={{ maxWidth: "480px", padding: "40px" }}
          >
            <Mail
              size={32}
              style={{ color: "var(--indigo)", marginBottom: "20px", display: "block", margin: "0 auto 20px" }}
            />
            <h2 style={{ fontSize: "20px", color: "var(--slate-navy)", fontWeight: 700, marginBottom: "8px" }}>
              Skicka oss ett mejl
            </h2>
            <p style={{ fontSize: "15px", color: "var(--slate-navy-light)", lineHeight: 1.6, marginBottom: "24px" }}>
              Beskriv er fråga eller ert ärende så återkommer vi inom en
              arbetsdag på vardagar.
            </p>
            <a href="mailto:info@komponentguiden.se" className="btn-primary">
              info@komponentguiden.se
            </a>
            <p style={{ fontSize: "13px", color: "var(--slate-navy-light)", marginTop: "16px", opacity: 0.7 }}>
              Svarstid: inom en arbetsdag på vardagar.
            </p>
          </div>
        </div>
      </section>

      {/* Topic cards */}
      <section style={{ background: "var(--surface)", padding: "64px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "22px", color: "var(--slate-navy)", fontWeight: 800, textAlign: "center", marginBottom: "32px" }}>
            Vanliga ämnen
          </h2>
          <div className="valueprops-grid">
            <div className="valueprop-card">
              <Search size={20} className="valueprop-icon" />
              <p className="valueprop-heading">Frågor om matchning</p>
              <p className="valueprop-body">
                Hur fungerar matchningsprocessen? Vad händer efter att jag
                skickat en förfrågan? Hur väljs leverantörerna ut?
              </p>
            </div>
            <div className="valueprop-card">
              <Award size={20} className="valueprop-icon" />
              <p className="valueprop-heading">Concierge</p>
              <p className="valueprop-body">
                Frågor om helhetsåtagande, prissättning, process och vad som
                ingår i Concierge-tjänsten.
              </p>
            </div>
            <div className="valueprop-card">
              <Settings size={20} className="valueprop-icon" />
              <p className="valueprop-heading">Tekniska frågor</p>
              <p className="valueprop-body">
                Problem med formuläret, uppladdning av filer eller andra
                tekniska frågor om plattformen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
