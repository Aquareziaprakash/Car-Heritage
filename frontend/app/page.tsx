'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ReviewsPreview from '@/components/ReviewsPreview'
import Footer from '@/components/Footer'
import api from '@/lib/api'

export default function Home() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/api/reviews?limit=3')
        setReviews(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchReviews()
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ReviewsPreview reviews={reviews} />
      <Footer />
    </main>
  )
}




