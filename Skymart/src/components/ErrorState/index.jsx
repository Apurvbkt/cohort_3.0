import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorState = ({ message = 'Something went wrong. Please try again.', onRetry }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 sm:py-20 text-center animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <FaExclamationTriangle className="text-red-400" size={44} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-3">
        Oops!
      </h2>
      <p className="text-ink-muted max-w-md mb-8 text-base leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          aria-label="Retry"
          className="btn-accent"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorState
