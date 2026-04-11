# NGO Platform — Technical Plan
### For Development Team

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Frontend pages + backend API routes in one project |
| Styling | Tailwind CSS | Utility-first responsive styling |
| Database | Firebase Firestore | Real-time NoSQL database, free tier |
| Auth | Firebase Auth (Google OAuth) | Admin login — no password management needed |
| Payments | Razorpay | Indian payment gateway — UPI, cards, net banking |
| Deployment | Vercel | Auto-deploy on push, free tier, custom domain |
| Email (v2) | Resend / Nodemailer | 80G receipt emails after payment |

---

## Project Structure

```
/
├── app/
│   ├── page.tsx                  → Home
│   ├── about/page.tsx            → About Us
│   ├── work/page.tsx             → Our Work / Programs
│   ├── get-involved/page.tsx     → Get Involved
│   ├── donate/page.tsx           → Donation page (?r= param)
│   ├── apply/page.tsx            → Volunteer application form
│   ├── admin/
│   │   ├── page.tsx              → Admin dashboard
│   │   ├── donations/page.tsx    → All donations table
│   │   ├── volunteers/page.tsx   → Volunteer management
│   │   └── applications/page.tsx → Internship applications
│   └── api/
│       ├── create-order/route.ts → Razorpay order creation
│       └── verify-payment/route.ts → Razorpay signature verification + Firebase write
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StoryCards.tsx
│   │   ├── FounderNote.tsx
│   │   ├── HowWeHelp.tsx
│   │   ├── ImpactCounters.tsx
│   │   └── AwardsMedia.tsx
│   ├── donate/
│   │   ├── AmountSelector.tsx
│   │   ├── DonorForm.tsx
│   │   ├── VolunteerBanner.tsx
│   │   └── TrustSignals.tsx
│   ├── apply/
│   │   └── ApplicationForm.tsx
│   └── admin/
│       ├── AdminGuard.tsx        → Route protection
│       ├── KPICards.tsx
│       ├── DonationsTable.tsx
│       ├── VolunteerTable.tsx
│       └── ApplicationsTable.tsx
│
├── lib/
│   ├── firebase.ts               → Firebase init (client)
│   ├── firebase-admin.ts         → Firebase admin SDK (server)
│   ├── razorpay.ts               → Razorpay client init
│   └── utils.ts                  → Helpers (referral code gen, formatters)
│
├── hooks/
│   ├── useVolunteer.ts           → Fetch volunteer by referral code
│   └── useAdminData.ts           → Fetch donations, applications, leaderboard
│
└── types/
    └── index.ts                  → TypeScript interfaces
```

---

## Firebase Collections

### `/volunteers`
```typescript
{
  id: string,                  // Auto-generated
  name: string,
  email: string,
  phone: string,
  referralCode: string,        // Unique, lowercase, e.g. "arya2511"
  isActive: boolean,
  createdAt: Timestamp
}
```

### `/donations`
```typescript
{
  id: string,
  amount: number,              // In INR
  donorName: string,
  donorEmail: string,
  donorPhone: string,
  donorPAN: string,            // Optional, for 80G
  volunteerCode: string | null, // null if direct/organic
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  status: 'pending' | 'success' | 'failed',
  message: string | null,      // Optional donor message
  createdAt: Timestamp
}
```

### `/applications`
```typescript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  city: string,
  occupation: string,
  motivation: string,
  availability: 'weekends' | 'weekdays' | 'both',
  linkedIn: string | null,
  heardFrom: string,
  referredBy: string | null,   // volunteerCode if came via ?r= link
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected',
  createdAt: Timestamp
}
```

---

## Referral Code Flow

```
1. Visitor lands on /donate?r=arya2511
2. Frontend reads searchParams.get('r') → "arya2511"
3. Query Firestore: volunteers where referralCode == "arya2511"
4. If found → show VolunteerBanner with volunteer's name
5. Store volunteerCode in component state
6. On donation success → write volunteerCode to donation record
7. If ?r= not present or not found → volunteerCode = null (organic donation)
```

---

## Razorpay Payment Flow

