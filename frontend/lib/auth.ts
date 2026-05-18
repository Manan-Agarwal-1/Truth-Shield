export type AuthUser = {
  id: number | string
  name?: string
  email: string
}

const USER_KEY = 'user'

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(USER_KEY)
  return stored ? JSON.parse(stored) : null
}

export function setAuthUser(user: AuthUser) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthUser() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return getAuthUser() !== null
}
