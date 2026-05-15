import type { Metadata } from 'next'
import './globals.css'

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
      </body>
    </html>
  )
}
