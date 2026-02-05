// scripts/generate-sitemap.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del directorio actual en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const SITE_URL = "https://crixiumdigital.com"; // Reemplaza con tu dominio real
const PUBLIC_DIR = path.join(__dirname, "../public");

// Importar datos del blog
const blogPostsEs = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/data/blogPosts.json"), "utf8"));
const blogPostsEn = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/data/blogPosts_en.json"), "utf8"));

// Rutas del sitio
const routes = [
  "/",
  "/web-development",
  "/music-production",
  "/contact",
  "/tracking",
  "/blog",
  "/privacy-policy",
  "/terms-conditions",
  "/servicios/desarrollo-web",
  "/en/blog",
  "/en/privacy-policy",
  "/en/terms-conditions",
  "/en/servicios/desarrollo-web",
];

// Agregar rutas de posts del blog
blogPostsEs.forEach(post => {
  routes.push(`/blog/${post.slug}`);
});

blogPostsEn.forEach(post => {
  routes.push(`/en/blog/${post.slug}`);
});

// Generar el contenido XML del sitemap
const generateSitemap = () => {
  const today = new Date().toISOString().split("T")[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  routes.forEach((route) => {
    const isEnglish = route.startsWith('/en/');
    const isHome = route === "/" || route === "/en";
    const isBlog = route.includes('/blog');
    
    // Determinar prioridad
    let priority = "0.7";
    if (isHome) priority = "1.0";
    else if (isBlog && !route.includes('/blog/')) priority = "0.9"; // Páginas principales del blog
    else if (isBlog) priority = "0.8"; // Posts individuales
    
    sitemap += `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${isHome ? "daily" : isBlog ? "weekly" : "monthly"}</changefreq>
    <priority>${priority}</priority>`;

    // Agregar hreflang para páginas que tienen versión en ambos idiomas
    if (!isEnglish && !route.includes('/blog/')) {
      // Para páginas principales españolas, agregar enlace a versión inglesa
      sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en${route === '/' ? '' : route}" />
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}${route}" />`;
    } else if (route === '/blog') {
      // Para blog español
      sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/blog" />
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/blog" />`;
    } else if (route === '/en/blog') {
      // Para blog inglés
      sitemap += `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/blog" />
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}/blog" />`;
    }

    sitemap += `
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

// Escribir el sitemap en el directorio public
const writeSitemap = () => {
  const sitemap = generateSitemap();
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemap);
  console.log("Sitemap generado exitosamente en public/sitemap.xml");
};

writeSitemap();
