import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Componente SimpleSchemaData para datos estructurados sin dependencias externas
 * Compatible con React 19
 */
const SimpleSchemaData = ({ pageType = "WebPage", data = {} }) => {
  useEffect(() => {
    // Datos de la organización (usados en múltiples esquemas)
    const organizationData = {
      "@type": "Organization",
      name: "Crixium Digital",
      url: "https://crixiumdigital.com",
      logo: "https://crixiumdigital.com/logo.png", // Logo PNG 500x500px en carpeta public
      sameAs: [
        "https://facebook.com/crixiumdigital", // Reemplaza con tus enlaces reales
        "https://instagram.com/crixiumdigital",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+573219746045", // Reemplaza con tu teléfono real
        contactType: "customer service",
      },
    };

    // Esquemas disponibles
    const schemas = {
      // Esquema para la página principal
      WebPage: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name:
          data.title || "Desarrollo Web y Producción Musical - Crixium Digital",
        description:
          data.description ||
          "Servicios de desarrollo web y producción musical. Creamos sitios web modernos y jingles profesionales para tu negocio.",
        url: data.url || "https://crixiumdigital.com",
        publisher: organizationData,
      },

      // Esquema para la página de servicios de desarrollo web
      WebDevelopmentService: {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Development",
        name: "Desarrollo Web Profesional",
        description:
          "Creamos sitios web modernos, responsivos y optimizados para SEO para tu negocio o proyecto personal.",
        provider: organizationData,
        areaServed: "Global",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de Desarrollo Web",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Diseño y Desarrollo de Sitios Web",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Desarrollo de Aplicaciones Web",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "E-commerce",
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
        name: "Producción Musical Profesional",
        description:
          "Creamos jingles, música para publicidad y producción de audio profesional para tu negocio.",
        provider: organizationData,
        areaServed: "Global",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de Producción Musical",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Producción de Jingles",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Música para Publicidad",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Producción de Audio",
              },
            },
          ],
        },
      },

      // Esquema para la página de contacto
      ContactPage: {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contacto - Crixium Digital",
        description:
          "Ponte en contacto con nosotros para discutir tu próximo proyecto de desarrollo web o producción musical.",
        url: "https://crixiumdigital.com/contact",
        mainEntity: {
          "@type": "Organization",
          ...organizationData,
        },
      },
    };

    // Obtener el esquema seleccionado o WebPage por defecto
    const selectedSchema = schemas[pageType] || schemas.WebPage;

    // Mezclar con datos personalizados si se proporcionan
    const finalSchema = { ...selectedSchema, ...data };

    // Función para insertar el script Schema.org
    const injectSchemaScript = (schemaData) => {
      // Buscar si ya existe un script de schema
      let scriptTag = document.querySelector(
        'script[data-schema-type="' + pageType + '"]'
      );

      // Si existe, actualizarlo
      if (scriptTag) {
        scriptTag.innerHTML = JSON.stringify(schemaData);
      }
      // Si no existe, crear uno nuevo
      else {
        scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "application/ld+json");
        scriptTag.setAttribute("data-schema-type", pageType);
        scriptTag.innerHTML = JSON.stringify(schemaData);
        document.head.appendChild(scriptTag);
      }
    };

    // Inyectar el schema
    injectSchemaScript(finalSchema);

    // Limpieza al desmontar
    return () => {
      // Opcional: eliminar el script al desmontar
      // const scriptTag = document.querySelector('script[data-schema-type="' + pageType + '"]');
      // if (scriptTag) document.head.removeChild(scriptTag);
    };
  }, [pageType, data]); // Solo dependencias primitivas

  // Este componente no renderiza nada visible
  return null;
};

SimpleSchemaData.propTypes = {
  pageType: PropTypes.oneOf([
    "WebPage",
    "WebDevelopmentService",
    "MusicProductionService",
    "ContactPage",
  ]),
  data: PropTypes.object,
};

export default SimpleSchemaData;
