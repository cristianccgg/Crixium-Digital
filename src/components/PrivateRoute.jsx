import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

// En una aplicación real, esta lógica se conectaría a un sistema de autenticación
// Para este ejemplo, usamos una contraseña simple
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("admin_authenticated") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  // En una aplicación real, esta contraseña estaría en el servidor
  // Solo para ejemplo, la contraseña es "admin123"
  const adminPassword = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === adminPassword) {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Panel de Administración
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ingresa tu contraseña para acceder
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
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

            {error && <div className="text-sm text-red-600">{error}</div>}

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
