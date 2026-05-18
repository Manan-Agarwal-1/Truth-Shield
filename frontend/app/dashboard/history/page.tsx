'use client'

import { useEffect, useState } from 'react'
import { Search, Download, Filter } from 'lucide-react'
import toast from 'react-hot-toast'
import ProgressBar from '@/components/ProgressBar'
import { api, safeApiError } from '@/lib/api'

function getScanTypeLabel(type: string) {
  switch (type) {
    case 'URL':
      return 'URL Scan'
    case 'MESSAGE':
      return 'Message Scan'
    case 'DEEPFAKE':
      return 'Deepfake Scan'
    case 'NEWS':
      return 'News Verification'
    default:
      return type
  }
}

function getResultValue(item: any) {
  return item.result || item.threatLevel || item.classification || 'UNKNOWN'
}

function getScoreValue(item: any) {
  return item.score ?? item.confidence ?? 0
}

function getDisplayContent(item: any) {
  return item.content || item.headline || item.fileName || 'N/A'
}

const initialHistory = [
  {
    id: 1,
    type: 'URL Scan',
    content: 'https://suspicious-login.com',
    result: 'DANGEROUS',
    severity: 'critical',
    timestamp: '2 mins ago',
    score: 92,
  },
  {
    id: 2,
    type: 'Message Scan',
    content: 'Verify your account now! Click here...',
    result: 'SCAM',
    severity: 'critical',
    timestamp: '15 mins ago',
    score: 85,
  },
  {
    id: 3,
    type: 'URL Scan',
    content: 'https://secure-amazon-verify.com',
    result: 'SUSPICIOUS',
    severity: 'high',
    timestamp: '1 hour ago',
    score: 62,
  },
  {
    id: 4,
    type: 'News Verification',
    content: 'Breaking: Celebrity announces shocking news',
    result: 'UNVERIFIED',
    severity: 'medium',
    timestamp: '2 hours ago',
    score: 58,
  },
  {
    id: 5,
    type: 'Deepfake Scan',
    content: 'video_upload_123.mp4',
    result: 'AUTHENTIC',
    severity: 'low',
    timestamp: '3 hours ago',
    score: 15,
  },
  {
    id: 6,
    type: 'Message Scan',
    content: 'Hi, just checking in!',
    result: 'SAFE',
    severity: 'low',
    timestamp: '4 hours ago',
    score: 8,
  },
  {
    id: 7,
    type: 'URL Scan',
    content: 'https://github.com/truthshield-ai/project',
    result: 'SAFE',
    severity: 'low',
    timestamp: '5 hours ago',
    score: 5,
  },
  {
    id: 8,
    type: 'News Verification',
    content: 'Local weather forecast for tomorrow',
    result: 'VERIFIED',
    severity: 'low',
    timestamp: '6 hours ago',
    score: 12,
  },
]

export default function History() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterResult, setFilterResult] = useState('all')
  const [historyData, setHistoryData] = useState(initialHistory)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/scan/history')
        setHistoryData(response.data)
      } catch (err) {
        const message = safeApiError(err)
        setError(message)
        toast.error(message)
      }
    }

    fetchHistory()
  }, [])

  const filteredHistory = historyData.filter((item) => {
    const content = getDisplayContent(item).toLowerCase()
    const typeLabel = getScanTypeLabel(item.type)
    const resultValue = getResultValue(item).toLowerCase()
    const matchesSearch = content.includes(searchTerm.toLowerCase()) || typeLabel.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || typeLabel === filterType
    const matchesResult = filterResult === 'all' || resultValue === filterResult.toLowerCase()
    return matchesSearch && matchesType && matchesResult
  })

  const getResultColor = (result: string) => {
    switch (result) {
      case 'SAFE':
      case 'VERIFIED':
      case 'AUTHENTIC':
        return 'text-success bg-success/10'
      case 'SUSPICIOUS':
      case 'UNVERIFIED':
        return 'text-warning bg-warning/10'
      case 'DANGEROUS':
      case 'SCAM':
        return 'text-danger bg-danger/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Scan History</h1>
          <p className="text-gray-400">View all your previous threat scans and analyses</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="card-dark">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-primary/50" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scans..."
                className="input-dark pl-10 w-full"
              />
            </div>
          </div>

          {/* Filter by Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Scan Type</label>
            <select
              aria-label="Scan Type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-dark"
            >
              <option value="all">All Types</option>
              <option value="URL Scan">URL Scan</option>
              <option value="Message Scan">Message Scan</option>
              <option value="Deepfake Scan">Deepfake Scan</option>
              <option value="News Verification">News Verification</option>
            </select>
          </div>

          {/* Filter by Result */}
          <div>
            <label className="block text-sm font-medium mb-2">Result</label>
            <select
              aria-label="Result Filter"
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
              className="input-dark"
            >
              <option value="all">All Results</option>
              <option value="SAFE">Safe</option>
              <option value="SUSPICIOUS">Suspicious</option>
              <option value="DANGEROUS">Dangerous</option>
              <option value="SCAM">Scam</option>
              <option value="VERIFIED">Verified</option>
              <option value="UNVERIFIED">Unverified</option>
              <option value="AUTHENTIC">Authentic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing {filteredHistory.length} of {historyData.length} scans
      </div>

      {/* History Table */}
      <div className="card-dark overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">Content</th>
              <th className="px-6 py-3 text-left font-semibold">Result</th>
              <th className="px-6 py-3 text-left font-semibold">Score</th>
              <th className="px-6 py-3 text-left font-semibold">Time</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((item) => (
              <tr key={item.id} className="border-b border-dark-border/50 hover:bg-dark-card/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-primary">{getScanTypeLabel(item.type)}</span>
                </td>
                <td className="px-6 py-4 max-w-xs truncate text-gray-300">{getDisplayContent(item)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getResultColor(getResultValue(item))}`}>
                    {getResultValue(item)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      value={getScoreValue(item)}
                      colorClass={
                        getScoreValue(item) < 33 ? 'text-success' :
                        getScoreValue(item) < 66 ? 'text-warning' :
                        'text-danger'
                      }
                      className="w-12"
                      height="h-2"
                    />
                    <span className="text-xs">{getScoreValue(item)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{item.timestamp ?? 'Unknown'}</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:text-primary/80 text-xs font-semibold">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredHistory.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            <p>No scans found matching your filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="px-4 py-2 rounded-lg border border-dark-border hover:bg-dark-card transition">Previous</button>
        <div className="flex gap-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 rounded-lg transition ${
                page === 1
                  ? 'bg-primary text-white'
                  : 'border border-dark-border hover:bg-dark-card'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 rounded-lg border border-dark-border hover:bg-dark-card transition">Next</button>
      </div>
    </div>
  )
}
