const mongoose = require('mongoose')

let connecting = null

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (connecting) {
    return connecting
  }

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  connecting = (async () => {
    mongoose.set('bufferCommands', false)
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000,
        bufferCommands: false,
        maxPoolSize: 5,
      })
      console.log(
        'MongoDB Connected:',
        mongoose.connection.host,
        mongoose.connection.name
      )
      return mongoose.connection
    } catch (err) {
      connecting = null
      const isServerless = Boolean(process.env.VERCEL) || process.env.NODE_ENV === 'production'
      if (isServerless) {
        throw err
      }
      console.error('MongoDB Connection Error:', err.message)
      console.log('Starting in-memory MongoDB for local development...')
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const memory = await MongoMemoryServer.create()
      await mongoose.connect(memory.getUri(), { bufferCommands: false })
      console.log('In-memory MongoDB connected')
      return mongoose.connection
    }
  })()

  return connecting
}

module.exports = connectDB
