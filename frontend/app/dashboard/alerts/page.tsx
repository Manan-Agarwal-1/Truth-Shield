'use client'

import { useEffect, useState } from 'react'
import { Trash2, Bell, Check } from 'lucide-react'
import { api, safeApiError } from '@/lib/api'

interface Alert {
  id: number
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  timestamp: string
  read: boolean
  action?: string
}

const defaultPreferences = [
  { label: 'Critical Threats', enabled: true },
  { label: 'New Vulnerabilities', enabled: true },
  { label: 'Scan Results Summary', enabled: true },
  { label: 'Weekly Report', enabled: false },
]

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical' | 'high'>('all')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get('/alerts')
        setAlerts(response.data.alerts)
      } catch (err) {
        setError(safeApiError(err))
      }
    }

    fetchAlerts()
  }, [])

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'unread') return !alert.read
    if (filter === 'critical') return alert.severity === 'critical'
    if (filter === 'high') return alert.severity === 'high' || alert.severity === 'critical'
    return true
  })

  const handleMarkAsRead = (id: number) => {
    setAlerts(alerts.map((alert) =>
      alert.id === id ? { ...alert, read: true } : alert
    ))
  }

  const handleDelete = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-danger/10 border-danger/20 text-danger'
      case 'high':
        return 'bg-warning/10 border-warning/20 text-warning'
      case 'medium':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400'
      case 'low':
        return 'bg-success/10 border-success/20 text-success'
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '🚨'
      case 'high':
        return '⚠️'
      case 'medium':
        return 'ℹ️'
      case 'low':
        return '✓'
      default:
        return '•'
    }
  }

  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Bell className="w-8 h-8" />
            Alerts
          </h1>
          <p className="text-gray-400">
            {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''} · {alerts.length} total
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="btn-secondary flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all' as const, label: 'All' },
          { value: 'unread' as const, label: `Unread (${unreadCount})` },
          { value: 'critical' as const, label: 'Critical' },
          { value: 'high' as const, label: 'High Priority' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === tab.value
                ? 'bg-primary text-white'
                : 'border border-dark-border hover:border-primary/50 text-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`card-dark border-l-4 ${alert.read ? '' : 'bg-dark/60'} ${
                alert.severity === 'critical'
                  ? 'border-danger'
                  : alert.severity === 'high'
                  ? 'border-warning'
                  : alert.severity === 'medium'
                  ? 'border-blue-500'
                  : 'border-success'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-2xl mt-1">{getSeverityIcon(alert.severity)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{alert.title}</h3>
                      {!alert.read && (
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{alert.description}</p>
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      {alert.action && (
                        <button className="text-xs text-primary hover:text-primary/80 font-semibold">
                          {alert.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {!alert.read && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="p-2 rounded-lg hover:bg-primary/10 transition"
                      title="Mark as read"
                    >
                      <Check className="w-5 h-5 text-primary" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="p-2 rounded-lg hover:bg-danger/10 transition"
                    title="Delete alert"
                  >
                    <Trash2 className="w-5 h-5 text-danger" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card-dark text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No Alerts</h3>
            <p className="text-gray-400">
              {filter === 'unread'
                ? 'You have read all your alerts'
                : 'You don\'t have any alerts'}
            </p>
          </div>
        )}
      </div>

      {/* Alert Settings */}
      <div className="card-dark">
        <h2 className="text-lg font-bold mb-4">Alert Preferences</h2>
        <div className="space-y-3">
          {defaultPreferences.map((pref, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-dark-card/50 border border-dark-border/30">
              <span className="text-sm">{pref.label}</span>
              <input
                type="checkbox"
                defaultChecked={pref.enabled}
                className="w-5 h-5 rounded cursor-pointer accent-primary"
                aria-label={`Enable ${pref.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
