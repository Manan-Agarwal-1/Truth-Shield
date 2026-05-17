const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { generateMockAlerts } = require('../utils/mockData')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(req.store.alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
})

router.post('/:id/read', (req, res) => {
  const alert = req.store.alerts.find((item) => item.id === req.params.id)
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' })
  }
  alert.read = true
  res.json({ success: true, alert })
})

router.delete('/:id', (req, res) => {
  req.store.alerts = req.store.alerts.filter((item) => item.id !== req.params.id)
  res.json({ success: true })
})

router.post('/generate', (req, res) => {
  const newAlerts = generateMockAlerts(10)
  req.store.alerts.unshift(...newAlerts)
  res.json({ success: true, generated: newAlerts.length })
})

module.exports = router
