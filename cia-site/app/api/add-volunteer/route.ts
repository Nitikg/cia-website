import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'
import { generateReferralCode } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const { name, email, phone } = await request.json()
  if (!name || !email || !phone) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const referralCode = generateReferralCode(name)
  await adminDb.collection('volunteers').add({
    name, email, phone, referralCode,
    isActive: true,
    createdAt: FieldValue.serverTimestamp(),
  })

  return NextResponse.json({ success: true, referralCode })
}
