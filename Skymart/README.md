<div align="center">
  <a href="https://fs-34-challenge-1.vercel.app/home" target="_blank">
    <img alt="SkyMart" src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimalist%20modern%20ecommerce%20logo%2C%20neon%20yellow%20lime%20green%20lightning%20bolt%20in%20rounded%20square%20icon%2C%20white%20SkyMart%20text%2C%20dark%20black%20background%2C%20clean%20professional%20brand&image_size=square_hd" width="80" height="80" style="border-radius:20px"/>
  </a>
  <h3 style="margin-top:12px;font-size:2rem;font-weight:800;">SkyMart</h3>
  <p style="margin-top:-4px;opacity:0.7;">Shop the future. Today.</p>

  <p>
    <a href="https://fs-34-challenge-1.vercel.app/home"><kbd> <br> Live Demo <br> </kbd></a>
    &nbsp;&nbsp;
    <a href="#-tech-stack"><kbd> <br> Tech Stack <br> </kbd></a>
    &nbsp;&nbsp;
    <a href="#-features"><kbd> <br> Features <br> </kbd></a>
  </p>

  <p>
    <img alt="Vite" src="https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white&style=for-the-badge"/>
    <img alt="React" src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=for-the-badge"/>
    <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge"/>
    <img alt="React Router" src="https://img.shields.io/badge/React%20Router-v7-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge"/>
    <img alt="Build Passing" src="https://img.shields.io/badge/build-passing-22c55e?style=for-the-badge"/>
  </p>
</div>

---

## 🚀 Project Overview

**SkyMart** is a premium, production-ready e-commerce storefront built with modern React best practices. Designed to feel fast, fair, and enjoyable to use — with a signature dark theme, neon accent system, glassy surfaces, and smooth interactions throughout. It ships with authentication, a full shopping cart, realtime search + filtering, dynamic product pages, and a complete about/marketing site — all connected to live product data from the DummyJSON API.

Every page route is **code-split** via `React.lazy`, bundled by **Vite** (build time ~6s), and the whole project is ready to deploy to Vercel with zero configuration.

---

## ✨ Features

### 🏠 Home Experience
- **Personalized Hero Banner** — time-aware greeting (Good Morning/Afternoon/Evening) + user's name in neon accent
- **Live Stats Dashboard** — 4 stat cards (Cart Items · Cart Value · Top Products · Categories)
- **Shop by Category** — horizontally scrollable category cards with emoji icons
- **Featured Products** — first-page product grid pulled live from API

### 🛍️ Products & Shop
- **Realtime search** (debounced 300ms) across title, description, and metadata
- **Category filter** dynamically populated from the API
- **4 sort modes**: Featured / Price Low→High / Price High→Low / Highest Rating
- **Two-tone product cards** — white gallery surface + dark details body + yellow pill Add-to-Cart
- **Responsive grid**: 1 → 2 → 3 → 4 → 5 columns across breakpoints

### 🔍 Product Details (`/products/:id`)
- Large gallery image with thumbnail strip
- Discount % chip + strike-through original price
- Rating stars + review count, stock badge, brand badge
- Quantity selector (+/−)
- **Add to Cart** and **Buy Now** (instant redirect to cart)

### 🛒 Cart
- Line items with thumbnail, per-item qty controls, and per-line subtotal
- Sticky **Order Summary** sidebar: subtotal, shipping (free over ₹999), 5% tax, grand total
- Empty cart illustration
- Clear Cart + Checkout CTAs

### 🔐 Authentication
- **Sign In** page — 50/50 split layout with hero marketing side + form
- **Sign Up** page — password validation + inline error banners
- Persistent session via `localStorage`
- Protected routes: `/home`, `/shop`, `/products/:id`, `/cart`, `/about` redirect to `/signin`

### 🌙 Theme
- Dark by default, Light toggle available
- Fully tokenized in Tailwind (surface, ink, accent system)
- Persists in `localStorage` under `skymart_theme`

