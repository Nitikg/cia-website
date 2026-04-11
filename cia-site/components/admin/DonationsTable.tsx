'use client'

import { Donation } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'

interface DonationsTableProps {
  donations: Donation[]
}

const statusColors: Record<Donation['status'], string> = {
  success: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  failed: 'bg-red-100 text-red-700',
}

export default function DonationsTable({ donations }: DonationsTableProps) {
  const sorted = [...donations].sort((a, b) => {
    const aTime = a.createdAt?.toDate?.()?.getTime?.() ?? 0
    const bTime = b.createdAt?.toDate?.()?.getTime?.() ?? 0
    return bTime - aTime
  })

  if (sorted.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 text-center text-text-secondary">
        No donations yet.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Donor Name</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary hidden md:table-cell">
                Volunteer Code
              </th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary hidden md:table-cell">
                Payment ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sorted.map((d) => (
              <tr key={d.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                  {d.createdAt ? formatDate(d.createdAt) : '—'}
                </td>
                <td className="px-4 py-3 text-text-primary font-medium">{d.donorName}</td>
                <td className="px-4 py-3 text-text-primary font-semibold whitespace-nowrap">
                  {formatCurrency(d.amount)}
                </td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                  {d.volunteerCode ?? 'N/A'}
                </td>
                <td className="px-4 py-3 text-text-secondary font-mono hidden md:table-cell">
                  {d.razorpayPaymentId ? d.razorpayPaymentId.slice(0, 12) : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[d.status]}`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
