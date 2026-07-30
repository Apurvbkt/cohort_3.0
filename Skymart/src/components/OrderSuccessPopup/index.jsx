import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiCheckCircle,
  FiX,
  FiPackage,
  FiArrowRight,
} from 'react-icons/fi'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../utils/index.js'

export default function OrderSuccessPopup() {
  const { successInfo, closeSuccess, clear } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!successInfo) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [successInfo])

  useEffect(() => {
    if (!successInfo) return
    const t = setTimeout(() => {
      handleClose()
    }, 5000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successInfo])

  if (!successInfo) return null

  const {
    orderNumber = 'SKY---',
    totalItems = 0,
    finalTotal = 0,
  } = successInfo

  function handleClose() {
    clear()
    closeSuccess()
    navigate('/home')
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-success-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-3xl border border-surface-border bg-surface-card shadow-2xl animate-slide-up overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-hover transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="p-7 sm:p-8 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse-soft" />
            <div className="relative w-20 h-20 rounded-full bg-accent text-surface flex items-center justify-center shadow-glow">
              <FiCheckCircle size={46} strokeWidth={1.5} />
            </div>
          </div>

          <h2
            id="order-success-title"
            className="text-2xl sm:text-3xl font-black tracking-tight text-ink"
          >
            Order Placed! 🎉
          </h2>

          <p className="mt-3 text-sm text-ink-muted max-w-xs leading-relaxed">
            Thank you for shopping with SkyMart. Your order has been
            successfully placed and is being prepared for shipment.
          </p>

          <div className="mt-6 w-full rounded-2xl border border-surface-border bg-surface-soft p-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Order Number</span>
              <span className="font-mono font-bold text-accent">
                #{orderNumber}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Items</span>
              <span className="font-semibold text-ink">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between text-sm pt-3 border-t border-surface-border/80">
              <span className="text-ink-muted flex items-center gap-1.5">
                <FiPackage size={14} /> Total Paid
              </span>
              <span className="text-xl font-black text-ink">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>

          <div className="mt-4 w-full rounded-2xl bg-accent/10 border border-accent/20 p-4 flex items-start gap-3 text-left">
            <div className="shrink-0 w-8 h-8 rounded-xl bg-accent text-surface flex items-center justify-center text-sm">
              🚚
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">
                Estimated Delivery
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                2 - 4 business days (Free shipping applied)
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="btn-accent w-full !py-3.5 mt-6 text-base font-bold"
          >
            Continue Shopping
            <FiArrowRight size={16} />
          </button>

          <p className="mt-4 text-xs text-ink-soft">
            This window will close automatically in a few seconds…
          </p>
        </div>
      </div>
    </div>
  )
}
