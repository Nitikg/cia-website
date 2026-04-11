export const dynamic = 'force-dynamic'

import { adminDb } from '@/lib/firebase-admin'
import ApplicationsPageClient from '@/components/admin/ApplicationsPageClient'
import { Application } from '@/types'

async function getApplications(): Promise<Application[]> {
  const snap = await adminDb
    .collection('applications')
    .orderBy('createdAt', 'desc')
    .get()
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Application[]
}

export default async function ApplicationsPage() {
  const applications = await getApplications()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Applications</h1>
        <p className="text-text-secondary text-sm mt-1">
          {applications.length} application{applications.length !== 1 ? 's' : ''} total
        </p>
      </div>
      <ApplicationsPageClient initialApplications={applications} />
    </div>
  )
}
