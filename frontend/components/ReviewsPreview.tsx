'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'

interface Review {
  _id: string
  name: string
  rating: number
  description: string
}

const ReviewsPreview = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section className="py-20 bg-primary-gray">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-400">Trusted by thousands of car enthusiasts</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 line-clamp-3">{review.description}</p>
                <p className="text-primary-red font-semibold">— {review.name}</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/reviews">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg font-semibold transition-colors"
            >
              View All Reviews
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ReviewsPreview



