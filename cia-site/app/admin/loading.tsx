export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page title shimmer */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-stone-200 rounded-lg" />
        <div className="h-4 w-32 bg-stone-100 rounded" />
      </div>

      {/* Cards row shimmer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 space-y-3">
            <div className="h-4 w-24 bg-stone-100 rounded" />
            <div className="h-7 w-16 bg-stone-200 rounded" />
          </div>
        ))}
      </div>

      {/* Table shimmer */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-5 border-b border-stone-100">
          <div className="h-5 w-36 bg-stone-200 rounded" />
        </div>
        <div className="divide-y divide-stone-100">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-4 w-32 bg-stone-100 rounded" />
              <div className="h-4 w-40 bg-stone-100 rounded" />
              <div className="h-4 w-20 bg-stone-100 rounded ml-auto" />
              <div className="h-6 w-16 bg-stone-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
