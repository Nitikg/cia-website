import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import StoryCards from '@/components/home/StoryCards'
import FounderNote from '@/components/home/FounderNote'
import HowWeHelp from '@/components/home/HowWeHelp'
import ImpactCounters from '@/components/home/ImpactCounters'
import AwardsMedia from '@/components/home/AwardsMedia'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StoryCards />
      <FounderNote />
      <HowWeHelp />

      {/* CTA Strip */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary-dark">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to make a difference?
            </h2>
            <p className="text-white/80">
              Every rupee goes directly toward a child&apos;s education.
            </p>
          </div>
          <Link
            href="/donate"
            className="flex-shrink-0 bg-white text-primary-dark hover:bg-surface rounded-full px-8 py-3.5 font-semibold transition-colors shadow-md"
          >
            Donate Now
          </Link>
        </div>
      </section>

      <ImpactCounters />
      <AwardsMedia />
    </>
  )
}
