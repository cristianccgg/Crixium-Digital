// src/components/SimpleSEO.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * Componente SimpleSEO para manejar metadatos con soporte multilingüe
 * Compatible con React 19
 */
const SimpleSEO = ({
  titleKey = "seo.defaultTitle", // Clave de traducción para el título
  descriptionKey = "seo.defaultDescription", // Clave de traducción para la descripción
  canonicalUrl,
  ogType = "website",
  ogImage = "/logo.png", // Logo PNG 500x500px en carpeta public
}) => {
  const { t, i18n } = useTranslation("seo"); // Asumiendo que tienes un namespace "seo"
  const currentLang = i18n.language;

  // Construir la URL canónica con soporte para idioma
  const siteUrl = "https://crixiumdigital.com"; // Reemplaza con tu dominio real
  const langPath = currentLang === "es" ? "" : `/${currentLang}`; // Si es español (default), no añadir prefijo
  const canonical = canonicalUrl
    ? `${siteUrl}${langPath}${canonicalUrl}`
    : `${siteUrl}${langPath}`;

  // Obtener título y descripción traducidos
  const title = t(titleKey);
  const description = t(descriptionKey);

  useEffect(() => {
    // Actualizar el título de la página
    document.title = title;

    // Función para actualizar o crear meta tags
    const updateMetaTag = (name, content, property = false) => {
      // Buscar si ya existe el meta tag
      let metaTag = property
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      // Si existe, actualizar su contenido
      if (metaTag) {
        metaTag.setAttribute("content", content);
      }
      // Si no existe, crear uno nuevo
      else {
        metaTag = document.createElement("meta");
        if (property) {
          metaTag.setAttribute("property", name);
        } else {
          metaTag.setAttribute("name", name);
        }
        metaTag.setAttribute("content", content);
        document.head.appendChild(metaTag);
      }
    };

    // Función para manejar enlaces
    const updateLink = (rel, href) => {
      let linkTag = document.querySelector(`link[rel="${rel}"]`);

      if (linkTag) {
        linkTag.setAttribute("href", href);
      } else {
        linkTag = document.createElement("link");
        linkTag.setAttribute("rel", rel);
        linkTag.setAttribute("href", href);
        document.head.appendChild(linkTag);
      }
    };

    // Establecer el atributo lang en el html
    document.documentElement.setAttribute("lang", currentLang);

    // Metadatos básicos
    updateMetaTag("description", description);
    updateLink("canonical", canonical);

    // Open Graph / Facebook
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", canonical, true);
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", `${siteUrl}${ogImage}`, true);
    updateMetaTag("og:locale", currentLang === "es" ? "es_ES" : "en_US", true);

    // Añadir alternativas de idioma para Open Graph
    const altLang = currentLang === "es" ? "en" : "es";
    const altUrl = canonicalUrl
      ? `${siteUrl}${altLang === "es" ? "" : `/${altLang}`}${canonicalUrl}`
      : `${siteUrl}${altLang === "es" ? "" : `/${altLang}`}`;
    updateMetaTag(
      "og:locale:alternate",
      altLang === "es" ? "es_ES" : "en_US",
      true
    );

    // Agregar enlaces hreflang para SEO multilingüe
    updateLink("alternate", altUrl);
    updateLink("hreflang", altLang);

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${siteUrl}${ogImage}`);

    // Limpieza al desmontar el componente
    return () => {
      // No es necesario eliminar las meta tags, pero podría hacerse si es importante
      // Para este caso, simplemente dejamos que permanezcan hasta la próxima actualización
    };
  }, [title, description, canonical, ogType, ogImage, currentLang, siteUrl]);

  // Este componente no renderiza nada visible
  return null;
};

SimpleSEO.propTypes = {
  titleKey: PropTypes.string,
  descriptionKey: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
};

export default SimpleSEO;
