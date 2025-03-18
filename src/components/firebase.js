import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_sRrRlRuDrAfDdRGfb8dC_u0K6sq5Y0c",
  authDomain: "philo-studio.firebaseapp.com",
  projectId: "philo-studio",
  storageBucket: "philo-studio.firebasestorage.app",
  messagingSenderId: "976158688326",
  appId: "1:976158688326:web:5ed5eb2e5eadfc318ff647",
  measurementId: "G-11J6Q97KD0",
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
