// Mock Data Generator for TruthShield AI

const { v4: uuidv4 } = require('uuid')

const scamKeywords = ['urgent', 'verify', 'confirm', 'account', 'secure', 'login', 'update', 'offer', 'winner', 'payment']
const fakeDomains = ['secure-verify', 'account-check', 'verify-login', 'login-update', 'amazon-support', 'paypal-alert']
const legitimateDomains = ['github.com', 'google.com', 'amazon.com', 'wikipedia.org', 'linkedin.com', 'mozilla.org']
const misinformationKeywords = ['shocking', 'exclusive', 'leaked', 'doctors hate', 'scientists hate', 'bombshell', 'unbelievable', 'cover-up', 'hidden truth']

const scamPhrases = [
  'Urgent: Verify your account immediately! Click here to confirm.',
  'Congratulations! You won a prize. Claim your reward now.',
  'Your account has been compromised. Reset your password instantly.',
  'Bank alert: Unauthorized payment detected. Confirm details here.',
  'Security breach detected. Secure your account within 24 hours.',
  'Update required: Your identity must be verified to avoid suspension.',
  'Payment failed. Re-enter your card info to restore access.',
  'You are eligible for a refund. Submit your details to receive funds.',
]

const safePhrases = [
  'Let me know if you want to review the report tomorrow.',
  'Thanks for joining the meeting today. The notes are in the shared folder.',
  'I appreciate your help on the deployment task.',
  'The event is confirmed for Tuesday and the calendar invite is sent.',
  'Our security team completed the audit with no critical issues.',
  'Please review the document and provide feedback by Friday.',
  'The update was successful and the site is now live.',
  'I have attached the requested files for your reference.',
]

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

function generateMockUsers(count = 10) {
  const users = []
  for (let i = 1; i <= count; i++) {
    users.push({
      id: uuidv4(),
      email: `user${i}@truthshield.ai`,
      name: `User ${i}`,
      subscriptionTier: ['free', 'pro', 'enterprise'][Math.floor(Math.random() * 3)],
      scansThisMonth: Math.floor(Math.random() * 450),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    })
  }
  return users
}

function generateMockScanResults(count = 100) {
  const results = []
  const types = ['URL', 'MESSAGE', 'DEEPFAKE', 'NEWS']

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    let content = ''
    let threatLevel = 'SAFE'
    let score = Math.floor(Math.random() * 40)

    if (type === 'URL') {
      if (Math.random() > 0.45) {
        content = `https://${fakeDomains[Math.floor(Math.random() * fakeDomains.length)]}-${Math.floor(Math.random() * 999)}.com`
        threatLevel = Math.random() > 0.45 ? 'DANGEROUS' : 'SUSPICIOUS'
        score = Math.floor(60 + Math.random() * 40)
      } else {
        content = `https://${legitimateDomains[Math.floor(Math.random() * legitimateDomains.length)]}`
      }
    }

    if (type === 'MESSAGE') {
      if (Math.random() > 0.45) {
        content = scamPhrases[Math.floor(Math.random() * scamPhrases.length)]
        threatLevel = Math.random() > 0.35 ? 'DANGEROUS' : 'SUSPICIOUS'
        score = Math.floor(55 + Math.random() * 45)
      } else {
        content = safePhrases[Math.floor(Math.random() * safePhrases.length)]
      }
    }

    if (type === 'NEWS') {
      if (Math.random() > 0.5) {
        content = fakeNewsHeadlines[Math.floor(Math.random() * fakeNewsHeadlines.length)]
        threatLevel = Math.random() > 0.35 ? 'DANGEROUS' : 'SUSPICIOUS'
        score = Math.floor(60 + Math.random() * 40)
      } else {
        content = legitimateHeadlines[Math.floor(Math.random() * legitimateHeadlines.length)]
      }
    }

    if (type === 'DEEPFAKE') {
      content = `media-scan-${Math.floor(Math.random() * 1000)}.mp4`
      threatLevel = Math.random() > 0.6 ? 'DANGEROUS' : 'SAFE'
      score = threatLevel === 'SAFE' ? Math.floor(Math.random() * 30) : Math.floor(70 + Math.random() * 30)
    }

    results.push({
      id: uuidv4(),
      type,
      content,
      threatLevel,
      score,
      confidence: Math.floor(70 + Math.random() * 25),
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      indicators: [],
      userId: uuidv4(),
    })
  }

  return results
}

