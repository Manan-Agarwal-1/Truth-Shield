// TruthShield AI Backend Server
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const {
  generateMockUsers,
  generateMockScanResults,
  generateMockAlerts,
  generateMockAnalytics,
  scamMessages,
  phishingUrls,
  fakeNewsHeadlines,
} = require('./utils/mockData')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In-memory database
let users = generateMockUsers(20)
let scanResults = generateMockScanResults(100)
let alerts = generateMockAlerts(30)
let currentUser = null

// Helper functions
function generateThreatAnalysis(input) {
  const isSuspicious = (str) => {
    const keywords = ['phish', 'verify', 'confirm', 'urgent', 'account', 'secure', 'login', 'update']
    return keywords.some(kw => str.toLowerCase().includes(kw))
  }

  if (isSuspicious(input)) {
    return {
      threatLevel: Math.random() > 0.5 ? 'DANGEROUS' : 'SUSPICIOUS',
      score: Math.floor(50 + Math.random() * 50),
      confidence: Math.floor(80 + Math.random() * 20),
    }
  }
  return {
    threatLevel: 'SAFE',
    score: Math.floor(Math.random() * 30),
    confidence: Math.floor(90 + Math.random() * 10),
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() })
})

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)

  if (user) {
    currentUser = user
    res.json({
      success: true,
      user,
      token: 'mock-jwt-token-' + uuidv4(),
    })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

app.post('/api/auth/signup', (req, res) => {
  const { email, name, password } = req.body
  const newUser = {
    id: uuidv4(),
    email,
    name,
    createdAt: new Date(),
    subscriptionTier: 'free',
    scansThisMonth: 0,
  }
  users.push(newUser)
  currentUser = newUser
  res.json({
    success: true,
    user: newUser,
    token: 'mock-jwt-token-' + uuidv4(),
  })
})

app.post('/api/auth/logout', (req, res) => {
  currentUser = null
  res.json({ success: true, message: 'Logged out' })
})

app.get('/api/auth/me', (req, res) => {
  if (currentUser) {
    res.json(currentUser)
  } else {
    res.status(401).json({ error: 'Not authenticated' })
  }
})

// URL Scanner
app.post('/api/scan/url', (req, res) => {
  const { url } = req.body
  const analysis = generateThreatAnalysis(url)

  const result = {
    id: uuidv4(),
    type: 'URL',
    content: url,
    ...analysis,
    httpsValid: !url.includes('http://'),
    trustScore: 100 - analysis.score,
    timestamp: new Date(),
  }

  scanResults.push(result)
  res.json({ success: true, result })
})

// Message Scanner
app.post('/api/scan/message', (req, res) => {
  const { message } = req.body
  const analysis = generateThreatAnalysis(message)

  const result = {
    id: uuidv4(),
    type: 'MESSAGE',
    content: message,
    ...analysis,
    indicators: analysis.threatLevel !== 'SAFE' ? ['Suspicious pattern detected', 'Unknown sender'] : [],
    timestamp: new Date(),
  }

  scanResults.push(result)
  res.json({ success: true, result })
})

// Deepfake Scanner
app.post('/api/scan/deepfake', (req, res) => {
  const { filename } = req.body
  const isDeepfake = Math.random() > 0.7

  const result = {
    id: uuidv4(),
    type: 'DEEPFAKE',
    content: filename,
    threatLevel: isDeepfake ? 'DANGEROUS' : 'SAFE',
    authenticityScore: isDeepfake ? Math.floor(20 + Math.random() * 40) : Math.floor(70 + Math.random() * 30),
    manipulationProbability: isDeepfake ? Math.floor(60 + Math.random() * 40) : Math.floor(Math.random() * 30),
    isDeepfake,
    timestamp: new Date(),
  }

  scanResults.push(result)
  res.json({ success: true, result })
})

// News Scanner
app.post('/api/scan/news', (req, res) => {
  const { headline } = req.body
  const analysis = generateThreatAnalysis(headline)

  const result = {
    id: uuidv4(),
    type: 'NEWS',
    content: headline,
    threatLevel: analysis.threatLevel,
    misinformationScore: analysis.score,
    classification: analysis.score > 60 ? 'MISINFORMATION' : analysis.score > 30 ? 'UNVERIFIED' : 'VERIFIED',
    timestamp: new Date(),
  }

  scanResults.push(result)
  res.json({ success: true, result })
})

// Get scan history
app.get('/api/scans/history', (req, res) => {
  const limit = req.query.limit || 50
  res.json(scanResults.slice(-limit).reverse())
})

// Get scan by ID
app.get('/api/scans/:id', (req, res) => {
  const scan = scanResults.find(s => s.id === req.params.id)
  if (scan) {
    res.json(scan)
  } else {
    res.status(404).json({ error: 'Scan not found' })
  }
})

// Analytics
app.get('/api/analytics', (req, res) => {
  const analytics = generateMockAnalytics()
  res.json(analytics)
})

app.get('/api/analytics/dashboard', (req, res) => {
  const totalScans = scanResults.length
  const threatsFound = scanResults.filter(s => s.threatLevel !== 'SAFE').length
  const thisWeek = scanResults.filter(s => {
    const scanDate = new Date(s.timestamp)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return scanDate > oneWeekAgo
  }).length

  res.json({
    totalScans,
    threatsFound,
    thisWeek,
    accuracy: 98.7,
    recentActivity: scanResults.slice(-10).reverse(),
  })
})

// Alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
})

app.post('/api/alerts/:id/read', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id)
  if (alert) {
    alert.read = true
    res.json({ success: true, alert })
  } else {
    res.status(404).json({ error: 'Alert not found' })
  }
})

app.delete('/api/alerts/:id', (req, res) => {
  alerts = alerts.filter(a => a.id !== req.params.id)
  res.json({ success: true })
})

// Users
app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

// Statistics
app.get('/api/stats', (req, res) => {
  res.json({
    totalUsers: users.length,
    totalScans: scanResults.length,
    threatsDetected: scanResults.filter(s => s.threatLevel !== 'SAFE').length,
    averageScore: (scanResults.reduce((sum, s) => sum + (s.score || 0), 0) / scanResults.length).toFixed(2),
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🛡️  TruthShield AI Backend running on http://localhost:${PORT}`)
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`)
  console.log(`📈 Total Users: ${users.length}`)
  console.log(`🔍 Sample Scans: ${scanResults.length}`)
})
