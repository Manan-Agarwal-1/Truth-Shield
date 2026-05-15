'use client'

import { useState } from 'react'
import { Send, Loader } from 'lucide-react'

interface NewsScanResult {
  headline: string
  misinformationScore: number
  classification: 'VERIFIED' | 'UNVERIFIED' | 'MISINFORMATION'
  credibilityFactors: { factor: string; status: boolean }[]
  sourceAnalysis: string
  suggestions: string[]
}

export default function NewsScanner() {
  const [headline, setHeadline] = useState('')
  const [article, setArticle] = useState('')
  const [result, setResult] = useState<NewsScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<NewsScanResult[]>([])

  const misinformationKeywords = [
    'shocking', 'exclusive', 'breaking', 'leaked', 'bombshell', 'unbelievable',
    'scientists hate', 'doctors hate', 'they dont want', 'conspiracy', 'cover-up',
    'hidden truth', 'exposed', 'suppressed', 'one weird trick', 'you wont believe',
  ]

  const generateMockResult = (inputHeadline: string, inputArticle: string): NewsScanResult => {
    const content = (inputHeadline + ' ' + inputArticle).toLowerCase()
    const foundKeywords = misinformationKeywords.filter(kw => content.includes(kw))
    
    let misinformationScore = 0
    let classification: 'VERIFIED' | 'UNVERIFIED' | 'MISINFORMATION' = 'VERIFIED'
    
    if (foundKeywords.length === 0) {
      misinformationScore = Math.random() * 20
      classification = 'VERIFIED'
    } else if (foundKeywords.length <= 2) {
      misinformationScore = 40 + Math.random() * 30
      classification = 'UNVERIFIED'
    } else {
      misinformationScore = 70 + Math.random() * 30
      classification = 'MISINFORMATION'
    }

    const credibilityFactors = [
      { factor: 'Multiple credible sources', status: classification === 'VERIFIED' },
      { factor: 'Proper citations and links', status: classification === 'VERIFIED' },
      { factor: 'No sensationalism detected', status: misinformationScore < 40 },
      { factor: 'Verifiable claims', status: classification !== 'MISINFORMATION' },
      { factor: 'Professional reporting', status: classification !== 'MISINFORMATION' },
    ]

    return {
      headline: inputHeadline,
      misinformationScore: Math.round(misinformationScore),
      classification,
      credibilityFactors,
      sourceAnalysis: classification === 'VERIFIED' 
        ? 'This news appears to be from established sources with credible reporting.'
        : classification === 'UNVERIFIED'
        ? 'This news contains elements that need verification from multiple sources.'
        : 'This content shows significant indicators of misinformation.',
      suggestions: classification === 'VERIFIED' ? [
        '✓ Content appears credible',
        '✓ Safe to share',
        '✓ Multiple sources confirm the information',
      ] : classification === 'UNVERIFIED' ? [
        '⚠ Verify with multiple trusted sources before sharing',
        '⚠ Check the original source',
        '⚠ Look for fact-checking articles',
      ] : [
        '🚨 Do not share this content',
        '🚨 Report as misinformation',
        '🚨 Check verified fact-checking websites',
      ]
    }
  }

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!headline) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const scanResult = generateMockResult(headline, article)
    setResult(scanResult)
    setHistory([scanResult, ...history.slice(0, 9)])
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Fake News Detector</h1>
        <p className="text-gray-400">Verify news headlines and articles for misinformation</p>
      </div>

      {/* Scanner Input */}
      <div className="card-dark">
        <h2 className="text-xl font-bold mb-6">Analyze News Content</h2>
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter the news headline..."
              className="input-dark"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Article Content (Optional)</label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="Paste the article content for detailed analysis..."
              rows={6}
              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !headline}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Check News
              </>
            )}
          </button>
        </form>
      </div>

      {/* Scan Result */}
      {result && (
        <div className="card-dark border-2 border-primary/30">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold">Verification Result</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${
              result.classification === 'VERIFIED' ? 'bg-success/20 text-success' :
              result.classification === 'UNVERIFIED' ? 'bg-warning/20 text-warning' :
              'bg-danger/20 text-danger'
            }`}>
              {result.classification}
            </div>
          </div>

          <div className="space-y-4">
            {/* Headline Display */}
            <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
              <p className="text-xs text-gray-400 mb-2">Headline</p>
              <p className="text-sm font-semibold leading-relaxed">{result.headline}</p>
            </div>

            {/* Misinformation Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">Misinformation Score</p>
                <p className="text-2xl font-bold">{result.misinformationScore}%</p>
              </div>
              <div className="w-full bg-dark-border rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    result.misinformationScore < 33 ? 'bg-success' :
                    result.misinformationScore < 66 ? 'bg-warning' :
                    'bg-danger'
                  }`}
                  style={{ width: `${result.misinformationScore}%` }}
                ></div>
              </div>
            </div>

            {/* Credibility Factors */}
            <div className="space-y-2">
              <p className="text-sm font-semibold">Credibility Assessment:</p>
              <div className="space-y-2">
                {result.credibilityFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm p-2 rounded bg-dark-card/50">
                    {factor.status ? (
                      <>
                        <span className="text-success font-bold">✓</span>
                        <span className="text-gray-300">{factor.factor}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-500">✗</span>
                        <span className="text-gray-400">{factor.factor}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Source Analysis */}
            <div className="p-4 rounded-lg bg-dark-card/50 border border-dark-border/30">
              <p className="text-sm font-semibold mb-2">Source Analysis</p>
              <p className="text-sm text-gray-300">{result.sourceAnalysis}</p>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-lg bg-dark-card/50 border border-dark-border/30 space-y-2">
              <p className="font-semibold text-sm">Recommendations:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                {result.suggestions.map((suggestion, idx) => (
                  <li key={idx}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Scan History */}
      {history.length > 0 && (
        <div className="card-dark">
          <h2 className="text-lg font-bold mb-4">Recent Checks</h2>
          <div className="space-y-2">
            {history.map((scan, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-dark-card/50 border border-dark-border/30 hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate font-medium">{scan.headline}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <p className={`text-xs font-bold ${
                      scan.classification === 'VERIFIED' ? 'text-success' :
                      scan.classification === 'UNVERIFIED' ? 'text-warning' :
                      'text-danger'
                    }`}>
                      {scan.classification}
                    </p>
                    <p className="text-xs text-gray-400">Score: {scan.misinformationScore}%</p>
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
