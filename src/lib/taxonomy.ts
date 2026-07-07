// Mapping: IntentForm display labels → Metalbase taxonomy slugs.
//
// Source of truth: Masterbase repo, docs/taxonomi.md (branch docs/metalbase-datamall).
// Slugs are stable by design — never renamed, only aliased. If a label below is
// reworded in the form, update the KEY here; the slug values must not change.
// Category pages (content/categories/index.ts) preselect by these exact labels.
//
// Intents are matched at GROUP level (nivå 1) by default; process level (nivå 2)
// when the buyer specifies via precision chips. See docs/intentform-v2-spec.md.

export const UNSURE_METHOD = "Osäker / öppen för förslag";

export const METHOD_TO_SLUGS: Record<string, string[]> = {
  "Skärande bearbetning": ["skarande-bearbetning"],
  "Plåt & svets": ["platbearbetning", "svetsning"],
  "Gjutning": ["gjutning-formande"],
  "Formsprutning": ["polymer"],
  "3D-printing": ["additiv-tillverkning"],
  "Komposittillverkning": ["komposit-laminering", "komposit-rtm"],
};

export const ALL_METHODS = Object.keys(METHOD_TO_SLUGS);

export const MATERIAL_TO_SLUGS: Record<string, string[]> = {
  "Aluminium": ["aluminium"],
  "Stål": ["stal"],
  "Rostfritt": ["rostfritt"],
  "Titan / Special": ["titan", "ovrigt-special"],
  "Plast": ["plast"],
  "Komposit": ["komposit"],
};

// Material → PRIMARY methods (shown prominently). Secondary = all remaining
// methods, collapsed behind "Visa alla metoder" — soft filter, nothing is ever
// impossible to select. UI-ranking only; never affects slug storage.
export const MATERIAL_TO_PRIMARY_METHODS: Record<string, string[]> = {
  "Aluminium": ["Skärande bearbetning", "Plåt & svets", "Gjutning"],
  "Stål": ["Skärande bearbetning", "Plåt & svets", "Gjutning"],
  "Rostfritt": ["Skärande bearbetning", "Plåt & svets"],
  "Titan / Special": ["Skärande bearbetning", "3D-printing"],
  "Plast": ["Formsprutning", "3D-printing", "Skärande bearbetning"],
  "Komposit": ["Komposittillverkning"],
};

export const CERT_TO_SLUGS: Record<string, string[]> = {
  "ISO 9001 (Kvalitet)": ["iso9001"],
  "ISO 14001 (Miljö)": ["iso14001"],
  "ISO 3834 (Svets)": ["iso3834"],
  "AS9100 (Försvar)": ["as9100"],
  "ISO 13485 (MedTech)": ["iso13485"],
};

export type ChipOption = { label: string; slug: string };

// Optional precision chips (taxonomi.md nivå 2) per method.
export const METHOD_TO_PROCESSES: Record<string, ChipOption[]> = {
  "Skärande bearbetning": [
    { label: "Svarvning", slug: "cnc-svarvning" },
    { label: "Fleroperationssvarvning", slug: "fleroperationssvarvning" },
    { label: "Långsvarvning", slug: "langsvarvning" },
    { label: "Fräsning 3-axlig", slug: "cnc-frasning-3ax" },
    { label: "Fräsning 5-axlig", slug: "cnc-frasning-5ax" },
    { label: "Slipning", slug: "slipning" },
    { label: "Gnistbearbetning", slug: "gnistbearbetning" },
    { label: "Borrning / arborrning", slug: "borrning-arborrning" },
  ],
  "Plåt & svets": [
    { label: "Laserskärning", slug: "laserskarning" },
    { label: "Stansning", slug: "stansning" },
    { label: "Vattenskärning", slug: "vattenskarning" },
    { label: "Kantpressning", slug: "kantpressning" },
    { label: "Valsning / rundning", slug: "valsning-rundning" },
    { label: "MIG/MAG", slug: "mig-mag" },
    { label: "TIG", slug: "tig" },
    { label: "Robotsvets", slug: "robotsvets" },
    { label: "Lasersvets", slug: "lasersvets" },
  ],
  "Gjutning": [
    { label: "Pressgjutning", slug: "pressgjutning" },
    { label: "Sandgjutning", slug: "sandgjutning" },
    { label: "Kokillgjutning", slug: "kokillgjutning" },
    { label: "Precisionsgjutning", slug: "precisionsgjutning" },
    { label: "Smide", slug: "smide" },
    { label: "Pulvermetallurgi", slug: "pulvermetallurgi" },
  ],
  "Formsprutning": [
    { label: "Formsprutning", slug: "formsprutning" },
    { label: "Extrudering", slug: "extrudering" },
    { label: "Formblåsning", slug: "formblasning" },
    { label: "Vakuumformning", slug: "vakuumformning" },
    { label: "Rotationsgjutning", slug: "rotationsgjutning" },
    { label: "Gummipressning", slug: "gummipressning-vulkning" },
  ],
  "3D-printing": [
    { label: "FDM", slug: "3dp-fdm" },
    { label: "SLS", slug: "3dp-sls" },
    { label: "Metall (SLM)", slug: "3dp-slm-metall" },
    { label: "SLA", slug: "3dp-sla" },
    { label: "MJF", slug: "3dp-mjf" },
  ],
  "Komposittillverkning": [
    { label: "Laminering", slug: "komposit-laminering" },
    { label: "RTM", slug: "komposit-rtm" },
  ],
};