function generateMockAlerts(count = 15) {
  const titles = [
    'Phishing Attempt Detected',
    'Malicious URL Blocked',
    'Scam Pattern Identified',
    'Deepfake Media Found',
    'Misinformation Detected',
    'Suspicious Account Activity',
  ]
  const severities = ['critical', 'high', 'medium', 'low']
  const alerts = []

  for (let i = 0; i < count; i++) {
    alerts.push({
      id: uuidv4(),
      title: titles[Math.floor(Math.random() * titles.length)],
      description: `Alert triggered by intelligent monitoring engine for event ${i + 1}.`,
      severity: severities[Math.floor(Math.random() * severities.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      read: Math.random() > 0.3,
      userId: uuidv4(),
    })
  }

  return alerts
}

function generateMockAnalytics() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return {
    weeklyScans: weekDays.map((day) => ({
      day,
      scans: Math.floor(Math.random() * 100) + 40,
      threats: Math.floor(Math.random() * 35),
    })),
    threatDistribution: {
      phishing: 34,
      malware: 23,
      scam: 21,
      spam: 14,
      other: 8,
    },
    scannerAccuracy: {
      urlScanner: 98.5,
      messageScanner: 97.2,
      deepfakeDetector: 96.8,
      newsVerifier: 95.1,
    },
  }
}

function generateThreatAnalysis(input) {
  const normalized = input.toLowerCase()
  const score = scamKeywords.reduce((acc, keyword) => acc + (normalized.includes(keyword) ? 15 : 0), 0)
  const hasFakeDomain = fakeDomains.some((domain) => normalized.includes(domain))
  const threatScore = Math.min(95, score + (hasFakeDomain ? 25 : 0) + Math.floor(Math.random() * 15))
  const threatLevel = threatScore > 65 ? 'DANGEROUS' : threatScore > 35 ? 'SUSPICIOUS' : 'SAFE'

  return {
    threatLevel,
    score: threatScore,
    confidence: 70 + Math.floor(Math.random() * 25),
    details: normalized.includes('https://') || normalized.includes('http://') ? ['URL structure analyzed', 'SSL validation performed'] : ['Content pattern scanned', 'Language model verification completed'],
  }
}

function analyzeDeepfake(filename) {
  const isDeepfake = Math.random() > 0.55
  const authenticityScore = isDeepfake ? Math.floor(20 + Math.random() * 40) : Math.floor(70 + Math.random() * 30)
  const manipulationProbability = 100 - authenticityScore

  return {
    threatLevel: isDeepfake ? 'DANGEROUS' : 'SAFE',
    authenticityScore,
    manipulationProbability,
    isDeepfake,
    artifacts: isDeepfake
      ? ['Inconsistent facial reflections', 'Unnatural eye movement', 'Irregular lighting patterns']
      : ['Normal facial detail', 'Consistent motion analysis', 'Authentic texture patterns'],
    recommendations: isDeepfake
      ? ['Do not trust this asset', 'Share with caution', 'Report for further investigation']
      : ['Content appears authentic', 'No manipulation signs detected'],
  }
}

function analyzeNews(headline, article = '') {
  const combined = `${headline} ${article}`.toLowerCase()
  const flags = misinformationKeywords.filter((keyword) => combined.includes(keyword)).length
  const score = Math.min(95, flags * 25 + Math.floor(Math.random() * 25))
  const classification = score > 65 ? 'MISINFORMATION' : score > 35 ? 'UNVERIFIED' : 'VERIFIED'

  return {
    threatLevel: classification === 'VERIFIED' ? 'SAFE' : classification === 'UNVERIFIED' ? 'SUSPICIOUS' : 'DANGEROUS',
    misinformationScore: score,
    classification,
    credibilityFactors: [
      { factor: 'Source reliability', status: !combined.includes('exclusive') },
      { factor: 'Citation & evidence', status: score < 50 },
      { factor: 'Sensational language', status: score < 40 },
      { factor: 'Fact-check signals', status: score < 60 },
    ],
    sourceAnalysis: classification === 'VERIFIED'
      ? 'High confidence from trusted sources and balanced reporting.'
      : classification === 'UNVERIFIED'
      ? 'The story contains mixed signals and should be cross-checked.'
      : 'Strong misinformation indicators detected. Do not share without verification.',
  }
}

module.exports = {
  generateMockUsers,
  generateMockScanResults,
  generateMockAlerts,
  generateMockAnalytics,
  generateThreatAnalysis,
  analyzeDeepfake,
  analyzeNews,
  scamPhrases,
  safePhrases,
  fakeNewsHeadlines,
  legitimateHeadlines,
}