```
Step 1 — Create Order (Server)
POST /api/create-order
Body: { amount: number (in paise), donorName, donorEmail, donorPhone }
→ Calls Razorpay Orders API
→ Returns { orderId, amount, currency }

Step 2 — Open Razorpay (Client)
Use Razorpay JS SDK
Pass: orderId, amount, prefill (name, email, phone), theme color
User completes payment (UPI / card / net banking)
Razorpay returns: { razorpayPaymentId, razorpayOrderId, razorpaySignature }

Step 3 — Verify Payment (Server)
POST /api/verify-payment
Body: { razorpayPaymentId, razorpayOrderId, razorpaySignature, donorData, volunteerCode }
→ Verify HMAC SHA256 signature using Razorpay secret
→ If valid → write donation to Firestore with status: "success"
→ If invalid → return 400, do not write

Step 4 — Client Response
On success response → show ThankYou screen
On failure → show error message
```

---

## Admin Auth (Firebase Google OAuth)

```typescript
// Only allow pre-approved admin emails
const ADMIN_EMAILS = ['admin@yourngo.org', 'nitik@yourngo.org']

// AdminGuard component — wraps all /admin pages
// If not logged in → redirect to /admin/login
// If logged in but not in ADMIN_EMAILS → show "Access Denied"
// If valid admin → render children
```

---

## Environment Variables

```env
# Firebase (Client)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase (Admin SDK — server only)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=     # Public key for frontend SDK
```

---

## Key API Routes

### `POST /api/create-order`
Creates a Razorpay order before payment.

```typescript
// Input
{ amount: number }  // in INR

// Process
// Convert to paise (amount * 100)
// Call razorpay.orders.create({ amount, currency: 'INR' })

// Output
{ orderId: string, amount: number }
```

### `POST /api/verify-payment`
Verifies Razorpay signature and writes to Firestore.

```typescript
// Input
{
  razorpayPaymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string,
  donor: { name, email, phone, pan },
  volunteerCode: string | null,
  amount: number
}

// Process
// 1. HMAC SHA256: orderId + "|" + paymentId using RAZORPAY_KEY_SECRET
// 2. Compare with razorpaySignature
// 3. If match → write to Firestore /donations
// 4. Return success

// Output
{ success: true } or { error: 'Payment verification failed' }
```

---

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Donations — anyone can write (after payment verify), no one can read publicly
    match /donations/{id} {
      allow write: if true;    // Server-side writes via Admin SDK bypass this
      allow read: if false;    // Only via Admin SDK on server
    }

    // Applications — anyone can write (form submit), no public read
    match /applications/{id} {
      allow write: if true;
      allow read: if false;
    }

    // Volunteers — public read for referral code lookup, no public write
    match /volunteers/{id} {
      allow read: if true;     // Needed to resolve ?r= param on donate page
      allow write: if false;   // Only via Admin SDK
    }
  }
}
```

---

## Build Sequence

### Week 1 — Core

| Day | Task |
|---|---|
| 1 | Next.js init + Tailwind + Firebase config + empty Vercel deploy |
| 2 | Navbar, Footer, Home page (static, placeholder content) |
| 3 | About + Work + Get Involved pages (static) |
| 4 | Donate page — amount selector + donor form + volunteer banner |
| 5 | Razorpay integration — create-order + verify-payment API routes |
| 6 | Admin dashboard — Google login + donations table + applications table |
| 7 | Apply form → Firebase write. End-to-end test with ₹1 payment |

### Week 2 — Polish

| Day | Task |
|---|---|
| 8 | Volunteer leaderboard in admin |
| 9 | Add new volunteer flow in admin (generate + copy link) |
| 10 | Mobile responsiveness pass across all pages |
| 11 | Replace placeholder content with real content from content team |
| 12 | SEO: meta tags, og:image, sitemap |
| 13 | Custom domain on Vercel + Razorpay live mode |
| 14 | Final QA + launch |

---

## Deployment (Vercel)

1. Push project to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel dashboard
4. Every push to `main` auto-deploys
5. Add custom domain in Vercel → update DNS records with registrar
6. Done

---

## What's Deferred (Not in MVP)

| Feature | Reason |
|---|---|
| Volunteer login + dashboard | Complexity — WhatsApp updates work fine at launch |
| Email 80G receipts | Integrate Resend in v2 |
| Recurring donations | Razorpay subscriptions — add in v2 |
| Donor portal | Not needed at launch |
| Multiple campaigns | One campaign only at MVP |
| WhatsApp API | Manual WhatsApp is fine at start |
| Resources / reports page | Add once first annual report exists |
| Analytics dashboard charts | Tables are sufficient at MVP |
