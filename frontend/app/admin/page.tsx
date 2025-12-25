'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import AdminDashboard from '@/components/admin/AdminDashboard'
import AdminLogin from '@/components/admin/AdminLogin'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = async (username: string, password: string) => {
    try {
      // Check if API URL is configured
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl && typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        toast.error('API URL not configured. Please set NEXT_PUBLIC_API_URL environment variable.')
        console.error('NEXT_PUBLIC_API_URL is not set in production environment')
        return
      }

      const response = await api.post('/api/auth/login', {
        username: username.trim(),
        password: password.trim(),
      })
      
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token)
        setIsAuthenticated(true)
        toast.success('Login successful!')
      } else {
        toast.error('Login failed: No token received')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      console.error('API Base URL:', api.defaults.baseURL)
      
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data?.message || 'Login failed')
      } else if (error.request) {
        // Request made but no response
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || api.defaults.baseURL
        if (apiUrl) {
          toast.error(`Cannot connect to server at ${apiUrl}. Please check if the backend is running and accessible.`)
        } else {
          toast.error('API URL not configured. Please set NEXT_PUBLIC_API_URL environment variable in your deployment settings.')
        }
      } else {
        // Something else happened
        toast.error('Login failed: ' + (error.message || 'Unknown error'))
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}



