const LoadingSkeleton = ({ variant = 'product' }) => {
  if (variant === 'page') {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 animate-pulse"
        role="status"
        aria-label="Loading page"
      >
        <div className="w-16 h-16 rounded-2xl bg-surface-soft mb-5" />
        <div className="h-5 w-40 bg-surface-soft rounded-full mb-3" />
        <div className="h-4 w-56 bg-surface-soft rounded-full" />
      </div>
    )
  }

  if (variant === 'details') {
    return (
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse"
        role="status"
        aria-label="Loading product details"
      >
        <div className="rounded-3xl bg-surface-card aspect-square border border-surface-border" />
        <div className="space-y-5">
          <div className="h-4 w-24 bg-surface-soft rounded-full" />
          <div className="h-10 w-full bg-surface-soft rounded-2xl" />
          <div className="h-6 w-32 bg-surface-soft rounded-full" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-surface-soft rounded-full" />
            <div className="h-4 w-11/12 bg-surface-soft rounded-full" />
            <div className="h-4 w-5/6 bg-surface-soft rounded-full" />
          </div>
          <div className="h-14 w-full bg-surface-soft rounded-2xl mt-8" />
          <div className="h-12 w-full bg-surface-soft rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-3xl overflow-hidden animate-pulse"
      role="status"
      aria-label="Loading product"
    >
      <div className="bg-white pt-5 px-5">
        <div className="h-6 w-24 bg-zinc-200 rounded-full" />
        <div className="aspect-square w-[85%] mx-auto mt-6 mb-6 rounded-2xl bg-zinc-100" />
      </div>
      <div className="bg-surface-card rounded-b-3xl p-5 sm:p-6 space-y-4">
        <div className="h-3 w-20 bg-zinc-800 rounded-full" />
        <div className="space-y-2">
          <div className="h-5 w-full bg-zinc-800 rounded-lg" />
          <div className="h-5 w-4/5 bg-zinc-800 rounded-lg" />
        </div>
        <div className="h-4 w-28 bg-zinc-800 rounded-full" />
        <div className="flex items-end justify-between gap-3 pt-2">
          <div className="h-8 w-28 bg-zinc-800 rounded-lg" />
          <div className="h-10 w-20 bg-zinc-800 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton
