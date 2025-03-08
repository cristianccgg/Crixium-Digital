import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  Music2,
  MessageSquare,
  Home,
  ScanSearch,
  ArrowRight,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("navbar");

  // Menú con links directos a las secciones principales
  const navItems = [
    { name: t("navbar.home"), href: "/", icon: Home },
    { name: t("navbar.webDevelopment"), href: "/web-development", icon: Globe },
    {
      name: t("navbar.musicProduction"),
      href: "/music-production",
      icon: Music2,
    },
    { name: t("navbar.orderTracking"), href: "/tracking", icon: ScanSearch },
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

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/contact");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        isScrolled ? "bg-purple-700 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                {/* Reduced logo size and gap */}
                <img
                  src="/bombillo.PNG"
                  alt="bombillo"
                  className="w-8  md:w-10 "
                />
                <h1 className="text-coral-400 text-bold text-2xl md:text-md lg:text-3xl">
                  Crixium Digital
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Modified breakpoints */}
          <div className="hidden md:flex items-center md:space-x-2 lg:space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-1 text-xs lg:text-base transition-colors ${
                  isScrolled || !hasHeroBackground
                    ? "text-white font-semibold hover:text-coral-400 hover:scale-105 transition-transform duration-500 ease-in-out"
                    : "text-white font-semibold hover:text-coral-400 hover:scale-105 transition-transform duration-500 ease-in-out"
                } ${location.pathname === item.href ? "font-semibold" : ""}`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <item.icon size={14} className="md:mr-0.5 lg:mr-1" />
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            ))}
            <a
              href="/contact"
              className={`px-2 md:px-3 lg:px-5 py-1.5 md:py-2 rounded-lg transition-all duration-300 flex items-center gap-1 text-xs md:text-sm lg:text-base whitespace-nowrap cursor-pointer ${
                isScrolled || !hasHeroBackground
                  ? "bg-white/20 font-semibold backdrop-blur-sm text-white hover:bg-coral-400 border border-white/30 hover:text-white hover:scale-105 hover:shadow-coral-300/80 hover:shadow-lg hover:ring-2 hover:ring-coral-300 transition-all duration-300 ease-out"
                  : "bg-white/20 font-semibold backdrop-blur-sm text-white hover:bg-coral-400 border border-white/30 hover:text-white hover:scale-105 hover:shadow-coral-300/80 hover:shadow-lg hover:ring-2 hover:ring-coral-300 transition-all duration-300 ease-out"
              }`}
              onClick={handleContactClick}
            >
              <MessageSquare size={14} className="md:mr-0.5 lg:mr-1" />
              {t("navbar.contact")}
            </a>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-between gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled || !hasHeroBackground
                  ? "text-coral-400"
                  : "text-coral-400"
              } hover:text-white`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-purple-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-3 py-2 text-white hover:text-purple-700 hover:bg-blue-50 rounded-lg"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
            <a
              href="/contact"
              className="flex items-center gap-2 px-3 py-2 bg-coral-400 text-white rounded-lg hover:text-purple-700 hover:bg-white mt-2 cursor-pointer"
              onClick={handleContactClick}
            >
              <MessageSquare size={18} />
              {t("navbar.contact")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const CallToAction = () => {
  const { t } = useTranslation("cta");
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();

    // Navegar a la página de contacto
    navigate("/contact");

    // Hacer scroll al inicio de la página
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 px-4 bg-purple-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <a
          href="/contact"
          onClick={handleContactClick}
          className="bg-coral-500 text-white px-8 py-4 rounded-lg hover:bg-coral-600 transition-all duration-300 inline-flex items-center gap-2 font-medium shadow-lg group cursor-pointer"
        >
          <span>{t("button")}</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </section>
  );
};

// Footer component remains untouched as it's already translated
const Footer = ({ children }) => {
  // Original Footer component code...
  const { t } = useTranslation("footer");
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/contact");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <Link to="/">
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                <img src="/bombillo.PNG" alt="bombillo" className="w-8" />
                <h1 className="text-coral-400 text-bold text-2xl md:text-md lg:text-3xl">
                  Crixium Digital
                </h1>
              </div>
              <p className="text-gray-400 ">Bringing Ideas To Life</p>
            </div>
          </div>
        </Link>
        <div>
          <h4 className="font-semibold mb-4">{t("services")}</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition-colors">
              <Link to="/web-development">{t("web")}</Link>
            </li>
            <li className="hover:text-white transition-colors">
              <Link to="/music-production">{t("music")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t("contact")}</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition-colors">
              contact@crixiumdigital.com
            </li>

            <li className="mt-4">
              <a
                href="/contact"
                onClick={handleContactClick}
                className="px-4 py-2 bg-purple-700 text-white rounded-lg inline-block hover:bg-purple-800 transition-colors cursor-pointer"
              >
                {t("button")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t("social")}</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/crixiumdigital/"
              target="blank"
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
          © {new Date().getFullYear()} Crixium Digital. {t("rights")}
        </p>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();

  const fullScreenHeroPages = [
    "/",
    "/web-development",
    "/music-production",
    "/contact",
    "/tracking",
  ];
  const hasFullScreenHero = fullScreenHeroPages.includes(location.pathname);

  // Verificar si la página actual es la de contacto
  const isContactPage = location.pathname === "/contact";

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className={`flex-grow ${hasFullScreenHero ? "" : "pt-20"}`}>
        {children}
      </main>

      {/* Renderizar el CTA solo si NO estamos en la página de contacto */}
      {!isContactPage && <CallToAction />}

      <Footer />
    </div>
  );
};

export default Layout;
