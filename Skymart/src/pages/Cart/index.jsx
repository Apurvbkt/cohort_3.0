import { Link, useNavigate } from 'react-router-dom'
import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingBag,
  FiArrowRight,
  FiArrowLeft,
} from 'react-icons/fi'
import EmptyState from '../../components/EmptyState/index.jsx'
import { useCart } from '../../context/CartContext.jsx'
import {
  formatPrice,
  formatINR,
  calculateDiscount,
  titleCase,
  truncate,
} from '../../utils/index.js'

export default function Cart() {
  const {
    items,
    increment,
    decrement,
    removeItem,
    clear,
    totalItems,
    openSuccess,
  } = useCart()
  const navigate = useNavigate()

  if (!items.length) {
    return (
      <div className="animate-fade-in">
        <EmptyState variant="cart" />
      </div>
    )
  }

  const subtotal = items.reduce((sum, it) => {
    const price = it.discountPercentage
      ? calculateDiscount(it.price, it.discountPercentage)
      : it.price
    return sum + Number(price) * it.quantity
  }, 0)

  const shipping = subtotal >= 999 ? 0 : 50
  const shippingINR = subtotal * 83 >= 999 ? 0 : 50
  const tax = Number((subtotal * 0.05).toFixed(2))
  const finalGrandTotal = Number((subtotal + shipping + tax).toFixed(2))

  const handleCheckout = () => {
    const orderId =
      'SKY' +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 900 + 100)
    openSuccess({
      orderNumber: orderId,
      totalItems,
      finalTotal: finalGrandTotal,
    })
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Your Cart
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            {totalItems} item{totalItems === 1 ? '' : 's'} in your bag
          </p>
        </div>
        <Link to="/shop" className="btn-ghost text-sm">
          <FiArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const unitPrice = item.discountPercentage
              ? calculateDiscount(item.price, item.discountPercentage)
              : item.price
            const subtotalItem = Number(unitPrice) * item.quantity
            return (
              <article
                key={item.id}
                className="card p-4 sm:p-5 flex gap-4 sm:gap-5 hover:shadow-card-hover transition-shadow"
              >
                <Link
                  to={`/products/${item.id}`}
                  className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-surface-soft overflow-hidden"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/100`
                    }}
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="badge-category mb-1.5 text-[10px]">
                        {titleCase(item.category)}
                      </span>
                      <Link to={`/products/${item.id}`}>
                        <h3 className="font-semibold text-ink leading-snug line-clamp-2 hover:text-accent transition-colors">
                          {truncate(item.title, 80)}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 w-9 h-9 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 flex items-center justify-center transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="inline-flex items-center gap-2 bg-surface-soft border border-surface-border rounded-2xl p-0.5">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
                        aria-label="Decrease"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-7 text-center font-bold text-ink text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-muted hover:text-accent hover:bg-accent-soft transition-colors"
                        aria-label="Increase"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-ink-muted">
                        {formatPrice(unitPrice)} × {item.quantity}
                      </p>
                      <p className="font-black text-lg text-ink">
                        {formatPrice(subtotalItem)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}

          <button
            onClick={() => clear()}
            className="w-full text-sm text-red-400 hover:text-red-300 transition-colors py-3 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="card p-6 space-y-5">
            <h2 className="text-lg font-bold tracking-tight">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">Subtotal</span>
                <span className="font-semibold text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">
                  Shipping
                  {shippingINR === 0 ? (
                    <span className="text-green-400 ml-2 font-medium">
                      FREE
                    </span>
                  ) : null}
                </span>
                <span
                  className={`font-semibold ${shippingINR === 0 ? 'text-green-400' : 'text-ink'}`}
                >
                  {shippingINR === 0 ? 'Free' : formatINR(shipping / 83)}
                </span>
              </div>
              {shippingINR > 0 && (
                <p className="text-xs text-ink-soft">
                  Add {formatINR((999 - subtotal * 83) / 83)} more for free
                  shipping
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">Tax (5%)</span>
                <span className="font-semibold text-ink">
                  {formatPrice(tax)}
                </span>
              </div>
            </div>

            <div className="border-t border-surface-border pt-4 flex items-center justify-between">
              <span className="font-semibold text-ink">Grand Total</span>
              <div className="text-right">
                <span className="text-2xl font-black text-ink tracking-tight">
                  {formatPrice(finalGrandTotal)}
                </span>
                <p className="text-xs text-ink-muted mt-0.5">
                  {formatINR(finalGrandTotal)}
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-accent w-full py-3.5 text-base"
            >
              <FiShoppingBag size={18} />
              Proceed to Checkout
              <FiArrowRight size={16} />
            </button>

            <Link to="/shop" className="btn-ghost w-full py-3">
              <FiArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
