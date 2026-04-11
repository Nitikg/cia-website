'use client'

import { useState } from 'react'

interface AddVolunteerModalProps {
  onClose: () => void
  onSuccess: (referralCode: string, name: string) => void
}

export default function AddVolunteerModal({ onClose, onSuccess }: AddVolunteerModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ referralCode: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/add-volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setResult({ referralCode: data.referralCode })
      onSuccess(data.referralCode, name.trim())
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'border border-stone-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary text-sm'

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-text-primary">Add Volunteer</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors text-xl leading-none">&times;</button>
        </div>

        {result ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
              <p className="font-semibold text-green-700 mb-1">Volunteer added!</p>
              <p className="text-text-secondary">Referral code: <span className="font-mono font-bold text-text-primary">{result.referralCode}</span></p>
              <p className="text-text-secondary mt-1 break-all">
                Link: <span className="text-primary font-mono text-xs">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/donate?r={result.referralCode}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
              <input type="text" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Arya Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
              <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="arya@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
              <input type="tel" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-stone-300 text-text-secondary py-2.5 rounded-full font-semibold text-sm hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary text-white py-2.5 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}
                {submitting ? 'Adding...' : 'Add Volunteer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
