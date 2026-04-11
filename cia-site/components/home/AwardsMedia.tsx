export default function AwardsMedia() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Recognition &amp; Press
          </h2>
          <p className="text-text-secondary text-lg">
            Check back soon for our latest media coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image placeholder */}
              <div className="w-full h-36 bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-text-secondary text-sm text-center">Press coverage coming soon</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
