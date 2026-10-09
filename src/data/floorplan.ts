import type { L } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PackageId } from "./packages";

// PLACEHOLDER: all companies below are fictional. Replace with the real
// exhibitors once contracts are signed. A booth without `company` is shown
// as available on the map.

export type Offer = keyof Dictionary["offers"];
export type Industry = keyof Dictionary["industries"];

export type Company = {
  name: string;
  industry: Industry;
  offers: Offer[];
  programs: ("D" | "C")[];
  description: L;
  locations: string;
  employees: string;
  website: string;
  color: string;
};

export type Booth = {
  id: string;
  tier: PackageId;
  x: number;
  y: number;
  w: number;
  h: number;
  company?: Company;
};

export type Zone = {
  id: keyof Dictionary["map"]["zones"];
  x: number;
  y: number;
  w: number;
  h: number;
  /** Label position */
  lx: number;
  ly: number;
  kind?: "room" | "walk";
};

export const viewBox = { w: 1000, h: 620 };

export const zones: Zone[] = [
  { id: "foyer", x: 40, y: 60, w: 480, h: 500, lx: 56, ly: 50, kind: "walk" },
  { id: "corridor", x: 520, y: 220, w: 440, h: 160, lx: 536, ly: 210, kind: "walk" },
  { id: "lounge", x: 560, y: 60, w: 400, h: 130, lx: 760, ly: 132, kind: "room" },
  { id: "hall", x: 560, y: 410, w: 400, h: 150, lx: 760, ly: 492, kind: "room" },
];

export const entrance = { x: 230, y: 560, w: 100 };

const c = (company: Company) => company;

