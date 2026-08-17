"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  isValidOrgNr,
  isValidEmail,
  isCompanyEmail,
  normalizeOrgNr,
} from "@/lib/validation";
import {
  ALL_METHODS,
  METHOD_TO_SLUGS,
  MATERIAL_TO_SLUGS,
  CERT_TO_SLUGS,
  METHOD_TO_PROCESSES,
  SURFACE_OPTIONS,
  SURFACE_TREATMENT_SLUG,
  LAN_GROUPS,
  materialToSlugs,
  certsToSlugs,
} from "@/lib/taxonomy";

const MATERIALS = Object.keys(MATERIAL_TO_SLUGS);
const CERTS = Object.keys(CERT_TO_SLUGS);
const SUPPLIER_ROLES = [
  "VD / Ägare",
  "Säljansvarig",
  "Produktionschef",
  "Kvalitetsansvarig",
  "Konstruktör / Teknik",
  "Annat",
];

const dedupe = (a: string[]) => [...new Set(a)];
const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: "8px 14px",
  borderRadius: "999px",
  border: `1px solid ${active ? "var(--indigo)" : "var(--border)"}`,
  background: active ? "rgba(99,91,255,0.08)" : "var(--surface)",
  color: active ? "var(--indigo)" : "var(--slate-navy-light)",
  fontSize: "13.5px",
  fontWeight: active ? 600 : 500,
  cursor: "pointer",
});

type FormState = {
  orgNr: string;
  companyName: string;
  contactName: string;
  yrkesroll: string;
  email: string;
  phone: string;
  materials: string[];
  methods: string[];
  processSlugs: string[];
  surfaceSlugs: string[];
  surfaceOther: string;
  certs: string[];
  certDetails: string;
  maskinpark: string;
  kapacitet: string;
  regionSlugs: string[];
  consentMatch: boolean;
  consentContact: boolean;
};

const initial: FormState = {
  orgNr: "", companyName: "", contactName: "", yrkesroll: "", email: "", phone: "",
  materials: [], methods: [], processSlugs: [], surfaceSlugs: [], surfaceOther: "",
  certs: [], certDetails: "", maskinpark: "", kapacitet: "", regionSlugs: [],
  consentMatch: false, consentContact: false,
};

export default function SupplierForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  // Process chips available = union of the selected methods' process options.
  const processOptions = dedupe(
    form.methods.flatMap((m) => (METHOD_TO_PROCESSES[m] ?? []).map((o) => o.slug))
  ).map((slug) => {
    const opt = form.methods
      .flatMap((m) => METHOD_TO_PROCESSES[m] ?? [])
      .find((o) => o.slug === slug);
    return { slug, label: opt?.label ?? slug };
  });

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (honeypot) {
      setSubmitting(false);
      setSubmitted(true);
      return;
    }

    const missing =
      !form.orgNr.trim() ? "Organisationsnummer krävs." :
      !form.companyName.trim() ? "Företagsnamn krävs." :
      !form.contactName.trim() ? "Namn krävs." :
      !form.yrkesroll.trim() ? "Yrkesroll krävs." :
      !form.email.trim() ? "Företagsmail krävs." :
      form.materials.length === 0 ? "Välj minst en materialgrupp ni arbetar med." :
      form.methods.length === 0 ? "Välj minst en bearbetningsmetod ni erbjuder." :
      !form.consentMatch ? "Ni behöver godkänna att bli matchade mot förfrågningar." :
      null;
    if (missing) { setError(missing); setSubmitting(false); return; }
    if (!isValidEmail(form.email)) {
      setError("Ogiltig e-postadress — kontrollera adressen."); setSubmitting(false); return;
    }
    if (!isValidOrgNr(form.orgNr)) {
      setError("Ogiltigt organisationsnummer — kontrollera de tio siffrorna."); setSubmitting(false); return;
    }

    const capabilitySlugs = dedupe([
      ...form.methods.flatMap((m) => METHOD_TO_SLUGS[m] ?? []),
      ...form.processSlugs,
      ...form.surfaceSlugs,
      ...(form.surfaceOther.trim() ? [SURFACE_TREATMENT_SLUG] : []),
    ]);
    const materialSlugs = dedupe(form.materials.flatMap(materialToSlugs));
    const certSlugs = certsToSlugs(form.certs);

    // Anti-gaming: free-mail OR a cert claim with no number/issuer → needs review.
    const lowConfidence = !isCompanyEmail(form.email);
    const certUnverified = form.certs.length > 0 && !form.certDetails.trim();
    const qualificationStatus = lowConfidence || certUnverified ? "needs_review" : "qualified";

    try {
      const { error: insErr } = await supabase.from("supplier_submissions").insert({
        org_nr: normalizeOrgNr(form.orgNr) ?? form.orgNr,
        company_name: form.companyName || null,
        contact_name: form.contactName || null,
        yrkesroll: form.yrkesroll || null,
        contact_email: form.email,
        contact_phone: form.phone || null,
        material_slugs: materialSlugs,
        capability_slugs: capabilitySlugs,
        process_slugs: form.processSlugs,
        surface_slugs: form.surfaceSlugs,
        surface_treatment: form.surfaceOther.trim() || null,
        cert_slugs: certSlugs,
        certs: form.certs.length ? form.certs : null,
        cert_details: form.certDetails.trim() || null,
        maskinpark: form.maskinpark.trim() || null,
        kapacitet: form.kapacitet.trim() || null,
        region_slugs: form.regionSlugs,
        consent_match: form.consentMatch,
        consent_contact: form.consentContact,
        source: "sjalvrapporterad",
        qualification_status: qualificationStatus,
        low_confidence: lowConfidence,
      });
      if (insErr) {
        setError("Något gick fel. Försök igen eller mejla oss på info@komponentguiden.se.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Anslutningen tog för lång tid. Er profil kan redan ha registrerats — kontrollera innan ni skickar igen.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="leverantor-form" className="intent-section">
        <div className="container">
          <div className="form-card text-center" style={{ padding: "64px 32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ marginBottom: "12px" }}>Tack! Er profil är mottagen.</h2>
            <p style={{ color: "var(--slate-navy-light)", maxWidth: "480px", margin: "0 auto" }}>
              Vi granskar uppgifterna och lägger till er i matchningsunderlaget. Ni hör
              från oss när en relevant förfrågan dyker upp.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const labelStyle = { fontWeight: 600, fontSize: "14px", display: "block", margin: "0 0 8px" } as const;

  return (
    <section id="leverantor-form" className="intent-section">
      <div className="container">
        <div className="form-card">
          <h2 style={{ marginBottom: "6px" }}>Registrera er kapacitetsprofil</h2>
          <p style={{ color: "var(--slate-navy-light)", fontSize: "14px", marginBottom: "24px" }}>
            Fält märkta med <strong>*</strong> är obligatoriska. Det tar ett par minuter.
          </p>
          <form onSubmit={handleSubmit}>

            {/* Företagsuppgifter */}
            <div className="form-section">
              <h3 style={{ marginBottom: "16px" }}>Företagsuppgifter</h3>
              <label className="input-label">Företagsnamn *</label>
              <input className="input-field" value={form.companyName}
                onChange={(e) => set("companyName", e.target.value)} placeholder="Ert företag AB" />
              <label className="input-label">Organisationsnummer *</label>
              <input className="input-field" value={form.orgNr}
                onChange={(e) => set("orgNr", e.target.value)} placeholder="556XXXXXXX" />
              <label className="input-label">Namn *</label>
              <input className="input-field" value={form.contactName}
                onChange={(e) => set("contactName", e.target.value)} placeholder="För- och efternamn" />
              <label className="input-label">Yrkesroll *</label>
              <select className="input-field" value={form.yrkesroll}
                onChange={(e) => set("yrkesroll", e.target.value)}>
                <option value="">Välj roll...</option>
                {SUPPLIER_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <label className="input-label">Företagsmail *</label>
              <input type="email" className="input-field" value={form.email}
                onChange={(e) => set("email", e.target.value)} placeholder="namn@foretag.se" />
              <label className="input-label">Telefonnummer (frivilligt)</label>
              <input className="input-field" value={form.phone}
                onChange={(e) => set("phone", e.target.value)} placeholder="070-XXX XX XX" />
            </div>

            {/* Kapabiliteter */}
            <div className="form-section">
              <h3 style={{ marginBottom: "16px" }}>Vad tillverkar ni?</h3>
              <label style={labelStyle}>Materialgrupper * (välj alla som gäller)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {MATERIALS.map((m) => (
                  <button type="button" key={m} onClick={() => set("materials", toggle(form.materials, m))}
                    style={chipStyle(form.materials.includes(m))}>{m}</button>
                ))}
              </div>
              <label style={labelStyle}>Bearbetningsmetoder * (välj alla ni erbjuder)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {ALL_METHODS.map((m) => (
                  <button type="button" key={m} onClick={() => set("methods", toggle(form.methods, m))}
                    style={chipStyle(form.methods.includes(m))}>{m}</button>
                ))}
              </div>
              {processOptions.length > 0 && (
                <>
                  <label style={labelStyle}>Precisering (frivilligt)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                    {processOptions.map((o) => (
                      <button type="button" key={o.slug}
                        onClick={() => set("processSlugs", toggle(form.processSlugs, o.slug))}
                        style={chipStyle(form.processSlugs.includes(o.slug))}>{o.label}</button>
                    ))}
                  </div>
                </>
              )}
              <label style={labelStyle}>Ytbehandling (frivilligt)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                {SURFACE_OPTIONS.map((o) => (
                  <button type="button" key={o.slug}
                    onClick={() => set("surfaceSlugs", toggle(form.surfaceSlugs, o.slug))}
                    style={chipStyle(form.surfaceSlugs.includes(o.slug))}>{o.label}</button>
                ))}
              </div>
              <input className="input-field" value={form.surfaceOther}
                onChange={(e) => set("surfaceOther", e.target.value)}
                placeholder="Annan ytbehandling (frivilligt)" />
            </div>

            {/* Maskinpark */}
            <div className="form-section">
              <h3 style={{ marginBottom: "16px" }}>Maskinpark & kapacitet</h3>
              <label className="input-label">Maskinpark (frivilligt men värdefullt)</label>
              <textarea className="input-field" rows={4} value={form.maskinpark}
                onChange={(e) => set("maskinpark", e.target.value)}
                placeholder="Lista era viktigaste maskiner, gärna med fabrikat och modell — t.ex. Amada ENSIS 3015, Hermle C42 5-ax, MIG/MAG-svets…" />
              <label className="input-label">Kapacitet (frivilligt)</label>
              <textarea className="input-field" rows={3} value={form.kapacitet}
                onChange={(e) => set("kapacitet", e.target.value)}
                placeholder="Max storlek, tonnage, seriestorlekar, typiska ledtider…" />
            </div>

            {/* Certifieringar */}
            <div className="form-section">
              <h3 style={{ marginBottom: "16px" }}>Certifieringar</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {CERTS.map((c) => (
                  <button type="button" key={c} onClick={() => set("certs", toggle(form.certs, c))}
                    style={chipStyle(form.certs.includes(c))}>{c}</button>
                ))}
              </div>
              {form.certs.length > 0 && (
                <>
                  <label className="input-label">Certifikatnummer &amp; utfärdare (för verifiering)</label>
                  <input className="input-field" value={form.certDetails}
                    onChange={(e) => set("certDetails", e.target.value)}
                    placeholder="t.ex. ISO 9001 – nr 12345, utfärdat av DNV" />
                </>
              )}
            </div>

            {/* Geografi */}
            <div className="form-section">
              <h3 style={{ marginBottom: "16px" }}>Var finns ni?</h3>
              {LAN_GROUPS.map((g) => (
                <div key={g.group} style={{ marginBottom: "14px" }}>
                  <div style={{ fontSize: "12px", color: "var(--slate-navy-light)", marginBottom: "6px", fontFamily: "var(--font-meta)" }}>{g.group}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {g.lan.map((l) => (
                      <button type="button" key={l.slug}
                        onClick={() => set("regionSlugs", toggle(form.regionSlugs, l.slug))}
                        style={chipStyle(form.regionSlugs.includes(l.slug))}>{l.label}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Samtycke */}
            <div className="form-section">
              <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "16px" }}>
                <input type="checkbox" checked={form.consentMatch}
                  onChange={(e) => set("consentMatch", e.target.checked)} style={{ marginTop: "3px" }} />
                <span style={{ fontSize: "13px", color: "var(--slate-navy-light)", lineHeight: 1.6 }}>
                  <strong>Matchning: *</strong> Ja, matcha oss mot relevanta köparförfrågningar utifrån vår kapacitet.
                </span>
              </label>
              <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "8px" }}>
                <input type="checkbox" checked={form.consentContact}
                  onChange={(e) => set("consentContact", e.target.checked)} style={{ marginTop: "3px" }} />
                <span style={{ fontSize: "13px", color: "var(--slate-navy-light)", lineHeight: 1.6 }}>
                  Ni får kontakta oss med relevant information från Komponentguiden (frivilligt).
                </span>
              </label>
            </div>

            {/* Honeypot */}
            <input type="text" name="company_website" value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />

            {error && (
              <p style={{ color: "#e53e3e", marginBottom: "16px", fontSize: "14px" }}>{error}</p>
            )}
            <button type="submit" className="btn-primary" disabled={submitting}
              style={{ width: "100%", fontSize: "16px", padding: "18px", opacity: submitting ? 0.7 : 1 }}>
              {submitting ? "Skickar…" : "Registrera profil →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
