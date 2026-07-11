"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  isValidOrgNr,
  isValidEmail,
  isCompanyEmail,
  normalizeOrgNr,
} from "@/lib/validation";
import {
  ALL_METHODS,
  UNSURE_METHOD,
  MATERIAL_TO_PRIMARY_METHODS,
  METHOD_TO_PROCESSES,
  SURFACE_OPTIONS,
  LAN_GROUPS,
  buildCapabilitySlugs,
  materialToSlugs,
  certsToSlugs,
} from "@/lib/taxonomy";

const ROLES = [
  "Inköpare",
  "Inköpschef",
  "Konstruktör / Produktutvecklare",
  "Produktionstekniker",
  "Projektledare",
  "VD / Ägare",
];

type FormState = {
  orgNr: string;
  companyName: string;
  contactName: string;
  yrkesroll: string;
  email: string;
  phone: string;
  projectName: string;
  method: string;
  material: string;
  processSlugs: string[];
  tolerance: string;
  surfaceSlugs: string[];
  surfaceOther: string;
  certs: string[];
  volume: string;
  timeframe: string;
  regionSlugs: string[];
  ndaAccepted: boolean;
  marketingConsent: boolean;
};

const MATERIALS = [
  "Aluminium",
  "Stål",
  "Rostfritt",
  "Titan / Special",
  "Plast",
  "Komposit",
];

const CERTS = [
  "ISO 9001 (Kvalitet)",
  "ISO 14001 (Miljö)",
  "ISO 3834 (Svets)",
  "AS9100 (Försvar)",
  "ISO 13485 (MedTech)",
];

type IntentFormProps = {
  defaultMethod?: string;
  defaultMaterial?: string;
  heading?: string;
};

