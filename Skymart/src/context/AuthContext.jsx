import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'skymart_user'
const USERS_KEY = 'skymart_users'

const getStoredUser = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const getUsers = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const signUp = ({ name, email, password }) => {
    if (!name || !email || !password) {
      return { success: false, message: 'Please fill all fields' }
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }
    const users = getUsers()
    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'An account with this email already exists' }
    }
    const newUser = { id: Date.now(), name, email, password }
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const { password: _, ...safeUser } = newUser
    setUser(safeUser)
    return { success: true }
  }

  const signIn = ({ email, password }) => {
    if (!email || !password) {
      return { success: false, message: 'Please enter email and password' }
    }
    const users = getUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      return { success: false, message: 'Invalid email or password' }
    }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    return { success: true }
  }

  const signOut = () => setUser(null)

  const updateProfile = (data) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev))
  }

  const value = {
    user,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
