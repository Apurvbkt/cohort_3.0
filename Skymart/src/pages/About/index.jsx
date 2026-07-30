import { Link } from 'react-router-dom'
import StatCard from '../../components/StatCard/index.jsx'
import { FiArrowRight, FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi'

const FEATURES = [
  {
    icon: <FiTruck size={24} />,
    title: 'Fast Delivery',
    desc: 'Lightning-fast shipping to your doorstep. Most orders delivered within 24-48 hours.',
    accent: 'green',
  },
  {
    icon: <FiShield size={24} />,
    title: 'Secure Checkout',
    desc: 'Your payments are protected with bank-level encryption and fraud prevention.',
    accent: 'blue',
  },
  {
    icon: <FiHeadphones size={24} />,
    title: '24/7 Support',
    desc: 'Our friendly team is always here to help. Day or night, we have you covered.',
    accent: 'purple',
  },
  {
    icon: <FiRefreshCw size={24} />,
    title: 'Easy Returns',
    desc: 'Not satisfied? Return within 30 days, no questions asked. Simple as that.',
    accent: 'yellow',
  },
]

export default function About() {
  return (
    <div className="animate-fade-in space-y-14 lg:space-y-20">
      <section className="text-center py-8 lg:py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent text-surface text-4xl mb-6 shadow-glow animate-pulse-soft">
          ⚡
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
          About <span className="text-accent">SkyMart</span>
        </h1>
        <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Your modern shopping destination where quality meets affordability.
          Curated products, unbeatable prices, and a shopping experience that feels like magic.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard icon="📦" value="20K+" label="Products" sublabel="In our catalog" accent="green" />
          <StatCard icon="😊" value="50K+" label="Happy Customers" sublabel="And counting" accent="blue" />
          <StatCard icon="⭐" value="4.9" label="Avg. Rating" sublabel="Out of 5 stars" accent="yellow" />
          <StatCard icon="🚚" value="99%" label="On-time Delivery" sublabel="Across all orders" accent="purple" />
        </div>
      </section>

      <section>
        <div className="card p-6 sm:p-8 lg:p-10 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-6 text-ink-muted leading-relaxed">
            <p>
              SkyMart was born in 2022 with a simple mission: make shopping delightful, fast,
              and affordable for everyone. What started as a small team of three passionate
              creators has grown into a trusted marketplace serving over{' '}
              <span className="text-accent font-semibold">50,000 happy customers</span> and
              counting.
            </p>
            <p>
              We believe every shopper deserves premium products without the premium price tag.
              Our team works tirelessly to curate catalogs, negotiate the best deals, and build
              a platform that puts the customer first. From gadgets to fashion, beauty to home
              essentials — SkyMart is where the future of shopping lives.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-accent-soft border border-accent/20">
              <p className="text-2xl font-black text-accent">2022</p>
              <p className="text-sm text-ink-muted mt-1">Founded</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-2xl font-black text-blue-400">50K+</p>
              <p className="text-sm text-ink-muted mt-1">Customers</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-2xl font-black text-purple-400">150+</p>
              <p className="text-sm text-ink-muted mt-1">Countries shipped</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Why Choose SkyMart</h2>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-xl mx-auto">
            We are more than just a store — we are your shopping companion for life.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card p-6 hover:-translate-y-1 hover:shadow-card-hover transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ring-1 ${
                    f.accent === 'green'
                      ? 'bg-green-500/10 text-green-400 ring-green-500/30'
                      : f.accent === 'blue'
                      ? 'bg-blue-500/10 text-blue-400 ring-blue-500/30'
                      : f.accent === 'purple'
                      ? 'bg-purple-500/10 text-purple-400 ring-purple-500/30'
                      : 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30'
                  }`}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink mb-1">{f.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-14 bg-surface-card border border-surface-border">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3">
                Ready to start shopping?
              </h3>
              <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
                Browse thousands of hand-picked products, exclusive deals, and new arrivals
                every single week.
              </p>
            </div>
            <div className="shrink-0">
              <Link to="/shop" className="btn-accent px-7 py-3.5 text-base">
                Browse Products
                <FiArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
