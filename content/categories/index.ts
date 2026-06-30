// Category landing page content
// Each entry maps to a static route: /[slug]/
// The `preselectedMethod` and `preselectedMaterial` values must match
// the option strings in IntentForm.tsx exactly.

export type ValueProp = {
  icon: "Zap" | "Scale" | "Lock" | "Network" | "ShieldCheck" | "Award" | "Clock" | "Search" | "FileCheck" | "MapPin" | "Layers" | "Cpu" | "Leaf";
  heading: string;
  body: string;
};

export type CategoryPage = {
  slug: string;
  section: "metod" | "material" | "region" | "bransch";

  // SEO
  metaTitle: string;
  metaDescription: string;

  // Hero
  eyebrow: string;
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
  preselectedMethod?: string;
  preselectedMaterial?: string;
};

export const categoryPages: CategoryPage[] = [

  // ─── BEARBETNINGSMETODER ────────────────────────────────────────────────────

  {
    slug: "cnc-bearbetning",
    section: "metod",
    metaTitle: "Hitta CNC-leverantör i Sverige — Komponentguiden",
    metaDescription:
      "Matchas med validerade CNC-verkstäder i Sverige på 48 timmar. Skärande bearbetning i alla material och toleransklasser. Kostnadsfritt för inköpare.",
    eyebrow: "Bearbetningsmetod",
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
    section: "metod",
    metaTitle: "Plåtbearbetning och svetsning — hitta underleverantör i Sverige",
    metaDescription:
      "Matchas med validerade verkstäder för plåtbearbetning, laserskärning och svetsning i Sverige. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bearbetningsmetod",
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
    slug: "gjutning",
    section: "metod",
    metaTitle: "Gjuteri i Sverige — hitta gjutleverantör via Komponentguiden",
    metaDescription:
      "Matchas med svenska gjuterier för sand-, kokill- och pressgjutning. Alla legeringar. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bearbetningsmetod",
    h1: "Gjutning i Sverige — hitta rätt gjuteri på 48 timmar",
    intro:
      "Sandgjutning, kokillgjutning eller pressgjutning — vi matchar er gjutningsförfrågan mot svenska gjuterier med rätt metod, legeringskompetens och volymkapacitet. Från prototypgjutning till serieproduktion.",
    painHeading: "Svenska gjuterier är svåra att hitta och ännu svårare att utvärdera",
    painBody:
      "Gjutning kräver djup materialkompetens, rätt formteknik och lång erfarenhet av specifika legeringar. Fel gjuteri för en applikation ger porositet, dimensionsavvikelser och omarbetning. Det svenska gjuterinätverket är fragmenterat och sällan synligt online — vi känner det.",
    valueProps: [
      {
        icon: "Search",
        heading: "Metod- och legeringsmatchning",
        body: "Vi matchar på gjutmetod (sand, kokill, press, precisionsgjutning) och legeringsgrupp — aluminium, grå- och segjärn, stål, mässing och brons.",
      },
      {
        icon: "Layers",
        heading: "Prototyp till serie",
        body: "Oavsett om ni behöver ett prototypgjutgods i sandform eller serieproduktion i pressgjutning — vi matchar mot gjuterier med rätt skala för er order.",
      },
      {
        icon: "Scale",
        heading: "Oberoende urval",
        body: "Matchningen styrs av era tekniska krav och gjuteriets faktiska kapabilitet. Vi har inga kommersiella avtal med enskilda gjuterier.",
      },
    ],
    steps: [
      "Specificera gjutmetod, legering, vikt, toleranskrav och volym. Bifoga ritning eller 3D-modell.",
      "Vi matchar mot gjuterier med rätt metod och legeringskompetens för er komponent.",
      "Fem validerade gjuterimatchningar levereras inom 48 timmar.",
    ],
    ctaHeading: "Hitta gjuteri i Sverige — kostnadsfritt",
    ctaSubtext:
      "Tjänsten är gratis för inköpare. Era underlag hanteras konfidentiellt under sekretessavtal.",
    preselectedMethod: "Gjutning",
  },

  {
    slug: "formsprutning",
    section: "metod",
    metaTitle: "Formsprutning i Sverige — hitta leverantör via Komponentguiden",
    metaDescription:
      "Matchas med svenska formsprutningsföretag för termoplaster och tekniska polymerer. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bearbetningsmetod",
    h1: "Formsprutning — hitta rätt leverantör i Sverige",
    intro:
      "Vi matchar er formsprutningsförfrågan mot svenska leverantörer baserat på plastmaterial, verktygskapacitet, toleranskrav och volym. Från mjuka aluminiumverktyg för prototyper till stålverktyg för serieproduktion.",
    painHeading: "Formsprutning kräver rätt partner från dag ett",
    painBody:
      "Verktygsinvesteringen är det stora åtagandet vid formsprutning — väljer ni fel leverantör tidigt betalar ni dyrt i omarbetade verktyg och försenade lanseringar. Rätt leverantör har inte bara rätt maskinpark utan också kompetens att designa verktyg som håller toleranser och klarar tusentals cykler utan underhållsproblem.",
    valueProps: [
      {
        icon: "Cpu",
        heading: "Materialspecifik kompetens",
        body: "ABS, PA, PC, PP, PEEK, TPE — vi matchar mot leverantörer med dokumenterad erfarenhet av just er plasttyp och applikation.",
      },
      {
        icon: "Layers",
        heading: "Rätt skala för er volym",
        body: "Mjukt aluminiumverktyg för 100 prototyper eller stålverktyg för 100 000-serier — vi matchar baserat på er volym och tidsplan.",
      },
      {
        icon: "ShieldCheck",
        heading: "NDA-skyddad process",
        body: "Er produktdesign och era verktygsritningar delas enbart med matchade leverantörer under sekretessavtal. Ingen information lämnar processen utan er kontroll.",
      },
    ],
    steps: [
      "Specificera plastmaterial, toleranskrav, ytfinish, volym och tidsram. Bifoga CAD-fil om möjligt.",
      "Vi matchar mot formsprutningsleverantörer med rätt maskinpark och materialexpertis.",
      "Fem validerade matchningar inom 48 timmar — redo för offertdialog.",
    ],
    ctaHeading: "Hitta formsprutningsleverantör — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Era konstruktionsunderlag hanteras konfidentiellt.",
    preselectedMethod: "Formsprutning",
  },

  {
    slug: "3d-printing",
    section: "metod",
    metaTitle: "3D-printing industriell — hitta leverantör i Sverige",
    metaDescription:
      "Matchas med svenska leverantörer för industriell 3D-printing — SLS, SLM, FDM och DMLS i metall och polymer. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bearbetningsmetod",
    h1: "Industriell 3D-printing i Sverige — hitta rätt leverantör",
    intro:
      "Additiv tillverkning i metall eller polymer — vi matchar er förfrågan mot svenska leverantörer med rätt teknik för er applikation. SLS, SLM, DMLS, FDM eller PolyJet — baserat på material, toleranskrav och användningsområde.",
    painHeading: "Additiv tillverkning kräver rätt teknik för rätt applikation",
    painBody:
      "3D-printing är inte en metod — det är ett samlingsnamn för ett dussin tekniker med fundamentalt olika kapabiliteter. En leverantör som är bäst på FDM-prototyper i PLA är fel val för en kritisk SLM-komponent i titan för försvarstillämpning. Att navigera utbudet kräver djup teknisk insikt.",
    valueProps: [
      {
        icon: "Cpu",
        heading: "Teknik- och materialmatchning",
        body: "Vi matchar på printmetod (SLS, SLM, FDM, DMLS, PolyJet) och material — titanlegering, Inconel, rostfritt, aluminium, nylon, PEEK och specialpolymerer.",
      },
      {
        icon: "Clock",
        heading: "Snabb prototypering",
        body: "Additiv tillverkning är idealiskt för snabba iterationer. Vi matchar mot leverantörer med kort ledtid för prototyputtag — ofta 3–7 dagar från godkänd fil.",
      },
      {
        icon: "ShieldCheck",
        heading: "Certifierade för krävande tillämpningar",
        body: "För försvar, flyg och medtech matchar vi mot leverantörer med relevanta certifieringar — AS9100 för flyg/försvar, ISO 13485 för medicinsk utrustning.",
      },
    ],
    steps: [
      "Specificera printmetod (eller beskriv applikationen), material, dimensioner, toleranskrav och volym.",
      "Vi matchar mot leverantörer med rätt teknik, materialcertifiering och produktionsskala.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta 3D-printingleverantör i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  // ─── MATERIAL ───────────────────────────────────────────────────────────────

  {
    slug: "legotillverkning-aluminium",
    section: "material",
    metaTitle: "Legotillverkning i aluminium — hitta leverantör i Sverige",
    metaDescription:
      "Matchas med svenska legotillverkare specialiserade på aluminium — CNC-bearbetning, pressgjutning och svetsning. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Material",
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
    section: "material",
    metaTitle: "Legotillverkning i rostfritt stål — leverantör Sverige",
    metaDescription:
      "Matchas med svenska verkstäder för legotillverkning i rostfritt stål — CNC-bearbetning, svetsning och ytbehandling. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Material",
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
      "Specificera legering, bearbetningsmetod, toleranskrav, ytbehandling och certifieringskrav.",
      "Vi matchar mot verkstäder med verifierad kompetens för er rostfria tillämpning.",
      "Fem matchningar i inkorgen inom 48 timmar — redo att begära offert.",
    ],
    ctaHeading: "Beskriv er rostfria komponent — vi hittar rätt verkstad",
    ctaSubtext:
      "Kostnadsfritt för inköpare. Ritningar hanteras konfidentiellt under sekretessavtal.",
    preselectedMaterial: "Rostfritt",
  },

  {
    slug: "titan-bearbetning",
    section: "material",
    metaTitle: "Titanbearbetning i Sverige — hitta leverantör via Komponentguiden",
    metaDescription:
      "Matchas med svenska verkstäder specialiserade på titanbearbetning för försvar, flyg och medicinsk utrustning. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Material",
    h1: "Titanbearbetning i Sverige — specialistleverantörer inom 48 timmar",
    intro:
      "Titan är ett av de mest bearbetningskrävande materialen som finns — hög temperatur, låg värmeledning och stark fjädring gör det till en utmaning för alla utom de mest erfarna verkstäderna. Vi matchar er mot svenska titanspecialister med rätt maskinpark, erfarenhet och certifieringsstatus.",
    painHeading: "De flesta verkstäder kan inte bearbeta titan tillförlitligt",
    painBody:
      "Titan genererar extremt hög skärtemperatur och sliter hårt på skärverktyg. Utan rätt parametrar, kylstrategi och verktygssystem får ni snabb verktygsnedbrytning, dålig ytfinish och dimensionsavvikelser. De verkstäder som behärskar titan är få — och de marknadsför sig sällan brett.",
    valueProps: [
      {
        icon: "Search",
        heading: "Verifierad titanerfarenhet",
        body: "Vi matchar enbart mot verkstäder med dokumenterad erfarenhet av titanbearbetning — inte mot alla CNC-verkstäder som tror att de kan hantera det.",
      },
      {
        icon: "ShieldCheck",
        heading: "Certifierade för krävande tillämpningar",
        body: "Titan används primärt i försvar, flyg och medicinsk utrustning. Vi matchar mot leverantörer med AS9100 eller ISO 13485 där er applikation kräver det.",
      },
      {
        icon: "Lock",
        heading: "Konfidentiell process",
        body: "Ritningar och specifikationer delas enbart med matchade leverantörer under sekretessavtal — ett grundkrav vid försvars- och flygrelaterade komponenter.",
      },
    ],
    steps: [
      "Specificera titanlegeringen (grade 2, grade 5/Ti-6Al-4V, etc.), bearbetningsmetod, toleranskrav och certifieringskrav.",
      "Vi matchar mot verkstäder med verifierad titankapabilitet och rätt certifieringsstatus.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta titanspecialist i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell hantering under sekretessavtal.",
    preselectedMaterial: "Titan / Special",
  },

  {
    slug: "legotillverkning-plast",
    section: "material",
    metaTitle: "Legotillverkning i plast — hitta leverantör i Sverige",
    metaDescription:
      "Matchas med svenska leverantörer för tillverkning av plastkomponenter — formsprutning, bearbetning och tekniska polymerer. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Material",
    h1: "Legotillverkning i plast & polymerer — hitta rätt leverantör",
    intro:
      "Från standardtermoplaster som ABS och PA till högpresterande polymerer som PEEK och PTFE — vi matchar er plastkomponentförfrågan mot svenska leverantörer med rätt materialkompetens, processteknik och certifieringsstatus.",
    painHeading: "Plasttillverkning är inte en metod — det är ett materialval",
    painBody:
      "En leverantör som är utmärkt på formsprutning av ABS-höljen kan vara fel val för en precisionsbearbetad PEEK-komponent till medicinsk utrustning. Materialvalet styr processkrav, verktygsdesign och kvalitetsparametrar. Vi matchar på materialkompetens, inte bara på tillverkningsmetod.",
    valueProps: [
      {
        icon: "Cpu",
        heading: "Bred materialtäckning",
        body: "ABS, PA, PC, PP, PE, POM, PEEK, PTFE, UHMW-PE — vi matchar mot leverantörer med dokumenterad erfarenhet av er specifika polymertyp.",
      },
      {
        icon: "Layers",
        heading: "Metod efter behov",
        body: "Formsprutning, CNC-bearbetning av plastblock, vakuumformning eller reaktionsgjutning — vi matchar på den process som passar er komponent, inte den som leverantören råkar ha.",
      },
      {
        icon: "ShieldCheck",
        heading: "Certifierat för reglerade branscher",
        body: "Kräver er applikation ISO 13485 (medicinsk) eller livsmedelsgodkänt material? Vi filtrerar på certifieringsstatus i matchningen.",
      },
    ],
    steps: [
      "Specificera plastmaterial, tillverkningsmetod, toleranskrav, volym och eventuella certifieringskrav.",
      "Vi matchar mot leverantörer med rätt materialkompetens och processteknik.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta plastleverantör i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMaterial: "Plast",
  },

  {
    slug: "kompositmaterial",
    section: "material",
    metaTitle: "Komposittillverkning i Sverige — hitta leverantör via Komponentguiden",
    metaDescription:
      "Matchas med svenska leverantörer för komposittillverkning i kolfiberkompositeter, glasfiber och avancerade laminat. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Material",
    h1: "Komposittillverkning i Sverige — specialistleverantörer inom 48 timmar",
    intro:
      "Kolfiberkompositeter, glasfiberarmerade polymerer och avancerade sandwichlaminat — vi matchar er komposittillverkningsförfrågan mot svenska leverantörer med rätt layteknik, härdningsprocess och kvalitetssystem. För flyg, energi, fordon och marin industri.",
    painHeading: "Komposittillverkning kräver ett specialiserat nätverk",
    painBody:
      "Kompositlaminering, autoklav-härdning och NDT-kontroll av kompositer är kompetenser som kräver dedikerade processer, utrymmen och certifieringar. Dessa leverantörer är sällan synliga i vanliga leverantörsdatabaser — och efterfrågan på deras kapacitet ökar snabbt i takt med vindkraftens och flygindustrins tillväxt.",
    valueProps: [
      {
        icon: "Layers",
        heading: "Process- och materialmatchning",
        body: "Prepreg-laminering, vakuuminfusion, RTM eller manuell laminering — vi matchar på process och materialsystem (kolfiberkompositeter, E-glas, aramid, hybridlaminat).",
      },
      {
        icon: "ShieldCheck",
        heading: "Certifierade processer",
        body: "Kompositer i flyg- och försvarstillämpningar kräver godkända tillverkningsprocesser och NDT-kontroll. Vi matchar mot leverantörer med rätt processkvalifikationer.",
      },
      {
        icon: "Leaf",
        heading: "Tillväxtmarknad",
        body: "Vind, flyg och lätta fordonskonstruktioner driver stark efterfrågan på kompositer. Vi matchar er mot leverantörer som investerar i kapacitet — inte mot dem som är överhopade.",
      },
    ],
    steps: [
      "Specificera kompositmaterial, process, laminatuppbyggnad, dimensioner och certifieringskrav.",
      "Vi matchar mot svenska kompositleverantörer med rätt process och erfarenhet.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta kompositleverantör i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMaterial: undefined,
  },

  // ─── REGIONER ───────────────────────────────────────────────────────────────

  {
    slug: "legotillverkare-goteborg",
    section: "region",
    metaTitle: "Legotillverkare Göteborg — hitta underleverantör via Komponentguiden",
    metaDescription:
      "Hitta validerade legotillverkare och underleverantörer i Göteborg och Västra Götaland. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Region",
    h1: "Legotillverkare i Göteborg — matchning inom 48 timmar",
    intro:
      "Göteborg och Västra Götaland är Sveriges tätaste industriregion — hem för fordonsindustrin, marin industri och ett tätt nät av precisionsverkstäder. Vi matchar er förfrågan mot rätt legotillverkare i regionen baserat på maskinpark, kompetens och certifieringsstatus.",
    painHeading: "En lokal legotillverkare är inte alltid lättast att hitta",
    painBody:
      "Trots att Västra Götaland har tusentals industriella SME-verkstäder är det svårt att hitta rätt. Volymen av Volvos och SKF:s leverantörsnätverk absorberar mycket kapacitet — men det finns utmärkta verkstäder med ledig kapacitet som gärna tar nya kunder. Vi hittar dem åt er.",
    valueProps: [
      {
        icon: "MapPin",
        heading: "Lokalt förankrat nätverk",
        body: "Verkstäder i Göteborg, Mölndal, Borås, Trollhättan och Västra Götaland i övrigt — vi täcker regionen med validerade leverantörer i alla bearbetningsmetoder.",
      },
      {
        icon: "Network",
        heading: "Fordonsindustrins leverantörsbas",
        body: "Regionen hyser en av Europas tätaste kluster av fordonsleverantörer. Verkstäder vana vid Volvo- och SKF-krav är tillgängliga — utan att ni behöver gå via OEM-avdelningarna.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Fem lokala leverantörsförslag i inkorgen inom 48 timmar — med kortare transporttider och enklare kommunikation som bonus.",
      },
    ],
    steps: [
      "Specificera er förfrågan — metod, material, toleranskrav och volym. Ange gärna om lokal leverantör är ett krav.",
      "Vi matchar mot legotillverkare i Göteborg och Västra Götaland med rätt kompetens.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta legotillverkare i Göteborg — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "legotillverkare-stockholm",
    section: "region",
    metaTitle: "Legotillverkare Stockholm — hitta underleverantör via Komponentguiden",
    metaDescription:
      "Hitta validerade legotillverkare i Stockholm och Mälardalen. Försvar, medtech och precisionstillverkning. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Region",
    h1: "Legotillverkare i Stockholm & Mälardalen — matchning inom 48 timmar",
    intro:
      "Stockholm och Mälardalen koncentrerar en tung mix av försvarsindustri, medicinsk teknik, energiteknik och avancerad precisionstillverkning. Vi matchar er förfrågan mot verkstäder i regionen med rätt kapabilitet och certifieringsstatus.",
    painHeading: "Mälardalens industristruktur är mer komplex än den ser ut",
    painBody:
      "ABB och Hitachi Energy i Västerås, Saab i Järfälla, GE Healthcare och Siemens Healthineers — Mälardalen är hem för kunder med extremt höga leverantörskrav. Det har skapat ett nätverk av precisionsleverantörer som klarar dessa krav men sällan är synliga för nya kunder utanför befintliga leverantörsbaser.",
    valueProps: [
      {
        icon: "MapPin",
        heading: "Täckning i hela regionen",
        body: "Stockholm, Västerås, Eskilstuna, Uppsala, Södertälje — vi täcker Mälardalen med validerade verkstäder i alla relevanta bearbetningsmetoder.",
      },
      {
        icon: "ShieldCheck",
        heading: "Certifierade för krävande branscher",
        body: "Regionen har hög koncentration av AS9100- och ISO 13485-certifierade leverantörer för försvar och medicinsk utrustning — vi matchar mot rätt certifieringsnivå.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Fem lokala leverantörsförslag i inkorgen inom 48 timmar — med kort transporttid och enkel projektuppföljning.",
      },
    ],
    steps: [
      "Specificera metod, material, toleranskrav och eventuella certifieringskrav.",
      "Vi matchar mot legotillverkare i Stockholm och Mälardalen med rätt kompetens.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta legotillverkare i Stockholm — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "legotillverkare-smaland",
    section: "region",
    metaTitle: "Legotillverkare Småland — hitta underleverantör via Komponentguiden",
    metaDescription:
      "Hitta validerade legotillverkare i Småland och Jönköpingsregionen. Europas tätaste kluster av precisionsverkstäder. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Region",
    h1: "Legotillverkare i Småland — Europas precision-hjärta",
    intro:
      "Jönköpingsregionen och Gnosjöbygden är ett av Europas tätaste kluster av precisionsverkstäder, verktygsmakare och legotillverkare. Här finns generationer av industriellt hantverk i SME-format — och vi hjälper er att hitta rätt verkstad i det nätverket.",
    painHeading: "\"Gnosjöandan\" är svår att navigera utifrån",
    painBody:
      "Regionen har tusentals industriella SME-företag med exceptionell kompetens — men de marknadsför sig sällan utanför sina befintliga kundrelationer. Tillväxten sker genom rykte och nätverk, inte genom digitala kanaler. Vi är insidan av det nätverket.",
    valueProps: [
      {
        icon: "Award",
        heading: "Generationer av precisionshantverk",
        body: "Småland och Jönköpingsregionen har en unik koncentration av verktygsmakare, precisionsmaskiner och SME-verkstäder med djup materialkompetens.",
      },
      {
        icon: "MapPin",
        heading: "Täckning i hela regionen",
        body: "Jönköping, Värnamo, Gnosjö, Vaggeryd, Nässjö, Eksjö — vi täcker hela Gnosjöbygden och Jönköpingsregionen.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Vi returnerar fem validerade verkstäder i regionen inom 48 timmar — utan att ni behöver ringa runt eller besöka Elmia för att hitta rätt kontakt.",
      },
    ],
    steps: [
      "Specificera metod, material och toleranskrav. Ange om regional förankring i Småland är ett krav.",
      "Vi matchar mot legotillverkare i Småland med rätt kompetens för er förfrågan.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta legotillverkare i Småland — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "legotillverkare-skane",
    section: "region",
    metaTitle: "Legotillverkare Skåne — hitta underleverantör via Komponentguiden",
    metaDescription:
      "Hitta validerade legotillverkare i Skåne — Malmö, Helsingborg och Lund. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Region",
    h1: "Legotillverkare i Skåne — matchning inom 48 timmar",
    intro:
      "Skåne kombinerar en stark industriell bas med utmärkt logistikposition mot Europa. Alfa Laval i Lund, Axis Communications och ett växande tech- och tillverkningskluster i Malmö/Helsingborg — regionen erbjuder kompetenta leverantörer för en bredd av industriella behov.",
    painHeading: "Skånes industristruktur är mer diversifierad än den verkar",
    painBody:
      "Skåne är inte en homogen industriregion — det finns starka kluster inom livsmedelsteknik, medicinsk utrustning, förpackning och precisionstillverkning. Att hitta en leverantör med rätt specialisering kräver mer än en Google-sökning.",
    valueProps: [
      {
        icon: "MapPin",
        heading: "Täckning i hela Skåne",
        body: "Malmö, Helsingborg, Lund, Kristianstad, Landskrona — vi täcker Skåne med validerade leverantörer i alla bearbetningsmetoder.",
      },
      {
        icon: "Network",
        heading: "Nära Europa",
        body: "Skånes geografiska position gör regionen till ett naturligt nav för leverantörer med europeiska kunder — och verkstäder vana vid internationella kvalitetskrav.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Fem regionala leverantörsförslag i inkorgen inom 48 timmar.",
      },
    ],
    steps: [
      "Specificera metod, material och toleranskrav.",
      "Vi matchar mot legotillverkare i Skåne med rätt kompetens.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta legotillverkare i Skåne — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "legotillverkare-blekinge",
    section: "region",
    metaTitle: "Legotillverkare Blekinge — hitta underleverantör via Komponentguiden",
    metaDescription:
      "Hitta validerade legotillverkare i Blekinge — med stark förankring i försvarsindustrin. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Region",
    h1: "Legotillverkare i Blekinge — matchning inom 48 timmar",
    intro:
      "Blekinge är liten till ytan men tung i industriell betydelse. Saab Kockums ubåtsproduktion i Karlskrona och Marinens närvaro har format ett leverantörsnätverk med ovanligt hög kompetens i precisionstillverkning, specialmaterial och certifierade processer.",
    painHeading: "Blekinges leverantörsbas är inte publik — den är relationsburen",
    painBody:
      "Försvarsindustrins leverantörer i Blekinge arbetar ofta under sekretess och syns sällan i öppna kataloger. Kompetensen är hög, men nätverket är stängt för utomstående. Vi har tillgång till det.",
    valueProps: [
      {
        icon: "ShieldCheck",
        heading: "Försvarsförankrad kompetens",
        body: "Leverantörer i Blekinge har ofta erfarenhet av försvarskrav — precisionstolerenser, spårbarhet och certifierade processer är standard, inte undantag.",
      },
      {
        icon: "MapPin",
        heading: "Karlskrona och omnejd",
        body: "Vi täcker Karlskrona, Karlshamn, Ronneby och omgivande industriområden med validerade leverantörer.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Fem regionala leverantörsförslag i inkorgen inom 48 timmar.",
      },
    ],
    steps: [
      "Specificera metod, material, toleranskrav och eventuella certifieringskrav.",
      "Vi matchar mot legotillverkare i Blekinge med rätt kompetens.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta legotillverkare i Blekinge — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "legotillverkare-halland",
    section: "region",
    metaTitle: "Legotillverkare Halland — hitta underleverantör via Komponentguiden",
    metaDescription:
      "Hitta validerade legotillverkare i Halland — Halmstad, Varberg och Falkenberg. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Region",
    h1: "Legotillverkare i Halland — matchning inom 48 timmar",
    intro:
      "Halland är en underskattad industriregion med god tillgång till kompetenta verkstäder och utmärkt logistikläge mellan Göteborg och Malmö. Halmstad, Varberg och Falkenberg har ett växande kluster av tillverkande SME-företag som sällan syns utanför regionen.",
    painHeading: "Hallands industri är underdokumenterad och underutnyttjad",
    painBody:
      "Regionen har kompetenta verkstäder med ledig kapacitet — men utan ett digitalt synligt nätverk. Inköpare söker sällan i Halland trots att kostnadsnivåerna och kompetensen är konkurrenskraftiga jämfört med storstadsregionerna.",
    valueProps: [
      {
        icon: "MapPin",
        heading: "Kustregion med kapacitet",
        body: "Halmstad, Varberg, Falkenberg, Kungsbacka — vi täcker hela Halland med validerade legotillverkare.",
      },
      {
        icon: "Network",
        heading: "Logistikfördelar",
        body: "Hallands läge på västkusten ger korta transporter till Göteborg, Malmö och kontinenten — attraktivt för just-in-time-leveranser.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Fem validerade regionala leverantörsförslag i inkorgen inom 48 timmar.",
      },
    ],
    steps: [
      "Specificera metod, material och toleranskrav.",
      "Vi matchar mot legotillverkare i Halland med rätt kompetens.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta legotillverkare i Halland — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  // ─── BRANSCHER ──────────────────────────────────────────────────────────────

  {
    slug: "as9100-certifierade-leverantorer",
    section: "bransch",
    metaTitle: "AS9100-certifierade leverantörer i Sverige — Komponentguiden",
    metaDescription:
      "Hitta AS9100-certifierade svenska legotillverkare för försvars- och flygtillämpningar. Kostnadsfri matchning med verifierad certifieringsstatus inom 48 timmar.",
    eyebrow: "Bransch",
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

  {
    slug: "fordonsindustri",
    section: "bransch",
    metaTitle: "Legotillverkning fordonsindustri — leverantör Sverige",
    metaDescription:
      "Matchas med svenska legotillverkare erfarna i fordonskomponenter och leveranser till Tier 1 och OEM. IATF 16949, ISO 9001. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bransch",
    h1: "Legotillverkning för fordonsindustrin — rätt leverantör inom 48 timmar",
    intro:
      "Vi matchar fordonsrelaterade tillverkningsförfrågningar mot svenska leverantörer med dokumenterad erfarenhet av fordonskrav — IATF 16949, PPAP, SPC och Tier 1-processer. Från prototypdelar till serieleveranser.",
    painHeading: "Fordonsleverantörer kräver mer än rätt maskinpark",
    painBody:
      "En verkstad som klarar tekniska toleranser men saknar erfarenhet av PPAP-processen, SPC-rapportering eller Tier 1-krav blir en belastning snarare än en tillgång. Fordonskedjan kräver leverantörer som kan dess språk — dokumentation, avvikelserapportering och leveransprecision är lika viktiga som detaljens dimensioner.",
    valueProps: [
      {
        icon: "FileCheck",
        heading: "Erfarenhet av fordonskrav",
        body: "Vi matchar mot verkstäder med dokumenterad erfarenhet av PPAP, APQP, FMEA och SPC — inte bara mot generiska CNC-verkstäder.",
      },
      {
        icon: "Network",
        heading: "Tier 1 och OEM-leverantörsbas",
        body: "Sverige är hem för Volvo, Scania och ett tätt Tier 1-nätverk. Vi matchar mot leverantörer som redan levererar in i dessa kedjor och känner kraven.",
      },
      {
        icon: "Clock",
        heading: "48 timmar till matchning",
        body: "Fem validerade fordonsleverantörer i inkorgen inom 48 timmar — med rätt certifieringsstatus och branscherfarenhet verifierad.",
      },
    ],
    steps: [
      "Specificera komponent, material, toleranskrav, volym och eventuella certifieringskrav (IATF 16949, ISO 9001).",
      "Vi matchar mot verkstäder med erfarenhet av fordonskedjans krav.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta fordonsleverantör i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "medicinteknik",
    section: "bransch",
    metaTitle: "Legotillverkning medicinteknik — leverantör Sverige",
    metaDescription:
      "Matchas med svenska legotillverkare med ISO 13485-certifiering för medicinska komponenter och medicinteknisk utrustning. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bransch",
    h1: "Legotillverkning för medicinteknik — ISO 13485-certifierade leverantörer",
    intro:
      "Medicintekniska komponenter kräver spårbarhet, dokumentation och ett ledningssystem som uppfyller ISO 13485. Vi matchar er mot svenska leverantörer med rätt certifieringsstatus, ren produktionsmiljö och erfarenhet av medicintekniska krav.",
    painHeading: "Medicinteknik kräver leverantörer som kan mer än tillverka",
    painBody:
      "ISO 13485-certifiering är bara startpunkten. Leverantörer för medicintekniska komponenter måste hantera designkontroll, riskhantering enligt ISO 14971, spårbarhet per komponent och avvikelsehantering i enlighet med MDR. Fel leverantör skapar regulatoriska risker som överstiger kostnadsbesparingen.",
    valueProps: [
      {
        icon: "ShieldCheck",
        heading: "ISO 13485 verifierat",
        body: "Vi matchar enbart mot leverantörer med aktiv ISO 13485-certifiering för medicintekniska tillämpningar. Certifieringsstatus kontrolleras i matchningsprocessen.",
      },
      {
        icon: "FileCheck",
        heading: "Spårbarhet och dokumentation",
        body: "Medicintekniska leverantörer i vårt nätverk har processer för lotnummerbaserad spårbarhet, materialdokumentation och avvikelserapportering som uppfyller MDR-krav.",
      },
      {
        icon: "Lock",
        heading: "Konfidentiell process",
        body: "Designunderlag för medicintekniska produkter delas enbart med matchade leverantörer under sekretessavtal — ett grundkrav för IP-skydd i en regulatorisk miljö.",
      },
    ],
    steps: [
      "Specificera komponent, material, renhetskrav, toleranskrav och certifieringskrav (ISO 13485).",
      "Vi matchar mot leverantörer med rätt certifiering och erfarenhet av medicintekniska krav.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta medicinteknisk leverantör i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },

  {
    slug: "energi",
    section: "bransch",
    metaTitle: "Legotillverkning energisektorn — leverantör Sverige",
    metaDescription:
      "Matchas med svenska legotillverkare för energisektorns komponenter — vindkraft, vätgas, kärnkraft och elnät. Kostnadsfri matchning inom 48 timmar.",
    eyebrow: "Bransch",
    h1: "Legotillverkning för energisektorn — matchning inom 48 timmar",
    intro:
      "Vindkraft, vätgasinfrastruktur, kärnkraft och elnätsutbyggnad skapar stor och växande efterfrågan på industriella komponenter. Vi matchar er mot svenska leverantörer med rätt materialkompetens, processkvalifikationer och kapacitet för energisektorns krav.",
    painHeading: "Energisektorns komponentbehov spränger befintliga leverantörsbaser",
    painBody:
      "Utbyggnaden av vindkraft, stamnät och vätgasinfrastruktur kräver volymer och komponenttyper som överstiger vad etablerade leverantörsrelationer kan absorbera. Inköpsteamen behöver snabbt identifiera nya kapabla leverantörer — utan att kompromissa med kvalitets- och dokumentationskrav.",
    valueProps: [
      {
        icon: "Leaf",
        heading: "Bred energitäckning",
        body: "Vindkraftverk, transformatorer, vätgaselektrolysörer, reaktorkomponenter — vi matchar mot leverantörer med erfarenhet av energisektorns specifika material och processkrav.",
      },
      {
        icon: "ShieldCheck",
        heading: "Rätt certifieringar",
        body: "PED (tryckkärlsdirektivet), EN 1090 (stålkonstruktioner), ISO 3834-svetsning — energikomponenter kräver specifika certifieringar som vi filtrerar på i matchningsprocessen.",
      },
      {
        icon: "Network",
        heading: "Kapacitet att leverera i volym",
        body: "Energiprojekt kräver inte en leverantör — de kräver en leverantörsbas. Vi kan matcha er mot flera parallella leverantörer för olika komponenttyper i samma projekt.",
      },
    ],
    steps: [
      "Specificera komponent, material, certifieringskrav och volym. Beskriv gärna energitillämpningen.",
      "Vi matchar mot leverantörer med rätt kompetens och certifieringar för energisektorn.",
      "Fem validerade matchningar inom 48 timmar.",
    ],
    ctaHeading: "Hitta energileverantör i Sverige — kostnadsfritt",
    ctaSubtext:
      "Gratis för inköpare. Konfidentiell process under sekretessavtal.",
    preselectedMethod: undefined,
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

export function getCategoryBySlug(slug: string): CategoryPage | undefined {
  return categoryPages.find((p) => p.slug === slug);
}

export function getCategoriesBySection(
  section: CategoryPage["section"]
): CategoryPage[] {
  return categoryPages.filter((p) => p.section === section);
}
