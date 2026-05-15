'use client'

import { useState } from 'react'
import { Send, Loader } from 'lucide-react'

interface MessageScanResult {
  message: string
  classification: 'SAFE' | 'SUSPICIOUS' | 'SCAM'
  confidence: number
  indicators: string[]
}

export default function MessageScanner() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<MessageScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<MessageScanResult[]>([])

  const scamIndicators = [
    'urgent', 'verify', 'confirm', 'update', 'expire', 'claim', 'winner', 'congratulations',
    'click here', 'act now', 'limited time', 'exclusive', 'cancel subscription', 'confirm identity',
    'account will close', 'unusual activity', 'verify account', 'click link', 'suspicious activity',
  ]

  const generateMockResult = (inputMessage: string): MessageScanResult => {
    const lowerMsg = inputMessage.toLowerCase()
    const foundIndicators = scamIndicators.filter(indicator => lowerMsg.includes(indicator))
    
    let confidence = 0
    let classification: 'SAFE' | 'SUSPICIOUS' | 'SCAM' = 'SAFE'
    
    if (foundIndicators.length === 0) {
      confidence = Math.random() * 15
      classification = 'SAFE'
    } else if (foundIndicators.length === 1) {
      confidence = 30 + Math.random() * 40
      classification = 'SUSPICIOUS'
    } else {
      confidence = 70 + Math.random() * 30
      classification = 'SCAM'
    }

    return {
      message: inputMessage,
      classification,
      confidence: Math.round(confidence),
      indicators: foundIndicators.slice(0, 5)
    }
  }

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))

    const scanResult = generateMockResult(message)
    setResult(scanResult)
    setHistory([scanResult, ...history.slice(0, 9)])
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Message Scanner</h1>
        <p className="text-gray-400">Detect scams in SMS, emails, and chat messages</p>
      </div>

      {/* Scanner Input */}
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
          <button
            type="submit"
            disabled={loading || !message}
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
        </form>
      </div>

      {/* Scan Result */}
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
            {/* Message Display */}
            <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
              <p className="text-xs text-gray-400 mb-2">Original Message</p>
              <p className="text-sm leading-relaxed">{result.message}</p>
            </div>

            {/* Confidence Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Scam Confidence Score</p>
                <p className="text-2xl font-bold">{result.confidence}%</p>
              </div>
              <div className="w-full bg-dark-border rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    result.confidence < 33 ? 'bg-success' :
                    result.confidence < 66 ? 'bg-warning' :
                    'bg-danger'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Indicators */}
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

            {/* Recommendations */}
            <div className="p-4 rounded-lg bg-dark-card/50 border border-dark-border/30 space-y-2">
              <p className="font-semibold text-sm">Recommendations:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                {result.classification === 'SAFE' && (
                  <li>✓ This message appears to be legitimate</li>
                )}
                {result.classification === 'SUSPICIOUS' && (
                  <>
                    <li>⚠ Be cautious with this message</li>
                    <li>⚠ Do not click links from unknown senders</li>
                    <li>⚠ Never share personal information</li>
                  </>
                )}
                {result.classification === 'SCAM' && (
                  <>
                    <li>🚨 This appears to be a scam message</li>
                    <li>🚨 Do not click any links or respond</li>
                    <li>🚨 Block the sender immediately</li>
                    <li>🚨 Report to your service provider</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Scan History */}
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
