import axios from 'axios'

// Get base URL - Next.js exposes NEXT_PUBLIC_* vars at build time
const getBaseURL = () => {
  // Check environment variable first (set at build time)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  
  // In browser, check if localhost (for local development)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000'
    }
  }
  
  // Default fallback (should not happen in production if env var is set)
  return process.env.NEXT_PUBLIC_API_URL || ''
}

const baseURL = getBaseURL()

// Log warning if API URL is not set in production
if (typeof window !== 'undefined' && !baseURL && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  console.error('⚠️ NEXT_PUBLIC_API_URL is not set! Please configure it in your deployment settings.')
}

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  // Log API URL in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('API Request:', (config.baseURL || '') + config.url)
  }
  
  return config
})

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error in development
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        status: error.response?.status,
      })
    }
    return Promise.reject(error)
  }
)

export default api




