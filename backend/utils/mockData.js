// Mock Data Generator for TruthShield AI

const { v4: uuidv4 } = require('uuid')

// Sample scam messages
const scamMessages = [
  'Urgent: Verify your account immediately! Click here to confirm: [phishing-link.com]',
  'Congratulations! You won $1,000,000 in our lottery. Claim now!',
  'Your Amazon account has unusual activity. Confirm identity: [fake-amazon.com]',
  'Bank Alert: Unauthorized transaction detected. Update password: [bank-phish.com]',
  'Limited offer: 80% off all products. Use code NOW: [scam-shop.com]',
  'Click here to cancel your subscription before charges apply: [phishing.com]',
  'PayPal security alert: Your account will close. Verify now: [paypal-fake.com]',
  'You have been selected for a special offer. Act now: [spam-offer.com]',
]

// Sample safe messages
const safeMessages = [
  'Hey, how are you doing?',
  'Meeting tomorrow at 10am in conference room B',
  'Great job on the presentation today!',
  'The project is on track for completion next week',
  'Coffee at 3pm?',
  'Thanks for your help with that issue',
  'See you at the team lunch',
  'I uploaded the files to the shared folder',
]

// Sample URLs
const phishingUrls = [
  'https://secure-verify-account.com',
  'https://paypal-security-check.net',
  'https://amazon-account-confirm.co.uk',
  'https://apple-id-update.info',
  'https://microsoft-account-verify.tk',
  'https://google-security-alert.icu',
]

const safeUrls = [
  'https://www.github.com',
  'https://www.google.com',
  'https://www.amazon.com',
  'https://www.stackoverflow.com',
  'https://www.wikipedia.org',
  'https://www.linkedin.com',
]

// Sample fake news headlines
const fakeNewsHeadlines = [
  'Shocking: Celebrity secretly admits to plastic surgery!',
  'New study: Drinking coffee cures cancer (doctors hate this)',
  'Government hides discovery of aliens on the moon',
  'Leaked: Big tech plans to control your thoughts',
  'One weird trick that doctors don\'t want you to know about',
  'Breaking: Celebrity announces shocking life change',
  'Scientists discover cure for all diseases (they don\'t want you to know)',
]

const legitimateHeadlines = [
  'Global tech summit concludes with partnership announcements',
  'New renewable energy project breaks efficiency records',
  'Medical study shows improved treatment outcomes',
  'Education reform implemented in three states',
  'Infrastructure upgrades announced for next quarter',
  'Local community organizes cleanup initiative',
]

// Generate mock users
function generateMockUsers(count = 10) {
  const users = []
  for (let i = 0; i < count; i++) {
    users.push({
      id: uuidv4(),
      email: `user${i + 1}@truthshield.ai`,
      name: `User ${i + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      subscriptionTier: ['free', 'pro', 'enterprise'][Math.floor(Math.random() * 3)],
      scansThisMonth: Math.floor(Math.random() * 500),
    })
  }
  return users
}

// Generate mock scan results
function generateMockScanResults(count = 50) {
  const results = []
  const types = ['URL', 'MESSAGE', 'DEEPFAKE', 'NEWS']
  const resultStatuses = ['SAFE', 'SUSPICIOUS', 'DANGEROUS']

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    let content = ''

    switch (type) {
      case 'URL':
        content = Math.random() > 0.5 ? phishingUrls[Math.floor(Math.random() * phishingUrls.length)] : safeUrls[Math.floor(Math.random() * safeUrls.length)]
        break
      case 'MESSAGE':
        content = Math.random() > 0.5 ? scamMessages[Math.floor(Math.random() * scamMessages.length)] : safeMessages[Math.floor(Math.random() * safeMessages.length)]
        break
      case 'NEWS':
        content = Math.random() > 0.5 ? fakeNewsHeadlines[Math.floor(Math.random() * fakeNewsHeadlines.length)] : legitimateHeadlines[Math.floor(Math.random() * legitimateHeadlines.length)]
        break
    }

    results.push({
      id: uuidv4(),
      type,
      content: content.substring(0, 100),
      result: resultStatuses[Math.floor(Math.random() * resultStatuses.length)],
      score: Math.floor(Math.random() * 100),
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      userId: uuidv4(),
    })
  }
  return results
}

// Generate mock alerts
function generateMockAlerts(count = 15) {
  const alerts = []
  const titles = [
    'Phishing Attempt Detected',
    'Malicious URL Blocked',
    'Scam Pattern Identified',
    'Deepfake Media Found',
    'Misinformation Detected',
    'Suspicious Account Activity',
  ]
  const severities = ['critical', 'high', 'medium', 'low']

  for (let i = 0; i < count; i++) {
    alerts.push({
      id: uuidv4(),
      title: titles[Math.floor(Math.random() * titles.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      read: Math.random() > 0.3,
      userId: uuidv4(),
    })
  }
  return alerts
}

// Generate mock analytics
function generateMockAnalytics() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const analytics = {
    weeklyScans: weekDays.map(day => ({
      day,
      scans: Math.floor(Math.random() * 100) + 30,
      threats: Math.floor(Math.random() * 30),
    })),
    threatDistribution: {
      phishing: 35,
      malware: 25,
      scam: 20,
      spam: 15,
      other: 5,
    },
    scannerAccuracy: {
      urlScanner: 98.5,
      messageScanner: 97.2,
      deepfakeDetector: 96.8,
      newsVerifier: 95.1,
    },
  }
  return analytics
}

module.exports = {
  generateMockUsers,
  generateMockScanResults,
  generateMockAlerts,
  generateMockAnalytics,
  scamMessages,
  safeMessages,
  phishingUrls,
  safeUrls,
  fakeNewsHeadlines,
  legitimateHeadlines,
}
