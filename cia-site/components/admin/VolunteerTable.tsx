'use client'

import { useState } from 'react'
import { Volunteer, Donation } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface VolunteerTableProps {
  volunteers: Volunteer[]
  donations: Donation[]
  onDeactivate: (id: string) => void
  onAddVolunteer: () => void
}

export default function VolunteerTable({ volunteers, donations, onDeactivate, onAddVolunteer }: VolunteerTableProps) {
  const [copied, setCopied] = useState<string | null>(null)

  function getStats(referralCode: string) {
    const vDonations = donations.filter(
      (d) => d.volunteerCode === referralCode && d.status === 'success'
    )
    const count = vDonations.length
    const total = vDonations.reduce((sum, d) => sum + d.amount, 0)
    return { count, total }
  }

  function copyLink(referralCode: string) {
    const url = `${window.location.origin}/donate?r=${referralCode}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(referralCode)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
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
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 text-center text-text-secondary">
          No volunteers yet.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">Referral Code</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">Donations</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">Total Raised</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {volunteers.map((v) => {
                  const { count, total } = getStats(v.referralCode)
                  return (
                    <tr key={v.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3 text-text-primary font-medium">{v.name}</td>
                      <td className="px-4 py-3 text-text-secondary font-mono">{v.referralCode}</td>
                      <td className="px-4 py-3 text-text-primary">{count}</td>
                      <td className="px-4 py-3 text-text-primary font-semibold">{formatCurrency(total)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            v.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {v.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyLink(v.referralCode)}
                            className="text-xs px-3 py-1 rounded-full border border-stone-300 hover:bg-stone-50 transition-colors text-text-secondary"
                          >
                            {copied === v.referralCode ? 'Copied!' : 'Copy Link'}
                          </button>
                          {v.isActive && (
                            <button
                              onClick={() => onDeactivate(v.id)}
                              className="text-xs px-3 py-1 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                            >
                              Deactivate
                            </button>
                          )}
                        </div>
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
  )
}
