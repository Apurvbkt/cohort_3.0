import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiShoppingCart, FiStar, FiPlus, FiMinus, FiZap } from 'react-icons/fi'
import LoadingSkeleton from '../../components/LoadingSkeleton/index.jsx'
import ErrorState from '../../components/ErrorState/index.jsx'
import ProductGrid from '../../components/ProductGrid/index.jsx'
import { getProductById, getProductsByCategory } from '../../services/api.js'
import { useCart } from '../../context/CartContext.jsx'
import {
  formatPrice,
  calculateDiscount,
  titleCase,
} from '../../utils/index.js'

function Stars({ rating = 0, size = 18 }) {
  const full = Math.floor(Number(rating))
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          fill={i < full ? 'currentColor' : 'none'}
          opacity={i < full ? 1 : 0.3}
        />
      ))}
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, openDrawer } = useCart()

  const [product, setProduct] = useState(null)
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  const loadProduct = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getProductById(id)
      if (res.error) throw new Error(res.error)
      const p = res.data
      setProduct(p)
      if (p?.category) {
        const simRes = await getProductsByCategory(p.category)
        if (!simRes.error && simRes.data?.products) {
          setSimilarProducts(
            simRes.data.products.filter((sp) => String(sp.id) !== String(id)).slice(0, 4)
          )
        }
      }
    } catch (err) {
      setError(err?.message || 'Product not found')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) loadProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleAdd = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) addItem(product)
    openDrawer()
  }

  const handleBuyNow = () => {
    handleAdd()
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="animate-fade-in">
        <button className="btn-ghost mb-6 pointer-events-none opacity-60">
          <FiArrowLeft size={18} />
          Back
        </button>
        <LoadingSkeleton variant="details" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="animate-fade-in">
        <ErrorState
          title={error || 'Product not found'}
          message="The product you are looking for might have been removed or is unavailable."
          onRetry={loadProduct}
        />
      </div>
    )
  }

  const {
    title,
    price,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    category = '',
    brand = '',
    description = '',
    thumbnail,
    images = [],
  } = product

  const allImages = [thumbnail, ...(images || [])].filter(Boolean)
  const displayImages = allImages.length ? allImages : [thumbnail]
  const effectivePrice = calculateDiscount(price, discountPercentage)
  const reviewCount = Math.round(Number(rating) * 120 + 30)
  const inStock = stock > 0

  return (
    <div className="animate-fade-in space-y-12 lg:space-y-16">
      <button
        onClick={() => navigate(-1)}
        className="btn-ghost"
      >
        <FiArrowLeft size={18} />
        Back
      </button>

      <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-4">
          <div className="card overflow-hidden aspect-square bg-surface-soft">
            <img
              src={displayImages[activeImg] || displayImages[0]}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/600x600?text=${encodeURIComponent(title || 'Product')}`
              }}
            />
          </div>
          {displayImages.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {displayImages.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImg === idx
                      ? 'border-accent ring-2 ring-accent/30'
                      : 'border-surface-border hover:border-accent/50'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/100`
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6 sticky top-24">
          <span className="badge-category">{titleCase(category)}</span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Stars rating={rating} />
              <span className="font-semibold text-ink">{Number(rating).toFixed(1)}</span>
            </div>
            <span className="text-ink-muted text-sm">•</span>
            <span className="text-sm text-ink-muted">{reviewCount} reviews</span>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <span className="text-3xl sm:text-4xl font-black text-ink">
              {formatPrice(effectivePrice)}
            </span>
            {discountPercentage > 0 && (
              <>
                <span className="text-lg text-ink-soft line-through">
                  {formatPrice(price)}
                </span>
                <span className="chip bg-accent text-surface font-bold">
                  -{Math.round(discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-ink-muted leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            <span
              className={`chip ${
                inStock
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {inStock ? `${stock} in stock` : 'Out of stock'}
            </span>
            {brand && (
              <span className="chip bg-surface-soft text-ink-muted border border-surface-border">
                Brand: {brand}
              </span>
            )}
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-ink-muted mb-3">Quantity</p>
            <div className="inline-flex items-center gap-3 bg-surface-soft border border-surface-border rounded-2xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
                aria-label="Decrease quantity"
              >
                <FiMinus size={16} />
              </button>
              <span className="w-10 text-center font-bold text-ink text-lg tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(stock || 99, q + 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
                aria-label="Increase quantity"
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className="btn-accent flex-1 py-3.5 text-base"
            >
              <FiShoppingCart size={18} />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="btn-ghost flex-1 py-3.5 text-base border-accent text-accent hover:bg-accent hover:text-surface"
            >
              <FiZap size={18} />
              Buy Now
            </button>
          </div>
        </div>
      </article>

      {similarProducts.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
            You may also like
          </h2>
          <ProductGrid products={similarProducts} />
        </section>
      )}
    </div>
  )
}
