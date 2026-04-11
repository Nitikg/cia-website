'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Donation, Volunteer, Application } from '@/types'

interface AdminData {
  donations: Donation[]
  volunteers: Volunteer[]
  applications: Application[]
  loading: boolean
  error: string | null
}

export function useAdminData(): AdminData {
  const [donations, setDonations] = useState<Donation[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)

    Promise.all([
      getDocs(query(collection(db, 'donations'), where('status', '==', 'success'))),
      getDocs(collection(db, 'volunteers')),
      getDocs(collection(db, 'applications')),
    ])
      .then(([donSnap, volSnap, appSnap]) => {
        setDonations(donSnap.docs.map(d => ({ id: d.id, ...d.data() } as Donation)))
        setVolunteers(volSnap.docs.map(d => ({ id: d.id, ...d.data() } as Volunteer)))
        setApplications(appSnap.docs.map(d => ({ id: d.id, ...d.data() } as Application)))
      })
      .catch(() => setError('Failed to load admin data'))
      .finally(() => setLoading(false))
  }, [])

  return { donations, volunteers, applications, loading, error }
}
