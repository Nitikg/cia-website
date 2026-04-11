import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock Razorpay
vi.mock('@/lib/razorpay', () => ({
  razorpay: {
    orders: {
      create: vi.fn(),
    },
  },
}))

import { POST } from '@/app/api/create-order/route'
import { razorpay } from '@/lib/razorpay'

describe('POST /api/create-order', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an order with correct paise amount', async () => {
    const mockOrder = { id: 'order_abc123', amount: 100000, currency: 'INR' }
    vi.mocked(razorpay.orders.create).mockResolvedValue(mockOrder as any)

    const request = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: 1000 }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.orderId).toBe('order_abc123')
    expect(razorpay.orders.create).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 100000, currency: 'INR' })
    )
  })

  it('returns 400 for zero amount', async () => {
    const request = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: 0 }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns 400 for missing amount', async () => {
    const request = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns 400 for negative amount', async () => {
    const request = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: -500 }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns 500 when Razorpay throws', async () => {
    vi.mocked(razorpay.orders.create).mockRejectedValue(new Error('Network error'))

    const request = new NextRequest('http://localhost/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: 500 }),
      headers: { 'Content-Type': 'application/json' },
    })

    const response = await POST(request)
    expect(response.status).toBe(500)
  })
})
