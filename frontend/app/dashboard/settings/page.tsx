'use client'

import { useState } from 'react'
import { Settings, ShieldCheck, Bell, Lock, User } from 'lucide-react'

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Configure your account preferences and threat notifications.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-dark">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold">Account</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-3xl bg-[#071224] border border-dark-border/50">
              <div>
                <p className="text-sm text-gray-400">Subscription</p>
                <p className="font-semibold">Pro Plan</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-3xl bg-[#071224] border border-dark-border/50">
              <div>
                <p className="text-sm text-gray-400">Secure login</p>
                <p className="font-semibold">Two-factor authentication enabled</p>
              </div>
              <Lock className="w-5 h-5 text-success" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-3xl bg-[#071224] border border-dark-border/50">
              <div>
                <p className="text-sm text-gray-400">Recovery email</p>
                <p className="font-semibold">security@truthshield.ai</p>
              </div>
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="card-dark">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Real-time threat alerts', enabled: notificationsEnabled, setter: setNotificationsEnabled },
              { label: 'Email notifications', enabled: emailAlerts, setter: setEmailAlerts },
              { label: 'Dark mode dashboard', enabled: darkMode, setter: setDarkMode },
            ].map((setting, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-3xl bg-[#071224] border border-dark-border/50">
                <div>
                  <p className="text-sm text-gray-400">{setting.label}</p>
                </div>
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    onChange={() => setting.setter(!setting.enabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-primary transition-all"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-dark p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold">System Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl bg-[#071224] border border-dark-border/50 p-4">
            <p className="text-sm text-gray-400">Threat sensitivity</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {['Low', 'Balanced', 'Aggressive'].map((option, idx) => (
                <button key={idx} className="px-4 py-3 rounded-2xl border border-dark-border/50 text-sm hover:border-primary/50 transition">
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#071224] border border-dark-border/50 p-4">
            <p className="text-sm text-gray-400">Reporting cadence</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {['Daily summary', 'Weekly report', 'Immediate alerts'].map((option, idx) => (
                <button key={idx} className="px-4 py-3 rounded-2xl border border-dark-border/50 text-sm hover:border-primary/50 transition">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
