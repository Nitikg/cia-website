'use client'

import { useState } from 'react'

interface ApplicationFormProps {
  referredBy?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  city: string
  occupation: string
  motivation: string
  availability: 'weekends' | 'weekdays' | 'both' | ''
  linkedIn: string
  heardFrom: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  city?: string
  occupation?: string
  motivation?: string
  availability?: string
  heardFrom?: string
}

const inputClass =
  'border border-stone-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary'
const errorClass = 'text-red-500 text-sm mt-1'
const labelClass = 'block text-sm font-medium text-text-primary mb-1'

export default function ApplicationForm({ referredBy }: ApplicationFormProps) {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    occupation: '',
    motivation: '',
    availability: '',
    linkedIn: '',
    heardFrom: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  function validate(): boolean {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Full name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.phone.trim()) errs.phone = 'Phone number is required.'
    if (!form.city.trim()) errs.city = 'City is required.'
    if (!form.occupation.trim()) errs.occupation = 'College or occupation is required.'
    if (!form.motivation.trim()) errs.motivation = 'Please tell us why you want to join.'
    else if (form.motivation.trim().length < 50) errs.motivation = 'Please write at least 50 characters.'
    if (!form.availability) errs.availability = 'Please select your availability.'
    if (!form.heardFrom) errs.heardFrom = 'Please tell us how you heard about us.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          occupation: form.occupation.trim(),
          motivation: form.motivation.trim(),
          availability: form.availability,
          linkedIn: form.linkedIn.trim() || null,
          heardFrom: form.heardFrom,
          referredBy: referredBy || null,
        }),
      })
      if (res.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl mx-auto text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Application Submitted!</h2>
        <p className="text-text-secondary">
          Thank you! Our team will reach out within 3 working days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl shadow-md p-8 max-w-xl mx-auto space-y-5">
      <h2 className="text-xl font-bold text-text-primary">Your Application</h2>

      {/* Full Name */}
      <div>
        <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
        <input
          id="name"
          type="text"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Arya Sharma"
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>Email <span className="text-red-500">*</span></label>
        <input
          id="email"
          type="email"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="arya@example.com"
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>Phone <span className="text-red-500">*</span></label>
        <input
          id="phone"
          type="tel"
          className={inputClass}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 98765 43210"
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className={labelClass}>City <span className="text-red-500">*</span></label>
        <input
          id="city"
          type="text"
          className={inputClass}
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          placeholder="Mumbai"
        />
        {errors.city && <p className={errorClass}>{errors.city}</p>}
      </div>

      {/* College / Occupation */}
      <div>
        <label htmlFor="occupation" className={labelClass}>
          College or Current Occupation <span className="text-red-500">*</span>
        </label>
        <input
          id="occupation"
          type="text"
          className={inputClass}
          value={form.occupation}
          onChange={(e) => setForm({ ...form, occupation: e.target.value })}
          placeholder="IIT Bombay / Software Engineer at Infosys"
        />
        {errors.occupation && <p className={errorClass}>{errors.occupation}</p>}
      </div>

      {/* Motivation */}
      <div>
        <label htmlFor="motivation" className={labelClass}>
          Why do you want to join us? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="motivation"
          rows={4}
          className={inputClass}
          value={form.motivation}
          onChange={(e) => setForm({ ...form, motivation: e.target.value })}
          placeholder="Tell us about your motivation (min. 50 characters)..."
        />
        <p className="text-xs text-text-secondary mt-1">{form.motivation.length} / 50 min</p>
        {errors.motivation && <p className={errorClass}>{errors.motivation}</p>}
      </div>

      {/* Availability */}
      <div>
        <p className={labelClass}>Availability <span className="text-red-500">*</span></p>
        <div className="flex gap-6 mt-1">
          {(['weekends', 'weekdays', 'both'] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-text-primary capitalize">
              <input
                type="radio"
                name="availability"
                value={opt}
                checked={form.availability === opt}
                onChange={() => setForm({ ...form, availability: opt })}
                className="accent-primary w-4 h-4"
              />
              {opt === 'both' ? 'Both' : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </label>
          ))}
        </div>
        {errors.availability && <p className={errorClass}>{errors.availability}</p>}
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedIn" className={labelClass}>LinkedIn Profile URL <span className="text-text-secondary font-normal">(optional)</span></label>
        <input
          id="linkedIn"
          type="url"
          className={inputClass}
          value={form.linkedIn}
          onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
          placeholder="https://linkedin.com/in/yourname"
        />
      </div>

      {/* How did you hear */}
      <div>
        <label htmlFor="heardFrom" className={labelClass}>
          How did you hear about us? <span className="text-red-500">*</span>
        </label>
        <select
          id="heardFrom"
          className={inputClass}
          value={form.heardFrom}
          onChange={(e) => setForm({ ...form, heardFrom: e.target.value })}
        >
          <option value="">Select an option</option>
          <option value="Instagram">Instagram</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="From a friend / volunteer">From a friend / volunteer</option>
          <option value="College / University">College / University</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Other">Other</option>
        </select>
        {errors.heardFrom && <p className={errorClass}>{errors.heardFrom}</p>}
      </div>

      {/* Error banner */}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting && (
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {submitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  )
}
