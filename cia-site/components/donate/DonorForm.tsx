'use client'

import { useState } from 'react'
import { DonorFormData } from '@/types'

interface DonorFormProps {
  onSubmit: (data: DonorFormData) => void
  isLoading: boolean
  amount: number | null
}

export default function DonorForm({ onSubmit, isLoading, amount }: DonorFormProps) {
  const [form, setForm] = useState<DonorFormData>({
    name: '',
    email: '',
    phone: '',
    pan: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof DonorFormData, string>>>({})

  function validate(): boolean {
    const newErrors: Partial<Record<keyof DonorFormData, string>> = {}

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian phone number'
    }

    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.toUpperCase())) {
      newErrors.pan = 'Enter a valid PAN number (e.g. ABCDE1234F)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof DonorFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, pan: form.pan?.trim() || undefined })
  }

  const inputClass =
    'border border-stone-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary transition-colors bg-white'
  const errorInputClass =
    'border border-red-400 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors bg-white'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Anjali Sharma"
          className={errors.name ? errorInputClass : inputClass}
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="anjali@example.com"
          className={errors.email ? errorInputClass : inputClass}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="9876543210"
          maxLength={10}
          className={errors.phone ? errorInputClass : inputClass}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* PAN Number (optional) */}
      <div>
        <label htmlFor="pan" className="block text-sm font-medium text-text-primary mb-1.5">
          PAN Number{' '}
          <span className="text-text-secondary font-normal">(for 80G tax receipt)</span>
        </label>
        <input
          id="pan"
          name="pan"
          type="text"
          autoComplete="off"
          value={form.pan}
          onChange={handleChange}
          placeholder="ABCDE1234F"
          maxLength={10}
          style={{ textTransform: 'uppercase' }}
          className={errors.pan ? errorInputClass : inputClass}
        />
        {errors.pan && <p className="mt-1 text-xs text-red-500">{errors.pan}</p>}
        <p className="mt-1 text-xs text-text-secondary">
          Optional — provide to receive your 80G certificate by email
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !amount}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl py-3.5 px-6 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-sm"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing…
          </>
        ) : (
          <>
            Proceed to Pay{amount ? ` ₹${amount.toLocaleString('en-IN')}` : ''}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </button>

      {!amount && (
        <p className="text-center text-sm text-text-secondary">
          Please select or enter an amount above to continue
        </p>
      )}
    </form>
  )
}
