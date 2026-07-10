// FAQ content per category page (keyed by slug). Rendered on the page +
// emitted as FAQPage JSON-LD for Google/AI-search citation.
// All 20 category pages covered (6 on 2026-07-07, remaining 14 on 2026-07-10).
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

  // ─── Metoder ───────────────────────────────────────────────

  "gjutning": [
    {
      q: "Vilken gjutmetod passar min volym?",
      a: "Tumregel: sandgjutning för prototyper och låga volymer (låg verktygskostnad, högre styckpris), kokillgjutning för mellanserier, och pressgjutning för höga volymer där den stora verktygsinvesteringen fördelas på många detaljer. Precisionsgjutning väljs när geometrin är komplex och ytkraven höga. Ange volym och geometri i förfrågan så matchar vi mot gjuterier med rätt metod.",
    },
    {
      q: "Vilka material kan gjutas?",
      a: "De vanligaste är aluminiumlegeringar, gråjärn och segjärn, gjutstål samt kopparbaserade legeringar som brons och mässing. Legeringsvalet styr både gjutmetod och vilka gjuterier som har rätt smält- och formkompetens — alla gjuterier hanterar inte alla material.",
    },
    {
      q: "Varför dominerar verktygskostnaden priset vid låga volymer?",
      a: "Formen eller verktyget är en fast kostnad som betalas oavsett antal. Vid en handfull detaljer slår den igenom hårt på styckpriset; vid tusentals detaljer fördelas den och blir försumbar. Det är därför metodvalet hänger så tätt ihop med din volym.",
    },
  ],

  "formsprutning": [
    {
      q: "Vad kostar ett formsprutningsverktyg?",
      a: "Ett mjukt prototypverktyg i aluminium ligger typiskt i storleksordningen tiotusentals kronor, medan ett härdat stålverktyg för serieproduktion kan kosta hundratusentals kronor beroende på antal kaviteter och komplexitet. Verktyget är den stora engångsinvesteringen — styckpriset i serie är däremot lågt.",
    },
    {
      q: "Mjukt verktyg eller stålverktyg — vad ska jag välja?",
      a: "Mjuka aluminiumverktyg är billigare och snabbare att ta fram men håller för begränsade antal cykler — bra för prototyper och små serier. Stålverktyg kostar mer men klarar hundratusentals till miljoner cykler. Valet styrs av din totala volym över produktens livslängd.",
    },
    {
      q: "Hur stor volym krävs för att formsprutning ska löna sig?",
      a: "Eftersom verktyget är en betydande fast kostnad blir formsprutning konkurrenskraftigt först vid några tusen detaljer och uppåt. Under det är CNC-bearbetning av plastblock eller 3D-printing ofta billigare. Är du osäker kan leverantören räkna på brytpunkten utifrån din årsvolym.",
    },
    {
      q: "Vilka plaster kan formsprutas?",
      a: "De flesta termoplaster: standardplaster som ABS, PP och PE, tekniska plaster som PA (nylon), POM och PC, samt högpresterande polymerer som PEEK. Materialvalet påverkar krympning, verktygsdesign och processfönster — ange plasttyp i förfrågan om den är låst.",
    },
  ],

  "3d-printing": [
    {
      q: "Vilka 3D-printtekniker används industriellt?",
      a: "De vanligaste är FDM (smält tråd, billiga plastprototyper), SLS (lasersintrat nylonpulver), SLA och PolyJet (härdad fotopolymer, hög detaljrikedom) samt SLM och DMLS för metall. Teknikerna skiljer sig fundamentalt i material, precision och hållfasthet — rätt val beror på applikationen.",
    },
    {
      q: "Kan man 3D-printa i metall?",
      a: "Ja — SLM och DMLS bygger detaljer lager för lager ur metallpulver som titan (Ti-6Al-4V), rostfritt, aluminium och nickelbaserade legeringar som Inconel. Med efterbehandling som HIP (het isostatisk pressning) närmar sig hållfastheten smitt material, vilket gör tekniken gångbar för försvars- och flygkomponenter.",
    },
    {
      q: "När är 3D-printing bättre än CNC-bearbetning?",
      a: "Additiv tillverkning vinner vid komplex geometri (inre kanaler, gitterstrukturer), vid små volymer utan verktygskostnad, och när ledtiden är kritisk — prototyper kan ofta levereras på några dagar. Vid enkla geometrier i serie är CNC eller gjutning oftast billigare.",
    },
  ],

  // ─── Material ───────────────────────────────────────────────

  "titan-bearbetning": [
    {
      q: "Varför är titan svårt att bearbeta?",
      a: "Titan leder värme dåligt, så skärvärmen koncentreras i verktygseggen, och materialet härdnar vid deformation. Resultatet blir snabbt verktygsslitage och risk för vibration. Det kräver rätt skärdata, stabil fixturering och riklig kylning — och därmed erfarna verkstäder.",
    },
    {
      q: "Vilka titanlegeringar är vanligast?",
      a: "Grade 2 (kommersiellt ren titan) för korrosionstålighet, Grade 5 (Ti-6Al-4V) som arbetshäst inom flyg och försvar, samt Grade 23 (Ti-6Al-4V ELI) med extra låg föroreningshalt för medicinska implantat. Legeringsvalet styr både bearbetning och tillämpning.",
    },
    {
      q: "Vad används titanbearbetning till?",
      a: "Främst flyg, försvar och medicinteknik — titan är starkt, lätt, korrosionståligt och biokompatibelt. Just dessa branscher ställer ofta krav på AS9100 eller ISO 13485, vilket vi filtrerar på i matchningen så att certifieringen finns på plats.",
    },
  ],

  "legotillverkning-plast": [
    {
      q: "Formsprutning eller skärande bearbetning av plast — vad passar?",
      a: "Bearbetning av plastblock (fräsning, svarvning) passar prototyper, små serier och stora detaljer utan verktygskostnad. Formsprutning vinner vid höga volymer när verktygsinvesteringen kan fördelas. Samma detalj kan alltså ha helt olika bästa metod beroende på antal.",
    },
    {
      q: "Vilka tekniska plaster är vanligast?",
      a: "PA (nylon) och POM (acetal) för slitdelar och mekanik, PC för slagtålighet och transparens, PP och PE för kemisk beständighet, samt högpresterande PEEK och PTFE där temperatur och kemikalier ställer extrema krav. Materialvalet styr både process och leverantörsval.",
    },
    {
      q: "Vilken plast tål höga temperaturer och kemikalier?",
      a: "PEEK klarar kontinuerlig drift kring 250 °C med god mekanisk hållfasthet, och PTFE (teflon) är närmast kemiskt inert och tål höga temperaturer men är mjukare. Båda är dyrare och kräver leverantörer med specifik erfarenhet — ange materialet i förfrågan så matchas ni rätt.",
    },
  ],

  "kompositmaterial": [
    {
      q: "Vad är skillnaden mellan kolfiber och glasfiber?",
      a: "Kolfiber ger högre styvhet och styrka per vikt men är dyrare, medan glasfiber är billigare och tåligare mot slag och används där kostnad väger tyngre än vikt. Aramid (Kevlar) förekommer där slagtålighet är avgörande. Valet styrs av lastfall, viktkrav och budget.",
    },
    {
      q: "Vilka tillverkningsprocesser finns för kompositer?",
      a: "Från manuell laminering (låg volym, enkla verktyg) till vakuuminfusion, prepreg med autoklavhärdning (högsta kvalitet, flyg) och RTM för serier. Processvalet påverkar fibervolym, ytkvalitet och pris — vi matchar på både material och rätt process.",
    },
    {
      q: "Var används kompositer mest?",
      a: "Vindkraft (rotorblad), flyg och försvar, marin industri samt lättviktskonstruktioner i fordon. Efterfrågan växer snabbt, särskilt driven av vindkraftsutbyggnaden — vilket gör kapabla kompositleverantörer till en eftertraktad resurs.",
    },
  ],

  // ─── Regioner ───────────────────────────────────────────────

  "legotillverkare-goteborg": [
    {
      q: "Varför finns så många legotillverkare i Göteborgsregionen?",
      a: "Västra Götaland är Sveriges tätaste industriregion, formad av fordonsindustrin (Volvo Cars, Volvo Group), marin industri och storföretag som SKF. Det har byggt upp ett djupt nät av precisionsverkstäder och underleverantörer runt Göteborg, Trollhättan och Borås.",
    },
    {
      q: "Kan jag hitta verkstäder vana vid fordonskrav?",
      a: "Ja — regionen har en av Europas tätaste ansamlingar av fordonsleverantörer, många vana vid Volvo- och SKF-krav på dokumentation och leveransprecision. Vi matchar mot sådana verkstäder utan att ni behöver gå via OEM:ernas inköpsavdelningar.",
    },
    {
      q: "Hur begränsar jag matchningen till Göteborgsområdet?",
      a: "I förfrågan kan ni ange Västra Götalands län som geografiskt krav, så matchas ni enbart mot leverantörer i regionen. Utan begränsning matchar vi i hela landet — ibland ger det bättre pris eller kortare ledtid än en rent lokal sökning.",
    },
  ],

  "legotillverkare-stockholm": [
    {
      q: "Vilka branscher präglar tillverkningen i Stockholm–Mälardalen?",
      a: "Regionen koncentrerar försvarsindustri (Saab), medicinteknik och energiteknik med ABB och Hitachi Energy i Västerås. Det har skapat ett nät av precisionsleverantörer vana vid höga krav på kvalitet och spårbarhet.",
    },
    {
      q: "Finns det certifierade leverantörer för försvar och medtech i regionen?",
      a: "Ja — Mälardalen har en förhållandevis hög koncentration av AS9100- och ISO 13485-certifierade verkstäder tack vare närheten till försvars- och medicinteknikkunder. Ange certifieringskravet i förfrågan så filtreras matchningen därefter.",
    },
    {
      q: "Vilket område täcker ni i Mälardalen?",
      a: "Stockholm, Uppsala, Västerås, Eskilstuna och Södertälje med omnejd. Vårt geografiska filter arbetar på länsnivå, så ni kan rikta förfrågan mot ett eller flera län.",
    },
  ],

  "legotillverkare-skane": [
    {
      q: "Vad kännetecknar Skånes tillverkningsindustri?",
      a: "Skåne är diversifierat snarare än dominerat av en enskild industri — starka kluster finns inom livsmedelsteknik, medicinteknik, förpackning och precisionstillverkning, med företag som Alfa Laval i Lund som draglok. Bredden gör att rätt specialisering kräver mer än en enkel sökning.",
    },
    {
      q: "Vilken fördel ger Skånes läge?",
      a: "Närheten till kontinenten via Öresundsbron gör Skåne till ett naturligt nav för leverantörer med europeiska kunder, ofta vana vid internationella kvalitetskrav och korta transporter söderut.",
    },
    {
      q: "Täcker ni hela Skåne?",
      a: "Ja — Malmö, Lund, Helsingborg, Kristianstad och Landskrona med omnejd. Ange Skåne län som geografiskt krav i förfrågan, eller låt oss matcha i hela landet och jämför.",
    },
  ],

  "legotillverkare-blekinge": [
    {
      q: "Vad präglar leverantörsnätverket i Blekinge?",
      a: "Blekinge är litet men industriellt tungt, format av Saab Kockums ubåtsproduktion i Karlskrona och marinens närvaro. Det har gett ett leverantörsnät med ovanligt hög kompetens inom precisionstillverkning, specialmaterial och certifierade processer.",
    },
    {
      q: "Varför är dessa leverantörer svåra att hitta?",
      a: "Många arbetar under sekretess mot försvarskunder och syns sällan i öppna kataloger — nätverket är relationsburet snarare än publikt. Det är precis den typ av dolt utbud vår matchning är byggd för att nå.",
    },
    {
      q: "Vilka orter täcker ni i Blekinge?",
      a: "Karlskrona, Karlshamn och Ronneby med omgivande industriområden. Ange Blekinge län som geografiskt krav, så matchas ni mot leverantörer i regionen.",
    },
  ],

  "legotillverkare-halland": [
    {
      q: "Varför är Halland intressant för legotillverkning?",
      a: "Halland har kompetenta verkstäder med ofta ledig kapacitet och konkurrenskraftiga kostnadsnivåer, men saknar ett digitalt synligt nätverk. Inköpare förbiser regionen trots att kompetensen mäter sig med storstadsregionernas.",
    },
    {
      q: "Vilken logistikfördel har Halland?",
      a: "Läget på västkusten mellan Göteborg och Malmö ger korta transporter både norrut, söderut och mot kontinenten — attraktivt för just-in-time-leveranser.",
    },
    {
      q: "Vilka orter täcker ni i Halland?",
      a: "Halmstad, Varberg, Falkenberg och Kungsbacka med omnejd. Ange Hallands län som geografiskt krav i förfrågan, eller matcha brett i hela landet.",
    },
  ],

  // ─── Branscher ──────────────────────────────────────────────

  "fordonsindustri": [
    {
      q: "Vad är IATF 16949?",
      a: "IATF 16949 är fordonsindustrins kvalitetsledningsstandard, byggd ovanpå ISO 9001 med branschspecifika tillägg: nollfelsfokus, processtyrning och krav genom hela leverantörskedjan. Den ersätter den tidigare ISO/TS 16949 och krävs ofta för direktleverans till fordons-OEM och Tier 1.",
    },
    {
      q: "Vad innebär PPAP och APQP?",
      a: "APQP (Advanced Product Quality Planning) är den strukturerade processen för att planera kvalitet inför produktionsstart, och PPAP (Production Part Approval Process) är dokumentationen som visar att leverantören kan tillverka detaljen enligt krav innan serie släpps. Erfarenhet av dessa väger ofta tyngre än timpriset i fordonskedjan.",
    },
    {
      q: "Behöver alla fordonsleverantörer IATF 16949?",
      a: "Nej — kravet beror på position i kedjan och kundens krav. Direktleverantörer till OEM och Tier 1 behöver oftast IATF 16949, medan leverantörer längre ned kan klara sig med ISO 9001 plus PPAP-erfarenhet. Ange kravet i förfrågan så matchas ni rätt.",
    },
  ],

  "medicinteknik": [
    {
      q: "Vad är ISO 13485?",
      a: "ISO 13485 är kvalitetsledningsstandarden för medicintekniska produkter. Den bygger på ISO 9001 men lägger till skärpta krav på riskhantering, spårbarhet, designkontroll och dokumentation anpassade för den regulatoriska miljön kring medicinteknik.",
    },
    {
      q: "Räcker ISO 9001 för medicintekniska komponenter?",
      a: "Sällan. För komponenter som ingår i en medicinteknisk produkt kräver de flesta tillverkare ISO 13485, eftersom spårbarhet och dokumentation måste uppfylla kraven i EU:s MDR. Ange ISO 13485 som krav i förfrågan så filtreras matchningen.",
    },
    {
      q: "Vad är MDR?",
      a: "MDR (Medical Device Regulation, EU 2017/745) är EU:s förordning för medicintekniska produkter, tillämpad sedan 2021. Den skärper krav på spårbarhet, klinisk dokumentation och leverantörsstyrning genom hela kedjan — vilket gör leverantörens processer lika viktiga som själva tillverkningen.",
    },
  ],

  "energi": [
    {
      q: "Vilka certifieringar krävs för komponenter till energisektorn?",
      a: "Det beror på komponenten: PED (tryckkärlsdirektivet 2014/68/EU) för trycksatta delar, EN 1090 för bärande stål- och aluminiumkonstruktioner och ISO 3834 för svetsning. Vi filtrerar på rätt certifiering i matchningsprocessen utifrån er tillämpning.",
    },
    {
      q: "Vad är EN 1090?",
      a: "EN 1090 reglerar utförande av bärande stål- och aluminiumkonstruktioner och är en förutsättning för CE-märkning av sådana. För många energi- och infrastrukturkomponenter är den ett grundkrav — sök därför leverantörer med rätt utförandeklass.",
    },
    {
      q: "Vad driver efterfrågan på tillverkning i energisektorn?",
      a: "Utbyggnaden av vindkraft, vätgasinfrastruktur, stamnät och ny kärnkraft skapar komponentvolymer som överstiger vad befintliga leverantörsrelationer klarar. Inköpsteam behöver snabbt hitta ny, kvalificerad kapacitet — vilket är precis vad matchningen ger.",
    },
  ],
};
