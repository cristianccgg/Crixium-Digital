# Crixium Digital - Sitio de Venta

## Contexto

El sitio fue transformado de portafolio a sitio de venta enfocado en desarrollo web. La producción musical queda como servicio secundario. Todo el flujo apunta a WhatsApp o formulario de contacto para cotización directa con el cliente.

**Stack:** React 19 + Vite 6 + Tailwind CSS 4 + i18next + Framer Motion
**Deployment:** Vercel
**WhatsApp:** +573219746045
**Analytics:** Firebase Analytics (G-11J6Q97KD0)

---

## Estado Actual

### Completado

#### Landing Principal (`/`)
- [x] Hero enfocado en venta ("Diseñamos la Web que tu Negocio Necesita para Vender Más")
- [x] CTA principal a WhatsApp, CTA secundario a proyectos
- [x] Sección Problema/Solución (ProblemSolution.jsx)
- [x] Servicios con web como principal, música como secundario
- [x] Proyectos destacados como casos de éxito
- [x] Stats de prueba social (600+, 250+, 8+, 100%)
- [x] Reviews/testimonios
- [x] PricingPreview sin precios fijos, con CTA WhatsApp por paquete
- [x] CTA final con beneficio ("Respuesta en menos de 24 horas")
- [x] Partículas reducidas a 8 (performance mobile)
- [x] TechnologiesSection y TrackingLanding eliminados de landing

#### Página Web Development (`/web-development`)
- [x] Hero con CTA "Solicitar Cotización Gratis" → WhatsApp
- [x] Servicios: Corporativo, E-commerce, Rediseño
- [x] ServicesSection con formulario de contacto integrado
- [x] Sin precios fijos - todo por cotización
- [x] Tecnologías, proyectos, proceso, reviews

#### Página Music Production (`/music-production`)
- [x] Sin precios fijos - CTA WhatsApp por paquete
- [x] Jingles y Locución con mensaje WhatsApp pre-armado
- [x] Hero "Solicitar Cotización" en vez de "Ver Paquetes"
- [x] Sin checkout form - todo por WhatsApp/contacto directo

#### Landing Google Ads (`/servicios/desarrollo-web`)
- [x] Página standalone sin navegación completa
- [x] Header mínimo con logo + CTA
- [x] Hero ultra-enfocado con un solo CTA (WhatsApp)
- [x] Stats de confianza, beneficios, qué incluye
- [x] Testimonial, garantía, CTA final
- [x] Footer mínimo
- [x] Traducciones es/en completas

#### SEO
- [x] Meta tags enfocados en desarrollo web (sin precios)
- [x] Schema.org: LocalBusiness, WebDevelopmentService, MusicProductionService, BlogPosting
- [x] Open Graph y Twitter Cards dinámicos
- [x] robots.txt configurado
- [x] Sitemap XML con hreflang

#### Flujo de Conversión
- [x] Todo CTA → WhatsApp o formulario de contacto
- [x] Sin checkout/PayPal en ningún flujo activo
- [x] Mensajes WhatsApp pre-armados por servicio/paquete
- [x] Formulario de contacto con campos: nombre, email, teléfono, servicio, tipo de proyecto, mensaje

#### CTA Global (SharedLayout)
- [x] "Solicita tu Cotización Gratuita — Respuesta en menos de 24 horas"
- [x] Botón → WhatsApp

#### Traducciones (es/en)
- [x] hero.json, cta.json, seo.json
- [x] problem-solution.json, pricing-preview.json
- [x] pricing-section-web.json (sin precios)
- [x] pricing.json (música, sin precios)
- [x] web-development.json, music-production.json
- [x] ads-landing.json

---

## Pendiente - Próximas Fases

### FASE 5: Tracking de Conversiones (CRITICO para Google Ads)

**Sin esto, no se puede medir ROI de Google Ads.**

#### 5.1 Google Tag Manager (GTM)
- [ ] Crear contenedor GTM
- [ ] Agregar script GTM en `index.html`
- [ ] Configurar triggers para:
  - Clics en botón WhatsApp (todos los CTAs)
  - Envío de formulario de contacto
  - Clics en CTA de paquetes
  - Page views de landing de ads

#### 5.2 Eventos de conversión en WhatsAppButton.jsx
- [ ] Agregar `gtag("event", "contact", { method: "whatsapp", page: currentPage })` al click
- [ ] O usar Firebase Analytics: `logEvent(analytics, "whatsapp_click", { page, service })`
- [ ] Trackear en TODOS los botones de WhatsApp (hero, pricing cards, CTA global, ads landing)

#### 5.3 Eventos de conversión en ContactForm.jsx
- [ ] Agregar `gtag("event", "generate_lead", { service, projectType })` al submit exitoso
- [ ] Trackear en el formulario de ServicesSection.jsx también

#### 5.4 Google Ads Conversion Tracking
- [ ] Configurar conversión en Google Ads panel
- [ ] Vincular GTM con Google Ads
- [ ] Definir valor de conversión por tipo de lead

### FASE 6: FAQ Schema y Componente

