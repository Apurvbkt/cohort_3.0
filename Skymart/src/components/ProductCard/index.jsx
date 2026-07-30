import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice, calculateDiscount, titleCase } from '../../utils/index.js'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addItemAndOpen } = useCart()

  const {
    id,
    title,
    category,
    price,
    rating,
    thumbnail,
    discountPercentage,
    stock,
    images,
  } = product

  const effectivePrice = discountPercentage
    ? calculateDiscount(price, discountPercentage)
    : price

  const imageSrc = thumbnail || (images && images[0]) || 'https://picsum.photos/400/400'

  const handleCardClick = () => navigate(`/products/${id}`)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItemAndOpen(product)
  }

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating)
    const hasHalf = rating - fullStars >= 0.5
    const stars = []
    for (let i = 0; i < 5; i++) {
      let fill = '#2A2A30'
      if (i < fullStars) fill = '#C2FF00'
      else if (i === fullStars && hasHalf) fill = '#C2FF00'
      stars.push(
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={fill}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    }
    return stars
  }

  const round = rating ? (Math.round((Number(rating) || 0) * 10) / 10).toFixed(1) : '0.0'

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden shadow-card cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover ring-1 ring-transparent hover:ring-accent/60"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div className="bg-white pt-4 px-4 relative">
        <span className="chip bg-zinc-700 text-white rounded-full text-[11px] px-2.5 py-1 font-semibold capitalize">
          {titleCase(category)}
        </span>

        <div className="aspect-square w-[82%] mx-auto mt-5 mb-5 rounded-2xl overflow-hidden bg-zinc-50">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/400/400' }}
          />
        </div>
      </div>

      <div className="bg-surface-card rounded-b-3xl p-5 space-y-3">
        <div className="text-[11px] text-ink-soft uppercase tracking-widest font-semibold">
          {titleCase(category)}
        </div>

        <h3 className="text-ink font-semibold text-base leading-snug line-clamp-2 min-h-[2.75rem]">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-0.5"
            aria-label={`Rating: ${rating} out of 5`}
          >
            {renderStars(Number(rating) || 0)}
          </div>
          <span className="text-xs text-ink-soft">({round})</span>
        </div>

        <div className="flex items-end justify-between gap-3 pt-1 border-t border-white/5 mt-2 pt-3">
          <span className="text-ink text-xl font-black">
            {formatPrice(effectivePrice)}
          </span>

          <button
            onClick={handleAddToCart}
            aria-label={`Add ${title} to cart`}
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-accent text-surface font-semibold px-3.5 py-2 rounded-full text-xs transition-all duration-200 hover:bg-accent-hover active:scale-95"
          >
            <FaCartPlus size={13} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default memo(ProductCard)
