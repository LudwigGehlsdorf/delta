import type { Locale } from "./config";

const sv = {
  meta: {
    title: "> DELTA — Arbetsmässan för D-sektionen inom TLTH",
    description:
      "DELTA är D-sektionens arbetsmässa i E-huset, LTH. Träffa framtidens ingenjörer inom datateknik och informations- och kommunikationsteknik.",
  },
  nav: {
    about: "Om",
    engage: "Engagera er",
    packages: "Paket",
    compare: "Jämför",
    map: "Karta",
    faq: "FAQ",
    cta: "Boka monter",
    menu: "Meny",
    close: "Stäng",
  },
  hero: {
    kicker: "D-sektionen inom TLTH presenterar",
    lines: [
      "Arbetsmässan för datateknik & InfoCom.",
      "Där studenter möter sin första arbetsgivare.",
      "En dag. Ett hus. Hundratals ingenjörer.",
    ],
    lead: "En arbetsmässa byggd av studenter för studenter — och för er som vill nå dem. Möt Lunds teknologer inom mjukvara, hårdvara, AI och allt däremellan.",
    primary: "Se paketen",
    secondary: "Utforska kartan",
    countdownLabel: "Tid kvar till mässan",
    units: { d: "dagar", h: "tim", m: "min", s: "sek" },
    scroll: "Scrolla",
  },
  stats: {
    students: "studenter på sektionen",
    companies: "montrar i E-huset",
    programs: "utbildningsprogram",
    hours: "timmar mässa",
  },
  about: {
    tag: "01 · om_delta",
    title: "Mässan där Δ står för förändring",
    body: [
      "Δ — skillnaden mellan var man är och var man vill vara. DELTA är D-sektionens egen arbetsmässa, skapad för att ge studenter på Datateknik och Informations- och kommunikationsteknik en direktkanal till branschen.",
      "Vi håller det fokuserat: en mässa, ett hus, rätt målgrupp. Det betyder fler meningsfulla samtal per timme för er som företag.",
    ],
    points: [
      {
        title: "Rätt målgrupp",
        text: "Bara D- och C-studenter — mjukvara, inbyggda system, nätverk, AI och säkerhet.",
      },
      {
        title: "Mitt i vardagen",
        text: "Mässan hålls i E-huset, där studenterna redan pluggar, äter lunch och hänger.",
      },
      {
        title: "Studentdrivet",
        text: "Arrangeras ideellt av D-sektionen — alla intäkter går tillbaka till studenterna.",
      },
    ],
  },
  engage: {
    tag: "02 · engagera_er",
    title: "Så blir ni en del av DELTA",
    lead: "Från första kontakt till mässdag — vi guidar er genom hela processen.",
    steps: [
      {
        title: "Anmäl intresse",
        text: "Skicka en intresseanmälan via formuläret längre ned eller mejla oss. Vi återkommer inom två arbetsdagar.",
      },
      {
        title: "Välj paket",
        text: "Välj det paket som passar er ambition och lägg till eventuella tillval som lunchföreläsning eller bankett.",
      },
      {
        title: "Avtal & placering",
        text: "Ni får ett avtal och en faktura. Montrar tilldelas efter paketnivå och anmälningsordning.",
      },
      {
        title: "Förberedelser",
        text: "Vi skickar ett företagskit med logistik, tider, monterinfo och tips för att få ut mest av dagen.",
      },
      {
        title: "Mässdag",
        text: "Vi tar emot er på morgonen, hjälper till med uppbyggnad och ser till att allt rullar under dagen.",
      },
    ],
    timelineTitle: "Viktiga datum",
    timeline: {
      opens: "Anmälan öppnar",
      closes: "Sista anmälningsdag",
      fair: "Mässdag",
    },
  },
  packages: {
    tag: "03 · paket",
    title: "Paket för varje ambitionsnivå",
    lead: "Alla priser exkl. moms. Kontakta oss om ni vill sätta ihop något skräddarsytt.",
    popular: "Populärast",
    exclusive: "Endast 1 plats",
    select: "Välj",
    from: "kr",
    addonsTitle: "Tillval",
    addonsLead: "Kan läggas till på valfritt paket.",
  },
  compare: {
    tag: "04 · jämför",
    title: "Jämför paketen",
    onlyDiff: "Visa bara skillnader",
    feature: "Innehåll",
    included: "Ingår",
    notIncluded: "Ingår ej",
  },
  map: {
    tag: "05 · karta",
    title: "Uppställning i E-huset",
    lead: "Klicka på en monter för att se vilket företag som står där. Lediga montrar kan fortfarande bokas.",
    search: "Sök företag…",
    filterAll: "Alla",
    available: "Ledig",
    availableTitle: "Ledig monter",
    availableText:
      "Den här platsen är fortfarande ledig. Boka den genom att höra av er till oss.",
    bookThis: "Boka denna plats",
    booth: "Monter",
    package: "Paket",
    industry: "Bransch",
    offers: "Erbjuder",
    programs: "Söker studenter från",
    locations: "Kontor",
    employees: "Anställda",
    visit: "Besök webbplats",
    selectPrompt: "Välj en monter på kartan",
    selectHint:
      "Håll muspekaren över en monter för en snabbtitt, klicka för detaljer. Använd filtren för att hitta det ni letar efter.",
    legend: "Förklaring",
    zones: {
      foyer: "Foajén",
      corridor: "Korridoren",
      lounge: "Lounge & kaffe",
      hall: "Hörsal E:A · Lunchföreläsningar",
      entrance: "Entré",
    },
    results: "träffar",
  },
  offers: {
    thesis: "Exjobb",
    summer: "Sommarjobb",
    internship: "Praktik",
    trainee: "Trainee",
    fulltime: "Heltid",
    parttime: "Extrajobb",
  },
  industries: {
    software: "Mjukvara",
    consulting: "Konsult",
    embedded: "Inbyggda system",
    fintech: "Fintech",
    gaming: "Spel",
    telecom: "Telekom",
    security: "Säkerhet",
    ai: "AI & data",
    medtech: "Medtech",
    automotive: "Fordon",
  },
  faq: {
    tag: "06 · faq",
    title: "Vanliga frågor",
    items: [
      {
        q: "Vilka studenter besöker DELTA?",
        a: "Främst studenter på Datateknik (D) och Informations- och kommunikationsteknik (C) vid LTH — från första året till exjobbare.",
      },
      {
        q: "Vad ingår i en monter?",
        a: "Bord, stolar, el och wifi ingår alltid. Storleken beror på paket. Egna rollups och skärmar är välkomna.",
      },
      {
        q: "Hur fördelas montrarna?",
        a: "Huvudpartner placeras vid entrén. Därefter fördelas platser efter paketnivå och i den ordning anmälningarna kommer in.",
      },
      {
        q: "Kan vi hålla en lunchföreläsning?",
        a: "Ja! Lunchföreläsningar i hörsal E:A ingår i Guld och Huvudpartner, och kan köpas som tillval till övriga paket.",
      },
      {
        q: "Finns det parkering och lastzon?",
        a: "Ja, det finns lastzon vid E-huset för av- och pålastning på morgonen. Detaljer skickas ut i företagskitet.",
      },
    ],
  },
  contact: {
    tag: "07 · kontakt",
    title: "Redo att boka?",
    lead: "Fyll i formuläret så öppnas ett färdigt mejl till oss. Eller mejla direkt — vi svarar snabbt.",
    company: "Företag",
    name: "Kontaktperson",
    email: "E-post",
    package: "Intresserade av",
    message: "Meddelande",
    messagePlaceholder: "Berätta gärna lite om vad ni söker…",
    undecided: "Vet inte än",
    submit: "Skicka intresseanmälan",
    sent: "Ditt mejlprogram öppnades — tack!",
    subject: "Intresseanmälan DELTA",
  },
  footer: {
    org: "Arrangeras av D-sektionen inom TLTH",
    rights: "Alla rättigheter förbehållna.",
    links: "D-sektionens webbplats",
  },
};

