import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'CIA NGO — Empowering Communities',
  description: 'CIA NGO works to empower communities through education and grassroots action. Donate, volunteer, or partner with us.',
  keywords: 'NGO, donate India, education, community, volunteer',
  openGraph: {
    title: 'CIA NGO — Empowering Communities',
    description: 'Join us in empowering communities through education and action.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
