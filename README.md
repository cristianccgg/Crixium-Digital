# Crixium Digital - Reestructuración para Venta

## Contexto

El sitio lleva meses en vivo como portafolio sin promoción activa. Google Search Console muestra 228 impresiones, 1 clic, CTR 0.4%, posición media 7.5 en 3 meses. El trabajo en Fiverr ha bajado y necesitamos que el sitio funcione como herramienta de venta activa, tanto con Google Ads como orgánicamente.

**Decisión:** Enfocar en **desarrollo y diseño web** como servicio principal de venta. La producción musical queda como servicio secundario.

## Objetivo

Transformar el sitio de portafolio a sitio de venta enfocado en desarrollo web, manteniendo los proyectos como prueba social/casos de éxito. Debe funcionar como landing para ads Y generar tráfico orgánico.

## Estrategia de Venta

- **NO checkout/PayPal en el flujo de desarrollo web.** Los servicios web son personalizados y requieren conversación previa.
- **CTA principal:** WhatsApp y formulario de contacto. El objetivo es iniciar una conversación, no un pago inmediato.
- **Precios de referencia** ("Desde $XXX") para filtrar clientes y generar expectativa, pero no para cobrar directamente.
- **PayPal** se mantiene solo para producción musical (jingles, voiceovers) que son más estandarizados.
- **Sistema de tracking:** Se saca de la landing principal. Se menciona como beneficio dentro de los paquetes ("Incluye seguimiento en tiempo real"). La página `/tracking` sigue existiendo para clientes activos.
- **Flujo de conversión esperado:** Landing → WhatsApp/Formulario → Conversación → Cotización personalizada → Pago por transferencia/PayPal directo.

---

## Plan de Trabajo

### FASE 1: Reestructurar Landing Principal (LandingPage.jsx)

**Estado:** [ ] Pendiente

El flujo actual no tiene embudo de venta. Hay que reordenar las secciones para guiar al visitante hacia la conversión.

#### 1.1 Nuevo Hero Section (EnhancedHeroSection.jsx)
- [ ] Cambiar propuesta de valor genérica ("Eleva tu Marca con Creatividad y Tecnología") por una enfocada en el beneficio para el cliente
  - Ejemplo: "Diseñamos la web que tu negocio necesita para vender más"
- [ ] CTA principal: "Solicita tu cotización gratis" → enlace a WhatsApp o formulario de contacto
- [ ] CTA secundario: "Ver nuestro trabajo" → scroll a proyectos
- [ ] Eliminar botones de tracking y música del hero
- [ ] Reemplazar la preview card de tracking por beneficios clave o estadísticas de impacto
- [ ] Reducir partículas de 20 a ~8 (performance mobile)
- [ ] Actualizar traducciones en `public/locales/es/hero.json` y `public/locales/en/hero.json`

#### 1.2 Nuevo orden de secciones en LandingPage.jsx
- [ ] **Hero** — Propuesta de valor + CTA a WhatsApp/contacto
- [ ] **Problema/Solución** (NUEVO) — Conectar con el dolor del cliente y cómo lo resolvemos
- [ ] **Servicios** — Web como principal, música como secundario
- [ ] **Proyectos destacados** — Como casos de éxito con resultados
- [ ] **Stats/Cifras** — Prueba social con números
- [ ] **Reviews** — Testimonios de clientes
- [ ] **Precios de Referencia** (NUEVO) — Paquetes con "Desde $XXX" y CTA a WhatsApp/contacto
- [ ] **CTA Final** — Cierre con beneficio ("Respuesta en menos de 24 horas")
- [ ] **ELIMINAR** `TechnologiesSection` de la landing
- [ ] **ELIMINAR** `TrackingLanding` de la landing (mover a feature mencionado en paquetes)

#### 1.3 Sección Problema/Solución (Componente NUEVO)
- [ ] Crear componente `ProblemSolution.jsx` en `src/components/web_development/`
- [ ] 3 problemas comunes del cliente objetivo:
  - "No tienes presencia online y pierdes clientes"
  - "Tu web actual se ve anticuada y no genera confianza"
  - "No sabes por dónde empezar con tu proyecto digital"
- [ ] Para cada problema, mostrar cómo Crixium lo resuelve
- [ ] Agregar traducciones es/en

#### 1.4 Precios de Referencia en Landing (Componente NUEVO)
- [ ] Crear componente `PricingPreview.jsx` con 2-3 paquetes
- [ ] Precios como "Desde $XXX" (no precio fijo)
- [ ] CTA de cada paquete → WhatsApp con mensaje pre-armado ("Hola, me interesa el paquete [X] para mi proyecto web")
- [ ] Mencionar "Incluye seguimiento en tiempo real de tu proyecto" como feature
- [ ] Enlace a página completa de web-development para más detalles

### FASE 2: Optimización de CTAs y Conversión

**Estado:** [ ] Pendiente

#### 2.1 CallToAction global (SharedLayout.jsx)
- [ ] Cambiar texto genérico por algo directo con beneficio
  - "Solicita tu cotización gratuita — Respuesta en menos de 24 horas"
- [ ] CTA → WhatsApp o formulario de contacto
- [ ] Actualizar traducciones en `public/locales/es/cta.json` y `en/cta.json`

#### 2.2 WhatsApp Button
- [ ] Mensaje desde landing: "Hola, me interesa una cotización para desarrollo web"
- [ ] Mensaje desde precios: "Hola, me interesa el paquete [X]"
- [ ] Verificar que todos los mensajes están orientados a venta

