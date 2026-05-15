'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Link as LinkIcon,
  MessageSquare,
  Video,
  Newspaper,
  BarChart3,
  History,
  AlertCircle,
  Menu,
  X,
  LogOut,
  Shield,
} from 'lucide-react'

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/url-scanner', icon: LinkIcon, label: 'URL Scanner' },
  { href: '/dashboard/message-scanner', icon: MessageSquare, label: 'Message Scanner' },
  { href: '/dashboard/deepfake-scanner', icon: Video, label: 'Deepfake Scanner' },
  { href: '/dashboard/news-scanner', icon: Newspaper, label: 'Fake News' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/history', icon: History, label: 'History' },
  { href: '/dashboard/alerts', icon: AlertCircle, label: 'Alerts' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-dark-card border-r border-dark-border transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg neon-blue">TruthShield</span>}
          </div>
        </div>

        <nav className="px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-primary text-primary'
                    : 'text-gray-400 hover:text-primary hover:bg-primary/5'
                } ${!sidebarOpen && 'justify-center'}`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 px-3 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-danger w-full hover:bg-danger/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Top Bar */}
        <header className="bg-dark-card border-b border-dark-border sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-dark-border transition-all"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">{user.name || user.email}</p>
                <p className="text-xs text-gray-400">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">{(user.name || user.email)?.[0]?.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
