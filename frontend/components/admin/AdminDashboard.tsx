'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import ProductsManagement from './ProductsManagement'
import ServicesManagement from './ServicesManagement'
import StaffManagement from './StaffManagement'
import ReviewsManagement from './ReviewsManagement'
import AboutManagement from './AboutManagement'

interface AdminDashboardProps {
  onLogout: () => void
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    staff: 0,
    reviews: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [products, services, staff, reviews] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/services'),
        api.get('/api/staff'),
        api.get('/api/reviews?approved=false'),
      ])

      setStats({
        products: products.data.length,
        services: services.data.length,
        staff: staff.data.length,
        reviews: reviews.data.length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'products', name: 'Products' },
    { id: 'services', name: 'Services' },
    { id: 'staff', name: 'Staff' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'about', name: 'About' },
  ]

  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Header */}
      <div className="bg-primary-metallic border-b border-primary-red/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CH</span>
            </div>
            <span className="text-white font-bold text-xl">Admin Panel</span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-primary-red hover:bg-primary-red-dark text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-primary-gray border-b border-primary-red/20">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary-red border-b-2 border-primary-red'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <h3 className="text-gray-400 mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-primary-red">{stats.products}</p>
              </div>
              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <h3 className="text-gray-400 mb-2">Total Services</h3>
                <p className="text-3xl font-bold text-primary-red">{stats.services}</p>
              </div>
              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <h3 className="text-gray-400 mb-2">Staff Members</h3>
                <p className="text-3xl font-bold text-primary-red">{stats.staff}</p>
              </div>
              <div className="bg-primary-metallic p-6 rounded-lg border border-primary-red/20">
                <h3 className="text-gray-400 mb-2">Pending Reviews</h3>
                <p className="text-3xl font-bold text-primary-red">{stats.reviews}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <ProductsManagement onUpdate={fetchStats} />
        )}

        {activeTab === 'services' && (
          <ServicesManagement onUpdate={fetchStats} />
        )}

        {activeTab === 'staff' && (
          <StaffManagement onUpdate={fetchStats} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsManagement onUpdate={fetchStats} />
        )}

        {activeTab === 'about' && (
          <AboutManagement />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard




