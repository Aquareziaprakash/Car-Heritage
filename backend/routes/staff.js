const express = require('express')
const mongoose = require('mongoose')
const Staff = require('../models/Staff')
const auth = require('../middleware/auth')
const router = express.Router()

function dbReady(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      message:
        'Database is not connected. Check MONGODB_URI (MongoDB Atlas hostname could not be resolved).',
    })
    return false
  }
  return true
}

function handleError(res, error, action) {
  console.error(`[staff] ${action} failed:`, error)
  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors)
      .map((e) => e.message)
      .join('; ')
    return res.status(400).json({ message: details, error: error.message })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid staff id or field type', error: error.message })
  }
  return res.status(500).json({ message: error.message || 'Server error', error: error.message })
}

function normalizeStaffBody(body = {}) {
  return {
    name: body.name != null ? String(body.name).trim() : body.name,
    role: body.role != null ? String(body.role).trim() : body.role,
    description: body.description != null ? String(body.description).trim() : body.description,
    photo: body.photo != null ? String(body.photo) : '',
  }
}

// Get all staff
router.get('/', async (req, res) => {
  try {
    if (!dbReady(res)) return
    const { role } = req.query
    const filter = role ? { role } : {}
    const staff = await Staff.find(filter).sort({ role: 1, createdAt: -1 })
    res.json(staff)
  } catch (error) {
    handleError(res, error, 'GET /')
  }
})

// Get single staff member
router.get('/:id', async (req, res) => {
  try {
    if (!dbReady(res)) return
    const staff = await Staff.findById(req.params.id)
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }
    res.json(staff)
  } catch (error) {
    handleError(res, error, 'GET /:id')
  }
})

// Create staff (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (!dbReady(res)) return
    console.log('[staff] POST body:', req.body)
    const staff = new Staff(normalizeStaffBody(req.body))
    await staff.save()
    res.status(201).json(staff)
  } catch (error) {
    handleError(res, error, 'POST /')
  }
})

// Update staff (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (!dbReady(res)) return
    console.log('[staff] PUT body:', req.params.id, req.body)
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      normalizeStaffBody(req.body),
      { new: true, runValidators: true }
    )
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }
    res.json(staff)
  } catch (error) {
    handleError(res, error, 'PUT /:id')
  }
})

// Delete staff (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!dbReady(res)) return
    const staff = await Staff.findByIdAndDelete(req.params.id)
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' })
    }
    res.json({ message: 'Staff member deleted successfully' })
  } catch (error) {
    handleError(res, error, 'DELETE /:id')
  }
})

module.exports = router
