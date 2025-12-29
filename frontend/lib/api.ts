// lib/api.ts
import axios from 'axios'

const getBaseURL = () => {
  // Prefer explicit environment variable (available on both server and client)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }

  // During local development fallback to localhost backend
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000'
  }

  // In production, prefer an explicit NEXT_PUBLIC_API_URL; leave empty to use
  // relative URLs if that's intended by your deployment setup.
  return ''
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('adminToken')
      : null

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
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
