import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/index.jsx'
import Footer from './components/Footer/index.jsx'
import LoadingSkeleton from './components/LoadingSkeleton/index.jsx'
import CartDrawer from './components/CartDrawer/index.jsx'
import OrderSuccessPopup from './components/OrderSuccessPopup/index.jsx'

const Home = lazy(() => import('./pages/Home/index.jsx'))
const Shop = lazy(() => import('./pages/Shop/index.jsx'))
const ProductDetails = lazy(() => import('./pages/ProductDetails/index.jsx'))
const Cart = lazy(() => import('./pages/Cart/index.jsx'))
const About = lazy(() => import('./pages/About/index.jsx'))
const SignIn = lazy(() => import('./pages/SignIn/index.jsx'))
const SignUp = lazy(() => import('./pages/SignUp/index.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/index.jsx'))

const PageShell = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-surface text-ink dark:bg-surface dark:text-ink">
    <Navbar />
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      {children}
    </main>
    <Footer />
    <CartDrawer />
    <OrderSuccessPopup />
  </div>
)

const AuthShell = ({ children }) => (
  <div className="min-h-screen bg-surface text-ink">
    {children}
  </div>
)

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('skymart_user')
  if (!user) return <Navigate to="/signin" replace />
  return children
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSkeleton variant="page" />}>
      <Routes>
        <Route path="/signin" element={<AuthShell><SignIn /></AuthShell>} />
        <Route path="/signup" element={<AuthShell><SignUp /></AuthShell>} />
        <Route path="/" element={<ProtectedRoute><PageShell><Home /></PageShell></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><PageShell><Home /></PageShell></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><PageShell><Shop /></PageShell></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><PageShell><ProductDetails /></PageShell></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><PageShell><Cart /></PageShell></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><PageShell><About /></PageShell></ProtectedRoute>} />
        <Route path="*" element={<PageShell><NotFound /></PageShell>} />
      </Routes>
    </Suspense>
  )
}
