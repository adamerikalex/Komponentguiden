// Category landing page content
// Each entry maps to a static route: /[slug]/
// The `preselectedMethod` and `preselectedMaterial` values must match
// the option strings in IntentForm.tsx exactly.

export type ValueProp = {
  icon: "Zap" | "Scale" | "Lock" | "Network" | "ShieldCheck" | "Award" | "Clock" | "Search" | "FileCheck";
  heading: string;
  body: string;
};

export type CategoryPage = {
  slug: string;

  // SEO
  metaTitle: string;
  metaDescription: string;

  // Hero
  eyebrow: string;         // .metadata label above h1
  h1: string;
  intro: string;

  // Pain section
  painHeading: string;
  painBody: string;

  // Value props (3)
  valueProps: [ValueProp, ValueProp, ValueProp];

  // How it works steps (3)
  steps: [string, string, string];

  // CTA
  ctaHeading: string;
  ctaSubtext: string;

  // IntentForm pre-selection
  preselectedMethod?: string;   // must match a value in METHODS array in IntentForm.tsx
  preselectedMaterial?: string; // must match a value in MATERIALS array in IntentForm.tsx
};

export const categoryPages: CategoryPage[] = [
  {
    slug: "cnc-bearbetning",
    metaTitle: "Hitta CNC-leverantör i Sverige — Komponentguiden",
    metaDescription:
      "Matchas med validerade CNC-verkstäder i Sverige på 48 timmar. Skärande bearbetning i alla material och toleransklasser. Kostnadsfritt för inköpare.",
    eyebrow: "Skärande bearbetning",
    h1: "Hitta rätt CNC-leverantör — utan veckors research",
    intro:
      "Vi matchar er tekniska förfrågan mot Sveriges nätverk av CNC-verkstäder baserat på maskinpark, toleranskapabilitet, material och certifieringsstatus. Ni laddar upp spec och ritning — vi returnerar fem validerade matchningar inom 48 timmar.",
    painHeading: "Varför tar det så lång tid att hitta en ny CNC-leverantör?",
    painBody:
      "Det svenska utbudet av CNC-verkstäder är fragmenterat och svåröverskådat. De verkstäder som har rätt 5-axlig kapacitet för ert projekt syns sällan i en enkel sökning. Att ringa runt, begära offerter och verifiera maskinpark tar veckor — tid som sällan finns när projektet redan är igång.",
    valueProps: [
      {
        icon: "Search",
        heading: "Matchning på tekniska krav",
        body: "Vi filtrerar på bearbetningsmetod, material, toleransklass och certifieringskrav — inte på geografi eller marknadsföringsbudget.",
      },
      {
        icon: "Clock",
        heading: "Fem matchningar på 48 timmar",
        body: "Inga veckors väntan. Ni skickar specifikationen, vi returnerar ett urval av validerade verkstäder med rätt maskinpark redo för er att utvärdera.",
      },
      {
        icon: "Scale",
        heading: "Helt oberoende",
        body: "Vi tar ingen provision från leverantörerna och har inga exklusiva avtal. Matchningen styrs enbart av era krav och leverantörens faktiska förmåga.",
      },
    ],
    steps: [
      "Fyll i förfrågan — metod, material, toleranskrav och volym. Ladda upp ritning om den finns.",
      "Vi analyserar förfrågan och matchar mot relevanta CNC-verkstäder i databasen.",
      "Ni får fem validerade matchningar inom 48 timmar och tar kontakten vidare direkt.",
    ],
    ctaHeading: "Starta er matchning — kostnadsfritt",
    ctaSubtext:
      "Inget abonnemang. Inga förpliktelser. Ni betalar ingenting förrän ni väljer att gå vidare med en leverantör.",
    preselectedMethod: "Skärande bearbetning",
  },

  {
    slug: "plat-och-svets",
    metaTitle: "Plåtbearbetning och svetsning — hitta underleverantör i Sverige",
    metaDescription:
      "Matchas med validerade verkstäder för plåtbearbetning, laserskärning och svetsning i Sverige. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Plåt & svets",
    h1: "Plåtbearbetning och svetsning — hitta rätt verkstad snabbt",
    intro:
      "Från laserskärning och kantpressning till certifierad svetsning enligt ISO 3834 — vi matchar er konstruktion mot svenska verkstäder med rätt utrustning och kompetens. Kostnadsfritt, inom 48 timmar.",
    painHeading: "Svetsade konstruktioner ställer höga krav på leverantörsvalet",
    painBody:
      "En plåtkonstruktion i rostfritt med krav på ISO 3834-svetsning begränsar urvalet kraftigt. Lägg till krav på kantpressning, ytbehandling och kort ledtid — och processen att hitta rätt verkstad kan ta längre tid än produktionen i sig. Vi löser det åt er.",
    valueProps: [
      {
        icon: "FileCheck",
        heading: "Certifieringsfiltrering",
        body: "Vi matchar mot ISO 3834-certifierade verkstäder när svetsningskraven kräver det — och särskiljer nivåerna 3834-2 och 3834-3 baserat på er specifikation.",
      },
      {
        icon: "Network",
        heading: "Full processtäckning",
        body: "Laserskärning, stansning, kantpressning, MIG/MAG, TIG, robotsvets — vi matchar mot verkstäder som täcker hela tillverkningskedjan, inte bara enskilda operationer.",
      },
      {
        icon: "Clock",
        heading: "48-timmars retur",
        body: "Fem matchade verkstäder tillbaka till er inkorg inom 48 timmar. Ingen offertrunda utan att ni vet att maskinpark och certifieringsstatus stämmer.",
      },
    ],
    steps: [
      "Specificera konstruktionen — material, svetsmetod, toleranskrav och certifieringskrav. Bifoga ritning eller CAD-fil.",
      "Vi matchar mot verkstäder med rätt utrustning för plåt, svets och efterbearbetning.",
      "Ni får fem validerade matchningar och kontaktar dem direkt för offert.",
    ],
    ctaHeading: "Beskriv er konstruktion — vi hittar rätt verkstad",
    ctaSubtext:
      "Tjänsten är kostnadsfri för inköpare. Era ritningar hanteras under sekretess och delas enbart med matchade leverantörer som godkänt NDA.",
    preselectedMethod: "Plåt & svets",
  },

  {
    slug: "legotillverkning-aluminium",
    metaTitle: "Legotillverkning i aluminium — hitta leverantör i Sverige",
    metaDescription:
      "Matchas med svenska legotillverkare specialiserade på aluminium — CNC-bearbetning, pressgjutning och svetsning. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Aluminium",
    h1: "Legotillverkning i aluminium — validerade leverantörer inom 48 timmar",
    intro:
      "Aluminium ställer specifika krav på maskinpark och processkompetens. Vi matchar er förfrågan mot svenska verkstäder med dokumenterad erfarenhet av aluminiumbearbetning — oavsett om det gäller 6082-T6 i CNC, pressgjutna höljen eller svetsade konstruktioner i 5083.",
    painHeading: "Inte alla CNC-verkstäder är lika bra på aluminium",
    painBody:
      "Aluminium kräver rätt skärdata, kylning och fixturering för att hålla toleranser utan vibration och ytdefekter. En verkstad med fel erfarenhet levererar dålig ytfinish och variabel dimensionsnoggrannhet. Att hitta rätt kompetens i förväg sparar er en dyr provomgång.",
    valueProps: [
      {
        icon: "Search",
        heading: "Materialkompetens i fokus",
        body: "Vi matchar på verifierad erfarenhet av aluminiumlegering — inte bara på att verkstaden råkar ha en CNC-maskin. Legeringsgrupp och applikation avgör matchningen.",
      },
      {
        icon: "ShieldCheck",
        heading: "NDA-skyddade ritningar",
        body: "Era konstruktionsunderlag delas enbart med matchade verkstäder som undertecknat sekretessavtal. Ingen ritning lämnar processen utan er kontroll.",
      },
      {
        icon: "Scale",
        heading: "Oberoende urval",
        body: "Vi tar ingen provision från leverantörerna. Matchningen styrs av era tekniska krav, inte av kommersiella avtal med enskilda verkstäder.",
      },
    ],
    steps: [
      "Specificera aluminiumlegeringen, bearbetningsmetoden, toleransklassen och eventuella ytbehandlingskrav.",
      "Vi matchar mot verkstäder med dokumenterad kompetens inom just er typ av aluminiumtillverkning.",
      "Fem validerade matchningar levereras till er inkorg inom 48 timmar.",
    ],
    ctaHeading: "Hitta aluminiumleverantör — utan veckors research",
    ctaSubtext:
      "Kostnadsfritt för inköpare. Ni betalar ingenting förrän ni väljer att gå vidare med en leverantör.",
    preselectedMaterial: "Aluminium",
  },

  {
    slug: "legotillverkning-rostfritt",
    metaTitle: "Legotillverkning i rostfritt stål — leverantör Sverige",
    metaDescription:
      "Matchas med svenska verkstäder för legotillverkning i rostfritt stål — CNC-bearbetning, svetsning och ytbehandling. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Rostfritt stål",
    h1: "Legotillverkning i rostfritt stål — hitta rätt leverantör",
    intro:
      "Rostfritt stål är ett av de mest krävande materialen att bearbeta och svetsa tillförlitligt. Vi matchar er förfrågan mot svenska verkstäder med verifierad kompetens inom rostfri bearbetning, svetsning och ytbehandling — i rätt legeringsgrupp för er applikation.",
    painHeading: "Rostfritt kräver rätt kompetens i hela kedjan",
    painBody:
      "Fel bearbetningsparametrar ger värmedeformering och försämrad korrosionsbeständighet. Otillräcklig renhet vid svetsning öppnar för selektiv korrosion. Ytbehandling som bryter passivskiktet gör hela materialmervärdet meningslöst. En matchad verkstad med bevisad erfarenhet av ert materialval eliminerar dessa risker.",
    valueProps: [
      {
        icon: "Search",
        heading: "Legeringsspecifik matchning",
        body: "304, 316L, duplex, syrafast — vi matchar mot verkstäder med dokumenterad erfarenhet av er specifika legeringsgrupp och applikation.",
      },
      {
        icon: "FileCheck",
        heading: "Certifieringskrav hanteras",
        body: "Kräver ert projekt ISO 3834-svetsning eller specifika materialdokument (EN 10204)? Vi filtrerar på certifieringsstatus i matchningsprocessen.",
      },
      {
        icon: "Clock",
        heading: "48 timmar från spec till matchning",
        body: "Ni slipper ringa runt och fråga om erfarenhet. Vi returnerar fem validerade matchningar baserade på faktisk kompetens inom 48 timmar.",
      },
    ],
    steps: [
      "Specificera legering, bearbetningsmetod, toleranskrav, ytbehandling och eventuella certifieringskrav.",
      "Vi matchar mot verkstäder med verifierad kompetens för er rostfria tillämpning.",
      "Fem matchningar i inkorgen inom 48 timmar — redo att begära offert.",
    ],
    ctaHeading: "Beskriv er rostfria komponent — vi hittar rätt verkstad",
    ctaSubtext:
      "Kostnadsfritt för inköpare. Ritningar hanteras konfidentiellt under sekretessavtal.",
    preselectedMaterial: "Rostfritt",
  },

  {
    slug: "as9100-certifierade-leverantorer",
    metaTitle: "AS9100-certifierade leverantörer i Sverige — Komponentguiden",
    metaDescription:
      "Hitta AS9100-certifierade svenska legotillverkare för försvars- och flygtillämpningar. Kostnadsfri matchning med verifierad certifieringsstatus inom 48 timmar.",
    eyebrow: "Försvar & flyg",
    h1: "AS9100-certifierade legotillverkare i Sverige",
    intro:
      "Vi matchar försvars- och flygrelaterade förfrågningar mot svenska legotillverkare med verifierad AS9100D-certifiering. Certifieringsstatus är ett grundkrav i matchningsprocessen — ni behöver inte verifiera det själva.",
    painHeading: "AS9100-kompetens är sällsynt och svår att hitta",
    painBody:
      "AS9100-certifierade verkstäder i Sverige är betydligt färre än ISO 9001-certifierade. De syns sällan i vanliga leverantörsdatabaser, och många är välbelagda med befintliga försvarskunder. Med den pågående upprustningen och NATO-relaterade sourcing-behoven ökar konkurrensen om deras kapacitet snabbt. Att hitta rätt verkstad kräver ett specifikt nätverk.",
    valueProps: [
      {
        icon: "ShieldCheck",
        heading: "Certifieringsstatus verifierad",
        body: "Vi matchar enbart mot verkstäder med aktiv AS9100D-certifiering. Giltigheten kontrolleras i matchningsprocessen — ni behöver inte dubbelkolla själva.",
      },
      {
        icon: "Award",
        heading: "Special processes täckt",
        body: "Svetsning (ISO 3834), värmebehandling, ytbehandling och NDT kräver egna godkännandeprocesser vid AS9100. Vi matchar mot verkstäder med rätt godkännanden för era specifika processer.",
      },
      {
        icon: "Lock",
        heading: "Sekretess i hela processen",
        body: "Ritningar och specifikationer delas enbart med matchade verkstäder under sekretessavtal. Hanteringen uppfyller de krav som ställs vid försvarsrelaterade upphandlingar.",
      },
    ],
    steps: [
      "Specificera detalj, material, toleranskrav och process. Ange AS9100 som certifieringskrav i formuläret.",
      "Vi matchar mot verkstäder med aktiv AS9100D-certifiering och rätt processkompetens.",
      "Fem validerade matchningar inom 48 timmar — med verifierad certifieringsstatus.",
    ],
    ctaHeading: "Hitta AS9100-certifierad leverantör — inom 48 timmar",
    ctaSubtext:
      "Kostnadsfritt för inköpare. Matchningsprocessen är konfidentiell och hanteras under sekretessavtal.",
    preselectedMethod: undefined,
    preselectedMaterial: undefined,
  },
];

// Helper: get a single category page by slug
export function getCategoryBySlug(slug: string): CategoryPage | undefined {
  return categoryPages.find((p) => p.slug === slug);
}
