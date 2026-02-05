import { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * Componente SimpleSchemaData para datos estructurados con soporte multilingüe
 * Compatible con React 19
 */
const SimpleSchemaData = ({ pageType = "WebPage", data = {} }) => {
  const { t, i18n } = useTranslation(["common", "schema"]); // Usando ambos namespaces
  const currentLang = i18n.language;

  useEffect(() => {
    // Construir URLs con el idioma actual
    const siteUrl = "https://crixiumdigital.com";
    const langPath = currentLang === "es" ? "" : `/${currentLang}`; // Si es español (default), no añadir prefijo
    const fullUrl = `${siteUrl}${langPath}${data.path || ""}`;

    // Datos de la organización (usados en múltiples esquemas) con traducciones
    const organizationData = {
      "@type": "Organization",
      name: "Crixium Digital",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`, // Logo PNG 500x500px en carpeta public
      sameAs: [
        "https://facebook.com/crixiumdigital", // Reemplaza con tus enlaces reales
        "https://instagram.com/crixiumdigital",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+573219746045", // Reemplaza con tu teléfono real
        contactType: t("schema:organization.contactType", "customer service"),
      },
    };

    // Esquemas disponibles con traducciones
    const schemas = {
      // Esquema para la página principal
      WebPage: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name:
          data.title ||
          t(
            "schema:webpage.title",
            "Desarrollo Web y Producción Musical - Crixium Digital"
          ),
        description:
          data.description ||
          t(
            "schema:webpage.description",
            "Servicios de desarrollo web y producción musical. Creamos sitios web modernos y jingles profesionales para tu negocio."
          ),
        url: fullUrl,
        publisher: organizationData,
        inLanguage: currentLang,
      },

      // Esquema para la página de servicios de desarrollo web
      WebDevelopmentService: {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Development",
        name: t("schema:webdev.title", "Desarrollo Web Profesional"),
        description: t(
          "schema:webdev.description",
          "Creamos sitios web modernos, responsivos y optimizados para SEO para tu negocio o proyecto personal."
        ),
        provider: organizationData,
        areaServed: "Global",
        inLanguage: currentLang,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("schema:webdev.catalogName", "Servicios de Desarrollo Web"),
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: t(
                  "schema:webdev.service1",
                  "Diseño y Desarrollo de Sitios Web"
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: t(
                  "schema:webdev.service2",
                  "Desarrollo de Aplicaciones Web"
                ),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: t("schema:webdev.service3", "E-commerce"),
              },
            },
          ],
        },
      },

      // Esquema para la página de servicios de producción musical
      MusicProductionService: {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Music Production",
        name: t("schema:music.title", "Producción Musical Profesional"),
        description: t(
          "schema:music.description",
          "Creamos jingles, música para publicidad y producción de audio profesional para tu negocio."
        ),
        provider: organizationData,
        areaServed: "Global",
        inLanguage: currentLang,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t(
            "schema:music.catalogName",
            "Servicios de Producción Musical"
          ),
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: t("schema:music.service1", "Producción de Jingles"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: t("schema:music.service2", "Música para Publicidad"),
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: t("schema:music.service3", "Producción de Audio"),
              },
            },
          ],
        },
      },

      // Esquema para la página de contacto
      ContactPage: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: t("schema:contact.title", "Contacto - Crixium Digital"),
        description: t(
          "schema:contact.description",
          "Ponte en contacto con nosotros para discutir tu próximo proyecto de desarrollo web o producción musical."
        ),
        url: `${siteUrl}${langPath}/contact`,
        inLanguage: currentLang,
        mainEntity: {
          "@type": "Organization",
          ...organizationData,
        },
      },

      // NUEVOS ESQUEMAS PARA EL BLOG

      // Esquema para la página principal del blog
      Blog: {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: t("schema:blog.title", "Blog - Crixium Digital"),
        description: t(
          "schema:blog.description",
          "Artículos, tutoriales y recursos sobre desarrollo web, producción musical y marketing digital para empresas."
        ),
        url: `${siteUrl}${langPath}/blog`,
        inLanguage: currentLang,
        publisher: organizationData,
        // Si proporcionamos datos de blogPosting, podríamos añadirlos aquí como:
        // blogPosts: data.blogPosts || []
      },

      // Esquema para un artículo individual del blog
      Article: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline:
          data.headline ||
          t("schema:blog.defaultHeadline", "Artículo del Blog"),
        description:
          data.description ||
          t(
            "schema:blog.defaultDescription",
            "Artículo del blog de Crixium Digital"
          ),
        url: fullUrl,
        image: data.image ? `${siteUrl}${data.image}` : `${siteUrl}/logo.png`,
        datePublished: data.datePublished || new Date().toISOString(),
        dateModified:
          data.dateModified || data.datePublished || new Date().toISOString(),
        author: {
          "@type": "Person",
          name: data.author || "Crixium Digital",
        },
        publisher: organizationData,
        inLanguage: currentLang,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": fullUrl,
        },
      },

      // Esquema para páginas con FAQ
      FAQPage: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        name: data.title || t("schema:webpage.title", "FAQ - Crixium Digital"),
        url: fullUrl,
        inLanguage: currentLang,
        mainEntity: (data.faqItems || []).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },

      // Esquema para una página de categoría del blog
      CollectionPage: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: data.name
          ? `${data.name} - Blog Crixium Digital`
          : t("schema:blog.collection", "Categoría - Blog Crixium Digital"),
        description:
          data.description ||
          t(
            "schema:blog.collectionDescription",
            "Colección de artículos de una categoría específica del blog de Crixium Digital"
          ),
        url: fullUrl,
        inLanguage: currentLang,
        publisher: organizationData,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: data.itemListElement || [],
        },
      },
    };

    // Obtener el esquema seleccionado o WebPage por defecto
    const selectedSchema = schemas[pageType] || schemas.WebPage;

    // Mezclar con datos personalizados si se proporcionan
    const finalSchema = { ...selectedSchema, ...data };

    // Función para insertar el script Schema.org
    // Función modificada para insertar el script Schema.org
    const injectSchemaScript = (schemaData) => {
      // Primero, eliminar cualquier script de schema antiguo para este tipo de página,
      // independientemente del idioma
      const oldScripts = document.querySelectorAll(
        `script[data-schema-type="${pageType}"]`
      );
      oldScripts.forEach((script) => script.remove());

      // Crear y añadir el nuevo script
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-schema-type", pageType);
      scriptTag.setAttribute("data-schema-lang", currentLang);
      scriptTag.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(scriptTag);
    };

    // Inyectar el schema
    injectSchemaScript(finalSchema);

    // Limpieza al desmontar
    return () => {
      // Opcional: eliminar el script al desmontar
      // const scriptTag = document.querySelector('script[data-schema-type="' + pageType + '"][data-schema-lang="' + currentLang + '"]');
      // if (scriptTag) document.head.removeChild(scriptTag);
    };
  }, [pageType, data, currentLang, t]); // Dependencias actualizadas

  // Este componente no renderiza nada visible
  return null;
};

SimpleSchemaData.propTypes = {
  pageType: PropTypes.oneOf([
    "WebPage",
    "WebDevelopmentService",
    "MusicProductionService",
    "ContactPage",
    "Blog",
    "Article",
    "CollectionPage",
    "FAQPage",
  ]),
  data: PropTypes.object,
};

export default SimpleSchemaData;
