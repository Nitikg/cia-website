const problems = [
  {
    stat: '6 crore children in India lack access to quality primary education',
    source: 'Source: ASER Report 2023',
  },
  {
    stat: 'Only 1 in 3 children in urban slums completes middle school',
    source: '',
  },
  {
    stat: '₹200 — the average monthly spend on stationery a family in a slum cannot afford',
    source: '',
  },
]

const programs = [
  {
    name: 'Project Shiksha',
    tagline: 'Learning without barriers',
    serves: 'Children aged 6–14 in Delhi & NCR slum communities',
    description:
      'We run after-school learning centres staffed by trained facilitators, providing structured curricula, reading materials, and one-on-one tutoring.',
    stats: '3 centres, 200 children enrolled',
    started: '2022',
    colorClass: 'border-primary',
    badgeClass: 'bg-primary/10 text-primary-dark',
  },
  {
    name: 'Drive For Good',
    tagline: 'Resources that reach the last mile',
    serves: 'Families across 6 cities',
    description:
      'Monthly community drives distributing stationery kits, books, and hygiene materials directly to families.',
    stats: '24 drives completed, 500+ families reached',
    started: '2021',
    colorClass: 'border-accent',
    badgeClass: 'bg-accent/10 text-accent',
  },
]

const pillars = [
  {
    title: 'Experiential Learning',
    description: 'We create hands-on, engaging learning experiences.',
    points: [
      "Structured curriculum tailored to each child's level",
      'Activity-based learning with real materials',
    ],
  },
  {
    title: 'Community Ownership',
    description: 'We involve the community in every step.',
    points: [
      'Local facilitators from the community itself',
      'Family engagement sessions every month',
    ],
  },
  {
    title: 'Volunteer Mobilisation',
    description: 'We empower young people to drive change.',
    points: [
      'Fundraising intern programme with 120+ volunteers',
      'Corporate volunteer days',
    ],
  },
]

const liveStats = [
  { value: '6', label: 'Cities' },
  { value: '500+', label: 'Children Reached' },
  { value: '24', label: 'Drives Conducted' },
  { value: '3', label: 'Learning Centres' },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface text-center">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary-dark">
            Our Work
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
            What We Do, and Why It Matters
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Every programme we run is grounded in real need and designed for real impact.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10 text-center">
            The Problem We&apos;re Solving
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl shadow-sm p-7 flex flex-col gap-3 border-t-4 border-primary"
              >
                <p className="text-text-primary font-semibold leading-snug text-lg">{p.stat}</p>
                {p.source && (
                  <p className="text-xs text-text-secondary italic mt-auto">{p.source}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10 text-center">
            Our Programmes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {programs.map((prog) => (
              <div
                key={prog.name}
                className={`bg-white rounded-2xl shadow-md p-8 border-l-4 ${prog.colorClass}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">{prog.name}</h3>
                    <p className="italic text-text-secondary mt-1">&ldquo;{prog.tagline}&rdquo;</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${prog.badgeClass}`}>
                    Since {prog.started}
                  </span>
                </div>
                <p className="text-sm font-semibold text-text-secondary mb-2">
                  Serves: {prog.serves}
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">{prog.description}</p>
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm font-semibold text-text-primary">
                  {prog.stats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10 text-center">
            Three Pillars of Our Approach
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-surface rounded-2xl shadow-sm p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{pillar.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

      {/* Live Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-dark">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {liveStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <span className="text-5xl sm:text-6xl font-bold text-white">{stat.value}</span>
                <span className="text-white/80 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
