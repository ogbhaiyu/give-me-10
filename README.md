# Just give me $10

A one-button website whose entire business model is audacity. Visitors click
**Give me $10**, confetti happens, and Remitly's own checkout opens in a new
tab. You get ten dollars — the least Remitly can do. It is what it is.

## Run it

```bash
npm install
npm run dev
```

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint

## 1. Create your Remitly payment request (one minute)

This site cannot create payments by itself — Remitly has no public "accept
money" API for websites. It opens a payment-request link **you** create in the
Remitly app:

1. Open the Remitly app (or sign up at [remitly.com](https://www.remitly.com)).
2. Tap **Request** (Get paid for global work).
3. Enter the amount — `10`.
4. Create the request and copy the shareable payment link.
5. Paste the link into the site (see below).

Whoever opens the link pays through Remitly's secure checkout. You receive the
money in your bank account, mobile wallet, or Remitly USD wallet. You never see
their card details, and this site never sees them either.

Note: Remitly's request links are completed by senders in supported markets
(mainly US / Canada / UK). Everyone else gets the confetti and the joke.

## 2. Plug the link into the site

Either edit [`src/config.ts`](src/config.ts):

```ts
const LINK_FROM_CONFIG = "https://your-remitly-payment-request-link";
```

or use an env var (`.env.local` is git-ignored):

```bash
NEXT_PUBLIC_REMITLY_URL="https://your-remitly-payment-request-link"
```

While no link is configured, the page shows an amber **owner notice** and the
button falls back to `remitly.com`. The notice disappears as soon as a link is
set.

## 3. Optional tweaks

- **Amount** — change `AMOUNT` in `src/config.ts` (currently `10`).
- **Copy** — headline, FAQ and receipt live in `src/app/page.tsx`.
- **Colors** — the emerald accent is a plain Tailwind color; swap
  `text-emerald-500` for any palette color you like.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui
(Base UI) · framer-motion · canvas-confetti · sonner · next-themes (light/dark).

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com/new), or:

```bash
npm run build && npm start
```

If you deploy somewhere else, set `NEXT_PUBLIC_REMITLY_URL` in that host's
environment variables.

---

Not affiliated with Remitly. Payments are handled entirely by Remitly on their
own checkout.
