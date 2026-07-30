const SortDropdown = ({ value = 'featured', onChange, className = '' }) => {
  const options = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price Low-High' },
    { value: 'price-desc', label: 'Price High-Low' },
    { value: 'rating', label: 'Highest Rating' },
  ]

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value)
  }

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="sort-dropdown" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-dropdown"
        value={value}
        onChange={handleChange}
        aria-label="Sort products"
        className="w-full bg-surface-soft border border-surface-border rounded-2xl px-4 py-3 text-ink focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-sm appearance-none cursor-pointer pr-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundPosition: 'calc(100% - 1rem) center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SortDropdown
