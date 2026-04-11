'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Volunteer, DonorFormData } from '@/types'

import VolunteerBanner from '@/components/donate/VolunteerBanner'
import AmountSelector from '@/components/donate/AmountSelector'
import DonorForm from '@/components/donate/DonorForm'
import TrustSignals from '@/components/donate/TrustSignals'
import ThankYou from '@/components/donate/ThankYou'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as Window & { Razorpay?: unknown }).Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ---------------------------------------------------------------------------
// Inner component that uses useSearchParams (must be inside <Suspense>)
// ---------------------------------------------------------------------------

function DonateContent() {
  const searchParams = useSearchParams()
  const referralCode = searchParams.get('r')

  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [volunteerCode, setVolunteerCode] = useState<string | null>(null)
  const [volunteerLoading, setVolunteerLoading] = useState(!!referralCode)

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 'selecting' → 'success'
  const [stage, setStage] = useState<'selecting' | 'success'>('selecting')
  const [successData, setSuccessData] = useState<{ name: string; amount: number } | null>(null)

  // Resolve referral code
  useEffect(() => {
    if (!referralCode) {
      setVolunteerLoading(false)
      return
    }

    async function fetchVolunteer() {
      try {
        const q = query(
          collection(db, 'volunteers'),
          where('referralCode', '==', referralCode)
        )
        const snap = await getDocs(q)
        if (!snap.empty) {
          const vol = snap.docs[0].data() as Volunteer
          setVolunteer(vol)
          setVolunteerCode(referralCode)
        }
      } catch (err) {
        console.error('Error fetching volunteer:', err)
      } finally {
        setVolunteerLoading(false)
      }
    }

    fetchVolunteer()
  }, [referralCode])

  async function handleDonorSubmit(donor: DonorFormData) {
    if (!selectedAmount) return
    setIsLoading(true)
    setError(null)

    try {
      // 1. Create Razorpay order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedAmount }),
      })

      if (!orderRes.ok) {
        const data = await orderRes.json()
        throw new Error(data.error || 'Failed to create payment order')
      }

      const { orderId, amount: orderAmount } = await orderRes.json()

      // 2. Load Razorpay SDK
      const loaded = await loadRazorpay()
      if (!loaded) {
        throw new Error('Failed to load payment gateway. Please check your connection.')
      }

      // 3. Open Razorpay modal
      await new Promise<void>((resolve, reject) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderAmount,
          currency: 'INR',
          name: 'CIA NGO',
          description: 'Donation',
          order_id: orderId,
          prefill: {
            name: donor.name,
            email: donor.email,
            contact: donor.phone,
          },
          theme: { color: '#F97316' },
          handler: async function (response: {
            razorpay_payment_id: string
            razorpay_order_id: string
            razorpay_signature: string
          }) {
            try {
              // 4. Verify payment on server
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                  donor,
                  volunteerCode,
                  amount: selectedAmount,
                }),
              })

              if (!verifyRes.ok) {
                const data = await verifyRes.json()
                reject(new Error(data.error || 'Payment verification failed'))
                return
              }

              setSuccessData({ name: donor.name, amount: selectedAmount })
              setStage('success')
              resolve()
            } catch (err) {
              reject(err)
            }
          },
          modal: {
            ondismiss: () => {
              reject(new Error('Payment cancelled'))
            },
          },
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rzp = new (window as unknown as { Razorpay: new (opts: typeof options) => { open: () => void } }).Razorpay(options)
        rzp.open()
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      if (message !== 'Payment cancelled') {
        setError(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  function handleReset() {
    setStage('selecting')
    setSelectedAmount(null)
    setSuccessData(null)
    setError(null)
  }

  // ── Success screen ──────────────────────────────────────────────────────
  if (stage === 'success' && successData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-8">
          <ThankYou
            donorName={successData.name}
            amount={successData.amount}
            onReset={handleReset}
          />
        </div>
      </div>
    )
  }

  // ── Main donate form ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Make a Difference Today
          </h1>
          <p className="mt-2 text-text-secondary text-base sm:text-lg max-w-xl mx-auto">
            100% of your donation goes directly to the children we serve.
          </p>
        </div>

        {/* Volunteer banner (mobile: above columns) */}
        {!volunteerLoading && volunteer && (
          <div className="mb-6 lg:hidden">
            <VolunteerBanner volunteerName={volunteer.name} />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Left column: form (60%) ─────────────────────────────── */}
          <div className="w-full lg:w-[60%] space-y-6">
            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Choose an amount
                </h2>
                <AmountSelector
                  selectedAmount={selectedAmount}
                  onSelect={setSelectedAmount}
                />
              </div>

              <hr className="border-stone-100" />

              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Your details
                </h2>
                <DonorForm
                  onSubmit={handleDonorSubmit}
                  isLoading={isLoading}
                  amount={selectedAmount}
                />
              </div>

              {/* Inline error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}
            </div>

            <TrustSignals />
          </div>

          {/* ── Right column: sidebar (40%) ─────────────────────────── */}
          <div className="w-full lg:w-[40%] space-y-5">

            {/* Volunteer banner (desktop only) */}
            {volunteerLoading ? (
              <div className="hidden lg:block bg-stone-100 animate-pulse rounded-xl h-16" />
            ) : volunteer ? (
              <div className="hidden lg:block">
                <VolunteerBanner volunteerName={volunteer.name} />
              </div>
            ) : null}

            {/* Impact summary */}
            <div className="bg-surface border border-stone-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-semibold text-text-primary text-base">Your impact</h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                {[
                  { icon: '📚', text: '₹500 — Stationery kit for one child' },
                  { icon: '🎒', text: '₹1,000 — One month of learning materials' },
                  { icon: '👩‍🏫', text: '₹2,000 — One month of teaching support' },
                  { icon: '🌱', text: '₹6,000 — Three months of support' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security badges */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
                Secured &amp; trusted
              </p>
              <div className="flex flex-col gap-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>RBI-regulated payment gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏦</span>
                  <span>UPI · Cards · Net Banking · Wallets</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page export — wraps DonateContent in Suspense (required for useSearchParams)
// ---------------------------------------------------------------------------

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-text-secondary animate-pulse text-lg">Loading…</div>
        </div>
      }
    >
      <DonateContent />
    </Suspense>
  )
}
