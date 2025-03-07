import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/SharedLayout";
import LandingPage from "./components/LandingPage";
import MusicProductionPage from "./components/MusicProduccionPage";
import WebDevelopmentPage from "./components/WebDevelopomentPage";
import ContactPage from "./components/ContactPage";
import WhatsAppButton from "./components/WhatsAppButton"; // Importar el nuevo componente
import OrderTracking from "./components/OrderTracking";
import AdminPanel from "./components/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import PaymentResponseHandler from "./components/payments/PaymentResponseHandler";

function App() {
  return (
    <Router>
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
        <Route path="/payment-response" element={<PaymentResponseHandler />} />

        {/* Rutas públicas con layout compartido */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/music-production"
                  element={<MusicProductionPage />}
                />
                <Route
                  path="/web-development"
                  element={<WebDevelopmentPage />}
                />
                <Route path="/tracking" element={<OrderTracking />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Add more routes as needed */}
              </Routes>
              <WhatsAppButton />{" "}
              {/* Reemplazar ChatbotAssistant por WhatsAppButton */}
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
