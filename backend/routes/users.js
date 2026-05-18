const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ success: true, users: req.store.users })
})

router.get('/:id', (req, res) => {
  const user = req.store.users.find((item) => item.id === req.params.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json({ success: true, user })
})

module.exports = router
