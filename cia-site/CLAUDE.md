# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server (localhost:3000)
npm run build        # production build — must pass before merging
npx tsc --noEmit     # type check only
npx vitest run       # run all tests once
npx vitest run __tests__/lib/utils.test.ts   # run a single test file
npx vitest           # run tests in watch mode
```

There is no lint script. TypeScript strict mode is the primary quality gate — `npx tsc --noEmit` must exit clean.

## Architecture

This is a Next.js 16 App Router project (not Pages Router). Tailwind CSS v4 is used — theme tokens are defined in `app/globals.css` inside `@theme {}`, **not** in `tailwind.config.ts`. Custom color utilities: `text-primary`, `bg-primary`, `bg-primary-dark`, `text-accent`, `bg-surface`, `text-text-primary`, `text-text-secondary`, `text-success`.

### SDK Lazy Initialisation Pattern
`lib/firebase.ts`, `lib/firebase-admin.ts`, and `lib/razorpay.ts` all export Proxy objects that defer SDK construction until first property access. This is required because Next.js evaluates server modules at build time, and these SDKs throw immediately if credentials are absent. **Never change these to eager initialisation.**

### Firebase split
- `lib/firebase.ts` — client SDK (`db`, `auth`). Import only in `'use client'` components or hooks.
- `lib/firebase-admin.ts` — Admin SDK (`adminDb`). Import only in API routes and server components. Never import in client components.

### Admin authentication
`components/admin/AdminGuard.tsx` gates all `/admin/*` pages client-side via `onAuthStateChanged`. Allowed emails come from `process.env.NEXT_PUBLIC_ADMIN_EMAILS` (comma-separated). All admin pages fetch data server-side via `adminDb` and are marked `export const dynamic = 'force-dynamic'` to prevent static prerendering.

### Payment flow
1. Client → `POST /api/create-order` → Razorpay order created server-side
2. Razorpay JS SDK opens in browser (loaded dynamically via script tag)
3. On success → client → `POST /api/verify-payment` → HMAC SHA256 verified server-side → donation written to Firestore

### Referral tracking
`/donate?r=<code>` resolves the code via `hooks/useVolunteer.ts` (Firestore query on the `volunteers` collection). The resolved `volunteerCode` is passed through to `verify-payment` and stored on the donation document. `null` means organic.

### Dynamic vs static pages
Pages that use Firebase or Razorpay at request time must be `force-dynamic`. Currently: all `/admin/*` pages, `/donate`, and `/apply`. Public pages (`/`, `/about`, `/work`, `/get-involved`) are statically prerendered.

## Environment Variables

See `.env.example` for the full list. All `NEXT_PUBLIC_*` vars are safe to expose to the browser. `FIREBASE_ADMIN_*` and `RAZORPAY_KEY_SECRET` are server-only and must never appear in client code.
