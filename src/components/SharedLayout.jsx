import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Removido "Contacto" de los navItems ya que ahora tenemos un botón dedicado
  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/#services" },
    { name: "Portafolio", href: "/#portfolio" },
  ];

  const isHomeLink = (href) => {
    return href.startsWith("/#");
  };

  const handleNavClick = (e, href) => {
    if (isHomeLink(href) && location.pathname !== "/") {
      return;
    }
    if (isHomeLink(href)) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              CreativeStudio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Contactar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-gray-600 hover:text-blue-600"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Contactar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">CreativeStudio</h3>
        <p className="text-gray-400">
          Soluciones creativas para hacer crecer tu negocio
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Servicios</h4>
        <ul className="space-y-2 text-gray-400">
          <li>Desarrollo Web</li>
          <li>Producción Musical</li>
          <li>Diseño UI/UX</li>
          <li>Marketing Digital</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Contacto</h4>
        <ul className="space-y-2 text-gray-400">
          <li>info@creativestudio.com</li>
          <li>+1 234 567 890</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Síguenos</h4>
        <div className="flex space-x-4">
          {/* Aquí puedes agregar iconos de redes sociales */}
        </div>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
