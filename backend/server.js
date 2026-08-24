const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const connectDB = require('./db')

const app = express()

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://localhost:3000',
].filter(Boolean)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else {
      callback(null, true)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('DB middleware failed:', err.message)
    res.status(503).json({
      message: 'Database unavailable. Check MONGODB_URI on the running backend.',
      error: err.message,
    })
  }
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/services', require('./routes/services'))
app.use('/api/staff', require('./routes/staff'))
app.use('/api/reviews', require('./routes/reviews'))
app.use('/api/about', require('./routes/about'))
app.use('/api', require('./routes/test'))

app.get('/', (req, res) => {
  res.send('Car Heritage API is running')
})

async function ensureDevAdmin() {
  const User = require('./models/User')
  const existing = await User.findOne({ username: 'admin' })
  if (!existing) {
    await User.create({ username: 'admin', password: 'admin123' })
    console.log('Dev admin created (username: admin, password: admin123)')
  }
}

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await connectDB()
    await ensureDevAdmin()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err)
})
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection:', err)
})

module.exports = app

if (!process.env.VERCEL) {
  start()
}
