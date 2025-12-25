const express = require('express')
const Staff = require('../models/Staff')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all staff
router.get('/', async (req, res) => {
  try {
    const { role } = req.query
    const filter = role ? { role } : {}
    const staff = await Staff.find(filter).sort({ role: 1, createdAt: -1 })
    res.json(staff)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get single staff member
router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }
    res.json(staff)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create staff (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const staff = new Staff(req.body)
    await staff.save()
    res.json(staff)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update staff (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }
    res.json(staff)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete staff (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id)
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }
    res.json({ message: 'Staff member deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router




