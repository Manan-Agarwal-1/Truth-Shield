'use client'

import { useState } from 'react'
import { Send, Copy, CheckCircle, AlertTriangle, Loader } from 'lucide-react'
import { api, safeApiError } from '@/lib/api'

interface ScanResult {
  url: string
  score: number
  httpsValid: boolean
  trustScore: number
  threatLevel: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS'
  details: string[]
}

export default function URLScanner() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ScanResult[]>([])
  const [error, setError] = useState('')

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/scan/url', { url })
      const scanResult = response.data.result
      setResult(scanResult)
      setHistory([scanResult, ...history.slice(0, 9)])
    } catch (err) {
      setError(safeApiError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">URL Scanner</h1>
        <p className="text-gray-400">Analyze URLs for phishing, malware, and other threats.</p>
      </div>

      <div className="card-dark">
        <h2 className="text-xl font-bold mb-6">Scan URL for Threats</h2>
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter URL to Scan</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="input-dark flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !url}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Scan
                  </>
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}
        </form>
      </div>

      {result && (
        <div className="card-dark border-2 border-primary/30">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold">Scan Result</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              result.threatLevel === 'SAFE' ? 'bg-success/20 text-success' :
              result.threatLevel === 'SUSPICIOUS' ? 'bg-warning/20 text-warning' :
              'bg-danger/20 text-danger'
            }`}>
              {result.threatLevel}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-dark-card border border-dark-border/50 group">
              <span className="text-gray-400 flex-1 break-all text-sm">{result.url}</span>
              <button className="p-2 rounded hover:bg-primary/10 transition" title="Copy URL">
                <Copy className="w-4 h-4 text-primary" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">Phishing Score</p>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{result.score}</div>
                  <div className="text-xs">/ 100</div>
                </div>
                <div className="mt-2 w-full bg-dark-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      result.score < 33 ? 'bg-success' :
                      result.score < 66 ? 'bg-warning' :
                      'bg-danger'
                    }`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">Trust Score</p>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{result.trustScore}</div>
                  <div className="text-xs">/ 100</div>
                </div>
                <div className="mt-2 w-full bg-dark-border rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-success transition-all"
                    style={{ width: `${result.trustScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">HTTPS Status</p>
                <div className="flex items-center gap-2 mt-4">
                  {result.httpsValid ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-semibold">Valid</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-danger" />
                      <span className="font-semibold">Invalid</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Analysis Details</p>
              {result.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="card-dark">
          <h2 className="text-lg font-bold mb-4">Recent Scans</h2>
          <div className="space-y-2">
            {history.map((scan, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-dark-card/50 border border-dark-border/30 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{scan.url}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <p className={`text-xs font-bold ${
                      scan.threatLevel === 'SAFE' ? 'text-success' :
                      scan.threatLevel === 'SUSPICIOUS' ? 'text-warning' :
                      'text-danger'
                    }`}>
                      {scan.threatLevel}
                    </p>
                    <p className="text-xs text-gray-400">Score: {scan.score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
