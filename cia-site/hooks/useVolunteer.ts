'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Volunteer } from '@/types'

interface UseVolunteerResult {
  volunteer: Volunteer | null
  loading: boolean
  error: string | null
}

export function useVolunteer(code: string | null): UseVolunteerResult {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) {
      setVolunteer(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const q = query(
      collection(db, 'volunteers'),
      where('referralCode', '==', code)
    )

    getDocs(q)
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]
          setVolunteer({ id: doc.id, ...doc.data() } as Volunteer)
        } else {
          setVolunteer(null)
        }
      })
      .catch((err) => {
        setError('Failed to load volunteer info')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [code])

  return { volunteer, loading, error }
}
