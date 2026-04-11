import Link from 'next/link'

const paths = [
  {
    title: 'Donate',
    description:
      'Your donation directly funds learning materials, drives, and centre operations.',
    buttonLabel: 'Donate Now',
    href: '/donate',
    external: false,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    accent: 'border-primary bg-primary/5',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    title: 'Volunteer / Fundraising Intern',
    description:
      'Raise funds for CIA NGO by sharing your personal fundraising link. Get a certificate and real impact.',
    buttonLabel: 'Apply Now',
    href: '/apply',
    external: false,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    accent: 'border-accent bg-accent/5',
    iconBg: 'bg-accent/10 text-accent',
  },
  {
    title: 'Corporate / Institution Partner',
    description:
      'CSR, employee volunteering, or institutional partnerships. Let\'s build something meaningful together.',
    buttonLabel: 'Get in Touch',
    href: 'mailto:contact@ciangoorg.in',
    external: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accent: 'border-primary-dark bg-primary-dark/5',
    iconBg: 'bg-primary-dark/10 text-primary-dark',
  },
]

const volunteerActivities = [
  'Share your personal fundraising link on WhatsApp, Instagram, LinkedIn',
  'Track how much you\'ve raised',
  'Get an internship certificate',
  'Join a community of passionate young changemakers',
  'Time commitment: 4–6 hours/week for 1 month',
]

const partnerOptions = [
  {
    title: 'NGOs',
    points: ['Co-organise drives', 'Share resources', 'Refer families'],
  },
  {
    title: 'Corporate CSR',
    points: ['Adopt a drive', 'Employee volunteering days', 'Fund a learning centre'],
  },
  {
    title: 'Schools / Colleges',
    points: ['Host awareness workshops', 'Student volunteering programmes'],
  },
]

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface text-center">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary-dark">
            Get Involved
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            It takes a village to raise a child.{' '}
            <span className="text-primary">Join ours.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Whether you give ₹500, volunteer your time, or bring your organisation&apos;s resources —
            every contribution directly changes a child&apos;s future. There is a place for you here.
          </p>
        </div>
      </section>

      {/* Three Path Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10 text-center">
            How You Can Help
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {paths.map((path) => (
              <div
                key={path.title}
                className={`rounded-2xl shadow-md p-8 flex flex-col border-t-4 ${path.accent} hover:shadow-lg transition-shadow`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${path.iconBg}`}>
                  {path.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{path.title}</h3>
                <p className="text-text-secondary leading-relaxed flex-1 mb-6">{path.description}</p>
                {path.external ? (
                  <a
                    href={path.href}
                    className="bg-primary text-white hover:bg-primary-dark rounded-full px-6 py-3 font-semibold transition-colors text-center"
                  >
                    {path.buttonLabel}
                  </a>
                ) : (
                  <Link
                    href={path.href}
                    className="bg-primary text-white hover:bg-primary-dark rounded-full px-6 py-3 font-semibold transition-colors text-center"
                  >
                    {path.buttonLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Volunteers Do */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-center">
            What Volunteers Do
          </h2>
          <p className="text-text-secondary text-center mb-8">
            Our fundraising intern programme is designed to be flexible, impactful, and rewarding.
          </p>
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <ul className="space-y-4">
              {volunteerActivities.map((activity) => (
                <li key={activity} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-secondary">{activity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Link
                href="/apply"
                className="bg-primary text-white hover:bg-primary-dark rounded-full px-8 py-3.5 font-semibold transition-colors"
              >
                Apply to Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4 text-center">
            Partnership Options
          </h2>
          <p className="text-text-secondary text-center mb-10">
            We partner with organisations that share our belief in building fair futures.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partnerOptions.map((option) => (
              <div
                key={option.title}
                className="bg-surface rounded-2xl shadow-sm p-7 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-text-primary mb-4">{option.title}</h3>
                <ul className="space-y-2">
                  {option.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Have Questions?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            We&apos;d love to hear from you. Reach out and let&apos;s figure out the best way for you to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@ciangoorg.in"
              className="bg-white text-primary-dark hover:bg-surface rounded-full px-8 py-3.5 font-semibold transition-colors shadow-md"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-dark rounded-full px-8 py-3.5 font-semibold transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
