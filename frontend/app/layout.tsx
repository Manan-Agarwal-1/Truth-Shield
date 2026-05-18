import type { Metadata } from 'next'
import './globals.css'
import ToastProvider from '@/components/ToastProvider'

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
        <ToastProvider />
      </body>
    </html>
  )
}
