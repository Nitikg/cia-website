# NGO Donor Workflow — Design Spec
**Date:** 2026-04-11  
**Project:** CIA NGO Platform (`D:\AI\CIA\cia-site`)  
**Status:** Approved for implementation

---

## Overview

End-to-end NGO website with volunteer referral tracking, Razorpay donation processing, and an internal admin dashboard. Mobile-first (80–90% mobile users). No volunteer login at MVP — all volunteer comms via WhatsApp.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack in one repo, SSR for SEO |
| Styling | Tailwind CSS | Rapid mobile-first responsive UI |
| Database | Firebase Firestore | Real-time NoSQL, generous free tier |
| Auth | Firebase Auth (Google OAuth) | Admin-only login, no password management |
| Payments | Razorpay | Indian gateway — UPI, cards, net banking |
| Testing | Vitest + @testing-library/react | TDD for critical paths |
| Deployment | Vercel | Auto-deploy from GitHub, free tier |
| Email (v2) | Resend | 80G receipts — deferred post-MVP |

---

## Color Palette

Warm, vibrant — suited to an Indian educational NGO. Bright, mobile-friendly, accessible.

| Role | Color | Hex |
|---|---|---|
| Primary | Saffron Orange | `#F97316` |
| Primary Dark | Deep Amber | `#C2410C` |
| Accent | Teal | `#0D9488` |
| Background | Warm White | `#FFFBF5` |
| Surface | Light Cream | `#FFF7ED` |
| Text Primary | Charcoal | `#1C1917` |
| Text Secondary | Warm Gray | `#78716C` |
| Success | Green | `#16A34A` |

---

## Pages & Routes

| Route | Purpose | Auth |
|---|---|---|
| `/` | Home — hero, stories, founder, impact counters | Public |
| `/about` | Vision, mission, team, journey | Public |
| `/work` | Programs, problem stats, pillars | Public |
| `/get-involved` | Donate / volunteer / partner paths | Public |
| `/donate` | Donation form + Razorpay (`?r=code` referral) | Public |
| `/apply` | Volunteer application form | Public |
| `/admin` | Admin dashboard (KPIs, donations, volunteers, applications) | Google OAuth |

---

## Project Structure

```
cia-site/
├── app/
│   ├── page.tsx                    → Home
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── get-involved/page.tsx
│   ├── donate/page.tsx             → ?r= referral param
│   ├── apply/page.tsx
│   ├── admin/
│   │   ├── page.tsx                → Dashboard
│   │   ├── donations/page.tsx
│   │   ├── volunteers/page.tsx
│   │   └── applications/page.tsx
│   └── api/
│       ├── create-order/route.ts   → Razorpay order creation
│       ├── verify-payment/route.ts → HMAC verify + Firestore write
│       └── submit-application/route.ts → Application Firestore write
├── components/
│   ├── layout/ (Navbar, Footer)
│   ├── home/ (Hero, StoryCards, FounderNote, HowWeHelp, ImpactCounters, AwardsMedia)
│   ├── donate/ (AmountSelector, DonorForm, VolunteerBanner, TrustSignals, ThankYou)
│   ├── apply/ (ApplicationForm)
│   └── admin/ (AdminGuard, KPICards, DonationsTable, VolunteerTable, ApplicationsTable)
├── lib/
│   ├── firebase.ts                 → Client SDK init
│   ├── firebase-admin.ts           → Admin SDK (server-only)
│   ├── razorpay.ts                 → Razorpay client init
│   └── utils.ts                    → Referral code gen, formatters
├── hooks/
│   ├── useVolunteer.ts             → Resolve ?r= code from Firestore
│   └── useAdminData.ts             → Fetch admin dashboard data
├── types/index.ts
└── __tests__/                      → Vitest test files
    ├── api/create-order.test.ts
    ├── api/verify-payment.test.ts
    ├── api/submit-application.test.ts
    ├── lib/utils.test.ts
    └── hooks/useVolunteer.test.ts
```

---

## Firestore Collections

### `/volunteers`
```typescript
{ id, name, email, phone, referralCode: string, isActive: boolean, createdAt }
```

### `/donations`
```typescript
{ id, amount, donorName, donorEmail, donorPhone, donorPAN?,
  volunteerCode: string|null, razorpayOrderId, razorpayPaymentId,
  razorpaySignature, status: 'pending'|'success'|'failed', createdAt }
```

### `/applications`
```typescript
{ id, name, email, phone, city, occupation, motivation,
  availability: 'weekends'|'weekdays'|'both', linkedIn?,
  heardFrom, referredBy: string|null,
  status: 'pending'|'reviewed'|'accepted'|'rejected', createdAt }
```

---

## Critical Paths (TDD Required)

### 1. `POST /api/create-order`
- Input: `{ amount: number }` (INR)
- Converts to paise → calls Razorpay Orders API
- Output: `{ orderId, amount }`
- Tests: valid amount, zero amount, Razorpay failure

### 2. `POST /api/verify-payment`
- Input: `{ razorpayPaymentId, razorpayOrderId, razorpaySignature, donor, volunteerCode, amount }`
- HMAC SHA256 verify → Firestore write on success
- Output: `{ success: true }` or `{ error: 'Payment verification failed' }`
- Tests: valid sig writes to Firestore, invalid sig returns 400 + no write, missing fields

### 3. `POST /api/submit-application`
- Input: full application fields
- Validates required fields → writes to Firestore with `status: 'pending'`
- Output: `{ success: true }` or `{ error }`
- Tests: valid submission, missing required fields, referral code capture

### 4. `useVolunteer` hook
- Queries Firestore volunteers where `referralCode == code`
- Returns `{ volunteer, loading, error }`
- Tests: found, not found, empty code → null

### 5. `generateReferralCode` util
- Input: name + timestamp
- Output: lowercase slug, unique, URL-safe
- Tests: format, uniqueness pattern, edge cases (special chars, spaces)

---

## Referral Flow

```
/donate?r=arya2511
  → read searchParams('r')
  → query Firestore volunteers where referralCode == 'arya2511'
  → found → show VolunteerBanner ("Supporting Arya's fundraiser 🙌")
  → store code in state
  → on payment success → write volunteerCode to donation record
  → not found / absent → volunteerCode = null (organic)
```

---

## Payment Flow

1. User selects amount + fills donor form
2. Client → `POST /api/create-order` → gets `orderId`
3. Razorpay JS SDK opens (UPI / card / net banking)
4. On success → client gets `{ paymentId, orderId, signature }`
5. Client → `POST /api/verify-payment` → HMAC verify → Firestore write
6. On `{ success: true }` → show ThankYou screen
7. On failure → show inline error

---

## Admin Auth

```typescript
const ADMIN_EMAILS = ['admin@yourngo.org'] // set via env var ADMIN_EMAILS

// AdminGuard wraps all /admin/* pages
// Not logged in → redirect /admin/login
// Logged in, not in list → "Access Denied"
// Valid admin → render children
```

---

## Firestore Security Rules

```
/donations    → write: true (server Admin SDK bypasses), read: false
/applications → write: true, read: false
/volunteers   → read: true (referral lookup), write: false
```

---

## Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
ADMIN_EMAILS=admin@yourngo.org
```

---

## What's Deferred (Post-MVP)

- Volunteer login / self-service dashboard
- 80G receipt emails (Resend)
- Recurring donations
- WhatsApp API automation
- Analytics charts (tables are fine at launch)
