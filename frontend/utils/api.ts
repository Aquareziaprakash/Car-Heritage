import { getApiUrl } from '@/lib/api'

// Helper function to build API endpoints
export const apiUrl = (endpoint: string) => {
  const baseUrl = getApiUrl()
  // Remove leading slash if present, then add it
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${baseUrl}${cleanEndpoint}`
}

// Export API endpoints as constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  PRODUCTS: '/api/products',
  SERVICES: '/api/services',
  STAFF: '/api/staff',
  REVIEWS: '/api/reviews',
  REVIEWS_STATS: '/api/reviews/stats/average',
  ABOUT: '/api/about',
}

export default apiUrl

