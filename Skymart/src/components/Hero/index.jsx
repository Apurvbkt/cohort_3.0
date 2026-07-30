import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { getGreeting } from '../../utils/index.js'

const Hero = () => {
  const { user } = useAuth()
  const greeting = getGreeting()
  const name = user?.name || 'Shopper'

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-surface-border bg-surface-card bg-grid-pattern bg-grid bg-hero-gradient animate-slide-up">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 20% 0%, rgba(194,255,0,0.08), transparent 60%)'
      }} />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          <span className="text-accent text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
            {greeting} 👋
          </span>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-balance">
              <span className="text-ink block">Welcome back,</span>
              <span className="text-accent block">{name}!</span>
            </h1>
          </div>

          <p className="text-ink-muted text-base sm:text-lg max-w-lg leading-relaxed">
            Discover today's picks — hand-curated products across electronics,
            fashion, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <Link
              to="/shop"
              className="!rounded-full inline-flex items-center justify-center gap-2 bg-accent text-surface font-semibold px-6 py-3.5 transition-all duration-200 hover:bg-accent-hover active:scale-[0.98] shadow-glow"
            >
              Shop Now
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/shop"
              className="!rounded-full inline-flex items-center justify-center gap-2 border border-surface-border text-ink font-semibold px-6 py-3.5 transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              View All Products
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 items-end w-full lg:w-80 xl:w-96 lg:ml-auto">
          <div className="w-44 sm:w-52 rounded-2xl bg-accent p-5 sm:p-6 shadow-glow">
            <div className="text-surface text-3xl sm:text-4xl font-black leading-none mb-2">
              20+
            </div>
            <div className="text-surface/75 text-xs sm:text-sm font-medium">
              Products Available
            </div>
          </div>

          <div className="w-44 sm:w-52 rounded-2xl border-2 border-surface-border bg-surface-card p-5 sm:p-6">
            <div className="text-ink text-3xl sm:text-4xl font-black leading-none mb-2">
              Free
            </div>
            <div className="text-ink-muted text-xs sm:text-sm font-medium">
              Delivery on ₹999+
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
