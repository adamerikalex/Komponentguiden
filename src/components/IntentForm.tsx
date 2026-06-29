"use client";

import { useState } from "react";
import { ArrowRight, Upload } from "lucide-react";

type FormState = {
  orgNr: string;
  companyName: string;
  email: string;
  phone: string;
  projectName: string;
  method: string;
  material: string;
  tolerance: string;
  surfaceTreatment: string;
  certs: string[];
  volume: string;
  timeframe: string;
  ndaAccepted: boolean;
};

const METHODS = [
  "Skärande bearbetning",
  "Plåt & svets",
  "Gjutning",
  "Formsprutning",
];

const MATERIALS = ["Aluminium", "Stål", "Rostfritt", "Titan / Special", "Plast"];

const CERTS = [
  "ISO 9001 (Kvalitet)",
  "ISO 14001 (Miljö)",
  "ISO 3834 (Svets)",
  "AS9100 (Försvar)",
  "ISO 13485 (MedTech)",
];

export default function IntentForm() {
  const [form, setForm] = useState<FormState>({
    orgNr: "",
    companyName: "",
    email: "",
    phone: "",
    projectName: "",
    method: "Skärande bearbetning",
    material: "Aluminium",
    tolerance: "Standard (ISO)",
    surfaceTreatment: "",
    certs: [],
    volume: "Prototyp (1-5 st)",
    timeframe: "Inom 2-4 veckor",
    ndaAccepted: true,
  });

  const set = (key: keyof FormState, value: FormState[typeof key]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleCert = (cert: string) =>
    set(
      "certs",
      form.certs.includes(cert)
        ? form.certs.filter((c) => c !== cert)
        : [...form.certs, cert]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <section id="intent-form" className="intent-section">
      <div className="container">
        <div className="intent-header">
          <h2>Specificera er förfrågan</h2>
          <p>Fyll i formuläret nedan för att initiera datamatchningen.</p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {/* Step 1 */}
          <div className="form-step">
            <h3 className="step-title">
              <span className="step-badge">1</span> Företagsinformation
            </h3>
            <div className="input-row">
              <div>
                <label className="input-label">Organisationsnummer</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="556XXX-XXXX"
                  value={form.orgNr}
                  onChange={(e) => set("orgNr", e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Företagsnamn</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Företag AB"
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                />
              </div>
            </div>
            <div className="input-row">
              <div>
                <label className="input-label">Företagsmail</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="namn@foretag.se"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Telefonnummer (frivilligt)</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="070-XXX XX XX"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="form-step">
            <h3 className="step-title">
              <span className="step-badge">2</span> Projekt &amp; material
            </h3>
            <div style={{ marginBottom: "24px" }}>
              <label className="input-label">Projektnamn / Benämning</label>
              <input
                type="text"
                className="input-field"
                placeholder="T.ex. Kylfläns v.2"
                value={form.projectName}
                onChange={(e) => set("projectName", e.target.value)}
              />
            </div>
            <label className="input-label">Primär bearbetningsmetod</label>
            <div className="tag-grid">
              {METHODS.map((method) => (
                <label key={method} className="tag-label">
                  <input
                    type="radio"
                    name="method"
                    checked={form.method === method}
                    onChange={() => set("method", method)}
                  />
                  <span className="tag-content">{method}</span>
                </label>
              ))}
            </div>
            <label className="input-label" style={{ marginTop: "16px" }}>
              Materialgrupp
            </label>
            <div className="tag-grid">
              {MATERIALS.map((material) => (
                <label key={material} className="tag-label">
                  <input
                    type="radio"
                    name="material"
                    checked={form.material === material}
                    onChange={() => set("material", material)}
                  />
                  <span className="tag-content">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="form-step">
            <h3 className="step-title">
              <span className="step-badge">3</span> Kvalitet &amp; certifiering
            </h3>
            <div className="input-row">
              <div>
                <label className="input-label">Toleranskrav</label>
                <div className="tag-grid">
                  {["Standard (ISO)", "Fina (< 0.01mm)"].map((tol) => (
                    <label key={tol} className="tag-label">
                      <input
                        type="radio"
                        name="tol"
                        checked={form.tolerance === tol}
                        onChange={() => set("tolerance", tol)}
                      />
                      <span className="tag-content">{tol}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="input-label">Krav på ytbehandling?</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="T.ex. Anodisering, lackering"
                  value={form.surfaceTreatment}
                  onChange={(e) => set("surfaceTreatment", e.target.value)}
                />
              </div>
            </div>
            <label className="input-label" style={{ marginTop: "16px" }}>
              Formella certifikatkrav på leverantör
            </label>
            <div className="tag-grid">
              {CERTS.map((cert) => (
                <label key={cert} className="tag-label">
                  <input
                    type="checkbox"
                    checked={form.certs.includes(cert)}
                    onChange={() => toggleCert(cert)}
                  />
                  <span className="tag-content">{cert}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 4 */}
          <div className="form-step">
            <h3 className="step-title">
              <span className="step-badge">4</span> Volym &amp; leverans
            </h3>
            <div className="input-row">
              <div>
                <label className="input-label">Önskad volym</label>
                <select
                  className="input-field"
                  value={form.volume}
                  onChange={(e) => set("volume", e.target.value)}
                >
                  <option>Prototyp (1-5 st)</option>
                  <option>Liten serie (10-100 st)</option>
                  <option>Mellan/Stor serie (&gt;100 st)</option>
                  <option>Löpande avrop</option>
                </select>
              </div>
              <div>
                <label className="input-label">Tidsram</label>
                <select
                  className="input-field"
                  value={form.timeframe}
                  onChange={(e) => set("timeframe", e.target.value)}
                >
                  <option>Akut / Brandsläckning</option>
                  <option>Inom 2-4 veckor</option>
                  <option>Inom 1-3 månader</option>
                  <option>Utforskande förfrågan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div
            className="form-step"
            style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}
          >
            <h3 className="step-title">
              <span className="step-badge">5</span> Ritningar &amp; filer
            </h3>
            <div className="file-upload">
              <Upload
                size={32}
                style={{ color: "var(--slate-navy-light)", marginBottom: "12px" }}
              />
              <h4 style={{ fontSize: "16px", marginBottom: "4px" }}>
                Dra och släpp underlag
              </h4>
              <p style={{ fontSize: "13px" }}>
                Accepterade format: PDF, STEP, IGES (Max 50MB)
              </p>
            </div>
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <input
                type="checkbox"
                id="nda"
                checked={form.ndaAccepted}
                onChange={(e) => set("ndaAccepted", e.target.checked)}
                style={{ marginTop: "4px" }}
              />
              <label
                htmlFor="nda"
                style={{ fontSize: "13px", color: "var(--slate-navy-light)" }}
              >
                <strong>Sekretessgodkännande:</strong> Jag godkänner att
                uppladdat material delas under sekretess med upp till 5 utvalda
                leverantörer för matchning.
              </label>
            </div>
          </div>

          <div className="text-center mt-2" style={{ paddingTop: "24px" }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", fontSize: "16px", padding: "18px" }}
            >
              Skicka förfrågan <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
