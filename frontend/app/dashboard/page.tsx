'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AlertTriangle, Shield, Zap, Clock, TrendingUp, Activity } from 'lucide-react'

const dashboardStats = [
  {
    label: 'Threats Detected',
    value: '1,247',
    icon: AlertTriangle,
    color: 'text-danger',
    bgColor: 'bg-danger/10',
  },
  {
    label: 'URLs Scanned',
    value: '3,891',
    icon: Shield,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    label: 'Active Alerts',
    value: '12',
    icon: Zap,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    label: 'Scan Time Saved',
    value: '45h',
    icon: Clock,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]

const chartData = [
  { name: 'Mon', threats: 45, safe: 120 },
  { name: 'Tue', threats: 52, safe: 135 },
  { name: 'Wed', threats: 38, safe: 118 },
  { name: 'Thu', threats: 61, safe: 145 },
  { name: 'Fri', threats: 55, safe: 130 },
  { name: 'Sat', threats: 35, safe: 95 },
  { name: 'Sun', threats: 42, safe: 110 },
]

const threatDistribution = [
  { name: 'Phishing', value: 35 },
  { name: 'Malware', value: 25 },
  { name: 'Scam', value: 20 },
  { name: 'Spam', value: 15 },
  { name: 'Other', value: 5 },
]

const COLORS = ['#ff1744', '#ff6b00', '#ffb300', '#00c853', '#00d4ff']

const recentActivity = [
  { id: 1, type: 'URL Scan', result: 'Phishing Detected', time: '2 mins ago', severity: 'critical' },
  { id: 2, type: 'Message Scan', result: 'Scam Pattern Found', time: '15 mins ago', severity: 'high' },
  { id: 3, type: 'URL Scan', result: 'Safe', time: '1 hour ago', severity: 'safe' },
  { id: 4, type: 'Image Scan', result: 'Deepfake Detected', time: '2 hours ago', severity: 'critical' },
  { id: 5, type: 'News Scan', result: 'Misinformation', time: '3 hours ago', severity: 'high' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your threat analysis overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="card-dark">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Trends */}
        <div className="lg:col-span-2 card-dark">
          <h2 className="text-lg font-bold mb-6">Threat Trends (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3561" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151a3a',
                  border: '1px solid #2d3561',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="threats" stackId="a" fill="#ff1744" name="Threats" />
              <Bar dataKey="safe" stackId="a" fill="#00c853" name="Safe" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Distribution */}
        <div className="card-dark">
          <h2 className="text-lg font-bold mb-6">Threat Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151a3a',
                  border: '1px solid #2d3561',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Scan Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { emoji: '🔗', title: 'Scan URL', href: '/dashboard/url-scanner' },
          { emoji: '💬', title: 'Scan Message', href: '/dashboard/message-scanner' },
          { emoji: '🎬', title: 'Check Deepfake', href: '/dashboard/deepfake-scanner' },
          { emoji: '📰', title: 'Verify News', href: '/dashboard/news-scanner' },
        ].map((action, idx) => (
          <button
            key={idx}
            className="card-dark text-center hover:border-primary/70 group cursor-pointer"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{action.emoji}</div>
            <p className="font-semibold text-sm">{action.title}</p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card-dark">
        <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-dark-card/50 border border-dark-border/30 hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-xs text-gray-400">{activity.result}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-semibold ${
                  activity.severity === 'critical' ? 'text-danger' :
                  activity.severity === 'high' ? 'text-warning' :
                  'text-success'
                }`}>
                  {activity.severity.toUpperCase()}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
