'use client'

import Link from 'next/link'
import { Home, ShieldCheck, Link2, MessageCircle, Video, FileText, BarChart3, Bell, Clock, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'URL Scanner', href: '/dashboard/url-scanner', icon: Link2 },
  { label: 'Message Scanner', href: '/dashboard/message-scanner', icon: MessageCircle },
  { label: 'Deepfake Scanner', href: '/dashboard/deepfake-scanner', icon: Video },
  { label: 'Fake News', href: '/dashboard/news-scanner', icon: FileText },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Alerts', href: '/dashboard/alerts', icon: Bell },
  { label: 'History', href: '/dashboard/history', icon: Clock },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden xl:flex xl:w-72 flex-col gap-6 py-8 px-6 border-r border-dark-border bg-dark-card/90 backdrop-blur-xl glass">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">TruthShield AI</div>
        <div className="rounded-3xl border border-dark-border/80 bg-[#071224] p-4">
          <p className="text-sm text-gray-400 mb-2">Security score</p>
          <div className="text-3xl font-semibold neon-blue">97.3%</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const ActiveIcon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-3xl px-4 py-3 transition ${isActive ? 'bg-primary/15 border border-primary/30 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <ActiveIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
