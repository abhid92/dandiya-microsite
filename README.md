# Dandiya Festival Pune

A premium, mobile-first lead-generation microsite for Times Internet's three-day Dandiya Festival at Phoenix Marketcity, Viman Nagar, Pune.

## What is included

- Anchored single-page experience with a sticky header and mobile booking bar
- Cultural story, festival highlights, tentative artist lineup, dates, venue map, experience zones, pricing, FAQs and footer
- Accessible lead-capture form with client-side validation
- Placeholder `POST /api/leads` endpoint that validates submissions and returns a preview success response
- Responsive layout, reduced-motion support, semantic structure and social-sharing metadata
- Event imagery supplied in `Dandiya Fest V1.pptx`, plus a cohesive generated editorial image set for the hero, cultural story, festival highlights and date section
- A generated Open Graph card is included at `public/og.png`

No sponsorship, sponsor branding, sponsor deliverables or presenting/powered-by content is included.

## Stack

- Vinext / Next.js-compatible App Router
- React 19 and TypeScript
- Tailwind CSS v4 plus custom CSS
- OpenAI Sites-compatible Vite and Cloudflare Worker build

## Local setup

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation and production build

```bash
npm run lint
npm run build
```

## Lead endpoint

`app/api/leads/route.ts` is intentionally a placeholder. It validates the submitted JSON and returns HTTP `202`, but it does not persist personal data. Replace its success branch with the production CRM or ticketing integration before launch.

Expected payload:

```json
{
  "name": "Aarohi Shah",
  "phone": "+91 98765 43210",
  "email": "aarohi@example.com",
  "city": "Pune",
  "passes": "2",
  "preferredDay": "18 October"
}
```

## Source assumptions

- The year `2026` is marked `[INFERRED]` wherever it appears in event content.
- Artist appearance dates, set times, final pass categories and inclusions remain unannounced.
- The submission endpoint and future CRM connection are marked `[INFERRED]` as implementation assumptions.

## Scaffold command

```bash
npm create --yes @openai/sites@0.2.0 . -- --yes --install
```

The repository uses the `main` branch and is ready for any static-compatible or Worker-compatible hosting workflow after `npm run build` succeeds.
