import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
})

export function safeApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message
  }
  return 'Unexpected error occurred'
}
