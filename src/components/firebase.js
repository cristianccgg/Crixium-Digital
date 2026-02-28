import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Inicializa Analytics solo si el usuario ha dado su consentimiento
let analytics = null;

// Verifica si se ha dado consentimiento para analytics
const initializeAnalytics = async () => {
  try {
    // Verificar si el almacenamiento local tiene guardada la configuración de cookies
    const cookieConsent = localStorage.getItem("cookie-consent");

    if (cookieConsent) {
      const settings = JSON.parse(cookieConsent);
      // Solo inicializar analytics si el usuario ha dado consentimiento para estadísticas
      if (settings.statistics) {
        const analyticsSupported = await isSupported();
        if (analyticsSupported) {
          analytics = getAnalytics(app);
          console.log(
            "Firebase Analytics inicializado con consentimiento del usuario"
          );
        }
      } else {
        console.log("Analytics desactivado por preferencias del usuario");
      }
    } else {
      // Si no hay configuración guardada, no inicializar analytics hasta que el usuario decida
      console.log(
        "Esperando consentimiento del usuario para inicializar Analytics"
      );
    }
  } catch (error) {
    console.error("Error al inicializar Analytics:", error);
  }
};

// Ejecutar la inicialización de Analytics
initializeAnalytics();

export { db, storage, auth, analytics };
