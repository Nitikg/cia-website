export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import ApplyPageClient from './ApplyPageClient'

export const metadata = {
  title: 'Volunteer with CIA NGO | Become a Fundraising Volunteer',
  description: 'Join our team of fundraising volunteers and help children access quality education.',
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-surface py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Join Us</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight mb-4">
            Become a Fundraising Volunteer
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Help us raise funds for children&apos;s education. Share your personal link, build real experience,
            and earn a verified internship certificate.
          </p>
        </div>
      </section>

      {/* Info sections */}
      <section className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        {/* What you'll do */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">What you&apos;ll do</h2>
          <ul className="space-y-3">
            {[
              'Share your personal fundraising link with your network',
              'Help raise funds for children\'s education',
              'Get a verified internship certificate on completion',
              'Build real fundraising and social impact experience',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What you'll gain */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">What you&apos;ll gain</h2>
          <ul className="space-y-3">
            {[
              'Certificate of completion',
              'Hands-on social impact experience',
              'Community of passionate changemakers',
              'LinkedIn recommendation (top performers)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                  <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Time commitment */}
        <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 md:col-span-2 flex items-center gap-4">
          <div className="text-primary text-3xl flex-shrink-0">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-text-primary">Time Commitment</p>
            <p className="text-text-secondary text-sm mt-1">4–6 hours per week, minimum 1 month commitment.</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <Suspense fallback={
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl mx-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <ApplyPageClient />
        </Suspense>
      </section>
    </main>
  )
}
