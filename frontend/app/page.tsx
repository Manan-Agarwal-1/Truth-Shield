'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Zap, BarChart3, AlertTriangle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark to-dark-card">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 border-b border-dark-border/30 backdrop-blur-md glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl neon-blue">TruthShield AI</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-primary hover:text-primary/80 transition">
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold">
                🔒 Advanced Threat Detection
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              <span className="neon-blue">Detect Threats</span>
              <br />
              <span>Before They</span>
              <br />
              <span className="neon-purple">Harm You</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              TruthShield AI uses cutting-edge machine learning to detect scams, phishing links, fake news, and deepfakes in real-time. Protect yourself with intelligent threat analysis.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/signup" className="btn-primary flex items-center gap-2">
                Start Scanning Now <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl -z-10"></div>
            <div className="glass rounded-2xl p-8 border border-primary/20">
              <div className="w-full h-96 bg-dark-card rounded-lg flex items-center justify-center border border-dark-border/50">
                <div className="text-center">
                  <Zap className="w-20 h-20 mx-auto text-primary mb-4 animate-pulse" />
                  <p className="text-gray-400">Advanced AI Threat Analysis Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Comprehensive <span className="neon-blue">Threat Detection</span>
          </h2>
          <p className="text-center text-gray-400 mb-16">
            Our AI-powered scanners detect multiple types of cyber threats
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔗',
                title: 'URL Scanner',
                desc: 'Detect phishing links and malicious URLs instantly'
              },
              {
                icon: '💬',
                title: 'Message Scanner',
                desc: 'Analyze SMS, emails, and chat messages for scams'
              },
              {
                icon: '🎬',
                title: 'Deepfake Detector',
                desc: 'Identify manipulated images and synthetic videos'
              },
              {
                icon: '📰',
                title: 'Fake News Detection',
                desc: 'Classify misinformation and fabricated headlines'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card-dark group cursor-pointer">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: '50M+', label: 'Threats Detected' },
              { stat: '99.8%', label: 'Detection Accuracy' },
              { stat: '24/7', label: 'Real-time Monitoring' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold neon-blue mb-2">{item.stat}</div>
                <p className="text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Digital Life?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of users protecting themselves with TruthShield AI
          </p>
          <Link href="/signup" className="btn-primary inline-flex items-center gap-2">
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2024 TruthShield AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
