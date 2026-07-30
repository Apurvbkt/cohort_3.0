import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = signIn(form)
      if (!res.success) {
        setError(res.message)
        return
      }
      setTimeout(() => navigate('/home'), 100)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { value: '20K+', label: 'Products' },
    { value: '50K+', label: 'Users' },
    { value: '4.9★', label: 'Rating' },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface text-ink animate-fade-in">
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-auth-split border-r border-surface-border/60">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-10 xl:p-14">
          <Link to="/signin" className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center text-surface font-black text-xl shadow-glow">
              ⚡
            </div>
            <span className="text-2xl font-black tracking-tight">
              Sky<span className="text-accent">Mart</span>
            </span>
          </Link>
        </div>

        <div className="relative px-10 xl:px-14 -mt-10">
          <p className="text-xs font-bold text-accent tracking-[0.2em] uppercase mb-6">
            Welcome Back
          </p>
          <h1 className="text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight">
            <span className="block text-ink">Shop the future.</span>
            <span className="block text-accent mt-1">Today.</span>
          </h1>
          <p className="mt-6 text-base text-ink-muted max-w-md leading-relaxed">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>
        </div>

        <div className="relative p-10 xl:p-14">
          <div className="flex flex-wrap gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="px-4 py-3 rounded-2xl bg-surface-card/70 border border-surface-border backdrop-blur-sm"
              >
                <span className="text-lg font-black text-accent">{s.value}</span>
                <span className="text-xs text-ink-muted ml-2">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-8 min-h-screen">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex items-center justify-center gap-2">
            <Link to="/signin" className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-accent flex items-center justify-center text-surface font-black text-xl shadow-glow">
                ⚡
              </div>
              <span className="text-2xl font-black tracking-tight">
                Sky<span className="text-accent">Mart</span>
              </span>
            </Link>
          </div>

          <div className="rounded-3xl border border-surface-border bg-surface-card p-7 sm:p-8 animate-slide-up">
            <div className="mb-7">
              <h2 className="text-2xl font-black tracking-tight">Sign in</h2>
              <p className="text-sm text-ink-muted mt-1.5">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 animate-fade-in">
                <FiAlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-300 leading-snug">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <FiMail size={18} />
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="Email address"
                    autoComplete="email"
                    className="input-field !pl-12"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <FiLock size={18} />
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={update('password')}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="input-field !pl-12 !pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full !rounded-full !py-3.5 mt-3 text-base font-bold"
              >
                {loading ? 'Signing in...' : (
                  <>
                    Sign in
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-ink-muted mt-7">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-accent font-bold hover:text-accent-hover transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
