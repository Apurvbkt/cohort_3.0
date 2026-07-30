import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('skymart_theme')
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.body
    if (theme === 'dark') {
      root.classList.remove('light')
      document.documentElement.classList.add('dark')
    } else {
      root.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('skymart_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const value = { theme, setTheme, toggleTheme, isDark: theme === 'dark' }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
