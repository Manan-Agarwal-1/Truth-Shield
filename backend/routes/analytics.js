const express = require('express')
const { generateMockAnalytics } = require('../utils/mockData')

const router = express.Router()

router.get('/dashboard', (req, res) => {
  const analytics = generateMockAnalytics()
  const weeklyActivity = analytics.weeklyScans
  const scanDistribution = Object.entries(analytics.threatDistribution).map(([name, value]) => ({ name, value }))
  const summaryStats = [
    { label: 'Total Scans', value: `${req.store.scanResults.length}`, change: '+12%' },
    { label: 'Threats Found', value: `${req.store.scanResults.filter((scan) => scan.threatLevel !== 'SAFE').length}`, change: '+8%' },
    { label: 'This Week', value: `${weeklyActivity.reduce((sum, item) => sum + item.scans, 0)}`, change: '+23%' },
    { label: 'Accuracy', value: '98.7%', change: '+0.5%' },
  ]
  const threatStats = scanDistribution.map((entry) => ({ name: entry.name, count: entry.value, percent: Math.round((entry.value / 100) * 100) }))
  const performanceStats = Object.entries(analytics.scannerAccuracy).map(([key, value]) => ({ name: key.replace(/([A-Z])/g, ' $1').replace('url', 'URL').replace('deepfake', 'Deepfake').replace('message', 'Message').replace('news', 'News'), accuracy: value }))

  res.json({
    success: true,
    weeklyActivity,
    scanDistribution,
    summaryStats,
    threatStats,
    performanceStats,
  })
})

router.get('/summary', (req, res) => {
  const totalScans = req.store.scanResults.length
  const threatsFound = req.store.scanResults.filter((scan) => scan.threatLevel !== 'SAFE').length
  const thisWeek = req.store.scanResults.filter((scan) => {
    const scanDate = new Date(scan.timestamp)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return scanDate > oneWeekAgo
  }).length

  res.json({
    success: true,
    summary: {
      totalScans,
      threatsFound,
      scansThisWeek: thisWeek,
      accuracy: 98.7,
      activeAlerts: req.store.alerts.filter((alert) => !alert.read).length,
    },
  })
})

module.exports = router
