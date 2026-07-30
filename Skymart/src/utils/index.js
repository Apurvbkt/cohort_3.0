export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price) || 0)
}

export const formatINR = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(price) * 83 || 0)
}

export const calculateDiscount = (price, discountPercent) => {
  const discount = (Number(price) * Number(discountPercent)) / 100
  return (price - discount).toFixed(2)
}

export const capitalize = (str = '') => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const titleCase = (str = '') => {
  if (!str) return ''
  return str
    .split(/[-\s_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export const truncate = (str, max = 120) => {
  if (!str) return ''
  if (str.length <= max) return str
  return str.slice(0, max).trim() + '…'
}

export const sortProducts = (products = [], sortKey) => {
  const arr = [...products]
  switch (sortKey) {
    case 'price-asc':
      return arr.sort((a, b) => Number(a.price) - Number(b.price))
    case 'price-desc':
      return arr.sort((a, b) => Number(b.price) - Number(a.price))
    case 'rating':
      return arr.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    case 'newest':
      return arr.sort((a, b) => Number(b.id) - Number(a.id))
    default:
      return arr
  }
}

export const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'GOOD MORNING'
  if (h < 17) return 'GOOD AFTERNOON'
  if (h < 21) return 'GOOD EVENING'
  return 'GOOD NIGHT'
}

export const getUserInitials = (name = '') => {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}
