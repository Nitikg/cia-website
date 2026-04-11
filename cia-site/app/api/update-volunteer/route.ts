import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  const { id, isActive } = await request.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await adminDb.collection('volunteers').doc(id).update({ isActive })
  return NextResponse.json({ success: true })
}
