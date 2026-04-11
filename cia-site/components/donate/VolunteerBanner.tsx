interface VolunteerBannerProps {
  volunteerName: string | null
}

export default function VolunteerBanner({ volunteerName }: VolunteerBannerProps) {
  if (!volunteerName) return null

  return (
    <div className="bg-accent/10 border border-accent/30 rounded-xl px-5 py-4 flex items-center gap-3">
      <span className="text-2xl" role="img" aria-label="raised hands">
        🙌
      </span>
      <p className="text-accent font-semibold text-sm sm:text-base">
        You&apos;re supporting <span className="font-bold">{volunteerName}</span>&apos;s fundraiser!
      </p>
    </div>
  )
}
