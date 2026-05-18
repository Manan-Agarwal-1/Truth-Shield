const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { generateThreatAnalysis, analyzeDeepfake, analyzeNews } = require('../utils/mockData')

const router = express.Router()

router.post('/url', (req, res) => {
  const { url } = req.body
  if (!url) {
    return res.status(400).json({ error: 'URL is required' })
  }

  const analysis = generateThreatAnalysis(url)
  const result = {
    id: uuidv4(),
    type: 'URL',
    content: url,
    url,
    ...analysis,
    httpsValid: !url.toLowerCase().startsWith('http://'),
    trustScore: Math.max(0, 100 - analysis.score),
    timestamp: new Date(),
  }

  req.store.scanResults.push(result)
  res.json({ success: true, result })
})

router.post('/message', (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message content is required' })
  }

  const analysis = generateThreatAnalysis(message)
  const result = {
    id: uuidv4(),
    type: 'MESSAGE',
    content: message,
    message,
    ...analysis,
    indicators: analysis.threatLevel !== 'SAFE' ? ['Suspicious language detected', 'Potential scam vocabulary found'] : [],
    timestamp: new Date(),
  }

  req.store.scanResults.push(result)
  res.json({ success: true, result })
})

router.post('/deepfake', (req, res) => {
  const { filename } = req.body
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' })
  }

  const result = analyzeDeepfake(filename)
  const scan = {
    id: uuidv4(),
    type: 'DEEPFAKE',
    content: filename,
    fileName: filename,
    ...result,
    timestamp: new Date(),
  }

  req.store.scanResults.push(scan)
  res.json({ success: true, result: scan })
})

router.post('/news', (req, res) => {
  const { headline, article } = req.body
  if (!headline) {
    return res.status(400).json({ error: 'News headline is required' })
  }

  const result = analyzeNews(headline, article || '')
  const scan = {
    id: uuidv4(),
    type: 'NEWS',
    content: headline,
    headline,
    article: article || '',
    ...result,
    timestamp: new Date(),
  }

  req.store.scanResults.push(scan)
  res.json({ success: true, result: scan })
})

router.get('/history', (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200)
  res.json(req.store.scanResults.slice(-limit).reverse())
})

router.get('/:id', (req, res) => {
  const scan = req.store.scanResults.find((item) => item.id === req.params.id)
  if (!scan) {
    return res.status(404).json({ error: 'Scan result not found' })
  }
  res.json(scan)
})

module.exports = router
