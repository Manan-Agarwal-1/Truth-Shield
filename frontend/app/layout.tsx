import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'TruthShield AI - Cybersecurity Threat Detection',
  description: 'AI-powered platform detecting scams, phishing, fake news, and deepfakes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark">
        {children}
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid rgba(56, 189, 248, 0.2)',
          },
          success: {
            style: { background: '#062f4b' },
          },
          error: {
            style: { background: '#3b0d0d' },
          },
        }} />
      </body>
    </html>
  )
}
