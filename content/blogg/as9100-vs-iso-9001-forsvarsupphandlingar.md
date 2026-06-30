---
title: "AS9100 vs ISO 9001 — vad kräver försvarsupphandlingar?"
slug: "as9100-vs-iso-9001-forsvarsupphandlingar"
description: "Vad är skillnaden mellan AS9100 och ISO 9001? Och vilka certifieringskrav ställer svenska försvarsupphandlingar på underleverantörer? En praktisk guide för inköpare och konstruktörer."
publishedAt: "2026-06-01"
tags: ["AS9100", "ISO 9001", "försvarsupphandling", "certifiering", "legotillverkning"]
---

# AS9100 vs ISO 9001 — vad kräver försvarsupphandlingar?

I kölvattnet av Sveriges NATO-inträde och den kraftigt ökade försvarsbudgeten växer behovet av inhemsk industriell kapacitet snabbt. Nya leverantörer kvalificeras, befintliga supply chains utökas — och certifieringsfrågan hamnar högt på inköpsagendans.

Den vanligaste frågan: *räcker ISO 9001, eller krävs AS9100?* Svaret beror på vad detaljen ska användas till och vem slutkunden är. Den här artikeln reder ut begreppen.

---

## Vad är ISO 9001?

ISO 9001 är den generella standarden för ledningssystem för kvalitet. Den ställer krav på att ett företag har definierade processer för kvalitetsstyrning: dokumentation, avvikelshantering, kundorientering, förbättringsarbete och internrevisioner.

ISO 9001 är branschoberoende och används av allt från tillverkande industri till konsultbolag. Det är en bred standard med bred täckning — men utan specifika krav för flyg-, rymd- och försvarsindustrin.

---

## Vad är AS9100?

AS9100 (nuvarande revision: AS9100D) är den aerospace- och försvarsspecifika utbyggnaden av ISO 9001. Den inkluderar **alla krav i ISO 9001** och lägger ovanpå en lång rad branschspecifika krav, bland annat:

**Konfigurationshantering**
Spårbarhet av produktkonfiguration och förändringshantering är obligatorisk. Varje revision av en ritning eller specifikation måste hanteras kontrollerat.

**Riskhantering**
Systematisk riskidentifiering och riskminskning i produktionsprocessen, inte bara på systemnivå.

**Kritiska säkerhetsdetaljer (Safety Critical Parts)**
Identifiering av detaljer där ett fel kan leda till katastrof. Dessa har skärpta krav på tillverkningskontroll, provning och dokumentation.

**First Article Inspection (FAI)**
Krav på detaljerad genomgång av den första producerade detaljen mot alla krav i specifikation och ritning, med dokumenterat protokoll.

**Produktionsprocesskontroll**
Definierade och godkända processer (s.k. special processes) för kritiska operationer som svetsning, värmebehandling och ytbehandling.

**Personalens kompetens**
Utbildning och certifiering för operatörer på kritiska processer måste dokumenteras.

---

## Kräver alla försvarsaffärer AS9100?

Nej — men det beror på var i leverantörskedjan ni befinner er och vilken typ av detalj det handlar om.

### Direktleverans till FMV eller prime contractors

Leverantörer som levererar direkt till Försvarets materielverk (FMV) eller till prime contractors som SAAB och BAE Systems Hägglunds har i praktiken alltid krav på AS9100-certifiering. Det är ett grundläggande kvalificeringskrav som sällan förhandlas bort.

### Underleverantör till tier 1 eller tier 2

Här är bilden mer nyanserad. En tier 1-leverantör (AS9100-certifierad) kan köpa in detaljer från en ISO 9001-certifierad verkstad, förutsatt att:
- Detaljen inte klassificeras som säkerhetskritisk
- Tier 1-leverantören genomför inkommande kontroll och bär ansvaret för slutkvaliteten
- Underleverantörens processer är definierade och godkända av tier 1

I praktiken väljer dock de flesta tier 1-leverantörer att i sin tur kräva AS9100 hos sina kritiska underleverantörer för att minimera sin revisionsrisk. Kravet rullar nedåt i kedjan.

### Civilt stöd och infrastruktur

Detaljer och komponenter som används i civilt försvarsrelaterat stöd — fordon, infrastruktur, casings, fästen — kräver ofta inte AS9100. ISO 9001 kan räcka. Det är avgörande att specificera exakt vad detaljen ska användas till och var i systemet den sitter.

---

## ISO 3834 — svetsstandardens roll

Vid svetsade konstruktioner tillkommer ytterligare ett certifieringskrav: **ISO 3834** (Kvalitetskrav för smältsvetsning av metalliska material).

ISO 3834 finns i tre nivåer:
- **ISO 3834-4**: Elementära kvalitetskrav (för enklare svetsarbeten)
- **ISO 3834-3**: Normala kvalitetskrav
- **ISO 3834-2**: Fullständiga kvalitetskrav (standard vid försvarsapplikationer)

Vid AS9100-krävande affärer är ISO 3834-2 för svetsade konstruktioner i praktiken ett kompletterande krav.

---

## Hur hittar man AS9100-certifierade verkstäder i Sverige?

AS9100-certifiering är ovanligare än ISO 9001 i det svenska SME-segmentet — det är ett mer krävande och kostsamt system att implementera och underhålla. Det innebär att certifierade verkstäder ofta är välbelagda och inte annonserar sin kapacitet brett.

Certifierade leverantörer kan sökas i **OASIS-databasen** (Online Aerospace Supplier Information System), som är det internationellt accepterade registret för AS9100-, AS9120- och AS9110-certifierade organisationer: [oasis.sae-international.org](https://oasis.sae-international.org)

Alternativt kan ni specificera AS9100-kravet direkt i en matchningsförfrågan. Komponentguiden filtrerar mot certifieringskrav i sin matchningsalgoritm och returnerar enbart verkstäder med verifierad AS9100-certifiering. [Starta en matchning med AS9100-krav →](/#intent-form)

---

## Snabbguide: Vilket certifikat krävs?

| Situation | Certifieringskrav |
|-----------|-------------------|
| Direktleverans till FMV | AS9100D obligatoriskt |
| Tier 1 underleverantör, säkerhetskritisk detalj | AS9100D obligatoriskt |
| Tier 1 underleverantör, icke-kritisk detalj | AS9100D rekommenderas starkt, ISO 9001 kan räcka |
| Tier 2+ underleverantör, civilt försvar | ISO 9001 kan räcka — kontrollera tier 1:s krav |
| Svetsade konstruktioner (alla nivåer) | ISO 3834-2 tillkommer |

---

## Sammanfattning

AS9100 är ISO 9001 plus ett betydande set av branschspecifika krav för flyg, rymd och försvar. För direktleverantörer till FMV och prime contractors är AS9100D ett grundkrav. Längre ned i leverantörskedjan beror kravet på detaljens säkerhetskritikalitet och tier 1-leverantörens egna krav.

Med den pågående försvarsupprustningen ökar pressen på hela supply chain att höja sin certifieringsnivå. Verkstäder som certifierar sig för AS9100 nu positionerar sig rätt för en stark och varaktig efterfråga.

**Behöver ni hitta AS9100-certifierade legotillverkare i Sverige?** Komponentguiden matchar er förfrågan mot verifierade leverantörer med rätt certifiering. [Starta kostnadsfri matchning →](/#intent-form)