**Impacta directamente el Quality Score de Google Ads (= menor costo por clic).**

#### 6.1 Componente FAQ
- [ ] Crear `src/components/FAQ.jsx` con accordion
- [ ] Preguntas sobre: proceso de trabajo, tiempos de entrega, qué incluye, soporte, tecnologías
- [ ] Agregar en landing principal y/o página web-development
- [ ] Traducciones es/en

#### 6.2 FAQ Schema
- [ ] Agregar tipo "FAQ" en `SimpleSchemaData.jsx`
- [ ] Generar JSON-LD con preguntas/respuestas

### FASE 7: Performance y Quality Score

#### 7.1 Code Splitting
- [ ] Implementar `React.lazy()` para todas las rutas en `App.jsx`
- [ ] Agregar `<Suspense>` con fallback de loading
- [ ] Rutas a lazy-load: WebDevelopmentPage, MusicProductionPage, ContactPage, BlogPage, OrderTracking, AdsLandingPage, AdminPanel

#### 7.2 Headers de Vercel
- [ ] Agregar en `vercel.json`:
  - `Cache-Control` para assets estáticos
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`

#### 7.3 Preconnect hints
- [ ] Agregar en `index.html`:
  - `<link rel="preconnect" href="https://firebaseapp.com">`
  - `<link rel="dns-prefetch" href="https://wa.me">`

#### 7.4 Optimización de imágenes
- [ ] Convertir imágenes de proyectos a WebP
- [ ] Agregar `srcset` para responsive images
- [ ] Comprimir logo.png (actualmente 40KB)

### FASE 8: Mejoras Secundarias

#### 8.1 Página 404
- [ ] Crear componente `NotFound.jsx`
- [ ] CTA de regreso a home o WhatsApp
- [ ] Agregar ruta catch-all en App.jsx

#### 8.2 Sitemap actualizado
- [ ] Agregar `/servicios/desarrollo-web` al script `generate-sitemap.js`
- [ ] Agregar `/privacy-policy` y `/terms-conditions`

#### 8.3 Blog SEO
- [ ] Agregar BreadcrumbList schema para posts
- [ ] Agregar Person schema para autor
- [ ] Agregar estimated reading time

---

## Estructura de Rutas

| Ruta | Componente | Propósito |
|------|-----------|-----------|
| `/` | LandingPage | Landing principal de venta |
| `/web-development` | WebDevelopmentPage | Servicios de desarrollo web |
| `/music-production` | MusicProductionPage | Servicios de producción musical |
| `/servicios/desarrollo-web` | AdsLandingPage | Landing dedicada Google Ads (sin nav) |
| `/contact` | ContactPage | Formulario de contacto |
| `/tracking` | OrderTracking | Seguimiento para clientes activos |
| `/blog` | BlogPage | Blog con artículos |
| `/blog/:slug` | BlogPostDetail | Artículo individual |
| `/privacy-policy` | PrivacyPolicy | Política de privacidad |
| `/terms-conditions` | TermsAndConditions | Términos y condiciones |
| `/admin/*` | AdminPanel | Panel de administración (protegido) |

Todas las rutas tienen versión `/en/` para inglés.

---

## Archivos Clave

| Archivo | Qué hace |
|---------|----------|
| `src/App.jsx` | Router con todas las rutas |
| `src/components/LandingPage.jsx` | Landing principal con secciones de venta |
| `src/components/SharedLayout.jsx` | Layout con header, footer, CTA global |
| `src/components/web_development/EnhancedHeroSection.jsx` | Hero de venta con WhatsApp CTA |
| `src/components/web_development/ProblemSolution.jsx` | Sección problema/solución |
| `src/components/web_development/PricingPreview.jsx` | Paquetes sin precios en landing |
| `src/components/web_development/UnifiedPricingSection.jsx` | Paquetes web detallados (sin precios, WhatsApp CTA) |
| `src/components/web_development/ServicesSection.jsx` | Servicios web con formulario integrado |
| `src/components/web_development/AdsLandingPage.jsx` | Landing standalone para Google Ads |
| `src/components/music_production/PricingSection.jsx` | Paquetes música (sin precios, WhatsApp CTA) |
| `src/components/WhatsAppButton.jsx` | Botón flotante WhatsApp |
| `src/components/ContactForm.jsx` | Formulario de contacto |
| `src/components/SEO/SimpleSEO.jsx` | Meta tags, OG, Twitter Cards |
| `src/components/SEO/SimpleSchemaData.jsx` | Schema.org JSON-LD |

---

## Notas Técnicas

- **i18n:** TODAS las modificaciones de texto van en AMBOS idiomas (es/en) en `public/locales/`
- **Paleta:** Purple (#5e2ca5 principal), Coral (#ff4d4d acento), Green (#16a34a WhatsApp CTAs)
- **Conversión:** Todo CTA principal → WhatsApp o formulario, NO checkout
- **Sin precios fijos** en ninguna parte del sitio (ni web ni música)
- **PaymentGateway.jsx** existe pero no se usa en ningún flujo activo
- **Firebase Analytics** configurado pero sin eventos de conversión (pendiente FASE 5)
