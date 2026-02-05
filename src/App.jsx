import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/SharedLayout";
import LandingPage from "./components/LandingPage";
import WhatsAppButton from "./components/WhatsAppButton";
import LanguageRouter from "./components/LanguageRouter";
import CookieConsent from "./components/CookieConsent";
import { useUTM } from "./hooks/useUTM";

// Lazy-loaded pages (code splitting)
const MusicProductionPage = React.lazy(() => import("./components/MusicProductionPage"));
const WebDevelopmentPage = React.lazy(() => import("./components/WebDevelopmentPage"));
const ContactPage = React.lazy(() => import("./components/ContactPage"));
const OrderTracking = React.lazy(() => import("./components/OrderTracking"));
const AdminPanel = React.lazy(() => import("./components/AdminPanel"));
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));
const PaymentResponseHandler = React.lazy(() => import("./components/payments/PaymentResponseHandler"));
const PrivacyPolicy = React.lazy(() => import("./components/PrivacyPolicy"));
const TermsAndConditions = React.lazy(() => import("./components/TermsAndConditions"));
const BlogPage = React.lazy(() => import("./components/blog/BlogPage"));
const BlogPostDetail = React.lazy(() => import("./components/blog/BlogPostDetail"));
const BlogCategory = React.lazy(() => import("./components/blog/BlogCategory"));
const AdsLandingPage = React.lazy(() => import("./components/web_development/AdsLandingPage"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  useUTM();

  return (
    <Router>
      <LanguageRouter>
        <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Ruta protegida para el panel de administración */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Ruta para manejar respuestas de pago */}
          <Route
            path="/payment-response"
            element={<PaymentResponseHandler />}
          />

          {/* Landing page para Google Ads - sin navegación completa */}
          <Route
            path="/servicios/desarrollo-web"
            element={<AdsLandingPage />}
          />
          <Route
            path="/en/servicios/desarrollo-web"
            element={<AdsLandingPage />}
          />

          {/* Rutas públicas en español (sin prefijo) */}
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
                <WhatsAppButton />
              </Layout>
            }
          />

          {/* Rutas del blog en español */}
          <Route
            path="/blog"
            element={
              <Layout>
                <BlogPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Layout>
                <BlogPostDetail />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/blog/categoria/:category"
            element={
              <Layout>
                <BlogCategory />
                <WhatsAppButton />
              </Layout>
            }
          />

          <Route
            path="/music-production"
            element={
              <Layout>
                <MusicProductionPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/web-development"
            element={
              <Layout>
                <WebDevelopmentPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/tracking"
            element={
              <Layout>
                <OrderTracking />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          {/* Nuevas rutas para páginas legales en español */}
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <Layout>
                <TermsAndConditions />
                <WhatsAppButton />
              </Layout>
            }
          />

          {/* Rutas públicas en inglés (con prefijo /en) */}
          <Route
            path="/en"
            element={
              <Layout>
                <LandingPage />
                <WhatsAppButton />
              </Layout>
            }
          />

          {/* Rutas del blog en inglés */}
          <Route
            path="/en/blog"
            element={
              <Layout>
                <BlogPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/en/blog/:slug"
            element={
              <Layout>
                <BlogPostDetail />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/en/blog/categoria/:category"
            element={
              <Layout>
                <BlogCategory />
                <WhatsAppButton />
              </Layout>
            }
          />

          <Route
            path="/en/music-production"
            element={
              <Layout>
                <MusicProductionPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/en/web-development"
            element={
              <Layout>
                <WebDevelopmentPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/en/tracking"
            element={
              <Layout>
                <OrderTracking />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/en/contact"
            element={
              <Layout>
                <ContactPage />
                <WhatsAppButton />
              </Layout>
            }
          />
          {/* Nuevas rutas para páginas legales en inglés */}
          <Route
            path="/en/privacy-policy"
            element={
              <Layout>
                <PrivacyPolicy />
                <WhatsAppButton />
              </Layout>
            }
          />
          <Route
            path="/en/terms-conditions"
            element={
              <Layout>
                <TermsAndConditions />
                <WhatsAppButton />
              </Layout>
            }
          />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <CookieConsent />
      </LanguageRouter>
    </Router>
  );
}

export default App;
