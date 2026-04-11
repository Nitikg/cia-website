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
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-14">
        <span className="font-bold text-text-primary text-sm mr-2 whitespace-nowrap">CIA NGO Admin</span>
        <div className="flex items-center gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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
          className="text-sm text-text-secondary hover:text-primary transition-colors ml-auto"
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}
