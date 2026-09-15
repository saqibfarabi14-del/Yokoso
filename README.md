# Yōkoso — Destination Dining in Sylhet

Fine-dining marketing site for **Yōkoso**, a Pan-Asian restaurant in Sylhet. Quiet luxury, Japanese hospitality, and the full house narrative: signature Sushi Boat, menu highlights (৳), chef’s picks, private dining, and a multi-step reservation flow.

Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**, using brand tokens from the Yōkoso identity system (sumi / ash / gold / silk / shu · Cormorant Garamond · Shippori Mincho · Zen Kaku Gothic New · red seal with overlapping lenses).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this repository to GitHub (already done for the redesign PR).
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` · Output: Next.js default.
5. Deploy. Optional: set a custom domain and update `metadataBase` in `app/layout.tsx`.

No environment variables are required for the marketing site. Reservations are **client-side only** (party → date → time → name → phone → confirmation).

## Project structure

- `app/` — App Router layout, page, global styles & brand tokens
- `components/` — Hero, boat storytelling, menu, private dining, visit, reservation overlay, chrome
- `lib/` — Brand constants and menu content (৳ prices, Sylhet copy)
- `public/assets/` — Marks, OG image, photography, media

## Brand notes

- Palette: `#0B0A09` sumi · `#17150F` ash · `#C9A96B` gold · `#EDE7DA` silk · `#B23A26` shu
- Motion respects `prefers-reduced-motion` (grain, scroll rail, reveals disabled)
- Location: Al Madani Tower, 2nd floor, Mirboxtula, Ambarkhana, Sylhet · Daily 12:00–23:00 · Happy hour 17:00–19:00
