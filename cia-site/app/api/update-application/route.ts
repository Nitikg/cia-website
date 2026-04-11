import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  const { id, status } = await request.json()
  if (!id || !status) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  await adminDb.collection('applications').doc(id).update({ status })
  return NextResponse.json({ success: true })
}
