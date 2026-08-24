const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/Product')
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
  console.error(`[products] ${action} failed:`, error)
  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors)
      .map((e) => e.message)
      .join('; ')
    return res.status(400).json({ message: details, error: error.message })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid product id or field type', error: error.message })
  }
  return res.status(500).json({ message: error.message || 'Server error', error: error.message })
}

function normalizeProductBody(body = {}) {
  const price = Number(body.price)
  return {
    name: body.name != null ? String(body.name).trim() : body.name,
    description: body.description != null ? String(body.description).trim() : body.description,
    price: Number.isFinite(price) ? price : body.price,
    image: body.image != null ? String(body.image) : '',
    category: body.category != null ? String(body.category).trim() : 'general',
    inStock: typeof body.inStock === 'string'
      ? body.inStock === 'true' || body.inStock === '1'
      : Boolean(body.inStock),
  }
}

// Get all products
router.get('/', async (req, res) => {
  try {
    if (!dbReady(res)) return
    const { category } = req.query
    const filter = category ? { category } : {}
    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    handleError(res, error, 'GET /')
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    if (!dbReady(res)) return
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    handleError(res, error, 'GET /:id')
  }
})

// Create product (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (!dbReady(res)) return
    console.log('[products] POST body:', req.body)
    const product = new Product(normalizeProductBody(req.body))
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    handleError(res, error, 'POST /')
  }
})

// Update product (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (!dbReady(res)) return
    console.log('[products] PUT body:', req.params.id, req.body)
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      normalizeProductBody(req.body),
      { new: true, runValidators: true }
    )
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    handleError(res, error, 'PUT /:id')
  }
})

// Delete product (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!dbReady(res)) return
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    handleError(res, error, 'DELETE /:id')
  }
})

module.exports = router
