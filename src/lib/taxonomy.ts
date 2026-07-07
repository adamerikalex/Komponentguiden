// Mapping: IntentForm display labels → Metalbase taxonomy slugs.
//
// Source of truth: Masterbase repo, docs/taxonomi.md (branch docs/metalbase-datamall).
// Slugs are stable by design — never renamed, only aliased. If a label below is
// reworded in the form, update the KEY here; the slug values must not change.
//
// Intents are matched at GROUP level (nivå 1) by default, per taxonomi.md.

export const METHOD_TO_SLUGS: Record<string, string[]> = {
  "Skärande bearbetning": ["skarande-bearbetning"],
  "Plåt & svets": ["platbearbetning", "svetsning"],
  "Gjutning": ["gjutning-formande"],
  "Formsprutning": ["polymer"],
  "3D-printing": ["additiv-tillverkning"],
};

export const MATERIAL_TO_SLUGS: Record<string, string[]> = {
  "Aluminium": ["aluminium"],
  "Stål": ["stal"],
  "Rostfritt": ["rostfritt"],
  "Titan / Special": ["titan", "ovrigt-special"],
  "Plast": ["plast"],
  "Komposit": ["komposit"],
};

export const CERT_TO_SLUGS: Record<string, string[]> = {
  "ISO 9001 (Kvalitet)": ["iso9001"],
  "ISO 14001 (Miljö)": ["iso14001"],
  "ISO 3834 (Svets)": ["iso3834"],
  "AS9100 (Försvar)": ["as9100"],
  "ISO 13485 (MedTech)": ["iso13485"],
};

// Free-text ytbehandling maps to the ytbehandling group (taxonomi.md:
// "Ytbehandling (fritextfält i formuläret) → ytbehandling-gruppen").
export const SURFACE_TREATMENT_SLUG = "ytbehandling";

const dedupe = (slugs: string[]) => [...new Set(slugs)];

export function methodToSlugs(method: string, surfaceTreatment?: string): string[] {
  const slugs = [...(METHOD_TO_SLUGS[method] ?? [])];
  if (surfaceTreatment && surfaceTreatment.trim() !== "") {
    slugs.push(SURFACE_TREATMENT_SLUG);
  }
  return dedupe(slugs);
}

export function materialToSlugs(material: string): string[] {
  return dedupe(MATERIAL_TO_SLUGS[material] ?? []);
}

export function certsToSlugs(certs: string[]): string[] {
  return dedupe(certs.flatMap((c) => CERT_TO_SLUGS[c] ?? []));
}
