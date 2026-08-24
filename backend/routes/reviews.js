const express = require('express')
const Review = require('../models/Review')
const auth = require('../middleware/auth')
const router = express.Router()

function handleError(res, error, action) {
  console.error(`[reviews] ${action} failed:`, error)
  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors)
      .map((e) => e.message)
      .join('; ')
    return res.status(400).json({ message: details, error: error.message })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid review id or field type', error: error.message })
  }
  return res.status(500).json({ message: error.message || 'Server error', error: error.message })
}

function normalizeReviewBody(body = {}) {
  const rating = Number(body.rating)
  return {
    name: body.name != null ? String(body.name).trim() : body.name,
    rating: Number.isFinite(rating) ? rating : body.rating,
    description: body.description != null ? String(body.description).trim() : body.description,
    approved: false,
  }
}

router.get('/', async (req, res) => {
  try {
    const { limit, approved } = req.query
    const filter = approved === 'false' ? {} : { approved: true }
    let query = Review.find(filter).sort({ createdAt: -1 })

    if (limit) {
      query = query.limit(parseInt(limit, 10))
    }

    const reviews = await query
    res.json(reviews)
  } catch (error) {
    handleError(res, error, 'GET /')
  }
})

router.get('/stats/average', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true })
    if (reviews.length === 0) {
      return res.json({ average: 0, count: 0 })
    }

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    const average = sum / reviews.length

    res.json({ average: Number(average.toFixed(1)), count: reviews.length })
  } catch (error) {
    handleError(res, error, 'GET /stats/average')
  }
})

router.post('/', async (req, res) => {
  try {
    console.log('[reviews] POST body:', req.body)
    const review = new Review(normalizeReviewBody(req.body))
    await review.save()
    res.status(201).json(review)
  } catch (error) {
    handleError(res, error, 'POST /')
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json(review)
  } catch (error) {
    handleError(res, error, 'PUT /:id')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    handleError(res, error, 'DELETE /:id')
  }
})

module.exports = router
