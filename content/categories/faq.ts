// FAQ content per category page (keyed by slug). Rendered on the page +
// emitted as FAQPage JSON-LD for Google/AI-search citation.
// Six highest-priority pages done (2026-07-07); remaining 14 = backlog.
// Keep answers factual and self-contained — AI assistants quote these verbatim.

export type Faq = { q: string; a: string };

export const FAQS: Record<string, Faq[]> = {
  "cnc-bearbetning": [
    {
      q: "Vad kostar CNC-bearbetning i Sverige?",
      a: "Priset styrs av tre faktorer: ställtid (dominerar vid små serier), maskintid per detalj och toleranskrav. En prototyp i aluminium kan kosta mångdubbelt mer per styck än samma detalj i serie om 500. Därför är det viktigare att jämföra offerter på lika underlag än att jaga ett timpris — vår matchning ger er fem jämförbara offertkandidater kostnadsfritt.",
    },
    {
      q: "Vad är skillnaden mellan 3-axlig och 5-axlig CNC-fräsning?",
      a: "En 3-axlig maskin bearbetar från en riktning åt gången och kräver omspänning för komplexa geometrier. En 5-axlig maskin vinklar verktyget eller detaljen och klarar komplexa ytor i en uppspänning — högre precision, färre operationer, men färre verkstäder har kapaciteten. Kräver er detalj 5-axligt kan ni ange det i vårt formulär, så matchar vi bara mot verkstäder med sådan maskinpark.",
    },
    {
      q: "Hur hittar jag en CNC-verkstad med rätt kapacitet?",
      a: "Det svenska utbudet är fragmenterat — många av de bästa verkstäderna marknadsför sig inte alls. Komponentguiden har kartlagt svenska legotillverkares maskinparker, certifieringar och finansiella stabilitet. Ni beskriver detaljen, vi returnerar fem validerade matchningar inom 48 timmar, kostnadsfritt.",
    },
    {
      q: "Vilka toleranser klarar svensk CNC-bearbetning?",
      a: "Standardtoleranser enligt ISO 2768 klarar de flesta verkstäder. Fina toleranser under 0,01 mm kräver rätt maskiner, mätrum och ofta klimatkontrollerad produktion — ett urval verkstäder specialiserar sig på detta. Ange toleransklass i förfrågan så filtreras matchningen därefter.",
    },
  ],

  "plat-och-svets": [
    {
      q: "Vad innebär certifierad svetsning enligt ISO 3834?",
      a: "ISO 3834 är kvalitetsstandarden för smältsvetsning, i nivåerna 3834-2 (omfattande krav), -3 (standardkrav) och -4 (elementära krav). Kravet kommer ofta från er slutkund eller från EN 1090 vid bärande stålkonstruktioner. Kräver er konstruktion certifierad svets matchar vi enbart mot verkstäder med rätt nivå.",
    },
    {
      q: "Vilka plåttjocklekar klarar laserskärning?",
      a: "Moderna fiberlasrar skär vanligen stål upp till 20–25 mm, rostfritt och aluminium något tunnare. Över det tar vattenskärning eller plasma vid. Tjocklek, material och toleranskrav avgör vilken verkstad som passar — det fångas i vårt matchningsformulär.",
    },
    {
      q: "Kan samma leverantör ta hela kedjan — skärning, bockning, svets och ytbehandling?",
      a: "Många svenska plåtverkstäder täcker laserskärning, kantpressning och svetsning under samma tak, medan ytbehandling ofta sker hos partner. Färre mellanled ger kortare ledtid och tydligare ansvar. Ange i förfrågan att ni vill ha full processtäckning så prioriterar matchningen sådana verkstäder.",
    },
    {
      q: "Hur snabbt kan jag få offert på en svetsad konstruktion?",
      a: "Med komplett underlag (ritning med svetsbeteckningar, material och volym) svarar de flesta verkstäder inom en till två veckor. Komponentguiden kortar vägen dit: fem validerade verkstäder med rätt utrustning och certifiering inom 48 timmar, så att offertrundan startar hos rätt aktörer direkt.",
    },
  ],

  "legotillverkning-aluminium": [
    {
      q: "Vilka aluminiumlegeringar används vanligast vid legotillverkning?",
      a: "6082 och 6061 dominerar för bearbetade konstruktionsdetaljer, 7075 där hållfastheten måste upp (flyg, verktyg), 5754/5083 för plåt och svetsade konstruktioner. Legeringsvalet påverkar bearbetbarhet, svetsbarhet och anodiseringsresultat — ange legering i förfrågan om den är låst, annars kan leverantören ofta föreslå.",
    },
    {
      q: "Vad ska jag tänka på vid anodisering av aluminium?",
      a: "Anodisering ger korrosionsskydd och yta, men resultatet beror på legeringen — gjutlegeringar och 7075 kan ge ojämn färg. Måttpåverkan är liten men finns, viktigt vid fina toleranser. Kräver detaljen både bearbetning och anodisering: sök en verkstad med etablerad ytbehandlingspartner, vilket vår matchning tar hänsyn till.",
    },
    {
      q: "CNC-bearbetning eller pressgjutning för min aluminiumdetalj?",
      a: "Tumregel: under ett par tusen enheter per år vinner bearbetning (ingen verktygskostnad); vid höga volymer vinner pressgjutning trots verktygsinvesteringen. Gränsen beror på geometri och toleranser — och detaljer kan ofta omkonstrueras för gjutning. Osäker? Välj 'Osäker / öppen för förslag' i formuläret så matchar vi brett.",
    },
    {
      q: "Finns det svenska leverantörer för både prototyp och serie i aluminium?",
      a: "Ja — men det är sällan samma verkstad som är bäst på båda. Prototypverkstäder prioriterar snabbhet och flexibilitet, serieverkstäder pris och processtabilitet. Ange volym och tidsram i förfrågan så matchas ni mot rätt profil, och kan säkra en seriepartner redan när prototypen görs.",
    },
  ],

  "legotillverkning-rostfritt": [
    {
      q: "Vilket rostfritt stål ska jag välja — 304 eller 316?",
      a: "304 (EN 1.4301) räcker för de flesta miljöer inomhus och normal utomhusexponering. 316/316L (EN 1.4404) med molybden krävs vid klorider — marin miljö, processindustri, läkemedel. Syrafast 316L är också standard inom livsmedel och medtech. Materialvalet påverkar både pris och vilka verkstäder som lagerhåller ämnen.",
    },
    {
      q: "Varför är rostfritt svårare att bearbeta än vanligt stål?",
      a: "Rostfritt härdnar vid deformation, leder värme dåligt och sliter verktyg snabbare — det kräver rätt verktyg, kylning och erfarenhet. Svetsning kräver skyddsgas och ofta efterbehandling (betning) för att återställa korrosionsskyddet. Erfarenhet av just rostfritt är därför ett skarpt urvalskriterium i vår matchning.",
    },
    {
      q: "Vad kostar bearbetning i rostfritt jämfört med vanligt stål?",
      a: "Räkna med påslag både på materialet (rostfritt är flera gånger dyrare än konstruktionsstål) och på bearbetningstiden (längre cykeltider, högre verktygsslitage). Design för tillverkningsbarhet — färre uppspänningar, standarddimensioner, rimliga toleranser — påverkar slutpriset mer än leverantörsvalet.",
    },
    {
      q: "Hur hittar jag en verkstad specialiserad på rostfritt?",
      a: "Fråga efter dokumenterad erfarenhet: referensdetaljer i rostfritt, betningsrutiner, separata verktyg (för att undvika järnkontaminering) och vid svets ISO 3834. Komponentguidens databas innehåller maskinpark och materialerfarenhet per verkstad — förfrågan med material 'Rostfritt' filtrerar automatiskt på detta.",
    },
  ],

  "as9100-certifierade-leverantorer": [
    {
      q: "Vad är skillnaden mellan AS9100 och ISO 9001?",
      a: "AS9100 (EN 9100 i Europa) bygger på ISO 9001 men lägger till flyg- och försvarsspecifika krav: konfigurationsstyrning, spårbarhet på artikelnivå, hantering av förfalskade komponenter, first article inspection och striktare leverantörsstyrning. En AS9100-certifierad verkstad uppfyller alltså ISO 9001 med råge — motsatsen gäller inte.",
    },
    {
      q: "Kräver försvarsupphandlingar alltid AS9100?",
      a: "Inte alltid — kravet varierar med upphandling och position i leverantörskedjan. Ofta räcker ISO 9001 hos underleverantörer i lägre led, medan flygande materiel och direktleveranser till OEM i praktiken kräver AS/EN 9100. Läs den specifika upphandlingens kvalificeringskrav, och räkna med att kraven skärps ju närmare slutprodukten ni kommer.",
    },
    {
      q: "Hur många svenska legotillverkare är AS9100-certifierade?",
      a: "Ett begränsat urval — certifieringen är en investering som främst verkstäder med etablerade flyg- och försvarskunder gör. Det gör urvalet till en flaskhals när försvarsindustrin nu växer. Komponentguiden kartlägger certifieringsstatus i vår leverantörsdatabas och matchar er direkt mot kvalificerade verkstäder.",
    },
    {
      q: "Hur hanteras sekretess vid känsliga försvarsförfrågningar?",
      a: "Ritningar ni laddar upp hos oss lagras krypterat, delas endast under sekretessåtagande med de matchade leverantörerna och raderas enligt uppsatta tidsramar. För säkerhetsskyddsklassade uppdrag gäller därutöver era egna och FMV:s rutiner — kontakta oss direkt så anpassar vi processen.",
    },
  ],

  "legotillverkare-smaland": [
    {
      q: "Varför finns så många legotillverkare just i Småland?",
      a: "Gnosjöregionen har en industritradition sedan 1600-talets tråddragerier, och 'Gnosjöandan' — täta nätverk av småföretag som hjälper varandra — har skapat en av Europas högsta koncentrationer av verkstäder, verktygsmakare och legotillverkare, med tyngdpunkt i Gnosjö, Gislaved, Värnamo och Anderstorp.",
    },
    {
      q: "Vilka typer av tillverkning är Småland starkast inom?",
      a: "Regionens kärna är polymerteknik (formsprutning kring Gislaved/Anderstorp), pressning och stansning av plåt, tråd- och fjädertillverkning, verktygstillverkning samt skärande bearbetning. Många verkstäder är familjeägda med djup nischkompetens — och syns sällan i digitala kanaler.",
    },
    {
      q: "Hur hittar jag rätt verkstad i Gnosjöregionen utan lokala kontakter?",
      a: "Det är precis problemet vi löser: tillväxten här sker genom rykte och nätverk, inte marknadsföring. Komponentguiden har kartlagt regionens leverantörer med maskinpark, certifieringar och finansiell ställning. Ange gärna Jönköpings län som geografiskt krav i förfrågan — eller låt oss matcha i hela landet och jämför.",
    },
    {
      q: "Täcker ni hela Småland?",
      a: "Ja — Jönköpings, Kronobergs och Kalmar län, inklusive Gnosjöbygden, Värnamo, Nässjö, Eksjö och kustkommunerna. Vårt geografiska filter arbetar på länsnivå, så ni väljer själva om kravet ska gälla ett län eller hela regionen.",
    },
  ],
};
