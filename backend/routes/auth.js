const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Debug logging (remove password from logs)
    console.log('Login attempt for username:', username || 'empty')

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    // Normalize username (lowercase and trim)
    const normalizedUsername = username.trim().toLowerCase()

    // Try exact match first
    let user = await User.findOne({ username: normalizedUsername })
    
    // If not found, try case-insensitive search
    if (!user) {
      user = await User.findOne({ 
        username: { $regex: new RegExp(`^${username.trim()}$`, 'i') } 
      })
    }
    
    if (!user) {
      console.log('❌ User not found:', username)
      return res.status(400).json({ message: 'Invalid username or password' })
    }
    
    // Compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      console.log('❌ Password mismatch for user:', username)
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    console.log('✅ Login successful for user:', user.username)
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username 
      } 
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    })
  }
})

// Register (for initial admin setup)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({ username, password })
    await user.save()

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user._id, username: user.username } })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router



