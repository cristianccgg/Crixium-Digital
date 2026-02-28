# Crixium Digital — Business Website

Production website for **Crixium Digital**, a digital agency offering web development and music production services. Built as a real client-facing product with i18n, SEO, analytics, and a full admin experience.

**Live site:** [crixiumdigital.com](https://crixiumdigital.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite 6 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion + Rive |
| Routing | React Router 7 |
| i18n | i18next (ES / EN / ES-419) |
| Backend / DB | Firebase (Firestore, Auth, Storage, Analytics) |
| Analytics | Firebase Analytics + Google Tag Manager |
| Deployment | Vercel |

---

## Key Features

### User-Facing
- **Bilingual** — full Spanish/English support with automatic browser language detection and `/en` route prefix
- **Service pages** — Web Development and Music Production with packages, FAQs, and conversion CTAs
- **Blog** — categorized posts with slug-based routing, reading time, and structured data
- **Contact form** — sends transactional emails via Zoho SMTP, tracks leads in Firebase
- **Order tracking** — clients look up project status by order ID
- **Cookie consent** — GDPR-compliant (Osano CMP) with granular analytics/marketing preferences
- **WhatsApp CTAs** — centralized click-to-chat across ~11 components with UTM pass-through

### Technical Highlights
- **Code splitting** — all pages except LandingPage are lazy-loaded via `React.lazy()` + `Suspense`
- **UTM capture** — custom `useUTM` hook persists campaign params to `sessionStorage` and enriches analytics events, form submissions, and WhatsApp messages automatically
- **Dual analytics pipeline** — Firebase Analytics events + GTM `dataLayer` push, both gated behind cookie consent
- **Centralized tracking** — `src/utils/analytics.js` (`trackEvent`) and `src/utils/whatsapp.js` (`buildWhatsAppUrl` + `trackWhatsAppClick`) used consistently across the app
- **SEO** — per-page dynamic meta tags, structured data schemas (WebPage, Article, FAQPage, BreadcrumbList, Person), auto-generated sitemap with hreflang
- **Security** — API keys in environment variables, Vercel security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), Firebase Auth for admin routes
- **Admin panel** — Firebase Auth protected route for internal order management
- **Ads landing pages** — standalone pages (no shared layout) optimized for Google Ads quality score

---

## Project Structure

```
src/
├── components/
│   ├── blog/                 # BlogPage, BlogPostDetail, BlogCategory
│   ├── web_development/      # AdsLandingPage, ServicesSection, PricingSection
│   ├── music_production/     # Music service components
│   ├── payments/             # Payment response handler
│   ├── SEO/                  # SimpleSEO, SimpleSchemaData (JSON-LD)
│   ├── firebase.js           # Firebase init (reads from env vars)
│   ├── LandingPage.jsx       # Main landing page
│   ├── SharedLayout.jsx      # Navbar + Footer + global CTA
│   ├── ContactForm.jsx       # Lead form with email + analytics
│   ├── AdminPanel.jsx        # Protected admin dashboard
│   └── CookieConsent.jsx     # GDPR consent manager
├── hooks/
│   └── useUTM.js             # UTM parameter capture on mount
├── utils/
│   ├── analytics.js          # Centralized event tracking (Firebase + GTM)
│   └── whatsapp.js           # WhatsApp URL builder + click tracking
├── data/                     # Blog posts, package feature lists
└── App.jsx                   # Route definitions with lazy loading
```

---

## Routes

| Path | Page | Notes |
|------|------|-------|
| `/` | Landing | Main conversion page |
| `/web-development` | Web Development | Service detail + contact form |
| `/music-production` | Music Production | Service detail |
| `/servicios/desarrollo-web` | Ads Landing | Standalone, no nav — Google Ads |
| `/blog` | Blog | Post list with categories |
| `/blog/:slug` | Blog Post | Individual article |
| `/contact` | Contact | Lead form |
| `/tracking` | Order Tracking | Client order status lookup |
| `/admin/*` | Admin Panel | Firebase Auth protected |

All routes are duplicated under `/en/` for English.

---

## Analytics Events

| Event | Trigger |
|-------|---------|
| `page_view` | Every route change |
| `whatsapp_click` | Any WhatsApp CTA button |
| `form_start` | First interaction with contact form |
| `generate_lead` | Successful form submission |
| `consent_update` | Cookie preference saved |

All events are enriched with UTM parameters and current page context.

---

## Local Setup

```bash
npm install
```

Create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

```bash
npm run dev
```

> Translations live in `public/locales/{es,en}/` as JSON namespaces loaded at runtime via `i18next-http-backend`.
