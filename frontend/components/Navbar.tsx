'use client'

import { Bell, LogOut, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { clearAuthUser, getAuthUser } from '@/lib/auth'

export default function Navbar() {
  const router = useRouter()
  const user = getAuthUser()

  const handleLogout = () => {
    clearAuthUser()
    router.push('/login')
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b border-dark-border/80 py-4 px-6 bg-dark-card/90 glass sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-gray-300">Live AI Protection</div>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input placeholder="Search scans, alerts, threats" className="input-dark pl-10 pr-4 w-80" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-3 rounded-2xl hover:bg-white/5 transition" title="Notifications">
          <Bell className="w-5 h-5 text-primary" />
        </button>
        <div className="flex items-center gap-3 rounded-3xl border border-dark-border/80 bg-[#071224] px-4 py-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">TS</div>
          <div className="text-right">
            <div className="text-sm font-semibold">{user?.name ?? 'Threat Analyst'}</div>
            <div className="text-xs text-gray-500">Secure account</div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-secondary px-4 py-2 text-sm">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </div>
    </header>
  )
}
