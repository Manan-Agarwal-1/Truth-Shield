'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Upload, Loader, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import ProgressBar from '@/components/ProgressBar'
import { api, safeApiError } from '@/lib/api'

interface DeepfakeScanResult {
  fileName: string
  authenticityScore: number
  manipulationProbability: number
  isDeepfake: boolean
  artifacts: string[]
  recommendations: string[]
}

export default function DeepfakeScanner() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [result, setResult] = useState<DeepfakeScanResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<DeepfakeScanResult[]>([])
  const [error, setError] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleScan = async (e: FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/scan/deepfake', { fileName: file.name })
      const scanResult: DeepfakeScanResult = response.data.result
      setResult(scanResult)
      setHistory([scanResult, ...history.slice(0, 9)])
      toast.success('Deepfake analysis complete')
    } catch (err) {
      setError(safeApiError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Deepfake Scanner</h1>
        <p className="text-gray-400">Upload images or videos to detect deepfakes and manipulated media.</p>
      </div>

      <div className="card-dark">
        <h2 className="text-xl font-bold mb-6">Upload Media for Analysis</h2>
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-4">Image or Video File</label>
            <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
                id="file-input"
                disabled={loading}
              />
              <label htmlFor="file-input" className="cursor-pointer space-y-4">
                {preview ? (
                  <div className="space-y-4">
                    {file?.type.startsWith('image') ? (
                      <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <div className="flex items-center justify-center">
                        <VideoIcon className="w-16 h-16 text-primary" />
                      </div>
                    )}
                    <p className="text-sm text-primary font-semibold">{file?.name}</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-16 h-16 mx-auto text-primary" />
                    <div>
                      <p className="font-semibold">Drop your media here or click to browse</p>
                      <p className="text-sm text-gray-400">Supported: JPG, PNG, MP4, WebM (max 100MB)</p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Analyzing Media...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Scan for Deepfakes
              </>
            )}
          </button>

          {error && <p className="text-sm text-danger mt-2">{error}</p>}
        </form>
      </div>

      {result && (
        <div className="card-dark border-2 border-primary/30">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-bold">Analysis Result</h2>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${
              result.isDeepfake ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'
            }`}>
              {result.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC'}
            </div>
          </div>

          {preview && (
            <div className="mb-6">
              {result.fileName.match(/\.(mp4|webm|avi)$/i) ? (
                <div className="w-full bg-dark-card rounded-lg flex items-center justify-center py-12 border border-dark-border/50">
                  <VideoIcon className="w-16 h-16 text-primary/50" />
                </div>
              ) : (
                <img src={preview} alt="Scanned media" className="w-full rounded-lg border border-dark-border/50" />
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">Authenticity Score</p>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{result.authenticityScore}</div>
                  <div className="text-xs">/ 100</div>
                </div>
                <ProgressBar
                  value={result.authenticityScore}
                  colorClass={
                    result.authenticityScore > 70 ? 'text-success' :
                    result.authenticityScore > 40 ? 'text-warning' :
                    'text-danger'
                  }
                />
              </div>

              <div className="p-4 rounded-lg bg-dark-card border border-dark-border/50">
                <p className="text-xs text-gray-400 mb-2">Manipulation Probability</p>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{result.manipulationProbability}</div>
                  <div className="text-xs">/ 100</div>
                </div>
                <ProgressBar value={result.manipulationProbability} colorClass="text-danger" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Detected Artifacts:</p>
              <div className="space-y-2">
                {result.artifacts.map((artifact, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-300 p-2 rounded bg-dark-card/50">
                    <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0 mt-0.5"></div>
                    <span>{artifact}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-dark-card/50 border border-dark-border/30 space-y-2">
              <p className="font-semibold text-sm">Recommendations:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
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
                <div className="flex items-center gap-3 flex-1">
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <p className="text-sm truncate">{scan.fileName}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-right">
                    <p className={`text-xs font-bold ${
                      scan.isDeepfake ? 'text-danger' : 'text-success'
                    }`}>
                      {scan.isDeepfake ? 'DEEPFAKE' : 'AUTHENTIC'}
                    </p>
                    <p className="text-xs text-gray-400">Score: {scan.authenticityScore}%</p>
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

