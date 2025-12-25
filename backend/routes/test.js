const express = require('express')
const router = express.Router()

// Test endpoint to verify API is working
router.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 5000,
    }
  })
})

module.exports = router



