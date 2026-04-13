'use client'

import { useState } from 'react'
import { Application } from '@/types'
import { formatDate } from '@/lib/utils'
import Drawer from './Drawer'

interface ApplicationsTableProps {
  applications: Application[]
  onStatusChange: (id: string, status: Application['status']) => void
}

const statusColors: Record<Application['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

const availabilityLabel: Record<Application['availability'], string> = {
  weekends: 'Weekends',
  weekdays: 'Weekdays',
  both: 'Both',
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

export default function ApplicationsTable({ applications, onStatusChange }: ApplicationsTableProps) {
  const [selected, setSelected] = useState<Application | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleAction(status: Application['status']) {
    if (!selected) return
    setLoading(true)
    await onStatusChange(selected.id, status)
    setSelected((prev) => prev ? { ...prev, status } : null)
    setLoading(false)
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-12 text-center text-text-secondary">
        No applications yet.
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
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Name</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden sm:table-cell">City</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden md:table-cell">Occupation</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden md:table-cell">Availability</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => setSelected(app)}
                  className={`cursor-pointer transition-colors hover:bg-stone-50 ${
                    selected?.id === app.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <td className="px-5 py-4 font-medium text-text-primary">{app.name}</td>
                  <td className="px-5 py-4 text-text-secondary hidden sm:table-cell">{app.city}</td>
                  <td className="px-5 py-4 text-text-secondary hidden md:table-cell">{app.occupation}</td>
                  <td className="px-5 py-4 text-text-secondary hidden md:table-cell">{availabilityLabel[app.availability]}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-xs hidden sm:table-cell whitespace-nowrap">
                    {app.createdAt ? formatDate(app.createdAt) : '—'}
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
                <h2 className="text-lg font-bold text-text-primary">{selected.name}</h2>
                <div className="flex items-center gap-2 mt-1">
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
              {/* Contact */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Contact</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" value={selected.email} />
                  <Field label="Phone" value={selected.phone} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" value={selected.city} />
                  <Field label="Occupation" value={selected.occupation} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Availability" value={availabilityLabel[selected.availability]} />
                  {selected.linkedIn && (
                    <div>
                      <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-0.5">LinkedIn</p>
                      <a
                        href={selected.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline truncate block"
                      >
                        View profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px bg-stone-100" />

              {/* Motivation */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Motivation</p>
                <p className="text-sm text-text-primary leading-relaxed bg-stone-50 rounded-xl p-4">
                  {selected.motivation}
                </p>
              </div>

              <div className="h-px bg-stone-100" />

              {/* Source */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Heard from" value={selected.heardFrom} />
                <Field label="Referred by" value={selected.referredBy ?? 'Organic'} />
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-5 border-t border-stone-100 space-y-2">
              {selected.status !== 'accepted' && selected.status !== 'rejected' && (
                <div className="grid grid-cols-2 gap-2">
                  {selected.status !== 'reviewed' && (
                    <button
                      onClick={() => handleAction('reviewed')}
                      disabled={loading}
                      className="py-2.5 rounded-xl text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
                    >
                      Mark Reviewed
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('accepted')}
                    disabled={loading}
                    className="py-2.5 rounded-xl text-sm font-semibold bg-green-50 text-green-700 hover:bg-green-100 transition-colors disabled:opacity-50 col-span-1"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction('rejected')}
                    disabled={loading}
                    className={`py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 ${
                      selected.status !== 'reviewed' ? 'col-span-1' : 'col-span-2'
                    }`}
                  >
                    Reject
                  </button>
                </div>
              )}
              {(selected.status === 'accepted' || selected.status === 'rejected') && (
                <button
                  onClick={() => handleAction('pending')}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-stone-100 text-text-secondary hover:bg-stone-200 transition-colors disabled:opacity-50"
                >
                  Reset to Pending
                </button>
              )}
            </div>
          </>
        )}
      </Drawer>
    </>
  )
}
