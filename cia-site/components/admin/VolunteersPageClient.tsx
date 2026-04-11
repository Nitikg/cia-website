'use client'

import { useState } from 'react'
import { Volunteer, Donation } from '@/types'
import VolunteerTable from './VolunteerTable'
import AddVolunteerModal from './AddVolunteerModal'

interface VolunteersPageClientProps {
  initialVolunteers: Volunteer[]
  donations: Donation[]
}

export default function VolunteersPageClient({ initialVolunteers, donations }: VolunteersPageClientProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers)
  const [showModal, setShowModal] = useState(false)

  async function handleDeactivate(id: string) {
    try {
      await fetch('/api/update-volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isActive: false }),
      })
      setVolunteers((prev) =>
        prev.map((v) => (v.id === id ? { ...v, isActive: false } : v))
      )
    } catch {
      alert('Failed to deactivate volunteer.')
    }
  }

  function handleAddSuccess(_referralCode: string, _name: string) {
    // Refresh will happen on next page load; modal shows the code
  }

  return (
    <>
      <VolunteerTable
        volunteers={volunteers}
        donations={donations}
        onDeactivate={handleDeactivate}
        onAddVolunteer={() => setShowModal(true)}
      />
      {showModal && (
        <AddVolunteerModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </>
  )
}
