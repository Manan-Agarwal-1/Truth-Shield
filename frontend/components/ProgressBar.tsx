'use client'

interface ProgressBarProps {
  value: number
  colorClass: string
  height?: string
  className?: string
}

export default function ProgressBar({
  value,
  colorClass,
  height = 'h-2',
  className = '',
}: ProgressBarProps) {
  return (
    <progress
      value={value}
      max={100}
      className={`progress-bar w-full rounded-full ${height} ${colorClass} ${className}`}
      aria-label="Progress"
    />
  )
}
