const express = require('express')
const { generateMockAnalytics } = require('../utils/mockData')

const router = express.Router()

router.get('/dashboard', (req, res) => {
  const analytics = generateMockAnalytics()
  res.json({ success: true, analytics })
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
