import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../../components/Hero/index.jsx'
import StatCard from '../../components/StatCard/index.jsx'
import LoadingSkeleton from '../../components/LoadingSkeleton/index.jsx'
import ErrorState from '../../components/ErrorState/index.jsx'
import { getProducts, getCategories } from '../../services/api.js'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../utils/index.js'
import { FaArrowTrendUp, FaStar, FaTag, FaBox, FaCartPlus } from 'react-icons/fa6'

const PARENT_CATEGORIES = [
  {
    key: 'electronics',
    label: 'Electronics',
    icon: <div className="text-[2.2rem] leading-none">💻</div>,
    children: ['smartphones', 'laptops', 'tablets', 'mobile-accessories', 'televisions', 'cameras', 'headphones', 'audio'],
  },
  {
    key: 'clothing',
    label: 'Clothing',
    icon: <div className="text-[2.2rem] leading-none">👕</div>,
    children: ['tops', 'shirts', 'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes', 'womens-watches', 'mens-watches', 'womens-bags', 'sunglasses'],
  },
  {
    key: 'furniture',
    label: 'Furniture',
    icon: <div className="text-[2.2rem] leading-none">🪑</div>,
    children: ['furniture'],
  },
  {
    key: 'home',
    label: 'Home',
    icon: <div className="text-[2.2rem] leading-none">🏠</div>,
    children: ['home-decoration', 'home-garden', 'groceries', 'kitchen-accessories', 'skincare', 'fragrances', 'lighting'],
  },
  {
    key: 'sports',
    label: 'Sports',
    icon: <div className="text-[2.2rem] leading-none">🏋️</div>,
    children: ['sports', 'sports-accessories', 'motorcycle', 'automotive'],
  },
  {
    key: 'accessories',
    label: 'Accessories',
    icon: <div className="text-[2.2rem] leading-none">👜</div>,
    children: ['womens-jewellery', 'womens-bags', 'watches', 'accessories', 'sunglasses'],
  },
]

function getParentCategory(cat) {
  const c = (cat || '').toLowerCase()
  for (const parent of PARENT_CATEGORIES) {
    if (c === parent.key) return parent.key
    if (parent.children.some((child) => c.includes(child) || child.includes(c))) {
      return parent.key
    }
  }
  return 'home'
}

const PARENT_ICON = {
  electronics: <div className="text-[2.2rem] leading-none">💻</div>,
  clothing: <div className="text-[2.2rem] leading-none">👕</div>,
  furniture: <div className="text-[2.2rem] leading-none">🪑</div>,
  home: <div className="text-[2.2rem] leading-none">🏠</div>,
  sports: <div className="text-[2.2rem] leading-none">🏋️</div>,
  accessories: <div className="text-[2.2rem] leading-none">👜</div>,
}

