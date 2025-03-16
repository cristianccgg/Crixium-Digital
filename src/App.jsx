import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/SharedLayout";
import LandingPage from "./components/LandingPage";
import MusicProductionPage from "./components/MusicProductionPage";
import WebDevelopmentPage from "./components/WebDevelopmentPage";
import ContactPage from "./components/ContactPage";
import WhatsAppButton from "./components/WhatsAppButton";
import OrderTracking from "./components/OrderTracking";
import AdminPanel from "./components/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import PaymentResponseHandler from "./components/payments/PaymentResponseHandler";
import LanguageRouter from "./components/LanguageRouter";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import CookieConsent from "./components/CookieConsent";

function App() {
  return (
    <Router>
      <LanguageRouter>
        {" "}
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
        </Routes>
        {/* <CookieConsent /> */}
      </LanguageRouter>
    </Router>
  );
}

export default App;
