type StatusBadgeProps = {
  label: string
  variant: 'safe' | 'suspicious' | 'danger'
}

const variants = {
  safe: 'bg-success/10 text-success border-success/20',
  suspicious: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
}

export default function StatusBadge({ label, variant }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${variants[variant]}`}>
      {label}
    </span>
  )
}
