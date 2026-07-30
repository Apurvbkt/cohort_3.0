import { Link } from 'react-router-dom'
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  const quickLinks = [
    { to: '/home', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/cart', label: 'Cart' },
    { to: '/about', label: 'About' },
  ]

  const supportLinks = [
    { to: '/contact', label: 'Contact Us' },
    { to: '/faq', label: 'FAQs' },
    { to: '/shipping', label: 'Shipping Info' },
    { to: '/returns', label: 'Returns' },
  ]

  const socialLinks = [
    { icon: <FaTwitter size={16} />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram' },
    { icon: <FaFacebookF size={16} />, href: '#', label: 'Facebook' },
    { icon: <FaLinkedinIn size={16} />, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="border-t border-surface-border bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/home" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shadow-glow">
                <span className="text-surface text-2xl font-bold">⚡</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-ink">Sky</span>
                <span className="text-accent">Mart</span>
              </span>
            </Link>
            <p className="text-ink-muted max-w-sm mb-6 text-sm leading-relaxed">
              Shop the future. Today. Discover hand-curated products across
              electronics, fashion, and more — delivered to your doorstep.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl border border-surface-border text-ink-muted flex items-center justify-center transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent-soft"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-ink-muted text-sm transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-ink-muted text-sm transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-soft text-sm">
            © {new Date().getFullYear()} SkyMart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-ink-soft text-sm hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-ink-soft text-sm hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
