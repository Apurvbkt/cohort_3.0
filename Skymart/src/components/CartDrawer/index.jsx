import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingCart,
  FiArrowRight,
  FiX,
} from 'react-icons/fi'
import { useCart } from '../../context/CartContext.jsx'
import {
  formatPrice,
  calculateDiscount,
  titleCase,
  truncate,
} from '../../utils/index.js'

export default function CartDrawer() {
  const {
    items,
    totalItems,
    increment,
    decrement,
    removeItem,
    clear,
    isDrawerOpen,
    closeDrawer,
    openSuccess,
  } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isDrawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isDrawerOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) closeDrawer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isDrawerOpen, closeDrawer])

  if (!isDrawerOpen) return null

  const subtotal = items.reduce((sum, it) => {
    const price = it.discountPercentage
      ? calculateDiscount(it.price, it.discountPercentage)
      : it.price
    return sum + Number(price) * it.quantity
  }, 0)
  const shipping = subtotal * 83 >= 999 ? 0 : 50 / 83
  const tax = Number((subtotal * 0.05).toFixed(2))
  const finalTotal = Number((subtotal + shipping + tax).toFixed(2))

  const handleCheckout = () => {
    if (!items.length) return
    const orderId =
      'SKY' +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 900 + 100)
    openSuccess({
      orderNumber: orderId,
      totalItems,
      finalTotal,
    })
  }

  const goFullCart = (e) => {
    e.preventDefault()
    closeDrawer()
    navigate('/cart')
  }

  return (
    <div
      className="fixed inset-0 z-[90] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className="absolute right-0 top-0 h-full w-[min(100%,420px)] bg-surface-card border-l border-surface-border shadow-2xl flex flex-col animate-slide-in-right"
      >
        <header className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-surface-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent text-surface flex items-center justify-center">
              <FiShoppingCart size={16} />
            </div>
            <h2
              id="cart-drawer-title"
              className="text-lg font-bold tracking-tight text-ink"
            >
              Cart
            </h2>
            {totalItems > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-700/80 text-ink text-xs font-bold">
                {totalItems} item{totalItems === 1 ? '' : 's'}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
          >
            <FiX size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-soft flex items-center justify-center text-ink-soft mb-4">
                <FiShoppingCart size={28} />
              </div>
              <p className="font-semibold text-ink">Your cart is empty</p>
              <p className="text-sm text-ink-muted mt-1">
                Start adding some amazing products!
              </p>
              <button
                onClick={closeDrawer}
                className="btn-accent mt-6 !py-2.5 text-sm"
              >
                Browse Products
                <FiArrowRight size={14} />
              </button>
            </div>
          ) : (
            <ul className="px-5 sm:px-6 py-4 space-y-3">
              {items.map((it) => {
                const unit = it.discountPercentage
                  ? calculateDiscount(it.price, it.discountPercentage)
                  : it.price
                return (
                  <li
                    key={it.id}
                    className="rounded-2xl border border-surface-border bg-surface-soft/60 p-3 sm:p-3.5 flex gap-3.5"
                  >
                    <Link
                      to={`/products/${it.id}`}
                      onClick={closeDrawer}
                      className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-surface-card overflow-hidden border border-surface-border"
                    >
                      <img
                        src={it.thumbnail}
                        alt={it.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://via.placeholder.com/100'
                        }}
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-accent font-bold">
                          {titleCase(it.category)}
                        </span>
                        <Link
                          to={`/products/${it.id}`}
                          onClick={closeDrawer}
                          className="block mt-0.5"
                        >
                          <p className="text-sm font-semibold text-ink leading-snug line-clamp-1 hover:text-accent transition-colors">
                            {truncate(it.title, 55)}
                          </p>
                        </Link>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="font-black text-accent">
                            {formatPrice(unit)}
                          </span>
                          <span className="text-[11px] text-ink-muted">
                            {formatPrice(unit)} each
                          </span>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 bg-surface-card border border-surface-border rounded-xl p-0.5">
                          <button
                            onClick={() => decrement(it.id)}
                            aria-label="Decrease"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
                          >
                            <FiMinus size={13} />
                          </button>
                          <span className="w-6 text-center font-bold text-ink text-xs tabular-nums">
                            {it.quantity}
                          </span>
                          <button
                            onClick={() => increment(it.id)}
                            aria-label="Increase"
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
                          >
                            <FiPlus size={13} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(it.id)}
                          aria-label="Remove item"
                          className="w-8 h-8 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-surface-border px-5 sm:px-6 py-5 space-y-4 bg-surface-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-muted">Total</span>
              <div className="text-right">
                <span className="text-2xl font-black tracking-tight text-ink">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-2xl bg-accent text-surface font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent-hover shadow-glow hover:shadow-[0_0_50px_-10px_rgba(194,255,0,0.55)] transition-all active:scale-[0.99]"
            >
              Checkout
              <FiArrowRight size={16} />
            </button>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={goFullCart}
                className="text-xs font-semibold text-ink-muted hover:text-accent transition-colors underline-offset-2 hover:underline"
              >
                View full cart →
              </button>
              <button
                onClick={() => clear()}
                className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Clear cart
              </button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  )
}
