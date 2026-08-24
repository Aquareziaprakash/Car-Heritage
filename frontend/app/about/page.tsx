'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/api'
import { motion } from 'framer-motion'

interface AboutData {
  companyHistory: string
  mission: string
  vision: string
  values: string
  certificateImage: string
  owner: {
    name: string
    photo: string
    thoughts: string
  }
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get('/api/about')
        setAboutData(response.data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">About Car Heritage</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Your trusted partner in premium automobile care and customization
            </p>
          </motion.div>

          {/* Company History */}
          {aboutData?.companyHistory && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="bg-primary-metallic p-4 sm:p-6 md:p-8 rounded-lg border border-primary-red/20">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {aboutData.companyHistory || 'Car Heritage Enterprises Pvt. Ltd. is a Nepal-registered private limited company providing automobile workshop, customization, and spare-parts services in Kathmandu.'}
                </p>
              </div>
            </motion.section>
          )}

          {/* Mission, Vision, Values */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-16">
            {aboutData?.mission && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary-metallic p-4 sm:p-6 rounded-lg border border-primary-red/20"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-primary-red mb-4">Mission</h3>
                <p className="text-gray-300">{aboutData.mission}</p>
              </motion.div>
            )}

            {aboutData?.vision && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-primary-metallic p-4 sm:p-6 rounded-lg border border-primary-red/20"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-primary-red mb-4">Vision</h3>
                <p className="text-gray-300">{aboutData.vision}</p>
              </motion.div>
            )}

            {aboutData?.values && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-primary-metallic p-4 sm:p-6 rounded-lg border border-primary-red/20"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-primary-red mb-4">Values</h3>
                <p className="text-gray-300">{aboutData.values}</p>
              </motion.div>
            )}
          </div>

          {/* Certificate */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Company Registration</h2>
            <div className="bg-primary-metallic p-4 sm:p-6 md:p-8 rounded-lg border border-primary-red/20">
              <div className="text-gray-300 leading-relaxed space-y-2 mb-6">
                <p><span className="text-white font-semibold">Legal name:</span> Car Heritage Enterprises Pvt. Ltd.</p>
                <p><span className="text-white font-semibold">Registration No.:</span> 381366/82/83</p>
                <p><span className="text-white font-semibold">Date of incorporation:</span> 19 December 2025 (2082/09/04)</p>
                <p><span className="text-white font-semibold">PAN:</span> 622506836</p>
                <p><span className="text-white font-semibold">Registered office:</span> Kirtipur Municipality, Ward No. 6, Kathmandu, Nepal</p>
                <p><span className="text-white font-semibold">Promoters / directors:</span> Santosh Kumar Pathak, Abhiral Acharya</p>
              </div>
              {aboutData?.certificateImage && (
                <img
                  src={aboutData.certificateImage}
                  alt="Company Certificate"
                  className="max-w-full h-auto rounded-lg"
                />
              )}
            </div>
          </motion.section>

          {/* Owner Section */}
          {aboutData?.owner && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-primary-metallic p-4 sm:p-6 md:p-8 rounded-lg border border-primary-red/20"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">From the Owner</h2>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {aboutData.owner.photo && (
                  <img
                    src={aboutData.owner.photo}
                    alt={aboutData.owner.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary-red mx-auto md:mx-0"
                  />
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary-red mb-4">
                    {aboutData.owner.name || 'Santosh Kumar Pathak'}
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {aboutData.owner.thoughts || 'Car Heritage is built to give every vehicle owner in Nepal access to professional workshop care, lawful customization, and quality parts — treating each car with the same care we would give our own.'}
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}




