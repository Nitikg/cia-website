import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useVolunteer } from '@/hooks/useVolunteer'

// Mock Firebase
vi.mock('@/lib/firebase', () => ({ db: {} }))
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
}))

import { getDocs } from 'firebase/firestore'

const mockVolunteer = {
  id: 'vol_1',
  name: 'Arya Sharma',
  email: 'arya@example.com',
  phone: '9876543210',
  referralCode: 'arya2511',
  isActive: true,
  createdAt: { toDate: () => new Date() } as any,
}

describe('useVolunteer', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns null volunteer when code is null', async () => {
    const { result } = renderHook(() => useVolunteer(null))
    expect(result.current.volunteer).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('fetches and returns volunteer when code is found', async () => {
    vi.mocked(getDocs).mockResolvedValue({
      empty: false,
      docs: [{ id: 'vol_1', data: () => mockVolunteer }],
    } as any)

    const { result } = renderHook(() => useVolunteer('arya2511'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.volunteer).not.toBeNull()
    expect(result.current.volunteer?.name).toBe('Arya Sharma')
    expect(result.current.volunteer?.referralCode).toBe('arya2511')
  })

  it('returns null when referral code is not found', async () => {
    vi.mocked(getDocs).mockResolvedValue({
      empty: true,
      docs: [],
    } as any)

    const { result } = renderHook(() => useVolunteer('notexist'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.volunteer).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('returns error when Firestore throws', async () => {
    vi.mocked(getDocs).mockRejectedValue(new Error('Firestore error'))

    const { result } = renderHook(() => useVolunteer('arya2511'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBeTruthy()
    expect(result.current.volunteer).toBeNull()
  })

  it('returns empty string code as null volunteer (no query made)', () => {
    const { result } = renderHook(() => useVolunteer(''))
    // empty string is falsy — treat same as null
    expect(result.current.volunteer).toBeNull()
    expect(result.current.loading).toBe(false)
  })
})
