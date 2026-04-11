'use client'

import { useSearchParams } from 'next/navigation'
import ApplicationForm from '@/components/apply/ApplicationForm'

export default function ApplyPageClient() {
  const searchParams = useSearchParams()
  const referredBy = searchParams.get('r') ?? undefined
  return <ApplicationForm referredBy={referredBy} />
}
