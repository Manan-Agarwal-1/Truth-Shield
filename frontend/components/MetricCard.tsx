import { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  label: string
  value: string
  icon: LucideIcon
  description: string
  colorClass?: string
}

export default function MetricCard({ label, value, icon: Icon, description, colorClass = 'from-cyan-500 to-blue-500' }: MetricCardProps) {
  return (
    <div className="card-dark flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{label}</p>
          <p className="text-3xl font-semibold text-white mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-3xl bg-gradient-to-br ${colorClass} grid place-items-center text-white shadow-xl shadow-cyan-500/20`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  )
}