export type Dictionary = typeof sv;

const en: Dictionary = {
  meta: {
    title: "> DELTA — The career fair of the D-guild at TLTH",
    description:
      "DELTA is the D-guild's career fair at E-huset, LTH. Meet the future engineers in Computer Science and Information & Communication Engineering.",
  },
  nav: {
    about: "About",
    engage: "Get involved",
    packages: "Packages",
    compare: "Compare",
    map: "Map",
    faq: "FAQ",
    cta: "Book a booth",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    kicker: "The D-guild at TLTH presents",
    lines: [
      "The career fair for CS & InfoCom.",
      "Where students meet their first employer.",
      "One day. One building. Hundreds of engineers.",
    ],
    lead: "A career fair built by students for students — and for you who want to reach them. Meet Lund's engineering students in software, hardware, AI and everything in between.",
    primary: "View packages",
    secondary: "Explore the map",
    countdownLabel: "Time until the fair",
    units: { d: "days", h: "hrs", m: "min", s: "sec" },
    scroll: "Scroll",
  },
  stats: {
    students: "students in the guild",
    companies: "booths in E-huset",
    programs: "degree programmes",
    hours: "hours of fair",
  },
  about: {
    tag: "01 · about_delta",
    title: "The fair where Δ stands for change",
    body: [
      "Δ — the difference between where you are and where you want to be. DELTA is the D-guild's own career fair, created to give students in Computer Science and Information & Communication Engineering a direct line to the industry.",
      "We keep it focused: one fair, one building, the right audience. That means more meaningful conversations per hour for you as a company.",
    ],
    points: [
      {
        title: "The right audience",
        text: "Only D and C students — software, embedded systems, networks, AI and security.",
      },
      {
        title: "Part of everyday life",
        text: "The fair is held in E-huset, where the students already study, eat lunch and hang out.",
      },
      {
        title: "Student-run",
        text: "Organised by volunteers in the D-guild — all revenue goes back to the students.",
      },
    ],
  },
  engage: {
    tag: "02 · get_involved",
    title: "How to become part of DELTA",
    lead: "From first contact to fair day — we guide you through the entire process.",
    steps: [
      {
        title: "Register interest",
        text: "Send a registration of interest via the form below or email us. We get back to you within two business days.",
      },
      {
        title: "Choose a package",
        text: "Pick the package that matches your ambition and add extras such as a lunch lecture or banquet seats.",
      },
      {
        title: "Contract & placement",
        text: "You receive a contract and an invoice. Booths are allocated by package tier and registration order.",
      },
      {
        title: "Preparations",
        text: "We send a company kit with logistics, schedules, booth info and tips to get the most out of the day.",
      },
      {
        title: "Fair day",
        text: "We welcome you in the morning, help with setup and make sure everything runs smoothly all day.",
      },
    ],
    timelineTitle: "Key dates",
    timeline: {
      opens: "Registration opens",
      closes: "Registration deadline",
      fair: "Fair day",
    },
  },
  packages: {
    tag: "03 · packages",
    title: "Packages for every level of ambition",
    lead: "All prices exclude VAT. Contact us if you'd like something tailor-made.",
    popular: "Most popular",
    exclusive: "Only 1 spot",
    select: "Choose",
    from: "SEK",
    addonsTitle: "Add-ons",
    addonsLead: "Can be added to any package.",
  },
  compare: {
    tag: "04 · compare",
    title: "Compare the packages",
    onlyDiff: "Show differences only",
    feature: "Includes",
    included: "Included",
    notIncluded: "Not included",
  },
  map: {
    tag: "05 · map",
    title: "Floor plan of E-huset",
    lead: "Click a booth to see which company is there. Available booths can still be booked.",
    search: "Search companies…",
    filterAll: "All",
    available: "Available",
    availableTitle: "Available booth",
    availableText:
      "This spot is still available. Book it by getting in touch with us.",
    bookThis: "Book this spot",
    booth: "Booth",
    package: "Package",
    industry: "Industry",
    offers: "Offers",
    programs: "Looking for students from",
    locations: "Offices",
    employees: "Employees",
    visit: "Visit website",
    selectPrompt: "Select a booth on the map",
    selectHint:
      "Hover a booth for a quick look, click for details. Use the filters to find what you're looking for.",
    legend: "Legend",
    zones: {
      foyer: "The Foyer",
      corridor: "The Corridor",
      lounge: "Lounge & coffee",
      hall: "Lecture hall E:A · Lunch lectures",
      entrance: "Entrance",
    },
    results: "matches",
  },
  offers: {
    thesis: "Thesis",
    summer: "Summer job",
    internship: "Internship",
    trainee: "Trainee",
    fulltime: "Full-time",
    parttime: "Part-time",
  },
  industries: {
    software: "Software",
    consulting: "Consulting",
    embedded: "Embedded",
    fintech: "Fintech",
    gaming: "Gaming",
    telecom: "Telecom",
    security: "Security",
    ai: "AI & data",
    medtech: "Medtech",
    automotive: "Automotive",
  },
  faq: {
    tag: "06 · faq",
    title: "Frequently asked questions",
    items: [
      {
        q: "Which students visit DELTA?",
        a: "Mainly students in Computer Science and Engineering (D) and Information and Communication Engineering (C) at LTH — from first-years to thesis students.",
      },
      {
        q: "What's included in a booth?",
        a: "Table, chairs, power and wifi are always included. The size depends on the package. Your own roll-ups and screens are welcome.",
      },
      {
        q: "How are booths allocated?",
        a: "The main partner is placed by the entrance. Remaining spots are allocated by package tier and in order of registration.",
      },
      {
        q: "Can we host a lunch lecture?",
        a: "Yes! Lunch lectures in lecture hall E:A are included in Gold and Main Partner, and can be added to other packages.",
      },
      {
        q: "Is there parking and a loading zone?",
        a: "Yes, there is a loading zone by E-huset for unloading in the morning. Details are sent out in the company kit.",
      },
    ],
  },
  contact: {
    tag: "07 · contact",
    title: "Ready to book?",
    lead: "Fill in the form and a ready-made email to us will open. Or email us directly — we reply quickly.",
    company: "Company",
    name: "Contact person",
    email: "Email",
    package: "Interested in",
    message: "Message",
    messagePlaceholder: "Tell us a bit about what you're looking for…",
    undecided: "Not sure yet",
    submit: "Send registration",
    sent: "Your email client was opened — thank you!",
    subject: "Registration of interest DELTA",
  },
  footer: {
    org: "Organised by the D-guild at TLTH",
    rights: "All rights reserved.",
    links: "The D-guild's website",
  },
};

const dictionaries: Record<Locale, Dictionary> = { sv, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
