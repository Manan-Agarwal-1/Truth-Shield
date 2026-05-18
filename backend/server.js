require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const authRoutes = require('./routes/auth')
const scanRoutes = require('./routes/scan')
const analyticsRoutes = require('./routes/analytics')
const alertsRoutes = require('./routes/alerts')
const usersRoutes = require('./routes/users')
const { generateMockUsers, generateMockScanResults, generateMockAlerts } = require('./utils/mockData')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

const users = generateMockUsers(25)
const scanResults = generateMockScanResults(180)
let alerts = generateMockAlerts(35)

app.use((req, res, next) => {
  req.store = { users, scanResults, alerts }
  next()
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() })
})

app.use('/api/auth', authRoutes)
app.use('/api/scan', scanRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/alerts', alertsRoutes)
app.use('/api/users', usersRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🛡️  TruthShield AI Backend running on http://localhost:${PORT}`)
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`)
  console.log(`📈 Total Users: ${users.length}`)
  console.log(`🔍 Sample Scans: ${scanResults.length}`)
})
