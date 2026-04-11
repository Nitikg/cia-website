'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">CIA</span>
            <span className="hidden sm:block text-sm text-text-secondary font-medium">NGO</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">Home</Link>
            <Link href="/about" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">About Us</Link>
            <Link href="/work" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">Our Work</Link>
            <Link href="/get-involved" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">Get Involved</Link>
            <Link
              href="/donate"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-orange-100 flex flex-col gap-3">
            <Link href="/" className="text-text-secondary hover:text-primary py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-text-secondary hover:text-primary py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link href="/work" className="text-text-secondary hover:text-primary py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>Our Work</Link>
            <Link href="/get-involved" className="text-text-secondary hover:text-primary py-2 text-sm font-medium" onClick={() => setMenuOpen(false)}>Get Involved</Link>
            <Link
              href="/donate"
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold text-center"
              onClick={() => setMenuOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
