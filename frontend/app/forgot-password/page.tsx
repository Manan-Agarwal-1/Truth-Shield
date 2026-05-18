'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Shield, Mail, ArrowRight } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark to-dark-card flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl neon-blue">TruthShield AI</span>
        </div>

        <div className="card-dark border-2 border-dark-border p-8">
          <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-400 mb-8">Enter your email to receive reset instructions.</p>

          {submitted ? (
            <div className="rounded-2xl border border-success/20 bg-success/10 p-6 text-success">
              Check your inbox. We sent a recovery link to <span className="font-semibold">{email}</span>.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-primary/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-dark pl-10"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
                Send Recovery Link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-dark-border text-center text-gray-400">
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
