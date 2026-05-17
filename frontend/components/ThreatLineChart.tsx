'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

type DataPoint = {
  day: string
  scans: number
  threats: number
}

type ThreatLineChartProps = {
  data: DataPoint[]
}

export default function ThreatLineChart({ data }: ThreatLineChartProps) {
  return (
    <div className="card-dark p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Threat trend</p>
          <h3 className="text-lg font-semibold">Weekly activity</h3>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid stroke="#2d3561" strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fill: '#8da2db' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8da2db' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f1730', borderColor: '#2d3561' }} />
            <Line type="monotone" dataKey="scans" stroke="#00d4ff" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="threats" stroke="#b24bff" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