### ⚠️ States & Robustness
- **Skeleton loaders** for every card/page layout (`animate-pulse`)
- **Error state screen** with Retry CTA for API failures
- **Empty states** for cart and filtered product views
- 404 page with Go Home + Go Back actions

### ♿ Accessibility
- Semantic HTML (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`)
- `aria-label` on all icon buttons
- `role="alert"` on error states
- Keyboard navigable (Enter/Space to open products)

---

## 🛠️ Tech Stack

| Layer         | Library / Tool                           | Version |
|---------------|------------------------------------------|---------|
| Framework     | React                                    | 18.3    |
| Bundler       | Vite                                     | 5.3     |
| Language      | JavaScript (ES6+)                        | —       |
| Styling       | Tailwind CSS + Tailwind Animate Preset   | 3.4     |
| Routing       | React Router DOM                         | 7.x     |
| State         | Context API + useReducer (Cart)         | —       |
| Data Fetching | Axios                                    | 1.x     |
| Icons         | React Icons (Fa / Io families)           | 5.x     |
| Deployment    | Vercel (zero-config SPA rewrites)        | —       |

---

## 📦 Installation

> Requires **Node.js ≥ 18**.

```bash
# 1. Clone / open the project folder
cd skymart

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev

# 4. Production build  →  ./dist
npm run build

# 5. Preview the built bundle locally
npm run preview
```

First run? Go to `/signup` to create an account, or `/signin` if you already have one. Session and theme persist in `localStorage`.

---

## 📁 Folder Structure

```
skymart/
├── public/
│   └── _redirects            ← SPA fallback for Vercel/Netlify
├── src/
│   ├── assets/               ← images / fonts (static)
│   │
│   ├── components/           ← 12 reusable, composable components
│   │   ├── Navbar/               (Logo, nav links, search/user/cart/theme/logout + mobile menu)
│   │   ├── Footer/               (Brand, quick links, socials, copyright)
│   │   ├── Hero/                 (Personalized greeting + CTAs + 2 stat badges)
│   │   ├── StatCard/             (Icon badge + value + label + sublabel, 6 accent variants)
│   │   ├── ProductCard/          (React.memo, two-tone, rating, add-to-cart)
│   │   ├── ProductGrid/          (Conditional loader/error/empty → responsive grid)
│   │   ├── SearchBar/
│   │   ├── CategoryFilter/
│   │   ├── SortDropdown/
│   │   ├── LoadingSkeleton/      (product / page / details variants)
│   │   ├── EmptyState/           (cart / products variants)
│   │   └── ErrorState/
│   │
│   ├── pages/
│   │   ├── Home/                 (Hero + stats + categories + featured products)
│   │   ├── Shop/                 (Search + filter + sort + full grid)
│   │   ├── ProductDetails/       (/:id — gallery, qty, add/buy, similar products)
│   │   ├── Cart/                 (Line items + sticky order summary)
│   │   ├── About/                (Story, stat grid, why choose us, CTA banner)
│   │   ├── SignIn/               (Split hero + form)
│   │   ├── SignUp/               (Centered create-account form)
│   │   └── NotFound/             (404)
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx      (dark/light, localStorage persistence)
│   │   ├── CartContext.jsx       (useReducer-based cart, totals, persisted)
│   │   └── AuthContext.jsx       (signup / signin / signout, local users DB)
│   │
│   ├── hooks/                    (custom hooks — extendable)
│   │
│   ├── services/
│   │   └── api.js                (Axios wrapper — getProducts, getProductById,
│   │                                searchProducts, getCategories, getProductsByCategory)
│   │
│   ├── utils/
│   │   └── index.js              (formatPrice, calculateDiscount, titleCase,
│   │                                sortProducts, getGreeting, getUserInitials…)
│   │
│   ├── App.jsx                   (Protected routes + Suspense + lazy code-splitting)
│   ├── main.jsx                  (BrowserRouter + Provider composition)
│   └── index.css                 (Tailwind layers + component classes + scrollbar)
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
├── package.json
└── README.md
```

---

## 🧭 Routing

| Method | Path              | Page              | Access              |
|--------|-------------------|-------------------|---------------------|
| GET    | `/signin`         | Sign In           | Public              |
| GET    | `/signup`         | Create Account    | Public              |
| GET    | `/` & `/home`     | Home              | Protected           |
| GET    | `/shop`           | All Products      | Protected           |
| GET    | `/products/:id`   | Product Details   | Protected           |
| GET    | `/cart`           | Shopping Cart     | Protected           |
| GET    | `/about`          | About SkyMart     | Protected           |
| GET    | `*`               | 404 Not Found     | —                   |

All protected routes redirect to `/signin` if no session exists in `localStorage`.

---

## 🔌 API Endpoints (Source)

All data comes from the **[DummyJSON](https://dummyjson.com/) public products API.**  
Wrapped in `src/services/api.js` — returns unified `{ data, error }` tuples for predictable error handling.

| Service                   | HTTP + URL                                           |
|---------------------------|------------------------------------------------------|
| `getProducts({limit, skip, select})` | `GET https://dummyjson.com/products`      |
| `getProductById(id)`      | `GET https://dummyjson.com/products/:id`             |
| `searchProducts(q)`       | `GET https://dummyjson.com/products/search?q=:q`     |
| `getCategories()`         | `GET https://dummyjson.com/products/category-list`   |
| `getProductsByCategory(c)`| `GET https://dummyjson.com/products/category/:c`     |

Timeout = 15s. Any failure routes to an `<ErrorState>` screen with Retry.

---

## 🚀 Deployment

**Vercel (Recommended)** — zero-config ready:

```bash
npm i -g vercel
vercel
```

`vercel.json` is pre-provisioned with SPA rewrites + Vite framework detection.

**Netlify:** `public/_redirects` already ships with `/*  /index.html  200`.  
**Static Host:** just upload the contents of `dist/` and configure SPA fallback routing.

---

## 🌟 Live Demo

> **Reference production build:** https://fs-34-challenge-1.vercel.app/home

---

## 🎯 Performance Snapshot

- Build: `vite build` → **6.13s**, 127 modules
- **Route-level code splitting** enabled (8 distinct page chunks)
- Main bundle: **~68 KB gzipped**
- CSS: **~7 KB gzipped** (Tailwind JIT, purged)
- `React.memo` on `<ProductCard>` — prevents 100+ redundant renders during search/filter
- `useMemo` on filtered/sorted product lists in Shop
- Images served from DummyJSON CDN via `thumbnail` / `images[]`

---

## ♿ Accessibility & Quality Checklist

- [x] Semantic `<main>`, `<section>`, `<article>`, `<nav>` everywhere
- [x] Icon buttons all have `aria-label`
- [x] Product cards keyboard-actionable (Enter / Space)
- [x] Error screens use `role="alert"`
- [x] Form inputs pair labels with placeholders
- [x] Focus ring on NavLink / Tab order preserved in checkout flow
- [x] Protected routes redirect, never leak partial UI
- [x] All async paths have loading → success / error branches

---

## 🔮 Future Improvements

- [ ] **Checkout flow** — Stripe / Razorpay integration with real payment intents
- [ ] **Product reviews** — write a review endpoint with authenticated user linkage
- [ ] **Wishlist** context + heart icon on every card
- [ ] **Recent searches** + autocomplete suggestions in SearchBar
- [ ] **React Query / SWR** for caching, revalidation, background refetch
- [ ] **Wishlist & Recently Viewed** persisted panels
- [ ] **i18n** (English / Hindi) with react-i18next
- [ ] **Unit tests** via Vitest + React Testing Library for Cart reducer + Auth flows
- [ ] **e2e** Playwright suite for add-to-cart → checkout happy path
- [ ] **Image optimization** with Sharp / responsive `srcset` variants

---

## 🧾 License

© 2026 SkyMart. Built for Cohort 3.0 Frontend Challenge.
