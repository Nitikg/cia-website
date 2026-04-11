const timeline = [
  {
    year: '2021',
    event: 'CIA NGO founded by Nitik Gupta after witnessing the education gap in Delhi\'s underserved communities.',
  },
  {
    year: '2022',
    event: 'First 3 learning centres launched. 50 children enrolled.',
  },
  {
    year: '2023',
    event: 'Expanded to 3 cities. 200+ children reached. First volunteer cohort of 40 fundraising interns.',
  },
  {
    year: '2024',
    event: '6 cities. 500+ children reached. 120+ volunteers. First corporate CSR partnership.',
  },
  {
    year: '2025',
    event: 'Scaling to 10 cities with a goal of reaching 1,000 children by year-end.',
  },
]

const team = [
  {
    name: 'Nitik Gupta',
    role: 'Founder & President',
    bio: 'Nitik started CIA NGO after seeing the education gap in his own community. He leads strategy, partnerships, and the volunteer programme.',
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Head',
    bio: 'Priya oversees the day-to-day operations of all learning centres. She has 8 years of experience in the development sector.',
  },
  {
    name: 'Rahul Verma',
    role: 'Community Lead',
    bio: 'Rahul coordinates community outreach and manages relationships with families and local partners.',
  },
]

const avatarColors = ['#F97316', '#0D9488', '#C2410C']

export default function AboutPage() {
  return (
    <>
      {/* Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary-dark">
            About CIA NGO
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Future-proofing the next generation, today.
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            We believe every child, regardless of where they were born, deserves access to quality
            education and community support. Our vision is an India where no child&apos;s potential
            is wasted.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10 text-center">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-surface rounded-2xl shadow-sm p-8 border-l-4 border-primary">
              <h3 className="text-xl font-bold text-primary mb-3">With every child:</h3>
              <p className="text-text-secondary leading-relaxed">
                We provide direct learning support, stationery, and mentorship to children in
                underserved communities.
              </p>
            </div>
            <div className="bg-surface rounded-2xl shadow-sm p-8 border-l-4 border-accent">
              <h3 className="text-xl font-bold text-accent mb-3">For every child:</h3>
              <p className="text-text-secondary leading-relaxed">
                We advocate for systemic change, working toward a future where no child lacks the
                basics to learn and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" aria-hidden="true" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col sm:flex-row gap-6 sm:gap-0 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`pl-16 sm:pl-0 sm:w-5/12 ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <p className="text-text-secondary mt-1 leading-relaxed">{item.event}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow" aria-hidden="true" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block sm:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-10 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={member.name}
                className="bg-surface rounded-2xl shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-bold"
                  style={{ background: avatarColors[i] }}
                  aria-label={`${member.name} avatar`}
                >
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-text-primary">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
