const fs = require('fs')
const path = require('path')
const { generateMockUsers, generateMockScanResults, generateMockAlerts, generateMockAnalytics } = require('../utils/mockData')

const outputDir = path.resolve(__dirname, '../data')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const users = generateMockUsers(20)
const scans = generateMockScanResults(200)
const alerts = generateMockAlerts(50)
const analytics = generateMockAnalytics()

fs.writeFileSync(path.join(outputDir, 'users.json'), JSON.stringify(users, null, 2))
fs.writeFileSync(path.join(outputDir, 'scanResults.json'), JSON.stringify(scans, null, 2))
fs.writeFileSync(path.join(outputDir, 'alerts.json'), JSON.stringify(alerts, null, 2))
fs.writeFileSync(path.join(outputDir, 'analytics.json'), JSON.stringify(analytics, null, 2))

console.log('✅ Seed data generated in backend/data')