#### 2.3 Formulario de contacto
- [ ] Campos mínimos: nombre, email, tipo de proyecto, mensaje
- [ ] Opciones de tipo de proyecto: "Página web nueva", "Rediseño", "E-commerce", "Otro"

### FASE 3: SEO y Preparación para Ads

**Estado:** [ ] Pendiente

#### 3.1 Meta tags y SEO on-page
- [ ] Title: "Diseño y Desarrollo Web Profesional | Crixium Digital"
- [ ] Description enfocada en desarrollo web con call to action
- [ ] h1, h2 con keywords: "diseño web", "desarrollo web", "páginas web para empresas"
- [ ] Actualizar `public/locales/es/seo.json` y `en/seo.json`

#### 3.2 Optimización para Google Ads
- [ ] Reducir partículas animadas para mejorar velocidad
- [ ] Verificar lazy loading de imágenes
- [ ] Verificar que Google Analytics/Tag Manager está configurado
- [ ] Contenido above-the-fold debe coincidir con lo que promete el ad

#### 3.3 PayPal
- [ ] Mantener PayPal solo en flujo de producción musical
- [ ] Remover PayPal del flujo de desarrollo web (si estaba integrado)
- [ ] Cambiar a producción cuando se necesite para música

### FASE 4: Landing Pages Dedicadas para Ads (Futuro)

**Estado:** [ ] Pendiente

#### 4.1 Landing page para Google Ads
- [ ] Ruta `/servicios/desarrollo-web` ultra-enfocada en conversión
- [ ] Sin navegación completa (reduce distracciones)
- [ ] Un solo servicio, un solo CTA (WhatsApp), prueba social mínima
- [ ] Optimizada para Quality Score de Google Ads

---

## Estructura Actual vs. Propuesta

### Landing Actual:
```
Hero (genérico: creatividad + tecnología)
  → 3 botones: Web, Música, Tracking
Servicios (Web + Música al mismo nivel)
Proyectos Destacados (web + música + video)
Tecnologías (React, Node, etc.)
Tracking Landing (sección entera dedicada)
Stats (250+ proyectos, 600+ clientes...)
Reviews
Por qué elegirnos
CTA global (genérico → contacto)
```

### Landing Propuesta:
```
Hero (enfocado: "Diseñamos la web que vende")
  → CTA principal: WhatsApp / Cotizar gratis
  → CTA secundario: Ver nuestro trabajo
Problema/Solución (NUEVO - dolor del cliente → nuestra solución)
Servicios (Web principal, música secundario)
Proyectos como Casos de Éxito (con resultados)
Stats (mismos números, mejor contexto)
Reviews (testimonios)
Precios de Referencia (NUEVO - "Desde $XXX" + CTA WhatsApp)
CTA final (con beneficio: "Respuesta en menos de 24h")
```

---

## Archivos Principales a Modificar

| Archivo | Cambio |
|---|---|
| `src/components/LandingPage.jsx` | Reordenar secciones, quitar Technologies/Tracking, agregar nuevos |
| `src/components/web_development/EnhancedHeroSection.jsx` | Nuevo copy + CTAs a WhatsApp/contacto |
| `src/components/web_development/EnhancedServices.jsx` | Priorizar web sobre música |
| `src/components/web_development/FeaturedProjectsLanding.jsx` | Reframe como casos de éxito |
| `src/components/SharedLayout.jsx` | CTA global → WhatsApp/contacto con beneficio |
| `src/components/WhyToChoose.jsx` | Ajustar propuestas de valor |
| `public/locales/es/hero.json` | Nuevo copy de venta en español |
| `public/locales/en/hero.json` | Nuevo copy de venta en inglés |
| `public/locales/es/cta.json` | CTA directo con beneficio |
| `public/locales/en/cta.json` | CTA directo con beneficio |
| `public/locales/es/seo.json` | Meta tags enfocados en desarrollo web |
| `public/locales/en/seo.json` | Meta tags enfocados en desarrollo web |
| **NUEVO** `src/components/web_development/ProblemSolution.jsx` | Sección problema/solución |
| **NUEVO** `src/components/web_development/PricingPreview.jsx` | Precios de referencia + CTA WhatsApp |
| **NUEVO** `public/locales/es/problem-solution.json` | Traducciones problema/solución |
| **NUEVO** `public/locales/en/problem-solution.json` | Traducciones problema/solución |
| **NUEVO** `public/locales/es/pricing-preview.json` | Traducciones precios landing |
| **NUEVO** `public/locales/en/pricing-preview.json` | Traducciones precios landing |

---

## Notas Técnicas

- **Stack:** React 19 + Vite 6 + Tailwind CSS 4 + i18next + Framer Motion
- **Deployment:** Vercel
- **i18n:** Todas las modificaciones de texto en AMBOS idiomas (es/en)
- **Paleta:** Purple (#5e2ca5 principal), Coral (#ff4d4d acento)
- **WhatsApp:** +573219746045
- **Conversión:** Todo CTA principal va a WhatsApp o formulario de contacto, NO a checkout

## Prioridad de Implementación

1. **Hero + copy de venta** (impacto inmediato, above the fold)
2. **Reorden de secciones** en LandingPage.jsx
3. **Sección Problema/Solución** (nuevo componente)
4. **Precios de referencia** en landing (nuevo componente)
5. **SEO meta tags** actualizados
6. **CTA global** mejorado
7. **Landing dedicada para ads** (fase futura)
