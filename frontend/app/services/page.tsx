'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/api'
import { motion } from 'framer-motion'

interface Service {
  _id: string
  name: string
  description: string
  videoUrl: string
  image: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services')
        setServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              Premium automobile care and customization services
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : services.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-metallic rounded-lg border border-primary-red/20 overflow-hidden"
                >
                  <div className="aspect-video bg-primary-dark relative">
                    {service.videoUrl ? (
                      <video
                        src={service.videoUrl}
                        className="w-full h-full object-cover"
                        controls
                        muted
                      />
                    ) : service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-red/20 to-primary-dark">
                        <span className="text-gray-400 text-lg">No Media</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{service.name}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              No services available at the moment.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}




