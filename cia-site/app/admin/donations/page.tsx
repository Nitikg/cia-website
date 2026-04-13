export const dynamic = 'force-dynamic'

import { adminDb } from '@/lib/firebase-admin'
import DonationsTable from '@/components/admin/DonationsTable'
import { Donation } from '@/types'

async function getDonations(): Promise<Donation[]> {
  const snap = await adminDb
    .collection('donations')
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get()
  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? '',
    }
  }) as Donation[]
}

export default async function DonationsPage() {
  const donations = await getDonations()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Donations</h1>
        <p className="text-text-secondary text-sm mt-1">
          {donations.length} donation{donations.length !== 1 ? 's' : ''} (last 100)
        </p>
      </div>
      <DonationsTable donations={donations} />
    </div>
  )
}
