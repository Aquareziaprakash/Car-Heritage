'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Hero = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const motionProps = isMobile || shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
      }

  const ContentWrapper = isMobile || shouldReduceMotion ? 'div' : motion.div

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video/GIF Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/60 to-primary-dark/80 z-10" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920')] bg-cover bg-center" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <ContentWrapper
          {...motionProps}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 px-4">
            Car Heritage
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 px-4">
            Premium Car Care & Customization
          </p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8 md:mb-12 px-4">
            <div
              className={`bg-primary-metallic/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary-red/30 ${
                !isMobile && !shouldReduceMotion ? 'md:hover:scale-105 transition-transform' : ''
              }`}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-red mb-2">
                Premium Car Care
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Expert washing, detailing, and maintenance services
              </p>
            </div>

            <div
              className={`bg-primary-metallic/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary-red/30 ${
                !isMobile && !shouldReduceMotion ? 'md:hover:scale-105 transition-transform' : ''
              }`}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-red mb-2">
                Customization Experts
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Denting, painting, and full custom modifications
              </p>
            </div>

            <div
              className={`bg-primary-metallic/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary-red/30 ${
                !isMobile && !shouldReduceMotion ? 'md:hover:scale-105 transition-transform' : ''
              }`}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-red mb-2">
                All Products Under One Roof
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Accessories, tools, and care products
              </p>
            </div>

            <div
              className={`bg-primary-metallic/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary-red/30 ${
                !isMobile && !shouldReduceMotion ? 'md:hover:scale-105 transition-transform' : ''
              }`}
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary-red mb-2">
                Café & Parking
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Relax at our café while we service your car
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/services" className="w-full sm:w-auto">
              <button
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg font-semibold text-base sm:text-lg transition-colors ${
                  !isMobile && !shouldReduceMotion ? 'md:hover:scale-105 md:active:scale-95' : ''
                }`}
              >
                Book a Service
              </button>
            </Link>
            <Link href="/products" className="w-full sm:w-auto">
              <button
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white rounded-lg font-semibold text-base sm:text-lg transition-colors ${
                  !isMobile && !shouldReduceMotion ? 'md:hover:scale-105 md:active:scale-95' : ''
                }`}
              >
                View Products
              </button>
            </Link>
          </div>
        </ContentWrapper>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      {!isMobile && !shouldReduceMotion && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      )}
    </section>
  )
}

export default Hero




