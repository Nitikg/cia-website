'use client'

import { Application } from '@/types'
import { formatDate } from '@/lib/utils'

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

export default function ApplicationsTable({ applications, onStatusChange }: ApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 text-center text-text-secondary">
        No applications yet.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="px-4 py-3 text-left font-semibold text-text-secondary whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">City</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Occupation</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary whitespace-nowrap">Availability</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                  {app.createdAt ? formatDate(app.createdAt) : '—'}
                </td>
                <td className="px-4 py-3 text-text-primary font-medium">{app.name}</td>
                <td className="px-4 py-3 text-text-secondary">{app.city}</td>
                <td className="px-4 py-3 text-text-secondary">{app.occupation}</td>
                <td className="px-4 py-3 text-text-secondary">{availabilityLabel[app.availability]}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) => onStatusChange(app.id, e.target.value as Application['status'])}
                    className="text-xs border border-stone-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
