import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Importa i18n ANTES de cualquier componente que lo use
import "./i18n";

// Verifica en consola que i18n se ha inicializado correctamente
console.log("i18n initialized in main.jsx");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
