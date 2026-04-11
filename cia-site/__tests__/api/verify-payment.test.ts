import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import crypto from 'crypto'

// Mock firebase-admin
vi.mock('@/lib/firebase-admin', () => ({
  adminDb: {
    collection: vi.fn(() => ({
      add: vi.fn().mockResolvedValue({ id: 'new_doc_id' }),
    })),
  },
}))

// Mock firebase-admin/firestore FieldValue
vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    serverTimestamp: vi.fn(() => 'mock_timestamp'),
  },
}))

import { POST } from '@/app/api/verify-payment/route'
import { adminDb } from '@/lib/firebase-admin'

const MOCK_SECRET = 'test_razorpay_secret'

function makeValidSignature(orderId: string, paymentId: string): string {
  return crypto
    .createHmac('sha256', MOCK_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')
}

describe('POST /api/verify-payment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RAZORPAY_KEY_SECRET = MOCK_SECRET
  })

  it('verifies valid signature and writes to Firestore', async () => {
    const orderId = 'order_123'
    const paymentId = 'pay_456'
    const signature = makeValidSignature(orderId, paymentId)

    const request = new NextRequest('http://localhost/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify({
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        donor: { name: 'Test User', email: 'test@test.com', phone: '9999999999', pan: 'ABCDE1234F' },
        volunteerCode: 'arya2511',
        amount: 1000,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(adminDb.collection).toHaveBeenCalledWith('donations')
  })

  it('rejects invalid signature and does NOT write to Firestore', async () => {
    const request = new NextRequest('http://localhost/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify({
        razorpayOrderId: 'order_123',
        razorpayPaymentId: 'pay_456',
        razorpaySignature: 'tampered_signature',
        donor: { name: 'Bad Actor', email: 'bad@bad.com', phone: '1111111111' },
        volunteerCode: null,
        amount: 1000,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeTruthy()
    // Firestore add should NOT have been called
    const mockCollection = vi.mocked(adminDb.collection)
    if (mockCollection.mock.results.length > 0) {
      // If collection was called, add should not have been called
      expect(mockCollection.mock.results[0].value.add).not.toHaveBeenCalled()
    } else {
      expect(mockCollection).not.toHaveBeenCalled()
    }
  })

  it('saves null volunteerCode when no referral', async () => {
    const orderId = 'order_789'
    const paymentId = 'pay_012'
    const signature = makeValidSignature(orderId, paymentId)

    const mockAdd = vi.fn().mockResolvedValue({ id: 'doc' })
    vi.mocked(adminDb.collection).mockReturnValue({ add: mockAdd } as any)

    const request = new NextRequest('http://localhost/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify({
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        donor: { name: 'Organic Donor', email: 'organic@test.com', phone: '8888888888' },
        volunteerCode: null,
        amount: 500,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ volunteerCode: null })
    )
  })
})
