# > DELTA

Hemsida för DELTA – D-sektionens arbetsmässa inom TLTH. Byggd med Next.js (App Router), TypeScript och Tailwind/CSS.

## Kom igång

```bash
npm install
npm run dev      # http://localhost:3000 → omdirigeras till /sv eller /en
npm run build && npm run start
```

## Var ändrar jag innehåll?

| Vad | Fil |
| --- | --- |
| Datum, lokal, e-post, siffror i statistikraden | `src/config/event.ts` |
| Alla texter (svenska + engelska) | `src/i18n/dictionaries.ts` |
| Paket, priser, jämförelsetabell, tillval | `src/data/packages.ts` |
| Företag och montrar på kartan | `src/data/floorplan.ts` |
| Färger, typsnitt, animationer | `src/app/globals.css` |

- **Allt markerat `PLACEHOLDER` måste uppdateras** – alla företag på kartan är påhittade.
- En monter utan `company` visas automatiskt som *Ledig* och kan bokas via kartan.
- Kontaktformuläret har ingen backend: det öppnar ett färdigt mejl till adressen i `event.ts`.

## Struktur

- `src/app/[lang]/` – sidan, renderas statiskt för `/sv` och `/en`
- `src/proxy.ts` – skickar `/` till rätt språk baserat på webbläsarens språk
- `src/components/` – en komponent per sektion (Hero, Packages, Comparison, FloorMap, …)
