/**
 * Generates a URL-safe referral code from a name.
 * Example: "Arya Sharma" + timestamp → "arya2511"
 */
export function generateReferralCode(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)[0]
    .slice(0, 8)

  const suffix = Date.now().toString().slice(-4)
  return `${base}${suffix}`
}

/**
 * Formats a number as Indian Rupees.
 * Example: 1000 → "₹1,000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats an ISO date string to a readable string.
 */
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
