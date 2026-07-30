import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="animate-fade-in min-h-[70vh] flex items-center justify-center py-16">
      <div className="text-center px-6 max-w-xl">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
          <h1 className="relative text-[120px] sm:text-[160px] lg:text-[200px] font-black leading-none tracking-tight text-accent animate-pulse-soft">
            404
          </h1>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4">
          Page not found
        </h2>
        <p className="text-base sm:text-lg text-ink-muted mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
          Let's get you back to something amazing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link to="/home" className="btn-accent px-7 py-3 w-full sm:w-auto">
            Go Home
            <FiArrowRight size={18} />
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="btn-ghost px-7 py-3 w-full sm:w-auto"
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
