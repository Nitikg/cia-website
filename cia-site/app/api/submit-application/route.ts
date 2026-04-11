import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, city, occupation, motivation, availability, linkedIn, heardFrom, referredBy } = body

    // Validate required fields
    if (!name || !email || !phone || !city || !occupation || !motivation || !availability || !heardFrom) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await adminDb.collection('applications').add({
      name,
      email,
      phone,
      city,
      occupation,
      motivation,
      availability,
      linkedIn: linkedIn || null,
      heardFrom,
      referredBy: referredBy || null,
      status: 'pending',
      createdAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('submit-application error:', error)
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
  }
}
