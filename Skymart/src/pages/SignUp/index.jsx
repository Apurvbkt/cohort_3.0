import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'

export default function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const res = signUp({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      if (!res.success) {
        setError(res.message)
        return
      }
      setTimeout(() => navigate('/home'), 100)
    } finally {
      setLoading(false)
    }
  }

  const pwLength = form.password.length >= 6
  const pwMatch = form.confirmPassword && form.password === form.confirmPassword

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface text-ink relative overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full flex flex-col items-center animate-slide-up">
        <Link to="/signup" className="flex items-center gap-3 mb-14">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-surface font-black text-2xl shadow-glow">
            ⚡
          </div>
          <span className="text-3xl font-black tracking-tight">
            Sky<span className="text-accent">Mart</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-surface-border bg-surface-card p-7 sm:p-8 shadow-soft">
            <div className="mb-7">
              <h2 className="text-2xl font-black tracking-tight">Create account</h2>
              <p className="text-sm text-ink-muted mt-1.5">
                Join SkyMart and start shopping
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
                    <FiUser size={18} />
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Full name"
                    autoComplete="name"
                    className="input-field !pl-12"
                  />
                </div>
              </div>

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
                    placeholder="Password (min 6 chars)"
                    autoComplete="new-password"
                    className={`input-field !pl-12 !pr-12 ${pwLength ? '!border-green-500/50 !ring-green-500/10' : ''}`}
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

              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <FiLock size={18} />
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className={`input-field !pl-12 !pr-12 ${pwMatch ? '!border-green-500/50 !ring-green-500/10' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg hover:bg-surface-hover flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </button>
                </div>
                {form.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {pwMatch ? (
                    <FiCheckCircle size={14} className="text-green-400" />
                  ) : (
                    <FiAlertCircle size={14} className="text-red-400" />
                  )}
                  <span className={pwMatch ? 'text-green-400' : 'text-red-400'}>
                    {pwMatch ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-accent w-full !rounded-full !py-3.5 mt-2 text-base font-bold"
              >
                {loading ? 'Creating account...' : (
                  <>
                    Create Account
                    <FiArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-ink-muted mt-7">
              Already have an account?{' '}
              <Link to="/signin" className="text-accent font-bold hover:text-accent-hover transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