const companies = {
  nordlys: c({
    name: "Nordlys Systems",
    industry: "software",
    offers: ["thesis", "summer", "fulltime", "trainee"],
    programs: ["D", "C"],
    description: {
      sv: "Bygger molnplattformar som driver betalningar och logistik i hela Norden. Huvudpartner för DELTA.",
      en: "Builds cloud platforms powering payments and logistics across the Nordics. Main partner of DELTA.",
    },
    locations: "Lund, Malmö, Stockholm",
    employees: "1 200",
    website: "https://example.com",
    color: "#f280a1",
  }),
  kvantik: c({
    name: "Kvantik",
    industry: "ai",
    offers: ["thesis", "fulltime"],
    programs: ["D", "C"],
    description: {
      sv: "Tillämpad maskininlärning för industrin — från datapipelines till modeller i produktion.",
      en: "Applied machine learning for industry — from data pipelines to models in production.",
    },
    locations: "Lund",
    employees: "85",
    website: "https://example.com",
    color: "#8b7cf6",
  }),
  ohmic: c({
    name: "Ohmic Labs",
    industry: "embedded",
    offers: ["thesis", "summer", "internship"],
    programs: ["D"],
    description: {
      sv: "Firmware och hårdvarunära utveckling för uppkopplade sensorer.",
      en: "Firmware and low-level development for connected sensors.",
    },
    locations: "Lund, Göteborg",
    employees: "240",
    website: "https://example.com",
    color: "#f5a524",
  }),
  vaktpost: c({
    name: "Vaktpost Security",
    industry: "security",
    offers: ["thesis", "fulltime", "trainee"],
    programs: ["D", "C"],
    description: {
      sv: "Penetrationstester, incidenthantering och säker mjukvaruutveckling.",
      en: "Penetration testing, incident response and secure software development.",
    },
    locations: "Malmö, Stockholm",
    employees: "160",
    website: "https://example.com",
    color: "#2dd4bf",
  }),
  radix: c({
    name: "Radix Consulting",
    industry: "consulting",
    offers: ["fulltime", "trainee", "parttime"],
    programs: ["D", "C"],
    description: {
      sv: "IT-konsulter med uppdrag inom allt från fintech till fordonsindustri.",
      en: "IT consultants working on everything from fintech to automotive.",
    },
    locations: "Lund, Malmö, Helsingborg",
    employees: "650",
    website: "https://example.com",
    color: "#60a5fa",
  }),
  bitvik: c({
    name: "Bitvik Games",
    industry: "gaming",
    offers: ["summer", "internship", "fulltime"],
    programs: ["D"],
    description: {
      sv: "Spelstudio som bygger egna motorer och onlinetjänster för miljontals spelare.",
      en: "Game studio building its own engines and online services for millions of players.",
    },
    locations: "Malmö",
    employees: "310",
    website: "https://example.com",
    color: "#f472b6",
  }),
  signalfors: c({
    name: "Signalfors",
    industry: "telecom",
    offers: ["thesis", "summer", "fulltime"],
    programs: ["C", "D"],
    description: {
      sv: "Radionätverk och 5G/6G-forskning med team över hela världen.",
      en: "Radio networks and 5G/6G research with teams around the world.",
    },
    locations: "Lund, Kista",
    employees: "4 000",
    website: "https://example.com",
    color: "#38bdf8",
  }),
  saldo: c({
    name: "Saldo",
    industry: "fintech",
    offers: ["summer", "fulltime"],
    programs: ["D", "C"],
    description: {
      sv: "Bankapp för småföretag med fokus på enkelhet och säkerhet.",
      en: "Banking app for small businesses focused on simplicity and security.",
    },
    locations: "Stockholm, Malmö",
    employees: "120",
    website: "https://example.com",
    color: "#34d399",
  }),
  pulsmed: c({
    name: "Puls Medical",
    industry: "medtech",
    offers: ["thesis", "internship"],
    programs: ["D", "C"],
    description: {
      sv: "Mjukvara för medicinteknisk bildanalys och patientövervakning.",
      en: "Software for medical image analysis and patient monitoring.",
    },
    locations: "Lund",
    employees: "90",
    website: "https://example.com",
    color: "#fb7185",
  }),
  axel: c({
    name: "Axel Mobility",
    industry: "automotive",
    offers: ["thesis", "summer", "trainee"],
    programs: ["D"],
    description: {
      sv: "Autonoma system och fordonsmjukvara för nästa generations transporter.",
      en: "Autonomous systems and vehicle software for the next generation of transport.",
    },
    locations: "Göteborg, Lund",
    employees: "2 300",
    website: "https://example.com",
    color: "#a3e635",
  }),
  molnkod: c({
    name: "Molnkod",
    industry: "software",
    offers: ["parttime", "summer"],
    programs: ["D", "C"],
    description: {
      sv: "Litet produktbolag som bygger utvecklarverktyg. Söker extrajobbare.",
      en: "Small product company building developer tools. Hiring part-timers.",
    },
    locations: "Lund",
    employees: "18",
    website: "https://example.com",
    color: "#c084fc",
  }),
  fjord: c({
    name: "Fjord Analytics",
    industry: "ai",
    offers: ["thesis", "summer"],
    programs: ["C", "D"],
    description: {
      sv: "Dataplattform för detaljhandeln med realtidsprognoser.",
      en: "Data platform for retail with real-time forecasting.",
    },
    locations: "Malmö",
    employees: "45",
    website: "https://example.com",
    color: "#fbbf24",
  }),
  brygga: c({
    name: "Brygga Konsult",
    industry: "consulting",
    offers: ["fulltime", "trainee"],
    programs: ["D", "C"],
    description: {
      sv: "Konsultbolag med traineeprogram för nyexaminerade ingenjörer.",
      en: "Consultancy with a trainee programme for newly graduated engineers.",
    },
    locations: "Lund, Malmö",
    employees: "210",
    website: "https://example.com",
    color: "#22d3ee",
  }),
  krets: c({
    name: "Krets Electronics",
    industry: "embedded",
    offers: ["thesis", "internship", "fulltime"],
    programs: ["D"],
    description: {
      sv: "FPGA- och chipdesign för industriell automation.",
      en: "FPGA and chip design for industrial automation.",
    },
    locations: "Lund",
    employees: "130",
    website: "https://example.com",
    color: "#f97316",
  }),
  lagom: c({
    name: "Lagom Pay",
    industry: "fintech",
    offers: ["summer", "internship"],
    programs: ["D", "C"],
    description: {
      sv: "Betalningar för e-handel, byggt med Kotlin och Rust.",
      en: "E-commerce payments, built with Kotlin and Rust.",
    },
    locations: "Stockholm",
    employees: "75",
    website: "https://example.com",
    color: "#4ade80",
  }),
  noden: c({
    name: "Noden",
    industry: "telecom",
    offers: ["thesis", "fulltime"],
    programs: ["C"],
    description: {
      sv: "Nätverksoperatör som bygger fiberinfrastruktur i södra Sverige.",
      en: "Network operator building fibre infrastructure in southern Sweden.",
    },
    locations: "Malmö",
    employees: "300",
    website: "https://example.com",
    color: "#93c5fd",
  }),
  skansen: c({
    name: "Skansen Cyber",
    industry: "security",
    offers: ["internship", "parttime"],
    programs: ["D", "C"],
    description: {
      sv: "Säkerhetsövervakning dygnet runt för kommuner och regioner.",
      en: "Round-the-clock security monitoring for municipalities and regions.",
    },
    locations: "Lund",
    employees: "55",
    website: "https://example.com",
    color: "#5eead4",
  }),
  pixelverk: c({
    name: "Pixelverk",
    industry: "gaming",
    offers: ["summer", "thesis"],
    programs: ["D"],
    description: {
      sv: "Indiestudio som specialiserar sig på grafik och procedurgenerering.",
      en: "Indie studio specialising in graphics and procedural generation.",
    },
    locations: "Malmö",
    employees: "25",
    website: "https://example.com",
    color: "#e879f9",
  }),
};

