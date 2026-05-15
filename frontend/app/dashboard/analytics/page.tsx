'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, AlertTriangle, Shield, Zap } from 'lucide-react'

const weeklyData = [
  { date: 'Mon', scans: 45, threats: 8 },
  { date: 'Tue', scans: 52, threats: 12 },
  { date: 'Wed', scans: 38, threats: 5 },
  { date: 'Thu', scans: 61, threats: 15 },
  { date: 'Fri', scans: 55, threats: 9 },
  { date: 'Sat', scans: 35, threats: 3 },
  { date: 'Sun', scans: 42, threats: 7 },
]

const scanTypeData = [
  { name: 'URL Scans', value: 45, color: '#00d4ff' },
  { name: 'Message Scans', value: 28, color: '#b24bff' },
  { name: 'Deepfake Checks', value: 15, color: '#ff1744' },
  { name: 'News Verification', value: 12, color: '#ffb300' },
]

const COLORS = ['#00d4ff', '#b24bff', '#ff1744', '#ffb300']

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Track your threat detection activity and patterns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scans', value: '328', icon: Shield, change: '+12%' },
          { label: 'Threats Found', value: '59', icon: AlertTriangle, change: '+8%' },
          { label: 'This Week', value: '89', icon: TrendingUp, change: '+23%' },
          { label: 'Accuracy', value: '98.7%', icon: Zap, change: '+0.5%' },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="card-dark">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-success mt-1">{stat.change} vs last week</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="card-dark">
          <h2 className="text-lg font-bold mb-6">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3561" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: '#151a3a', border: '1px solid #2d3561', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="scans" stroke="#00d4ff" strokeWidth={2} name="Scans" />
              <Line type="monotone" dataKey="threats" stroke="#ff1744" strokeWidth={2} name="Threats" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scan Types Distribution */}
        <div className="card-dark">
          <h2 className="text-lg font-bold mb-6">Scan Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={scanTypeData} cx="50%" cy="50%" labelLine={false} label={(entry) => entry.name} dataKey="value">
                {scanTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#151a3a', border: '1px solid #2d3561', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-dark">
          <h2 className="text-lg font-bold mb-4">Top Threats Detected</h2>
          <div className="space-y-3">
            {[
              { name: 'Phishing Attempts', count: 28, percent: 47 },
              { name: 'Malware Links', count: 15, percent: 25 },
              { name: 'Scam Messages', count: 12, percent: 20 },
              { name: 'Deepfakes', count: 4, percent: 8 },
            ].map((threat, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{threat.name}</span>
                  <span className="text-sm font-bold text-danger">{threat.count}</span>
                </div>
                <div className="w-full bg-dark-border rounded-full h-2">
                  <div className="h-2 rounded-full bg-danger" style={{ width: `${threat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-dark">
          <h2 className="text-lg font-bold mb-4">Scanner Performance</h2>
          <div className="space-y-3">
            {[
              { name: 'URL Scanner', accuracy: 98.5 },
              { name: 'Message Scanner', accuracy: 97.2 },
              { name: 'Deepfake Detector', accuracy: 96.8 },
              { name: 'News Verifier', accuracy: 95.1 },
            ].map((scanner, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{scanner.name}</span>
                  <span className="text-sm font-bold text-success">{scanner.accuracy}%</span>
                </div>
                <div className="w-full bg-dark-border rounded-full h-2">
                  <div className="h-2 rounded-full bg-success" style={{ width: `${scanner.accuracy}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
