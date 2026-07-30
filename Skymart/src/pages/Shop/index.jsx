import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../../components/SearchBar/index.jsx'
import CategoryFilter from '../../components/CategoryFilter/index.jsx'
import SortDropdown from '../../components/SortDropdown/index.jsx'
import ProductGrid from '../../components/ProductGrid/index.jsx'
import LoadingSkeleton from '../../components/LoadingSkeleton/index.jsx'
import ErrorState from '../../components/ErrorState/index.jsx'
import { getProducts, getCategories } from '../../services/api.js'
import { sortProducts } from '../../utils/index.js'

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function Shop() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const debouncedSearch = useDebounce(search, 300)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts({ limit: 100 }),
        getCategories(),
      ])
      if (productsRes.error) throw new Error(productsRes.error)
      if (categoriesRes.error) throw new Error(categoriesRes.error)
      setProducts(productsRes.data?.products || [])
      setCategories(categoriesRes.data || [])
    } catch (err) {
      setError(err?.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [])

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (category !== 'all') {
      list = list.filter((p) => p.category === category)
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase()
      list = list.filter((p) =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q))
      )
    }

    return sortProducts(list, sort)
  }, [products, category, debouncedSearch, sort])

  return (
    <div className="animate-fade-in space-y-6 lg:space-y-8">
      <section>
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">All Products</h1>
          <p className="text-sm text-ink-muted mt-2">
            {loading
              ? 'Loading products...'
              : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} found`}
          </p>
        </div>

        <div className="rounded-3xl border border-surface-border bg-surface-card p-4 sm:p-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search products..."
              />
            </div>
            <CategoryFilter
              categories={categories}
              selected={category}
              onChange={setCategory}
              className="w-full md:w-auto md:min-w-[180px]"
              loading={loading && categories.length === 0}
            />
            <SortDropdown
              value={sort}
              onChange={setSort}
              className="w-full md:w-auto md:min-w-[160px]"
            />
          </div>
        </div>
      </section>

      <section>
        {error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <ProductGrid products={filteredProducts} loading={loading} />
        )}
      </section>
    </div>
  )
}
