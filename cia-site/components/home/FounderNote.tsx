export default function FounderNote() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            A Note from Our Founder
          </h2>
        </div>

        <div className="bg-surface rounded-2xl shadow-md p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3 sm:items-start">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)' }}
              aria-label="Nitik Gupta photo placeholder"
            >
              <svg viewBox="0 0 96 96" className="w-20 h-20" fill="none" aria-hidden="true">
                <circle cx="48" cy="36" r="20" fill="#FFF7ED" opacity="0.9" />
                <ellipse cx="48" cy="80" rx="28" ry="22" fill="#FFF7ED" opacity="0.7" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-text-primary">Nitik Gupta</p>
              <p className="text-sm text-text-secondary">Founder &amp; President</p>
            </div>
          </div>

          {/* Quote */}
          <div className="flex-1">
            <svg className="w-8 h-8 text-primary mb-3 opacity-60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="italic text-text-secondary leading-relaxed text-base sm:text-lg">
              I started CIA NGO after witnessing firsthand the gap between children who have everything
              they need to learn and those who have nothing but the will. Growing up, I was fortunate —
              but I saw, in my own neighbourhood, children whose futures were written before they even
              began. That&apos;s not a statistic. That&apos;s a failure of community.
              <br /><br />
              CIA NGO started with one drive, one classroom, and three volunteers. Today it has grown
              into something I&apos;m deeply proud of — but we&apos;re not done. Every child deserves a
              fair start. Not because it&apos;s charity, but because it&apos;s right. Whether you donate
              ₹500 or give your time, you become part of this story.
              <br /><br />
              <span className="not-italic font-semibold text-text-primary">With gratitude, Nitik Gupta</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
