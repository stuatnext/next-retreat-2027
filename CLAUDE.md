# NEXT.io Retreats 2027 — partner brochure

Single-page React (Vite + Tailwind v4) app covering **both** 2027 retreats:

| | Retreat Europe | Retreat LatAm |
|---|---|---|
| Dates | 11–13 October 2027 | 15–17 November 2027 |
| Venue | Cap St Georges Hotel & Resort, Cyprus | Secrets Maroma Beach Riviera Cancun, Mexico |

Both share one product set, so the page has a **destination switch** rather than
two pages. Everything content-bearing lives in `src/App.jsx`.

## Workflow

- Develop on branch `claude/next-retreat-2027-brochures-py826y`.
- Run `npm run build` to verify changes compile.
- Commit with a clear message and push the branch.
- Open a fresh PR into `main` only when asked.

## Deploying to gh-pages

```
npm run deploy   # = vite build && npx gh-pages -d dist
```

Confirm it prints `Published` before reporting done. Publishes to
`https://stuatnext.github.io/next-retreat-2027/`.

## Structure of `src/App.jsx`

- `DESTINATIONS` — per-retreat data: dates, venue, audience focus, schedule,
  target delegate mix, feedback scores, attendee logos, activity naming and
  photography. Adding a third retreat means adding a third key here.
- `PACKAGES` — Headline €85k (1, 4 passes), General €35k (10, 2 passes),
  Individual Ticket €15k (21, 1 pass). Shared across both retreats.
- `ADDONS` — Yacht/Golf €20k (1), Tasting & Adventure €15k (2), Sport &
  Relaxation by the Pool €10k (2). Priced identically at both retreats; only
  the local flavour text and photography differ (`DESTINATIONS[x].activities`).
- `ADDON_CONDITION` — add-ons are sold only alongside a Headline or General
  Partnership. Enforced in the calculator (`locked` prop on `Leisure`).
- `SENIORITY` / `COMPOSITION` / `DELEGATE_BUILD` / `SELECTION` / `POSITIONING`
  — shared audience data and messaging.
- `exportProposal` / `exportRateCard` — dependency-free PDF export: builds an
  HTML doc in a blob, opens it and calls `window.print()`. Same pattern as the
  Summit repos.

## Notes

- **Theme switching** is done with CSS custom properties: `.theme-europe` /
  `.theme-latam` in `src/index.css` set `--accent`, `--ground` etc., and the
  root `div` in `App` swaps the class. Never hard-code an accent colour in a
  component — read the variable, or the destination switch stops working.
- **Fonts are self-hosted** in `src/fonts/` (Cormorant Garamond + Jost, both
  variable, latin + latin-ext). No Google Fonts request at runtime — this gets
  opened on conference wifi. Vite hashes and rewrites the URLs, so keep the
  `@font-face` `url()` paths relative.
- Cormorant defaults to **old-style figures**, which renders `01` as `OI` and
  makes prices look like lowercase text. The `.num` class and `.font-display`
  force lining figures — put `num` on anything numeric.
- **Attendee logos** live in `public/logos/attendees/{cyprus,latam}/`, extracted
  from the official 2026 partner brochures and trimmed to their content box.
  The logo wall normalises them to white silhouettes with
  `[filter:brightness(0)_invert(1)] mix-blend-screen`, so a logo with a baked-in
  white background will render as a solid white block — knock the white out to
  transparent before adding one.
- **Photography** in `public/images/` is real event and resort photography from
  the 2026 brochures. Several sources are small (720–800px wide); they are used
  in cards rather than full-bleed heroes for that reason. The two heroes
  (`cyprus-networking-dinner.jpg`, `cancun-yacht.jpg`) are the largest sources.
- Job titles in the "seniority" section are aggregated from the confirmed 2026
  delegate lists, **titles only** — never paired back to a company or a name.
- Provenance for every figure, and the open questions, are in `DATA_SOURCES.md`.
  Read it before changing a number.
