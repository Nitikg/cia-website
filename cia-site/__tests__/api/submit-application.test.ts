import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/firebase-admin', () => ({
  adminDb: {
    collection: vi.fn(() => ({
      add: vi.fn().mockResolvedValue({ id: 'app_id' }),
    })),
  },
}))

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    serverTimestamp: vi.fn(() => 'mock_timestamp'),
  },
}))

import { POST } from '@/app/api/submit-application/route'

const validApplication = {
  name: 'Test Applicant',
  email: 'test@example.com',
  phone: '9876543210',
  city: 'Delhi',
  occupation: 'Student at IIT Delhi',
  motivation: 'I want to make a difference in my community and gain real-world experience.',
  availability: 'weekends',
  linkedIn: 'https://linkedin.com/in/testapplicant',
  heardFrom: 'Instagram',
  referredBy: null,
}

describe('POST /api/submit-application', () => {
  beforeEach(() => vi.clearAllMocks())

  it('successfully submits a valid application', async () => {
    const request = new NextRequest('http://localhost/api/submit-application', {
      method: 'POST',
      body: JSON.stringify(validApplication),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('returns 400 when required fields are missing', async () => {
    const request = new NextRequest('http://localhost/api/submit-application', {
      method: 'POST',
      body: JSON.stringify({ name: 'Only Name' }), // missing required fields
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('captures referral code when present', async () => {
    const { adminDb } = await import('@/lib/firebase-admin')
    const mockAdd = vi.fn().mockResolvedValue({ id: 'doc' })
    vi.mocked(adminDb.collection).mockReturnValue({ add: mockAdd } as any)

    const request = new NextRequest('http://localhost/api/submit-application', {
      method: 'POST',
      body: JSON.stringify({ ...validApplication, referredBy: 'arya2511' }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ referredBy: 'arya2511', status: 'pending' })
    )
  })

  it('sets status to pending on creation', async () => {
    const { adminDb } = await import('@/lib/firebase-admin')
    const mockAdd = vi.fn().mockResolvedValue({ id: 'doc' })
    vi.mocked(adminDb.collection).mockReturnValue({ add: mockAdd } as any)

    const request = new NextRequest('http://localhost/api/submit-application', {
      method: 'POST',
      body: JSON.stringify(validApplication),
      headers: { 'Content-Type': 'application/json' },
    })

    await POST(request)
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'pending' })
    )
  })
})
