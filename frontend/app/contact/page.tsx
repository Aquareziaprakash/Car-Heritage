'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // In a real app, you'd send this to your backend
    setTimeout(() => {
      toast.success('Message sent! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitting(false)
    }, 1000)
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
            <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-400">
              Get in touch with Car Heritage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-primary-red text-2xl mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Address</h3>
                    <p className="text-gray-300">
                      123 Automotive Street<br />
                      City, State 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <div className="flex items-start space-x-4">
                  <FaPhone className="text-primary-red text-2xl mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <div className="flex items-start space-x-4">
                  <FaEnvelope className="text-primary-red text-2xl mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">info@carheritage.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <div className="flex items-start space-x-4">
                  <FaClock className="text-primary-red text-2xl mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Working Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 8:00 AM - 7:00 PM<br />
                      Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary-metallic p-4 sm:p-6 md:p-8 rounded-lg border border-primary-red/20"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 bg-primary-dark border border-primary-red/30 rounded-lg text-white focus:outline-none focus:border-primary-red resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}




