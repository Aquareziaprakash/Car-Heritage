const express = require('express')
const Review = require('../models/Review')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all reviews (approved only for public, all for admin)
router.get('/', async (req, res) => {
  try {
    const { limit, approved } = req.query
    const filter = approved === 'false' ? {} : { approved: true }
    let query = Review.find(filter).sort({ createdAt: -1 })
    
    if (limit) {
      query = query.limit(parseInt(limit))
    }
    
    const reviews = await query
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get average rating
router.get('/stats/average', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
    if (reviews.length === 0) {
      return res.json({ average: 0, count: 0 })
    }
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    const average = sum / reviews.length
    
    res.json({ average: average.toFixed(1), count: reviews.length })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create review (Public)
router.post('/', async (req, res) => {
  try {
    const review = new Review({ ...req.body, approved: false })
    await review.save()
    res.json(review)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Approve/Delete review (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json(review)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete review (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

module.exports = router




