'use client'

import { formatCurrency } from '@/lib/utils'

interface KPICardsProps {
  totalRaised: number
  monthRaised: number
  totalDonors: number
  activeVolunteers: number
  pendingApplications: number
}

interface CardProps {
  label: string
  value: string
  accent?: boolean
}

function Card({ label, value, accent }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
      <p className={`text-3xl font-extrabold ${accent ? 'text-primary' : 'text-text-primary'}`}>{value}</p>
      <p className="text-text-secondary text-sm mt-1">{label}</p>
    </div>
  )
}

export default function KPICards({
  totalRaised,
  monthRaised,
  totalDonors,
  activeVolunteers,
  pendingApplications,
}: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card label="Total Raised (All Time)" value={formatCurrency(totalRaised)} accent />
      <Card label="This Month" value={formatCurrency(monthRaised)} />
      <Card label="Total Donors" value={totalDonors.toLocaleString('en-IN')} />
      <Card label="Active Volunteers" value={activeVolunteers.toLocaleString('en-IN')} />
      <Card label="Pending Applications" value={pendingApplications.toLocaleString('en-IN')} />
    </div>
  )
}
