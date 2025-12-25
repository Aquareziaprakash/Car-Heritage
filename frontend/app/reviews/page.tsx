'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/api'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'

interface Review {
  _id: string
  name: string
  rating: number
  description: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState({ average: 0, count: 0 })
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, statsRes] = await Promise.all([
          api.get('/api/reviews'),
          api.get('/api/reviews/stats/average'),
        ])
        setReviews(reviewsRes.data)
        setAverageRating(statsRes.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await api.post('/api/reviews', formData)
      toast.success('Review submitted! It will be reviewed before publishing.')
      setFormData({ name: '', rating: 5, description: '' })
      // Refresh reviews
      const response = await api.get('/api/reviews')
      setReviews(response.data)
    } catch (error) {
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Customer Reviews</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400 text-xl sm:text-2xl" />
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {averageRating.average}
                </span>
              </div>
              <span className="text-gray-400 text-sm sm:text-base">
                ({averageRating.count} {averageRating.count === 1 ? 'review' : 'reviews'})
              </span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              Share your experience with Car Heritage
            </p>
          </motion.div>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-metallic p-4 sm:p-6 md:p-8 rounded-lg border border-primary-red/20 mb-8 md:mb-12 max-w-2xl mx-auto"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className={`text-2xl transition-transform ${
                        rating <= formData.rating
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      } hover:scale-110`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Your Review</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </motion.div>

          {/* Reviews List */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-metallic p-4 sm:p-6 rounded-lg border border-primary-red/20"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm sm:text-base ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{review.description}</p>
                  <p className="text-primary-red font-semibold text-sm sm:text-base">— {review.name}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 py-12">
                No reviews yet. Be the first to review!
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}




