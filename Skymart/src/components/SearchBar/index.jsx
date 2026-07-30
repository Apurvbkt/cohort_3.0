import { IoSearch } from 'react-icons/io5'

const SearchBar = ({ value = '', onChange, placeholder = 'Search products...' }) => {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value)
  }

  return (
    <div className="relative w-full group">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none transition-colors group-focus-within:text-accent">
        <IoSearch size={20} />
      </div>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full bg-surface-soft border border-surface-border rounded-2xl pl-12 pr-4 py-3.5 text-ink placeholder-ink-soft focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-sm"
      />
    </div>
  )
}

export default SearchBar
