import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      donor,
      volunteerCode,
      amount,
    } = await request.json()

    // Verify HMAC SHA256 signature
    const body = razorpayOrderId + '|' + razorpayPaymentId
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Write donation to Firestore
    await adminDb.collection('donations').add({
      amount,
      donorName: donor.name,
      donorEmail: donor.email,
      donorPhone: donor.phone,
      donorPAN: donor.pan || null,
      volunteerCode: volunteerCode || null,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      status: 'success',
      createdAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('verify-payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
