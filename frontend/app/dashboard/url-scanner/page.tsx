'use client'

import { useState } from 'react'
import { Send, Copy, CheckCircle, AlertTriangle, Loader } from 'lucide-react'

interface ScanResult {
  url: string
  phishingScore: number
  httpsValid: boolean
  trustScore: number
  riskLevel: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS'
  details: string[]
}

export default function URLScanner() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ScanResult[]>([])

  const generateMockResult = (inputUrl: string): ScanResult => {
    const suspiciousKeywords = ['phish', 'verify', 'confirm', 'update', 'secure', 'login', 'account', 'urgent']
    const isSuspicious = suspiciousKeywords.some(word => inputUrl.toLowerCase().includes(word))
    
    const riskLevel = isSuspicious ? (Math.random() > 0.5 ? 'DANGEROUS' : 'SUSPICIOUS') : 'SAFE'
    const phishingScore = riskLevel === 'SAFE' ? Math.random() * 20 : Math.random() * 100
    const httpsValid = !isSuspicious && Math.random() > 0.3
    
    return {
      url: inputUrl,
      phishingScore: Math.round(phishingScore),
      httpsValid,
      trustScore: 100 - Math.round(phishingScore),
      riskLevel,
      details: [
        httpsValid ? '✓ HTTPS encryption verified' : '✗ No HTTPS encryption',
        isSuspicious ? '⚠ Suspicious domain patterns detected' : '✓ Domain looks legitimate',
        Math.random() > 0.6 ? '⚠ Known phishing template detected' : '✓ No known phishing templates',
        Math.random() > 0.7 ? '⚠ Shortened URL detected' : '✓ Full URL displayed',
      ]
    }
  }

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const scanResult = generateMockResult(url)
    setResult(scanResult)
    setHistory([scanResult, ...history.slice(0, 9)])
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">URL Scanner</h1>
        <p className="text-gray-400">Analyze URLs for phishing, malware, and other threats</p>
      </div>

      {/* Scanner Input */}
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
        </form>
      </div>

      {/* Scan Result */}
      {result && (
        <div className="card-dark border-2 border-primary/30">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold">Scan Result</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              result.riskLevel === 'SAFE' ? 'bg-success/20 text-success' :
              result.riskLevel === 'SUSPICIOUS' ? 'bg-warning/20 text-warning' :
              'bg-danger/20 text-danger'
            }`}>
              {result.riskLevel}
            </div>
          </div>

          <div className="space-y-4">
            {/* URL Display */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-dark-card border border-dark-border/50 group">
              <span className="text-gray-400 flex-1 break-all text-sm">{result.url}</span>
              <button className="p-2 rounded hover:bg-primary/10 transition">
                <Copy className="w-4 h-4 text-primary" />
              </button>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">Phishing Score</p>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{result.phishingScore}</div>
                  <div className="text-xs">/ 100</div>
                </div>
                <div className="mt-2 w-full bg-dark-border rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      result.phishingScore < 33 ? 'bg-success' :
                      result.phishingScore < 66 ? 'bg-warning' :
                      'bg-danger'
                    }`}
                    style={{ width: `${result.phishingScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">Trust Score</p>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{result.trustScore}</div>
                  <div className="text-xs">/ 100</div>
                </div>
                <div className="mt-2 w-full bg-dark-border rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-success"
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

            {/* Details */}
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

      {/* Scan History */}
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
                      scan.riskLevel === 'SAFE' ? 'text-success' :
                      scan.riskLevel === 'SUSPICIOUS' ? 'text-warning' :
                      'text-danger'
                    }`}>
                      {scan.riskLevel}
                    </p>
                    <p className="text-xs text-gray-400">Score: {scan.phishingScore}</p>
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
