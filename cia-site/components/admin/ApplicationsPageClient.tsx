'use client'

import { useState } from 'react'
import { Application } from '@/types'
import ApplicationsTable from './ApplicationsTable'

interface ApplicationsPageClientProps {
  initialApplications: Application[]
}

export default function ApplicationsPageClient({ initialApplications }: ApplicationsPageClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications)

  async function handleStatusChange(id: string, status: Application['status']) {
    // Optimistic update
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    )
    try {
      const res = await fetch('/api/update-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error('Failed')
    } catch {
      // Revert on failure
      setApplications(initialApplications)
      alert('Failed to update application status.')
    }
  }

  return (
    <ApplicationsTable
      applications={applications}
      onStatusChange={handleStatusChange}
    />
  )
}
