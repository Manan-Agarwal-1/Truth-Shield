const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { generateMockUsers } = require('../utils/mockData')

const router = express.Router()

function getOrCreateUser(store, email, name = 'Security Analyst') {
  let user = store.users.find((item) => item.email === email)
  if (!user) {
    user = {
      id: uuidv4(),
      name,
      email,
      subscriptionTier: 'free',
      scansThisMonth: 0,
      createdAt: new Date(),
    }
    store.users.push(user)
  }
  return user
}

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const user = getOrCreateUser(req.store, email)
  res.json({ success: true, user, token: `mock-jwt-token-${uuidv4()}` })
})

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' })
  }

  const user = getOrCreateUser(req.store, email, name)
  res.json({ success: true, user, token: `mock-jwt-token-${uuidv4()}` })
})

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' })
})

router.get('/me', (req, res) => {
  const userData = req.headers['x-mock-user']
  if (!userData) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  res.json(JSON.parse(userData))
})

module.exports = router
