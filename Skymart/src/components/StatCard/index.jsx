const ACCENTS = {
  accent: {
    bg: 'bg-accent/15',
    text: 'text-accent',
  },
  green: {
    bg: 'bg-[rgba(194,255,0,0.12)]',
    text: 'text-[#B5EE00]',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  purple: {
    bg: 'bg-purple-500/12',
    text: 'text-purple-400',
  },
  pink: {
    bg: 'bg-pink-500/12',
    text: 'text-pink-400',
  },
}

export default function StatCard({
  icon,
  value,
  label,
  sublabel,
  accent = 'green',
  className = '',
}) {
  const a = ACCENTS[accent] || ACCENTS.green

  return (
    <div
      className={`rounded-3xl border border-surface-border bg-surface-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-surface-hover ${className}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 shrink-0 rounded-2xl ${a.bg} ${a.text} flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink-muted">{label}</p>
          <p className="text-2xl sm:text-3xl font-black text-ink mt-1 tracking-tight truncate">
            {value}
          </p>
          {sublabel && (
            <p className="text-xs text-ink-soft mt-1">{sublabel}</p>
          )}
        </div>
      </div>
    </div>
  )
}
