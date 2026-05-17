const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  severity: { type: String, default: 'low' },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  userId: { type: String },
})

module.exports = mongoose.models.Alert || mongoose.model('Alert', alertSchema)
