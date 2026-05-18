'use client'

import { FormEvent, useState } from 'react'
import { Send, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import ProgressBar from '@/components/ProgressBar'
import { api, safeApiError } from '@/lib/api'

interface MessageScanResult {
  message: string
  classification: 'SAFE' | 'SUSPICIOUS' | 'SCAM'
  confidence: number
  indicators: string[]
  advice: string
}

export default function MessageScanner() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<MessageScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<MessageScanResult[]>([])
  const [error, setError] = useState('')

  const handleScan = async (e: FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/scan/message', { message })
      const scanResult: MessageScanResult = response.data.result
      setResult(scanResult)
      setHistory([scanResult, ...history.slice(0, 9)])
      toast.success('Message scan complete')
    } catch (err) {
      const message = safeApiError(err)
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Message Scanner</h1>
        <p className="text-gray-400">Detect scams in SMS, emails, and chat messages.</p>
      </div>

      <div className="card-dark">
        <h2 className="text-xl font-bold mb-6">Analyze Message</h2>
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Message Content</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste your SMS, email, or chat message here..."
              rows={6}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            {error && <p className="text-sm text-danger flex-1">{error}</p>}
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Scan Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="card-dark border-2 border-primary/30">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold">Analysis Result</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${
              result.classification === 'SAFE' ? 'bg-success/20 text-success' :
              result.classification === 'SUSPICIOUS' ? 'bg-warning/20 text-warning' :
              'bg-danger/20 text-danger'
            }`}>
              {result.classification}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
              <p className="text-xs text-gray-400 mb-2">Original Message</p>
              <p className="text-sm leading-relaxed">{result.message}</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Scam Confidence Score</p>
                <p className="text-2xl font-bold">{result.confidence}%</p>
              </div>
              <ProgressBar
                value={result.confidence}
                colorClass={
                  result.confidence < 33 ? 'text-success' :
                  result.confidence < 66 ? 'text-warning' :
                  'text-danger'
                }
                height="h-3"
              />
            </div>

            {result.indicators.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-warning">Detected Scam Indicators:</p>
                <div className="flex flex-wrap gap-2">
                  {result.indicators.map((indicator, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-semibold">
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-lg bg-dark-card/50 border border-dark-border/30 space-y-2">
              <p className="font-semibold text-sm">Recommendations:</p>
              <p className="text-sm text-gray-300">{result.advice}</p>
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
                  <p className="text-sm truncate">{scan.message.substring(0, 100)}...</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <p className={`text-xs font-bold ${
                      scan.classification === 'SAFE' ? 'text-success' :
                      scan.classification === 'SUSPICIOUS' ? 'text-warning' :
                      'text-danger'
                    }`}>
                      {scan.classification}
                    </p>
                    <p className="text-xs text-gray-400">Confidence: {scan.confidence}%</p>
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
