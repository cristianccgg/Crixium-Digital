import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Importa i18n ANTES de cualquier componente que lo use
import "./i18n";

// Verifica en consola que i18n se ha inicializado correctamente
console.log("i18n initialized in main.jsx");

// Función para asegurarse de que existe una configuración de consentimiento
// antes de renderizar la aplicación
const initializeApp = () => {
  // Verificar si ya existe una configuración de consentimiento
  const cookieConsent = localStorage.getItem("cookie-consent");

  // Si no existe configuración de consentimiento, establecer una configuración
  // por defecto con solo cookies esenciales habilitadas
  if (!cookieConsent) {
    // No guardamos nada en localStorage aún - dejaremos que el banner
    // de cookies maneje esto correctamente
    console.log(
      "No hay configuración de cookies guardada, mostrando banner de consentimiento"
    );
  } else {
    console.log("Configuración de cookies cargada");
  }

  // Renderizar la aplicación
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Inicializar la aplicación
initializeApp();
