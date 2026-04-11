const signals = [
  {
    icon: '🏛️',
    title: 'Registered NGO',
    detail: 'Reg. No. CIA/2021/DL/001',
  },
  {
    icon: '📋',
    title: '80G Tax Benefit Applicable',
    detail: 'Save up to 50% on your donation',
  },
  {
    icon: '🔒',
    title: 'Payments Secured',
    detail: 'Powered by Razorpay',
  },
]

export default function TrustSignals() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
      {signals.map((signal) => (
        <div
          key={signal.title}
          className="flex items-start gap-2.5 flex-1"
        >
          <span className="text-xl mt-0.5" role="img" aria-label={signal.title}>
            {signal.icon}
          </span>
          <div>
            <p className="text-xs font-semibold text-text-primary leading-tight">
              {signal.title}
            </p>
            <p className="text-xs text-text-secondary leading-tight mt-0.5">
              {signal.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
