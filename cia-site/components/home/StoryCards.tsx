'use client'

import { useState, useEffect } from 'react'

const stories = [
  {
    name: 'Riya',
    age: 9,
    situation:
      'Riya lives in a single-room home with her parents and three siblings in a crowded Delhi slum. Her parents are daily wage workers and cannot afford notebooks or school fees.',
    risk: 'Without support, she faces dropping out before completing primary school.',
    avatar: 'girl',
  },
  {
    name: 'Arjun',
    age: 11,
    situation:
      'Arjun walks 3 km to the nearest government school, but without proper stationery or learning materials, he falls behind in class.',
    risk: 'Without support, he risks permanently falling out of the education system.',
    avatar: 'boy',
  },
]

function ChildAvatar({ type }: { type: 'girl' | 'boy' }) {
  return (
    <div className="w-full h-48 sm:h-56 rounded-xl flex items-end justify-center overflow-hidden" style={{ background: 'linear-gradient(180deg, #FED7AA 0%, #FDBA74 100%)' }}>
      {type === 'girl' ? (
        <svg viewBox="0 0 120 140" className="w-32 h-40" fill="none" aria-hidden="true">
          {/* Body */}
          <ellipse cx="60" cy="115" rx="28" ry="30" fill="#C2410C" />
          {/* Head */}
          <circle cx="60" cy="62" r="26" fill="#FBBF24" />
          {/* Hair */}
          <ellipse cx="60" cy="42" rx="26" ry="12" fill="#92400E" />
          <ellipse cx="38" cy="58" rx="8" ry="20" fill="#92400E" />
          <ellipse cx="82" cy="58" rx="8" ry="20" fill="#92400E" />
          {/* Eyes */}
          <circle cx="52" cy="62" r="3.5" fill="#1C1917" />
          <circle cx="68" cy="62" r="3.5" fill="#1C1917" />
          {/* Smile */}
          <path d="M52 72 Q60 78 68 72" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Neck */}
          <rect x="54" y="84" width="12" height="10" rx="4" fill="#FBBF24" />
        </svg>
      ) : (
        <svg viewBox="0 0 120 140" className="w-32 h-40" fill="none" aria-hidden="true">
          {/* Body */}
          <ellipse cx="60" cy="115" rx="28" ry="30" fill="#0D9488" />
          {/* Head */}
          <circle cx="60" cy="62" r="26" fill="#FBBF24" />
          {/* Hair */}
          <ellipse cx="60" cy="40" rx="25" ry="10" fill="#92400E" />
          {/* Eyes */}
          <circle cx="52" cy="62" r="3.5" fill="#1C1917" />
          <circle cx="68" cy="62" r="3.5" fill="#1C1917" />
          {/* Smile */}
          <path d="M52 72 Q60 78 68 72" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Neck */}
          <rect x="54" y="84" width="12" height="10" rx="4" fill="#FBBF24" />
        </svg>
      )}
    </div>
  )
}

export default function StoryCards() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % stories.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const story = stories[active]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
            Real Children. Real Stakes.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Behind every statistic is a child with a name, a dream, and a family counting on them.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500">
            <ChildAvatar type={story.avatar as 'girl' | 'boy'} />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-text-primary">{story.name}</span>
                <span className="text-sm font-medium bg-primary/10 text-primary-dark px-3 py-1 rounded-full">
                  {story.age} years old
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-3">{story.situation}</p>
              <p className="font-semibold text-primary-dark">{story.risk}</p>
              <p className="mt-4 text-xs text-text-secondary italic border-t border-gray-100 pt-3">
                * Names and identifying details are representative composites to protect the privacy of the children we serve.
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6" role="tablist" aria-label="Story navigation">
            {stories.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`View ${s.name}'s story`}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-primary scale-125' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
