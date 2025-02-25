import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_sRrRlRuDrAfDdRGfb8dC_u0K6sq5Y0c",
  authDomain: "philo-studio.firebaseapp.com",
  projectId: "philo-studio",
  storageBucket: "philo-studio.firebasestorage.app",
  messagingSenderId: "976158688326",
  appId: "1:976158688326:web:5ed5eb2e5eadfc318ff647",
  measurementId: "G-11J6Q97KD0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, storage, auth };