export default function IntentForm({
  defaultMethod,
  defaultMaterial,
  heading = "Starta er matchning",
}: IntentFormProps = {}) {
  const [form, setForm] = useState<FormState>({
    orgNr: "",
    companyName: "",
    contactName: "",
    yrkesroll: "",
    email: "",
    phone: "",
    projectName: "",
    method: defaultMethod ?? "",
    material: defaultMaterial ?? "",
    processSlugs: [],
    tolerance: "Standard (ISO)",
    surfaceSlugs: [],
    surfaceOther: "",
    certs: [],
    volume: "Prototyp (1–5 st)",
    timeframe: "Inom 2–4 veckor",
    regionSlugs: [],
    ndaAccepted: false,
    marketingConsent: false,
  });
  // Honeypot (B20): a hidden field real users never see. Bots fill it.
  const [honeypot, setHoneypot] = useState("");
  const [yrkesrollAnnat, setYrkesrollAnnat] = useState(false);
  const [surfaceAnnat, setSurfaceAnnat] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [showAllMethods, setShowAllMethods] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // B8: set when a drawing was attached but its upload failed — the request is
  // still submitted (we never drop the lead), but the buyer is told to email it.
  const [drawingFailed, setDrawingFailed] = useState(false);
  // Inline identity-core validation (demand-funnel v0).
  const [orgNrError, setOrgNrError] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (submitted) {
      document.getElementById("intent-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const set = (key: keyof FormState, value: FormState[typeof key]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleIn = (key: "certs" | "processSlugs" | "surfaceSlugs" | "regionSlugs", value: string) =>
    set(
      key,
      form[key].includes(value)
        ? form[key].filter((v) => v !== value)
        : [...form[key], value]
    );

  // Soft filter: primary methods for the chosen material shown first; the rest
  // behind "Visa alla metoder". Nothing is ever impossible to select.
  const primaryMethods = form.material
    ? MATERIAL_TO_PRIMARY_METHODS[form.material] ?? ALL_METHODS
    : ALL_METHODS;
  const secondaryMethods = ALL_METHODS.filter((m) => !primaryMethods.includes(m));
  const methodInSecondary = secondaryMethods.includes(form.method);
  const visibleMethods = [
    ...primaryMethods,
    ...(showAllMethods || methodInSecondary ? secondaryMethods : []),
  ];
  const processOptions = METHOD_TO_PROCESSES[form.method] ?? [];

  const selectMaterial = (material: string) => {
    // Never clear a chosen/preselected method when material changes.
    set("material", material);
    setShowAllMethods(false);
  };

  const selectMethod = (method: string) => {
    setForm((prev) => ({ ...prev, method, processSlugs: [] }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setDrawingFailed(false);

    // Honeypot (B20): if the hidden field is filled it's a bot — fake success
    // without inserting so the bot moves on, and no junk row lands in the DB.
    if (honeypot) {
      setSubmitting(false);
      setSubmitted(true);
      return;
    }

    // Identity core is mandatory — validates the intent is real and gives the
    // funnel something to analyse (docs/demand-funnel-spec.md).
    const missing =
      !form.orgNr.trim() ? "Organisationsnummer krävs." :
      !form.companyName.trim() ? "Företagsnamn krävs." :
      !form.contactName.trim() ? "Namn krävs." :
      !form.yrkesroll.trim() ? "Yrkesroll krävs." :
      !form.email.trim() ? "Företagsmail krävs." :
      !form.material ? "Välj materialgrupp." :
      !form.method ? "Välj primär bearbetningsmetod." :
      null;
    if (missing) {
      setSubmitError(missing);
      setSubmitting(false);
      return;
    }
    if (!isValidEmail(form.email)) {
      setSubmitError("Ogiltig e-postadress — kontrollera adressen.");
      setSubmitting(false);
      return;
    }
    if (!isValidOrgNr(form.orgNr)) {
      setOrgNrError("Ogiltigt organisationsnummer — kontrollera de tio siffrorna.");
      setSubmitError("Ogiltigt organisationsnummer — kontrollera de tio siffrorna.");
      setSubmitting(false);
      return;
    }

    // Warn-and-flag (not hard-block): free-mail is allowed but marked
    // low_confidence → the qualifier routes it to needs_review for manual check.
    const lowConfidence = !isCompanyEmail(form.email);
    const qualificationStatus = lowConfidence ? "needs_review" : "qualified";

    if (!form.ndaAccepted) {
      setSubmitError(
        "Du behöver godkänna sekretessvillkoren innan vi kan dela din förfrågan med leverantörer."
      );
      setSubmitting(false);
      return;
    }

    // Upload drawing if provided. Failure is non-blocking — we still submit the
    // request so the lead is never lost — but we capture the error (B8) and tell
    // the buyer to email the drawing instead of silently dropping it.
    let drawingUrl: string | null = null;
    let uploadFailed = false;
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setSubmitError("Filen är för stor — max 50 MB.");
        setSubmitting(false);
        return;
      }
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("drawings")
        .upload(`${Date.now()}-${safeName}`, file);
      if (uploadData) {
        drawingUrl = uploadData.path;
      } else if (uploadError) {
        uploadFailed = true;
      }
    }

    const surfaceLabels = SURFACE_OPTIONS.filter((o) => form.surfaceSlugs.includes(o.slug))
      .map((o) => o.label);
    const surfaceText = [...surfaceLabels, form.surfaceOther.trim()]
      .filter(Boolean)
      .join(", ");

    const { error } = await supabase.from("intent_requests").insert({
      org_nr: normalizeOrgNr(form.orgNr) ?? form.orgNr,
      company_name: form.companyName || null,
      contact_name: form.contactName || null,
      yrkesroll: form.yrkesroll || null,
      contact_email: form.email,
      contact_phone: form.phone || null,
      project_name: form.projectName || null,
      method: form.method || null,
      material: form.material || null,
      tolerance: form.tolerance || null,
      surface_treatment: surfaceText || null,
      certs: form.certs.length > 0 ? form.certs : null,
      volume: form.volume || null,
      timeframe: form.timeframe || null,
      nda_accepted: form.ndaAccepted,
      marketing_consent: form.marketingConsent,
      // Demand-funnel v0: qualification computed client-side; a DB trigger logs
      // the 'submitted' + qualification events into intent_events.
      qualification_status: qualificationStatus,
      low_confidence: lowConfidence,
      source: "intentform",
      drawing_url: drawingUrl,
      // Taxonomy slugs (Metalbase docs/taxonomi.md) — the matching engine
      // joins on these; the label fields above are for human readability.
      capability_slugs: buildCapabilitySlugs({
        method: form.method,
        material: form.material,
        processSlugs: form.processSlugs,
        surfaceSlugs: form.surfaceSlugs,
        surfaceOther: form.surfaceOther,
      }),
      material_slugs: materialToSlugs(form.material),
      cert_slugs: certsToSlugs(form.certs),
      region_slugs: form.regionSlugs,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError("Något gick fel. Försök igen eller kontakta oss direkt.");
    } else {
      setDrawingFailed(uploadFailed);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="intent-form" className="intent-section">
        <div className="container">
          <div className="form-card text-center" style={{ padding: "64px 32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ marginBottom: "12px" }}>Förfrågan mottagen!</h2>
            <p style={{ color: "var(--slate-navy-light)", maxWidth: "480px", margin: "0 auto" }}>
              Vi återkommer inom 48 timmar med matchade leverantörer.
              Håll utkik i din inkorg på <strong>{form.email}</strong>.
            </p>
            {drawingFailed && (
              <div
                style={{
                  maxWidth: "480px",
                  margin: "24px auto 0",
                  padding: "16px 20px",
                  background: "#fff8e6",
                  border: "1px solid #f0d68a",
                  borderRadius: "10px",
                  textAlign: "left",
                  fontSize: "14px",
                  color: "var(--slate-navy)",
                  lineHeight: 1.6,
                }}
              >
                <strong>Obs — din ritning kunde inte laddas upp.</strong> Din
                förfrågan är mottagen, men filen kom inte fram. Mejla den gärna till{" "}
                <a href="mailto:info@komponentguiden.se" style={{ color: "var(--indigo)" }}>
                  info@komponentguiden.se
                </a>{" "}
                så kopplar vi den till er förfrågan — en ritning förbättrar
                träffsäkerheten i matchningen.
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="intent-form" className="intent-section">
      <div className="container">
        <div className="intent-header">
          <span className="metadata">Kostnadsfri matchning</span>
          <h2>{heading}</h2>
          <p>Berätta om ert behov — vi matchar er mot rätt leverantörer inom 48 timmar.</p>
          <p style={{ fontSize: "13px", color: "var(--slate-navy-light)", marginTop: "4px" }}>
            Fält märkta med <strong>*</strong> är obligatoriska.
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>

          {/* Honeypot — hidden from users (off-screen, not tabbable, aria-hidden).
              Bots that autofill every field will trip it; real users never see it. */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
          />

          {/* Section 1: Projekt + material + metod */}
          <div className="form-section">
            <span className="form-section-label">Vad gäller förfrågan?</span>

            <label className="input-label">Projektnamn / Benämning (frivilligt)</label>
            <input
              type="text"
              className="input-field"
              placeholder="T.ex. Kylfläns v.2"
              value={form.projectName}
              onChange={(e) => set("projectName", e.target.value)}
              style={{ marginBottom: "16px" }}
            />

            <label className="input-label">Materialgrupp *</label>
            <div className="tag-grid">
              {MATERIALS.map((material) => (
                <label key={material} className="tag-label">
                  <input
                    type="radio"
                    name="material"
                    checked={form.material === material}
                    onChange={() => selectMaterial(material)}
                  />
                  <span className="tag-content">{material}</span>
                </label>
              ))}
            </div>

            <label className="input-label field-sublabel">Primär bearbetningsmetod *</label>
            <div className="tag-grid">
              {visibleMethods.map((method) => (
                <label key={method} className="tag-label">
                  <input
                    type="radio"
                    name="method"
                    checked={form.method === method}
                    onChange={() => selectMethod(method)}
                  />
                  <span className="tag-content">{method}</span>
                </label>
              ))}
              <label className="tag-label">
                <input
                  type="radio"
                  name="method"
                  checked={form.method === UNSURE_METHOD}
                  onChange={() => selectMethod(UNSURE_METHOD)}
                />
                <span className="tag-content">{UNSURE_METHOD}</span>
              </label>
            </div>
            {secondaryMethods.length > 0 && !showAllMethods && !methodInSecondary && (
              <button
                type="button"
                onClick={() => setShowAllMethods(true)}
                style={{
                  background: "none", border: "none", padding: "6px 0 0", cursor: "pointer",
                  fontSize: "13px", color: "var(--indigo)", textDecoration: "underline",
                }}
              >
                Visa alla metoder
              </button>
            )}

            {processOptions.length > 0 && (
              <>
                <label className="input-label field-sublabel">
                  Vill du precisera? (frivilligt — hjälper matchningen)
                </label>
                <div className="tag-grid">
                  {processOptions.map((p) => (
                    <label key={p.slug} className="tag-label">
                      <input
                        type="checkbox"
                        checked={form.processSlugs.includes(p.slug)}
                        onChange={() => toggleIn("processSlugs", p.slug)}
                      />
                      <span className="tag-content">{p.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Section 2: Kvalitet & certifiering */}
          <div className="form-section">
            <span className="form-section-label">Kvalitet &amp; certifiering</span>

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

            <label className="input-label field-sublabel">Ytbehandling (frivilligt)</label>
            <div className="tag-grid">
              {SURFACE_OPTIONS.map((o) => (
                <label key={o.slug} className="tag-label">
                  <input
                    type="checkbox"
                    checked={form.surfaceSlugs.includes(o.slug)}
                    onChange={() => toggleIn("surfaceSlugs", o.slug)}
                  />
                  <span className="tag-content">{o.label}</span>
                </label>
              ))}
              <label className="tag-label">
                <input
                  type="checkbox"
                  checked={surfaceAnnat}
                  onChange={(e) => {
                    setSurfaceAnnat(e.target.checked);
                    if (!e.target.checked) set("surfaceOther", "");
                  }}
                />
                <span className="tag-content">Annat</span>
              </label>
            </div>
            {surfaceAnnat && (
              <input
                type="text"
                className="input-field"
                placeholder="Beskriv ytbehandlingen"
                value={form.surfaceOther}
                onChange={(e) => set("surfaceOther", e.target.value)}
                style={{ marginTop: "8px" }}
                autoFocus
              />
            )}

            <label className="input-label field-sublabel">Certifikatkrav på leverantör</label>
            <div className="tag-grid">
              {CERTS.map((cert) => (
                <label key={cert} className="tag-label">
                  <input
                    type="checkbox"
                    checked={form.certs.includes(cert)}
                    onChange={() => toggleIn("certs", cert)}
                  />
                  <span className="tag-content">{cert}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Volym & leverans */}
          <div className="form-section">
            <span className="form-section-label">Volym &amp; leverans</span>

            <div className="input-row">
              <div>
                <label className="input-label">Önskad volym</label>
                <select
                  className="input-field"
                  value={form.volume}
                  onChange={(e) => set("volume", e.target.value)}
                >
                  <option>Prototyp (1–5 st)</option>
                  <option>Liten serie (10–100 st)</option>
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
                  <option>Inom 2–4 veckor</option>
                  <option>Inom 1–3 månader</option>
                  <option>Utforskande förfrågan</option>
                </select>
              </div>
            </div>

            {/* B9: urgent needs must not enter the 48h flow — route to /akut. */}
            {form.timeframe === "Akut / Brandsläckning" && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px 20px",
                  background: "#fdecec",
                  border: "1px solid #f3b4b4",
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: "var(--slate-navy)",
                  lineHeight: 1.6,
                }}
              >
                <strong>Brådskande behov?</strong> Det här formuläret är för
                planerade förfrågningar med svar inom 48 timmar. Akuta och
                driftstörande behov hanteras snabbare via vår akutkanal — samma
                dag, direkt av en människa.{" "}
                <Link
                  href="/akut"
                  style={{ color: "var(--indigo)", fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  Till akut behov →
                </Link>
              </div>
            )}

            <div style={{ marginTop: "16px" }}>
              <label className="input-label">Geografiskt krav på leverantör</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  id="region-limit"
                  checked={regionOpen}
                  onChange={(e) => {
                    setRegionOpen(e.target.checked);
                    if (!e.target.checked) set("regionSlugs", []);
                  }}
                  style={{ marginTop: "3px", flexShrink: 0 }}
                />
                <label htmlFor="region-limit" style={{ fontSize: "13px", color: "var(--slate-navy-light)", lineHeight: 1.6 }}>
                  Begränsa geografiskt (frivilligt). Utan begränsning matchar vi i hela
                  Sverige — ett geografiskt krav minskar antalet möjliga leverantörer.
                </label>
              </div>
              {regionOpen && (
                <div style={{ marginTop: "12px" }}>
                  {LAN_GROUPS.map(({ group, lan }) => (
                    <div key={group} style={{ marginBottom: "10px" }}>
                      <div style={{
                        fontSize: "12px", fontWeight: 700, color: "var(--turquoise)",
                        fontFamily: "var(--font-meta)", marginBottom: "6px", textTransform: "uppercase",
                      }}>
                        {group}
                      </div>
                      <div className="tag-grid">
                        {lan.map((l) => (
                          <label key={l.slug} className="tag-label">
                            <input
                              type="checkbox"
                              checked={form.regionSlugs.includes(l.slug)}
                              onChange={() => toggleIn("regionSlugs", l.slug)}
                            />
                            <span className="tag-content">{l.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Ritningar & underlag */}
          <div className="form-section">
            <span className="form-section-label">Ritningar &amp; underlag (frivilligt)</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.step,.stp,.iges,.igs"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <div
              className="file-upload"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const dropped = e.dataTransfer.files[0];
                if (dropped) setFile(dropped);
              }}
            >
              {file ? (
                <>
                  <Upload size={28} style={{ color: "var(--indigo)", display: "block", margin: "0 auto 10px" }} />
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--indigo)", marginBottom: "4px" }}>
                    {file.name}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--slate-navy-light)" }}>
                    {(file.size / 1024 / 1024).toFixed(1)} MB · klicka för att byta fil
                  </p>
                </>
              ) : (
                <>
                  <Upload size={28} style={{ color: "var(--slate-navy-light)", display: "block", margin: "0 auto 10px" }} />
                  <h4 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
                    Dra och släpp underlag
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--slate-navy-light)", marginBottom: "8px" }}>
                    PDF, STEP, IGES — max 50 MB
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--slate-navy-light)", opacity: 0.7 }}>
                    Inte obligatoriskt. En ritning förbättrar träffsäkerheten men krävs inte för att starta matchningen.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Section 5: Kontaktuppgifter */}
          <div className="form-section">
            <span className="form-section-label">Kontaktuppgifter</span>

            <div className="input-row" style={{ marginBottom: "16px" }}>
              <div>
                <label className="input-label">Företagsnamn *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Företag AB"
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Organisationsnummer *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="556XXX-XXXX"
                  value={form.orgNr}
                  onChange={(e) => {
                    set("orgNr", e.target.value);
                    if (orgNrError) setOrgNrError(null);
                  }}
                  onBlur={() =>
                    setOrgNrError(
                      form.orgNr && !isValidOrgNr(form.orgNr)
                        ? "Ogiltigt organisationsnummer — kontrollera de tio siffrorna."
                        : null
                    )
                  }
                />
                {orgNrError && (
                  <p style={{ color: "#e53e3e", fontSize: "12.5px", marginTop: "6px", lineHeight: 1.5 }}>
                    {orgNrError}
                  </p>
                )}
              </div>
            </div>

            <div className="input-row" style={{ marginBottom: "16px" }}>
              <div>
                <label className="input-label">Namn *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="För- och efternamn"
                  value={form.contactName}
                  onChange={(e) => set("contactName", e.target.value)}
                />
              </div>
              <div>
                <label className="input-label">Yrkesroll *</label>
                <select
                  className="input-field"
                  value={yrkesrollAnnat ? "Annat" : form.yrkesroll}
                  onChange={(e) => {
                    if (e.target.value === "Annat") {
                      setYrkesrollAnnat(true);
                      set("yrkesroll", "");
                    } else {
                      setYrkesrollAnnat(false);
                      set("yrkesroll", e.target.value);
                    }
                  }}
                >
                  <option value="">Välj roll...</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                  <option value="Annat">Annat</option>
                </select>
                {yrkesrollAnnat && (
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ange din yrkesroll"
                    value={form.yrkesroll}
                    onChange={(e) => set("yrkesroll", e.target.value)}
                    style={{ marginTop: "8px" }}
                    autoFocus
                  />
                )}
              </div>
            </div>

            <div className="input-row">
              <div>
                <label className="input-label">Företagsmail *</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="namn@foretag.se"
                  value={form.email}
                  onChange={(e) => {
                    set("email", e.target.value);
                    if (emailWarning) setEmailWarning(false);
                  }}
                  onBlur={() =>
                    setEmailWarning(
                      !!form.email && isValidEmail(form.email) && !isCompanyEmail(form.email)
                    )
                  }
                />
                {emailWarning && (
                  <p style={{ color: "#b7791f", fontSize: "12.5px", marginTop: "6px", lineHeight: 1.5 }}>
                    Använd gärna er företagsmejl — en privat adress fördröjer att vi kan verifiera förfrågan.
                  </p>
                )}
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

          {/* Section 6: NDA + submit */}
          <div className="form-section">
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "24px" }}>
              <input
                type="checkbox"
                id="nda"
                checked={form.ndaAccepted}
                onChange={(e) => set("ndaAccepted", e.target.checked)}
                style={{ marginTop: "3px", flexShrink: 0 }}
              />
              <label htmlFor="nda" style={{ fontSize: "13px", color: "var(--slate-navy-light)", lineHeight: 1.6 }}>
                <strong>Sekretessgodkännande:</strong> Jag godkänner att uppladdat material delas under sekretess med upp till 5 utvalda leverantörer för matchning.
              </label>
            </div>

            {/* B10: separate, unticked marketing opt-in — a distinct legal basis
                from the NDA above. Without it we may only email about this match. */}
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "24px" }}>
              <input
                type="checkbox"
                id="marketing-consent"
                checked={form.marketingConsent}
                onChange={(e) => set("marketingConsent", e.target.checked)}
                style={{ marginTop: "3px", flexShrink: 0 }}
              />
              <label htmlFor="marketing-consent" style={{ fontSize: "13px", color: "var(--slate-navy-light)", lineHeight: 1.6 }}>
                Håll mig uppdaterad med relevant information och nyheter från
                Komponentguiden (frivilligt). Du kan när som helst avregistrera dig.
              </label>
            </div>

            {submitError && (
              <p style={{ color: "#e53e3e", marginBottom: "16px", fontSize: "14px" }}>
                {submitError}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
              style={{ width: "100%", fontSize: "16px", padding: "18px", opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? "Skickar…" : "Starta matchning →"}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
