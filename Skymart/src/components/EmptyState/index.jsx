import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { IoSearchOutline } from 'react-icons/io5'

const EmptyState = ({ variant = 'products' }) => {
  if (variant === 'cart') {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 sm:py-20 text-center animate-fade-in"
        role="status"
        aria-label="Your cart is empty"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-accent-soft border border-accent/20 flex items-center justify-center mb-6">
          <FaShoppingCart className="text-accent" size={44} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">
          Your cart is empty
        </h2>
        <p className="text-ink-muted max-w-sm mb-8 text-base leading-relaxed">
          Looks like you haven't added anything yet. Start shopping to fill it
          up with amazing products.
        </p>
        <Link to="/shop" className="btn-accent">
          Shop Now
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center justify-center py-16 sm:py-20 text-center animate-fade-in"
      role="status"
      aria-label="No products found"
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-surface-soft border border-surface-border flex items-center justify-center mb-6">
        <IoSearchOutline className="text-ink-muted" size={48} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">
        No products found
      </h2>
      <p className="text-ink-muted max-w-sm mb-2 text-base leading-relaxed">
        We couldn't find any products matching your search.
      </p>
      <p className="text-ink-soft text-sm">
        Try adjusting your filters or search for something else.
      </p>
    </div>
  )
}

export default EmptyState