export default function Home() {
  const { totalItems, grandTotal, addItemAndOpen } = useCart()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts({ limit: 50 }),
        getCategories(),
      ])
      if (productsRes.error) throw new Error(productsRes.error)
      if (categoriesRes.error) throw new Error(categoriesRes.error)
      setProducts(productsRes.data?.products || [])
      setCategories(categoriesRes.data || [])
    } catch (err) {
      setError(err?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const { parentCounts, categoryProductMap } = useMemo(() => {
    const counts = {}
    const map = {}
    PARENT_CATEGORIES.forEach((p) => {
      counts[p.key] = 0
      map[p.key] = []
    })
    products.forEach((p) => {
      const key = getParentCategory(p.category)
      counts[key] = (counts[key] || 0) + 1
      if (map[key]) map[key].push(p)
    })
    return { parentCounts: counts, categoryProductMap: map }
  }, [products])

  const topRated = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
      .slice(0, 5)
  }, [products])

  const newArrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
      .slice(0, 5)
  }, [products])

  const openCategory = (parentKey) => {
    const cat = PARENT_CATEGORIES.find((p) => p.key === parentKey)
    if (!cat) { navigate('/shop'); return }
    navigate('/shop')
  }

  return (
    <div className="animate-fade-in space-y-10 lg:space-y-14">
      <Hero />

      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            icon={<FaBox />}
            value={totalItems}
            label="Cart Items"
            sublabel="In your bag"
            accent="green"
          />
          <StatCard
            icon={<FaArrowTrendUp />}
            value={formatPrice(grandTotal)}
            label="Cart Value"
            sublabel="Ready to checkout"
            accent="blue"
          />
          <StatCard
            icon={<FaStar />}
            value="5"
            label="Top Products"
            sublabel="Highly rated"
            accent="yellow"
          />
          <StatCard
            icon={<FaTag />}
            value={categories.length || '6'}
            label="Categories"
            sublabel="To explore"
            accent="purple"
          />
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-5 lg:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <Link
            to="/shop"
            className="shrink-0 text-sm font-bold text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
          >
            View All
            <span aria-hidden>→</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl bg-surface-card border border-surface-border p-8 animate-pulse h-40"
              />
            ))}
          </div>
        ) : error ? (
          <ErrorState title="Failed to load categories" message={error} onRetry={loadData} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {PARENT_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => openCategory(cat.key)}
                className="rounded-3xl bg-white p-6 flex flex-col items-center justify-start gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover group"
              >
                <div className="w-full flex items-center justify-center pt-2">
                  {PARENT_ICON[cat.key]}
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                  <p className="font-bold text-surface/90 text-sm sm:text-base leading-snug text-center">
                    {cat.label}
                  </p>
                  <p className="text-xs text-surface/50">
                    {parentCounts[cat.key] || 0} items
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <div className="rounded-3xl bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">⭐</span>
                <h3 className="text-lg sm:text-xl font-black text-surface tracking-tight">
                  Top Rated
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs sm:text-sm font-bold text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
              >
                See all
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="space-y-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-zinc-100 h-20 animate-pulse bg-zinc-50"
                    />
                  ))
                : topRated.map((p) => (
                    <div
                      key={`top-${p.id}`}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-3 sm:p-3.5 hover:border-accent/40 transition-all duration-200"
                    >
                      <button
                        onClick={() => navigate(`/products/${p.id}`)}
                        className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden bg-zinc-50"
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/120/120' }}
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          onClick={() => navigate(`/products/${p.id}`)}
                          className="text-sm font-semibold text-surface/90 line-clamp-1 cursor-pointer hover:text-accent-dark transition-colors"
                        >
                          {p.title}
                        </p>
                        <p className="text-base sm:text-lg font-black text-accent mt-0.5">
                          {formatPrice(p.price)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); addItemAndOpen(p) }}
                        aria-label={`Add ${p.title} to cart`}
                        className="shrink-0 w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center hover:bg-accent hover:text-surface transition-all duration-200"
                      >
                        <FaCartPlus size={15} />
                      </button>
                    </div>
                  ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-accent text-xl">⚡</span>
                <h3 className="text-lg sm:text-xl font-black text-surface tracking-tight">
                  New Arrivals
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs sm:text-sm font-bold text-accent hover:text-accent-hover transition-colors inline-flex items-center gap-1"
              >
                See all
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="space-y-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-zinc-100 h-20 animate-pulse bg-zinc-50"
                    />
                  ))
                : newArrivals.map((p) => (
                    <div
                      key={`new-${p.id}`}
                      className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-3 sm:p-3.5 hover:border-accent/40 transition-all duration-200"
                    >
                      <button
                        onClick={() => navigate(`/products/${p.id}`)}
                        className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden bg-zinc-50"
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/120/120' }}
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          onClick={() => navigate(`/products/${p.id}`)}
                          className="text-sm font-semibold text-surface/90 line-clamp-1 cursor-pointer hover:text-accent-dark transition-colors"
                        >
                          {p.title}
                        </p>
                        <p className="text-base sm:text-lg font-black text-accent mt-0.5">
                          {formatPrice(p.price)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); addItemAndOpen(p) }}
                        aria-label={`Add ${p.title} to cart`}
                        className="shrink-0 w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center hover:bg-accent hover:text-surface transition-all duration-200"
                      >
                        <FaCartPlus size={15} />
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
