import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  Music2,
  MessageSquare,
  Home,
  ScanSearch,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Menú con links directos a las secciones principales
  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Desarrollo Web", href: "/web-development", icon: Globe },
    { name: "Producción Musical", href: "/music-production", icon: Music2 },
    { name: "Seguimiento de pedido", href: "/tracking", icon: ScanSearch },
  ];

  // Controlar el cambio de estilo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Determinar si estamos en una página con hero de fondo azul
  const hasHeroBackground = [
    "/",
    "/web-development",
    "/music-production",
    "/contact",
    "/tracking",
  ].includes(location.pathname);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled
                  ? "text-purple-700"
                  : hasHeroBackground
                  ? "text-white"
                  : "text-purple-700"
              }`}
            >
              Crixium Digital
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:space-x-3 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-1 text-sm lg:text-base transition-colors  ${
                  isScrolled || !hasHeroBackground
                    ? "text-gray-700 hover:text-purple-700 hover:scale-105 transition-transform duration-500 ease-in-out"
                    : "text-white hover:text-coral-300 hover:scale-105 transition-transform duration-500 ease-in-out"
                } ${location.pathname === item.href ? "font-medium" : ""}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <item.icon size={16} className="md:mr-0.5 lg:mr-1" />
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-3 lg:px-5 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 text-sm lg:text-base whitespace-nowrap ${
                isScrolled || !hasHeroBackground
                  ? "bg-coral-500 text-white hover:bg-purple-800 hover:scale-105  hover:shadow-md hover:shadow-purple-300 transition-all duration-300 ease-out"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-coral-500/90 border border-white/30 hover:text-white hover:scale-105 hover:shadow-coral-300/80 hover:shadow-lg hover:ring-2 hover:ring-coral-300 transition-all duration-300 ease-out"
              }`}
            >
              <MessageSquare size={16} className="md:mr-0.5 lg:mr-1" />
              Contactar
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled || !hasHeroBackground
                  ? "text-gray-600"
                  : "text-white"
              } hover:text-gray-900`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={18} />
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

        {/* Botones principales en footer */}
        <div className="mt-6 space-y-2">
          <Link
            to="/web-development"
            className="flex items-center gap-2 text-gray-300 hover:text-coral-300 transition-colors"
          >
            <Globe size={18} />
            Desarrollo Web
          </Link>
          <Link
            to="/music-production"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <Music2 size={18} />
            Producción Musical
          </Link>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Servicios</h4>
        <ul className="space-y-2 text-gray-400">
          <li className="hover:text-white transition-colors">
            <Link to="/web-development">Sitios Web</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link to="/web-development">Tiendas Online</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link to="/music-production">Jingles</Link>
          </li>
          <li className="hover:text-white transition-colors">
            <Link to="/music-production">Spots de Radio</Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Contacto</h4>
        <ul className="space-y-2 text-gray-400">
          <li className="hover:text-white transition-colors">
            info@creativestudio.com
          </li>
          <li className="hover:text-white transition-colors">+1 234 567 890</li>
          <li className="mt-4">
            <Link
              to="/contact"
              className="px-4 py-2 bg-purple-700 text-white rounded-lg inline-block hover:bg-purple-800 transition-colors"
            >
              Contáctanos
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Síguenos</h4>
        <div className="flex space-x-4">
          {/* Iconos de redes sociales - placeholder */}
          <a
            href="#"
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-700 hover:text-white transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-700 hover:text-white transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-purple-700 hover:text-white transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-gray-500 text-sm text-center">
      <p>
        © {new Date().getFullYear()} CreativeStudio. Todos los derechos
        reservados.
      </p>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  const location = useLocation();

  // Lista de rutas que no necesitan padding superior
  // Estas son las páginas con hero sections de fondo azul
  const fullScreenHeroPages = [
    "/",
    "/web-development",
    "/music-production",
    "/contact",
    "/tracking",
  ];
  const hasFullScreenHero = fullScreenHeroPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${hasFullScreenHero ? "" : "pt-20"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
