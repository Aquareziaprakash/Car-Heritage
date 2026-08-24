'use client'

import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTiktok, FaMailBulk } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary-dark border-t border-primary-metallic">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CH</span>
              </div>
              <span className="text-white font-bold text-xl">Car Heritage</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Car Heritage Enterprises Pvt. Ltd. — premium automobile services: washing, detailing, customization, and more.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/Car-Heritage-Enterprises-61584665677244/" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/carheritage_enterprises/?hl=en" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@santoshpathak864" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
              <a href="+977 982-0092781" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaPhone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-red mt-1" />
                <span className="text-gray-400 text-sm">
                  Kirtipur Municipality-6<br />
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-red" />
                <span className="text-gray-400 text-sm">+977 982-0092781</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-red" />
                <span className="text-gray-400 text-sm">carheritagenepal12@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Working Hours</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Monday - Friday: 8:00 AM - 7:00 PM</li>
              <li>Saturday: 9:00 AM - 6:00 PM</li>
              <li>Sunday: 10:00 AM - 4:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-metallic mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Car Heritage Enterprises Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer




