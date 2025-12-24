'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video/GIF Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/60 to-primary-dark/80 z-10" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920')] bg-cover bg-center" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Car Heritage
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-8">
            Premium Car Care & Customization
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-metallic/80 backdrop-blur-sm p-6 rounded-lg border border-primary-red/30"
            >
              <h3 className="text-xl font-semibold text-primary-red mb-2">
                Premium Car Care
              </h3>
              <p className="text-gray-300 text-sm">
                Expert washing, detailing, and maintenance services
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-metallic/80 backdrop-blur-sm p-6 rounded-lg border border-primary-red/30"
            >
              <h3 className="text-xl font-semibold text-primary-red mb-2">
                Customization Experts
              </h3>
              <p className="text-gray-300 text-sm">
                Denting, painting, and full custom modifications
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-metallic/80 backdrop-blur-sm p-6 rounded-lg border border-primary-red/30"
            >
              <h3 className="text-xl font-semibold text-primary-red mb-2">
                All Products Under One Roof
              </h3>
              <p className="text-gray-300 text-sm">
                Accessories, tools, and care products
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-primary-metallic/80 backdrop-blur-sm p-6 rounded-lg border border-primary-red/30"
            >
              <h3 className="text-xl font-semibold text-primary-red mb-2">
                Café & Parking
              </h3>
              <p className="text-gray-300 text-sm">
                Relax at our café while we service your car
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg font-semibold text-lg transition-colors"
              >
                Book a Service
              </motion.button>
            </Link>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white rounded-lg font-semibold text-lg transition-colors"
              >
                View Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

export default Hero



