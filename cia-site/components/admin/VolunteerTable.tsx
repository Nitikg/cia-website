'use client'

import { useState } from 'react'
import { Volunteer, Donation } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import Drawer from './Drawer'

interface VolunteerTableProps {
  volunteers: Volunteer[]
  donations: Donation[]
  onDeactivate: (id: string) => void
  onAddVolunteer: () => void
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm text-text-primary">{value}</p>
    </div>
  )
}

export default function VolunteerTable({ volunteers, donations, onDeactivate, onAddVolunteer }: VolunteerTableProps) {
  const [selected, setSelected] = useState<Volunteer | null>(null)
  const [copied, setCopied] = useState(false)

  function getStats(referralCode: string) {
    const vDonations = donations.filter(
      (d) => d.volunteerCode === referralCode && d.status === 'success'
    )
    return {
      count: vDonations.length,
      total: vDonations.reduce((sum, d) => sum + d.amount, 0),
    }
  }

  function copyLink(referralCode: string) {
    const url = `${window.location.origin}/donate?r=${referralCode}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={onAddVolunteer}
            className="bg-primary text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-primary-dark transition-colors"
          >
            + Add Volunteer
          </button>
        </div>

        {volunteers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center text-text-secondary">
            No volunteers yet.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Name</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden sm:table-cell">Code</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Raised</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden sm:table-cell">Donations</th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {volunteers.map((v) => {
                    const { count, total } = getStats(v.referralCode)
                    return (
                      <tr
                        key={v.id}
                        onClick={() => { setSelected(v); setCopied(false) }}
                        className={`cursor-pointer transition-colors hover:bg-stone-50 ${
                          selected?.id === v.id ? 'bg-orange-50' : ''
                        }`}
                      >
                        <td className="px-5 py-4 font-medium text-text-primary">{v.name}</td>
                        <td className="px-5 py-4 text-text-secondary font-mono text-xs hidden sm:table-cell">{v.referralCode}</td>
                        <td className="px-5 py-4 font-semibold text-text-primary">{formatCurrency(total)}</td>
                        <td className="px-5 py-4 text-text-secondary hidden sm:table-cell">{count}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            v.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                          }`}>
                            {v.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)}>
        {selected && (() => {
          const { count, total } = getStats(selected.referralCode)
          return (
            <>
              {/* Header */}
              <div className="flex items-start justify-between px-6 py-5 border-b border-stone-100">
                <div>
                  <h2 className="text-lg font-bold text-text-primary">{selected.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selected.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {selected.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {selected.createdAt && (
                      <span className="text-xs text-text-secondary">Joined {formatDate(selected.createdAt)}</span>
                    )}
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
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-xs text-text-secondary mb-1">Total Raised</p>
                    <p className="text-xl font-bold text-text-primary">{formatCurrency(total)}</p>
                  </div>
                  <div className="bg-stone-50 rounded-xl p-4">
                    <p className="text-xs text-text-secondary mb-1">Donations</p>
                    <p className="text-xl font-bold text-text-primary">{count}</p>
                  </div>
                </div>

                <div className="h-px bg-stone-100" />

                {/* Contact */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Contact</p>
                  <Field label="Email" value={selected.email} />
                  <Field label="Phone" value={selected.phone} />
                </div>

                <div className="h-px bg-stone-100" />

                {/* Referral */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Referral</p>
                  <div>
                    <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-0.5">Code</p>
                    <p className="text-sm text-text-primary font-mono">{selected.referralCode}</p>
                  </div>
                  <button
                    onClick={() => copyLink(selected.referralCode)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-stone-100 text-text-secondary hover:bg-stone-200 transition-colors"
                  >
                    {copied ? 'Link Copied!' : 'Copy Referral Link'}
                  </button>
                </div>
              </div>

              {/* Actions */}
              {selected.isActive && (
                <div className="px-6 py-5 border-t border-stone-100">
                  <button
                    onClick={() => {
                      onDeactivate(selected.id)
                      setSelected((prev) => prev ? { ...prev, isActive: false } : null)
                    }}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    Deactivate Volunteer
                  </button>
                </div>
              )}
            </>
          )
        })()}
      </Drawer>
    </>
  )
}
