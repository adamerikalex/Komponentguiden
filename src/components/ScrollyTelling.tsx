"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function ScrollyTelling() {
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const section = document.getElementById("interactSection");
      if (!section) return;
      const progress =
        (window.scrollY - section.offsetTop) /
        (section.offsetHeight - window.innerHeight);
      if (progress >= 0 && progress <= 1) {
        if (progress >= 0.75) setStage(4);
        else if (progress >= 0.50) setStage(3);
        else if (progress >= 0.25) setStage(2);
        else setStage(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="scrolly-wrapper" id="interactSection">
      <div className="scrolly-container">
        <div className="container scrolly-grid">
          <div className="scrolly-content">
            <div className={`content-layer ${stage === 1 ? "active" : ""}`}>
              <span className="metadata">Steg 01</span>
              <h2>Definiera behovet</h2>
              <p>
                Ladda enkelt upp er ritning och ange specifikationer. Kravställ
                på samma sätt som om det vore er egna upphandling.
              </p>
              <ul className="feature-list">
                <li>
                  <Check size={16} className="icon" />
                  Geometri, material och toleranser
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Formella certifikatkrav (t.ex. ISO 3834)
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Efterfrågad ledtid och volym
                </li>
              </ul>
            </div>
            <div className={`content-layer ${stage === 2 ? "active" : ""}`}>
              <span className="metadata">Steg 02</span>
              <h2>Datadriven matchning</h2>
              <ul className="feature-list">
                <li>
                  <Check size={16} className="icon" />
                  Sökning på produktionsteknik &amp; maskinpark
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Filtrering på finansiell stabilitet
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Kravställning på certifikat &amp; prestanda
                </li>
              </ul>
            </div>
            <div className={`content-layer ${stage === 3 ? "active" : ""}`}>
              <span className="metadata">Steg 03</span>
              <h2>5 förslag inom 48 timmar</h2>
              <ul className="feature-list">
                <li>
                  <Check size={16} className="icon" />
                  Kostnadsfritt för inköpare
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Inget juridiskt åtagande
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Ni behåller kundrelationen
                </li>
              </ul>
            </div>
            <div className={`content-layer ${stage === 4 ? "active" : ""}`}>
              <span className="metadata">Steg 04</span>
              <h2>Ni väljer hur ni går vidare</h2>
              <ul className="feature-list">
                <li>
                  <Check size={16} className="icon" />
                  Ni får kontaktuppgifter och kapabilitetsprofil för varje matchad leverantör
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Ni kontaktar och utvärderar dem självständigt — på era egna villkor
                </li>
                <li>
                  <Check size={16} className="icon" />
                  Vill ni ha mer stöd? Concierge-tjänsten tar helhetsansvaret från offert till leverans
                </li>
              </ul>
            </div>
          </div>

          <div className="scrolly-visual">
            <div className="mockup-window">
              <div className="mockup-bar">
                <div className="mac-dot red" />
                <div className="mac-dot yellow" />
                <div className="mac-dot green" />
                <span className="mock-url">komponentguiden.se/matchning</span>
              </div>
              <div className="mock-body">
                <div className="mock-sidebar">
                  <div className="mock-pill" />
                  <div className="mock-pill short" />
                  <div className="mock-pill" style={{ marginTop: "32px" }} />
                </div>
                <div className="mock-main">
                  <div className="mock-box-row">
                    <div className="mock-box blue" />
                    <div className="mock-box green" />
                  </div>
                  <div className="mock-line" style={{ width: "100%" }} />
                  <div className="mock-line" style={{ width: "100%" }} />
                  <div className="mock-line" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
