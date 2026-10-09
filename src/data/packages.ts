import type { L } from "@/i18n/config";

// PLACEHOLDER: package names, prices and contents.
// Edit here — the package cards, comparison table, map and contact
// form all read from this file.

export type PackageId = "bronze" | "silver" | "gold" | "main";

export type Package = {
  id: PackageId;
  name: L;
  price: number;
  tagline: L;
  highlights: L[];
  popular?: boolean;
  exclusive?: boolean;
};

export const packages: Package[] = [
  {
    id: "bronze",
    name: { sv: "Brons", en: "Bronze" },
    price: 15000,
    tagline: {
      sv: "Ett enkelt sätt att synas för D-studenterna.",
      en: "A simple way to get noticed by D students.",
    },
    highlights: [
      { sv: "Monter 2 m i korridoren", en: "2 m booth in the corridor" },
      { sv: "2 representanter", en: "2 representatives" },
      { sv: "Logga på hemsidan", en: "Logo on the website" },
      { sv: "Profil i mässkatalogen", en: "Profile in the fair catalogue" },
    ],
  },
  {
    id: "silver",
    name: { sv: "Silver", en: "Silver" },
    price: 25000,
    tagline: {
      sv: "Mer plats, mer synlighet och lunch för teamet.",
      en: "More space, more visibility and lunch for the team.",
    },
    highlights: [
      { sv: "Monter 3 m i foajén", en: "3 m booth in the foyer" },
      { sv: "3 representanter", en: "3 representatives" },
      { sv: "Inlägg i sektionens sociala medier", en: "Post on the guild's social media" },
      { sv: "Lunch för representanter", en: "Lunch for representatives" },
    ],
    popular: true,
  },
  {
    id: "gold",
    name: { sv: "Guld", en: "Gold" },
    price: 40000,
    tagline: {
      sv: "Prioriterad placering och en egen lunchföreläsning.",
      en: "Priority placement and your own lunch lecture.",
    },
    highlights: [
      { sv: "Monter 4 m, prioriterad placering", en: "4 m booth, priority placement" },
      { sv: "4 representanter", en: "4 representatives" },
      { sv: "Lunchföreläsning i E:A", en: "Lunch lecture in E:A" },
      { sv: "2 platser på banketten", en: "2 seats at the banquet" },
    ],
  },
  {
    id: "main",
    name: { sv: "Huvudpartner", en: "Main Partner" },
    price: 75000,
    tagline: {
      sv: "Maximal exponering — ni är DELTA:s ansikte utåt.",
      en: "Maximum exposure — you are the face of DELTA.",
    },
    highlights: [
      { sv: "Största montern vid entrén", en: "The largest booth by the entrance" },
      { sv: "6 representanter", en: "6 representatives" },
      { sv: "Logga på allt marknadsföringsmaterial", en: "Logo on all marketing material" },
      { sv: "Case-kväll med studenter", en: "Case evening with students" },
    ],
    exclusive: true,
  },
];

export type FeatureValue = boolean | L;

export type Feature = {
  label: L;
  values: Record<PackageId, FeatureValue>;
};

const t = (sv: string, en = sv): L => ({ sv, en });

export const features: Feature[] = [
  {
    label: t("Monterstorlek", "Booth size"),
    values: { bronze: t("2 m"), silver: t("3 m"), gold: t("4 m"), main: t("6 m") },
  },
  {
    label: t("Placering", "Placement"),
    values: {
      bronze: t("Korridoren", "Corridor"),
      silver: t("Foajén", "Foyer"),
      gold: t("Foajén, prioriterad", "Foyer, priority"),
      main: t("Vid entrén", "By the entrance"),
    },
  },
  {
    label: t("Representanter", "Representatives"),
    values: { bronze: t("2"), silver: t("3"), gold: t("4"), main: t("6") },
  },
  {
    label: t("Bord, el & wifi", "Table, power & wifi"),
    values: { bronze: true, silver: true, gold: true, main: true },
  },
  {
    label: t("Logga på hemsidan", "Logo on the website"),
    values: { bronze: true, silver: true, gold: true, main: true },
  },
  {
    label: t("Profil i mässkatalogen", "Profile in the catalogue"),
    values: {
      bronze: t("1/4 sida", "1/4 page"),
      silver: t("1/2 sida", "1/2 page"),
      gold: t("Helsida", "Full page"),
      main: t("Uppslag", "Spread"),
    },
  },
  {
    label: t("Lunch för representanter", "Lunch for representatives"),
    values: { bronze: false, silver: true, gold: true, main: true },
  },
  {
    label: t("Inlägg i sociala medier", "Social media post"),
    values: { bronze: false, silver: true, gold: true, main: true },
  },
  {
    label: t("Lunchföreläsning", "Lunch lecture"),
    values: { bronze: false, silver: false, gold: true, main: true },
  },
  {
    label: t("Platser på banketten", "Banquet seats"),
    values: { bronze: false, silver: false, gold: t("2"), main: t("4") },
  },
  {
    label: t("Annons i mejlutskick", "Ad in guild newsletter"),
    values: { bronze: false, silver: false, gold: true, main: true },
  },
  {
    label: t("Logga på tröjor & affischer", "Logo on shirts & posters"),
    values: { bronze: false, silver: false, gold: false, main: true },
  },
  {
    label: t("Case-kväll med studenter", "Case evening with students"),
    values: { bronze: false, silver: false, gold: false, main: true },
  },
  {
    label: t("Talartid vid invigningen", "Speaking slot at the opening"),
    values: { bronze: false, silver: false, gold: false, main: true },
  },
];

export const addons: { name: L; price: number }[] = [
  { name: t("Lunchföreläsning i E:A", "Lunch lecture in E:A"), price: 8000 },
  { name: t("Extra representant", "Extra representative"), price: 1500 },
  { name: t("Bankettbiljett", "Banquet ticket"), price: 1200 },
  { name: t("Helsidesannons i katalogen", "Full-page catalogue ad"), price: 4000 },
];

export const formatPrice = (value: number, locale: string) =>
  new Intl.NumberFormat(locale === "sv" ? "sv-SE" : "en-GB").format(value);
