import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFBF5 60%, #FFF0D6 100%)' }}
    >
      {/* Decorative blob */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F97316 0%, #C2410C 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 min-h-[90vh] flex items-center">
        <div className="w-full text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          {/* Tagline badge */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary-dark tracking-wide">
            Empowering Communities Since 2021
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
            It Takes a Village to{' '}
            <span className="text-primary">Raise a Child</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Join us in building a fair, educated, and empowered community for every child who deserves a chance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/donate"
              className="bg-primary text-white hover:bg-primary-dark rounded-full px-8 py-3.5 font-semibold transition-colors text-center shadow-md hover:shadow-lg"
            >
              Donate Now
            </Link>
            <Link
              href="/apply"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-3.5 font-semibold transition-colors text-center"
            >
              Become a Volunteer
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              500+ Children Reached
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              6 Cities Covered
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              120 Volunteers
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
