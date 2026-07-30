import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { IoSearch, IoCartOutline, IoMenu, IoClose, IoShareOutline, IoLogOutOutline } from 'react-icons/io5'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { totalItems, openDrawer } = useCart()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
  ]

  const userName = user?.name || 'User'

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-transparent">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/home"
            className="flex items-center gap-3 group"
            aria-label="SkyMart Home"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-accent flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <span className="text-surface text-xl md:text-2xl font-black">⚡</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight">
              <span className="text-ink">Sky</span>
              <span className="text-accent">Mart</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-accent'
                      : 'text-ink-muted hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              aria-label="Search"
              onClick={() => navigate('/shop')}
              className="inline-flex items-center gap-2 h-10 px-3 rounded-xl bg-surface-soft border border-surface-border text-ink-muted hover:border-accent/60 hover:text-ink transition-all duration-200"
            >
              <span className="w-6 h-6 rounded-lg bg-accent text-surface flex items-center justify-center">
                <IoSearch size={14} />
              </span>
              <span className="text-sm font-medium text-ink pr-1">{userName}</span>
            </button>

            <button
              onClick={openDrawer}
              className="btn-icon relative"
              aria-label={`Cart with ${totalItems} items`}
            >
              <IoCartOutline size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-surface text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            <button
              aria-label="Share"
              onClick={handleSignOut}
              title="Sign out"
              className="btn-icon"
            >
              <IoShareOutline size={20} />
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden btn-icon"
          >
            {mobileOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-surface-border animate-fade-in">
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-accent bg-accent-soft'
                        : 'text-ink-muted hover:text-ink hover:bg-surface-hover'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-surface-border">
              <button
                onClick={() => { navigate('/shop'); setMobileOpen(false) }}
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-surface-soft border border-surface-border text-ink-muted hover:border-accent/60 hover:text-ink transition-all"
              >
                <span className="w-6 h-6 rounded-lg bg-accent text-surface flex items-center justify-center">
                  <IoSearch size={14} />
                </span>
                <span className="text-sm font-medium text-ink">{userName}</span>
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => { openDrawer(); setMobileOpen(false) }}
                className="btn-icon relative h-11 w-auto"
              >
                <IoCartOutline size={20} />
                <span className="ml-2 text-sm font-medium">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-surface text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={handleSignOut}
                className="btn-icon h-11 w-auto"
              >
                <IoLogOutOutline size={20} />
                <span className="ml-2 text-sm font-medium">Sign Out</span>
              </button>
            </div>

            {user && (
              <div className="mt-4 p-3 rounded-2xl bg-surface-soft">
                <p className="text-sm font-semibold text-ink">{user.name}</p>
                <p className="text-xs text-ink-muted truncate">{user.email}</p>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