// Ytbehandling chips (taxonomi.md ytbehandling group). "Annat" is handled in
// the form via free text → group slug `ytbehandling` + surface_treatment column.
export const SURFACE_TREATMENT_SLUG = "ytbehandling";
export const SURFACE_OPTIONS: ChipOption[] = [
  { label: "Anodisering", slug: "anodisering" },
  { label: "Pulverlackering", slug: "pulverlackering" },
  { label: "Våtlackering", slug: "vatlackering" },
  { label: "Elförzinkning", slug: "elforzinkning" },
  { label: "Varmförzinkning", slug: "varmforzinkning" },
  { label: "Härdning / värmebehandling", slug: "hardning-varmebehandling" },
  { label: "Blästring", slug: "blastring" },
  { label: "Polering / ytfinish", slug: "polering-slipning-ytfinish" },
  { label: "Fosfatering", slug: "fosfatering" },
  { label: "Kemisk ytbehandling", slug: "kemisk-ytbehandling" },
];

// Region: 21 län, slugs match Masterbase companies.lan granularity.
export const LAN_GROUPS: { group: string; lan: ChipOption[] }[] = [
  {
    group: "Götaland",
    lan: [
      { label: "Västra Götaland", slug: "vastra-gotalands-lan" },
      { label: "Halland", slug: "hallands-lan" },
      { label: "Skåne", slug: "skane-lan" },
      { label: "Blekinge", slug: "blekinge-lan" },
      { label: "Kronoberg", slug: "kronobergs-lan" },
      { label: "Kalmar", slug: "kalmar-lan" },
      { label: "Jönköping", slug: "jonkopings-lan" },
      { label: "Östergötland", slug: "ostergotlands-lan" },
      { label: "Gotland", slug: "gotlands-lan" },
    ],
  },
  {
    group: "Svealand",
    lan: [
      { label: "Stockholm", slug: "stockholms-lan" },
      { label: "Uppsala", slug: "uppsala-lan" },
      { label: "Södermanland", slug: "sodermanlands-lan" },
      { label: "Västmanland", slug: "vastmanlands-lan" },
      { label: "Örebro", slug: "orebro-lan" },
      { label: "Värmland", slug: "varmlands-lan" },
      { label: "Dalarna", slug: "dalarnas-lan" },
    ],
  },
  {
    group: "Norrland",
    lan: [
      { label: "Gävleborg", slug: "gavleborgs-lan" },
      { label: "Västernorrland", slug: "vasternorrlands-lan" },
      { label: "Jämtland", slug: "jamtlands-lan" },
      { label: "Västerbotten", slug: "vasterbottens-lan" },
      { label: "Norrbotten", slug: "norrbottens-lan" },
    ],
  },
];

const dedupe = (slugs: string[]) => [...new Set(slugs)];

export function materialToSlugs(material: string): string[] {
  return dedupe(MATERIAL_TO_SLUGS[material] ?? []);
}

export function certsToSlugs(certs: string[]): string[] {
  return dedupe(certs.flatMap((c) => CERT_TO_SLUGS[c] ?? []));
}

// Full capability builder for IntentForm v2.
export function buildCapabilitySlugs(opts: {
  method: string;
  material: string;
  processSlugs: string[];
  surfaceSlugs: string[];
  surfaceOther: string;
}): string[] {
  let base: string[];
  if (opts.method === UNSURE_METHOD) {
    const primary = MATERIAL_TO_PRIMARY_METHODS[opts.material] ?? ALL_METHODS;
    base = primary.flatMap((m) => METHOD_TO_SLUGS[m] ?? []);
  } else {
    base = METHOD_TO_SLUGS[opts.method] ?? [];
  }
  return dedupe([
    ...base,
    ...opts.processSlugs,
    ...opts.surfaceSlugs,
    ...(opts.surfaceOther.trim() !== "" ? [SURFACE_TREATMENT_SLUG] : []),
  ]);
}
