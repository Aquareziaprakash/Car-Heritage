'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'

interface Review {
  _id: string
  name: string
  rating: number
  description: string
  approved: boolean
}

interface ReviewsManagementProps {
  onUpdate: () => void
}

const ReviewsManagement = ({ onUpdate }: ReviewsManagementProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all')

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('http://localhost:5000/api/reviews?approved=false', {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Get all reviews for admin view
      const allResponse = await axios.get('http://localhost:5000/api/reviews', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setReviews(allResponse.data)
    } catch (error) {
      toast.error('Failed to fetch reviews')
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put(
        `http://localhost:5000/api/reviews/${id}`,
        { approved: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Review approved')
      fetchReviews()
      onUpdate()
    } catch (error) {
      toast.error('Failed to approve review')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Review deleted successfully')
      fetchReviews()
      onUpdate()
    } catch (error) {
      toast.error('Failed to delete review')
    }
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'approved') return review.approved
    if (filter === 'pending') return !review.approved
    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Reviews Management</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-primary-red text-white'
                : 'bg-primary-metallic text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-primary-red text-white'
                : 'bg-primary-metallic text-gray-300'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-primary-red text-white'
                : 'bg-primary-metallic text-gray-300'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-bold mb-2">{review.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="text-gray-300">{review.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                {!review.approved && (
                  <button
                    onClick={() => handleApprove(review._id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Status: {review.approved ? (
                <span className="text-green-400">Approved</span>
              ) : (
                <span className="text-yellow-400">Pending</span>
              )}
            </div>
          </div>
        ))}

        {filteredReviews.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No reviews found.
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewsManagement



