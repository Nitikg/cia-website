'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const navLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/donations', label: 'Donations' },
  { href: '/admin/volunteers', label: 'Volunteers' },
  { href: '/admin/applications', label: 'Applications' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-14 gap-3">
        <span className="font-bold text-text-primary text-sm whitespace-nowrap">CIA Admin</span>
        <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-stone-100'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
        <button
          onClick={() => signOut(auth)}
          className="shrink-0 p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-stone-100 transition-colors"
          title="Sign Out"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
