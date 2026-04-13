'use client'

import { useState } from 'react'
import { Donation } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import Drawer from './Drawer'

interface DonationsTableProps {
  donations: Donation[]
}

const statusColors: Record<Donation['status'], string> = {
  success: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-text-primary break-all">{value}</p>
    </div>
  )
}

export default function DonationsTable({ donations }: DonationsTableProps) {
  const [selected, setSelected] = useState<Donation | null>(null)

  const sorted = [...donations].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0
    return bTime - aTime
  })

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center text-text-secondary">
        No donations yet.
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Donor</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Amount</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden sm:table-cell">Via</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {sorted.map((d) => (
                <tr
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`cursor-pointer transition-colors hover:bg-stone-50 ${
                    selected?.id === d.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-text-primary">{d.donorName}</td>
                  <td className="px-5 py-4 font-semibold text-text-primary whitespace-nowrap">
                    {formatCurrency(d.amount)}
                  </td>
                  <td className="px-5 py-4 text-text-secondary hidden sm:table-cell">
                    {d.volunteerCode ?? <span className="text-stone-300">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[d.status]}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-xs hidden sm:table-cell whitespace-nowrap">
                    {d.createdAt ? formatDate(d.createdAt) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-stone-100">
              <div>
                <p className="text-2xl font-bold text-text-primary">{formatCurrency(selected.amount)}</p>
                <p className="text-sm text-text-secondary mt-0.5">{selected.donorName}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selected.status]}`}>
                    {selected.status}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {selected.createdAt ? formatDate(selected.createdAt) : ''}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-text-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Donor */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Donor</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" value={selected.donorEmail} />
                  <Field label="Phone" value={selected.donorPhone} />
                </div>
                {selected.donorPAN && <Field label="PAN" value={selected.donorPAN} />}
              </div>

              <div className="h-px bg-stone-100" />

              {/* Referral */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Attribution</p>
                <Field
                  label="Volunteer Code"
                  value={selected.volunteerCode ?? 'Organic'}
                />
              </div>

              {selected.message && (
                <>
                  <div className="h-px bg-stone-100" />
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Message</p>
                    <p className="text-sm text-text-primary leading-relaxed bg-stone-50 rounded-xl p-4">
                      {selected.message}
                    </p>
                  </div>
                </>
              )}

              <div className="h-px bg-stone-100" />

              {/* Payment */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Payment Details</p>
                <Field label="Order ID" value={selected.razorpayOrderId} />
                <Field label="Payment ID" value={selected.razorpayPaymentId} />
                <Field label="Signature" value={selected.razorpaySignature} />
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}
