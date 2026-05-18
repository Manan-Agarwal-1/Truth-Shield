'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#0f1535',
          color: '#ffffff',
          border: '1px solid rgba(0, 212, 255, 0.15)',
          boxShadow: '0 15px 60px rgba(0, 0, 0, 0.25)',
        },
        success: {
          duration: 3000,
          style: {
            background: '#06203a',
            borderColor: '#00d4ff',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#2f121d',
            borderColor: '#ff1744',
          },
        },
      }}
    />
  )
}
