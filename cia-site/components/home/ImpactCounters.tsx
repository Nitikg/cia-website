'use client'

import { useEffect, useRef, useState } from 'react'

const counters = [
  { label: 'Children Reached', target: 500, suffix: '+' },
  { label: 'Drives Conducted', target: 24, suffix: '' },
  { label: 'Volunteers Mobilised', target: 120, suffix: '' },
  { label: 'Cities Covered', target: 6, suffix: '' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const duration = 2000

  function animate(timestamp: number) {
    if (startRef.current === null) startRef.current = timestamp
    const elapsed = timestamp - startRef.current
    const progress = Math.min(elapsed / duration, 1)
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    setValue(Math.floor(eased * target))
    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      setValue(target)
    }
  }

  function start() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    startRef.current = null
    setValue(0)
    rafRef.current = requestAnimationFrame(animate)
  }

  return (
    <CounterObserver onVisible={start}>
      <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums">
        {value}{suffix}
      </span>
    </CounterObserver>
  )
}

function CounterObserver({
  onVisible,
  children,
}: {
  onVisible: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true
          onVisible()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [onVisible])

  return <div ref={ref}>{children}</div>
}

export default function ImpactCounters() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Impact So Far</h2>
          <p className="text-white/80 text-lg">Growing every day, one child at a time.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter) => (
            <div key={counter.label} className="flex flex-col items-center text-center gap-2">
              <AnimatedCounter target={counter.target} suffix={counter.suffix} />
              <span className="text-white/80 font-medium text-sm sm:text-base">{counter.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
