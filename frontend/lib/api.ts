import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authUser = localStorage.getItem('truthshield_user')
    if (authUser) {
      try {
        const user = JSON.parse(authUser)
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`
        }
      } catch (e) {
        // Token parse error, continue without auth header
      }
    }
  }
  return config
})

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('truthshield_user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export function safeApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.error) {
      return error.response.data.error
    }
    if (error.response?.statusText) {
      return error.response.statusText
    }
    return error.message || 'API request failed'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Unexpected error occurred'
}
