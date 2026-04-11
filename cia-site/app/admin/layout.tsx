import AdminGuard from '@/components/admin/AdminGuard'
import AdminNav from '@/components/admin/AdminNav'

export const metadata = {
  title: 'Admin — CIA NGO',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-stone-50">
        <AdminNav />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </AdminGuard>
  )
}
