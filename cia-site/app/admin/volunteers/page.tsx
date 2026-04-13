export const dynamic = 'force-dynamic'

import { adminDb } from '@/lib/firebase-admin'
import VolunteersPageClient from '@/components/admin/VolunteersPageClient'
import { Volunteer, Donation } from '@/types'

async function getData() {
  const [volunteersSnap, donationsSnap] = await Promise.all([
    adminDb.collection('volunteers').orderBy('createdAt', 'desc').get(),
    adminDb.collection('donations').where('status', '==', 'success').get(),
  ])
  const volunteers = volunteersSnap.docs.map((doc) => {
    const data = doc.data()
    return { ...data, id: doc.id, createdAt: data.createdAt?.toDate?.()?.toISOString() ?? '' }
  }) as Volunteer[]
  const donations = donationsSnap.docs.map((doc) => {
    const data = doc.data()
    return { ...data, id: doc.id, createdAt: data.createdAt?.toDate?.()?.toISOString() ?? '' }
  }) as Donation[]
  return { volunteers, donations }
}

export default async function VolunteersPage() {
  const { volunteers, donations } = await getData()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Volunteers</h1>
        <p className="text-text-secondary text-sm mt-1">
          {volunteers.length} volunteer{volunteers.length !== 1 ? 's' : ''} total
        </p>
      </div>
      <VolunteersPageClient initialVolunteers={volunteers} donations={donations} />
    </div>
  )
}
