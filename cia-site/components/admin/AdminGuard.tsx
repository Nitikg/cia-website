'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim())

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'unauthenticated' | 'unauthorized' | 'authorized'>('loading')
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus('unauthenticated')
      } else if (!ADMIN_EMAILS.includes(user.email || '')) {
        setUserEmail(user.email)
        setStatus('unauthorized')
      } else {
        setUserEmail(user.email)
        setStatus('authorized')
      }
    })
    return () => unsubscribe()
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm w-full text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h1 className="text-xl font-bold text-text-primary mb-2">Admin Login</h1>
          <p className="text-text-secondary text-sm mb-6">Sign in with your authorised Google account</p>
          <button
            onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
            className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  if (status === 'unauthorized') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-sm w-full text-center">
          <div className="text-4xl mb-4">⛔</div>
          <h1 className="text-xl font-bold text-text-primary mb-2">Access Denied</h1>
          <p className="text-text-secondary text-sm mb-4">{userEmail} is not an admin account.</p>
          <button onClick={() => signOut(auth)} className="text-sm text-primary hover:underline">Sign out</button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
