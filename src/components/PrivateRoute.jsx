import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase"; // Asegúrate de que firebase.js exporta auth

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No necesitamos actualizar isAuthenticated aquí,
      // onAuthStateChanged lo hará automáticamente
    } catch (error) {
      console.error("Error en login:", error);
      setError(
        error.code === "auth/invalid-credential"
          ? "Credenciales inválidas. Revisa tu email y contraseña."
          : "Error al iniciar sesión. Por favor, intenta de nuevo."
      );
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // No necesitamos actualizar isAuthenticated aquí,
      // onAuthStateChanged lo hará automáticamente
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Panel de Administración
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ingresa tus credenciales para acceder
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Si el usuario está autenticado, mostrar una barra superior con botón de cerrar sesión
  return (
    <div>
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <span className="font-medium">Panel de Administración</span>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
      {children}
    </div>
  );
};

export default PrivateRoute;
