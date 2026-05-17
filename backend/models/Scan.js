const mongoose = require('mongoose')

const scanSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  threatLevel: { type: String, required: true },
  score: { type: Number, default: 0 },
  confidence: { type: Number, default: 0 },
  httpsValid: { type: Boolean, default: false },
  trustScore: { type: Number, default: 0 },
  authenticityScore: { type: Number, default: 0 },
  manipulationProbability: { type: Number, default: 0 },
  classification: { type: String },
  indicators: { type: [String], default: [] },
  timestamp: { type: Date, default: Date.now },
  userId: { type: String },
})

module.exports = mongoose.models.Scan || mongoose.model('Scan', scanSchema)