// Corridor booths: two rows of six along the walls.
const corridorX = [540, 610, 680, 750, 820, 890];
const corridorTop: (Company | undefined)[] = [
  companies.molnkod,
  companies.fjord,
  undefined,
  companies.lagom,
  companies.noden,
  companies.skansen,
];
const corridorBottom: (Company | undefined)[] = [
  companies.pixelverk,
  undefined,
  companies.krets,
  undefined,
  companies.brygga,
  companies.pulsmed,
];

export const booths: Booth[] = [
  // Main partner — island in the middle of the foyer, facing the entrance
  { id: "H1", tier: "main", x: 205, y: 300, w: 150, h: 110, company: companies.nordlys },

  // Gold — along the left wall of the foyer
  { id: "G1", tier: "gold", x: 60, y: 80, w: 96, h: 76, company: companies.signalfors },
  { id: "G2", tier: "gold", x: 60, y: 176, w: 96, h: 76, company: companies.radix },
  { id: "G3", tier: "gold", x: 60, y: 272, w: 96, h: 76, company: companies.axel },
  { id: "G4", tier: "gold", x: 60, y: 368, w: 96, h: 76 },

  // Silver — top and right side of the foyer
  { id: "S1", tier: "silver", x: 190, y: 80, w: 88, h: 58, company: companies.kvantik },
  { id: "S2", tier: "silver", x: 298, y: 80, w: 88, h: 58, company: companies.vaktpost },
  { id: "S3", tier: "silver", x: 406, y: 80, w: 88, h: 58, company: companies.bitvik },
  { id: "S4", tier: "silver", x: 420, y: 400, w: 80, h: 64, company: companies.saldo },
  { id: "S5", tier: "silver", x: 420, y: 476, w: 80, h: 64, company: companies.ohmic },

  ...corridorX.map((x, i) => ({
    id: `B${i + 1}`,
    tier: "bronze" as const,
    x,
    y: 232,
    w: 60,
    h: 44,
    company: corridorTop[i],
  })),
  ...corridorX.map((x, i) => ({
    id: `B${i + 7}`,
    tier: "bronze" as const,
    x,
    y: 324,
    w: 60,
    h: 44,
    company: corridorBottom[i],
  })),
];
