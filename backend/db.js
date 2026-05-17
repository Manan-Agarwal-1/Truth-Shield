const mongoose = require('mongoose')

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️  MONGO_URI not set. Using in-memory mock data only.')
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Connected to MongoDB Atlas')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
