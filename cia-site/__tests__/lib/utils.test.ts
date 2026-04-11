import { describe, it, expect } from 'vitest'
import { generateReferralCode, formatCurrency, formatDate } from '@/lib/utils'

describe('generateReferralCode', () => {
  it('returns a lowercase string', () => {
    const code = generateReferralCode('Arya Sharma')
    expect(code).toBe(code.toLowerCase())
  })

  it('uses the first name as base', () => {
    const code = generateReferralCode('Arya Sharma')
    expect(code.startsWith('arya')).toBe(true)
  })

  it('produces URL-safe output (no spaces or special chars)', () => {
    const code = generateReferralCode('Priya Singh!')
    expect(/^[a-z0-9]+$/.test(code)).toBe(true)
  })

  it('handles single-word names', () => {
    const code = generateReferralCode('Rahul')
    expect(code.startsWith('rahul')).toBe(true)
  })

  it('handles names with special characters', () => {
    const code = generateReferralCode('Aarav-Khan')
    expect(/^[a-z0-9]+$/.test(code)).toBe(true)
  })

  it('generates codes of reasonable length', () => {
    const code = generateReferralCode('Arya Sharma')
    expect(code.length).toBeGreaterThan(4)
    expect(code.length).toBeLessThanOrEqual(16)
  })
})

describe('formatCurrency', () => {
  it('formats 1000 as ₹1,000', () => {
    const result = formatCurrency(1000)
    expect(result).toContain('1,000')
    expect(result).toContain('₹')
  })

  it('formats 500 as ₹500', () => {
    const result = formatCurrency(500)
    expect(result).toContain('500')
  })

  it('formats 12000 as ₹12,000', () => {
    const result = formatCurrency(12000)
    expect(result).toContain('12,000')
  })
})

describe('formatDate', () => {
  it('formats a Date object correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toContain('2024')
    expect(result).toContain('Jan')
  })

  it('handles a Firestore-like Timestamp object with toDate()', () => {
    const fakeTimestamp = { toDate: () => new Date('2024-06-01') }
    const result = formatDate(fakeTimestamp)
    expect(result).toContain('2024')
    expect(result).toContain('Jun')
  })
})
