import LoadingSkeleton from '../LoadingSkeleton/index.jsx'
import EmptyState from '../EmptyState/index.jsx'
import ErrorState from '../ErrorState/index.jsx'
import ProductCard from '../ProductCard/index.jsx'

const ProductGrid = ({ products = [], loading, error, onRetry }) => {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
        role="status"
        aria-label="Loading products"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <LoadingSkeleton key={i} variant="product" />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />
  }

  if (!products || products.length === 0) {
    return <EmptyState variant="products" />
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
      role="list"
      aria-label="Products list"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
