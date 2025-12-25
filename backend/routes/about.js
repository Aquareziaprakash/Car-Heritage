const express = require('express')
const About = require('../models/About')
const auth = require('../middleware/auth')
const router = express.Router()

// Get about information
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne()
    if (!about) {
      about = new About()
      await about.save()
    }
    res.json(about)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update about information (Admin only)
router.put('/', auth, async (req, res) => {
  try {
    let about = await About.findOne()
    if (!about) {
      about = new About(req.body)
    } else {
      Object.assign(about, req.body)
    }
    await about.save()
    res.json(about)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router




