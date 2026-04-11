export const dynamic = 'force-dynamic'

import { adminDb } from '@/lib/firebase-admin'
import KPICards from '@/components/admin/KPICards'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Donation, Volunteer, Application } from '@/types'
import Link from 'next/link'

async function getDashboardData() {
  const [donationsSnap, volunteersSnap, applicationsSnap, allVolunteersSnap] = await Promise.all([
    adminDb.collection('donations').where('status', '==', 'success').get(),
    adminDb.collection('volunteers').where('isActive', '==', true).get(),
    adminDb.collection('applications').where('status', '==', 'pending').get(),
    adminDb.collection('volunteers').get(),
  ])

  const donations = donationsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Donation[]

  const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0)
  const totalDonors = donations.length

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthRaised = donations
    .filter((d) => d.createdAt?.toDate?.() >= monthStart)
    .reduce((sum, d) => sum + d.amount, 0)

  const activeVolunteers = volunteersSnap.size
  const pendingApplications = applicationsSnap.size

  // Recent 5 donations
  const recentDonations = [...donations]
    .sort((a, b) => {
      const aTime = a.createdAt?.toDate?.()?.getTime?.() ?? 0
      const bTime = b.createdAt?.toDate?.()?.getTime?.() ?? 0
      return bTime - aTime
    })
    .slice(0, 5)

  // Top 3 volunteers by total raised
  const allVolunteers = allVolunteersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Volunteer[]
  const volunteerStats = allVolunteers.map((v) => {
    const vDonations = donations.filter((d) => d.volunteerCode === v.referralCode)
    const total = vDonations.reduce((sum, d) => sum + d.amount, 0)
    return { ...v, total, count: vDonations.length }
  })
  const topVolunteers = volunteerStats.sort((a, b) => b.total - a.total).slice(0, 3)

  return {
    totalRaised,
    monthRaised,
    totalDonors,
    activeVolunteers,
    pendingApplications,
    recentDonations,
    topVolunteers,
  }
}

export default async function AdminDashboard() {
  const {
    totalRaised,
    monthRaised,
    totalDonors,
    activeVolunteers,
    pendingApplications,
    recentDonations,
    topVolunteers,
  } = await getDashboardData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Overview of all activity</p>
      </div>

      <KPICards
        totalRaised={totalRaised}
        monthRaised={monthRaised}
        totalDonors={totalDonors}
        activeVolunteers={activeVolunteers}
        pendingApplications={pendingApplications}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Donations */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Recent Donations</h2>
            <Link href="/admin/donations" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentDonations.length === 0 ? (
            <p className="text-text-secondary text-sm">No donations yet.</p>
          ) : (
            <div className="space-y-3">
              {recentDonations.map((d) => (
                <div key={d.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-text-primary text-sm font-medium">{d.donorName}</p>
                    <p className="text-text-secondary text-xs">
                      {d.createdAt ? formatDate(d.createdAt) : '—'}
                    </p>
                  </div>
                  <span className="text-text-primary font-semibold text-sm">
                    {formatCurrency(d.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Volunteers */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Top Volunteers</h2>
            <Link href="/admin/volunteers" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {topVolunteers.length === 0 ? (
            <p className="text-text-secondary text-sm">No volunteers yet.</p>
          ) : (
            <div className="space-y-3">
              {topVolunteers.map((v, i) => (
                <div key={v.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-stone-300 w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">{v.name}</p>
                    <p className="text-text-secondary text-xs">{v.count} donations</p>
                  </div>
                  <span className="text-primary font-semibold text-sm whitespace-nowrap">
                    {formatCurrency(v.total)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Applications */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex items-center justify-between">
        <div>
          <p className="font-bold text-text-primary">Pending Applications</p>
          <p className="text-text-secondary text-sm mt-0.5">
            {pendingApplications} application{pendingApplications !== 1 ? 's' : ''} awaiting review
          </p>
        </div>
        <Link
          href="/admin/applications"
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Review
        </Link>
      </div>
    </div>
  )
}
