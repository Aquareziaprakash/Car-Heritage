import axios from 'axios'

// Get API URL from environment variable or use default
const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  
  // In browser, check if localhost
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    }
  }
  
  // Default fallback (should be set via env var in production)
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
}

const API_BASE_URL = getApiUrl()

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Export getApiUrl for direct URL construction if needed
export { getApiUrl }

export default api




