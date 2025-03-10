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

// Rutas del sitio
const routes = [
  "/",
  "/web-development",
  "/music-production",
  "/contact",
  "/tracking",
];

// Generar el contenido XML del sitemap
const generateSitemap = () => {
  const today = new Date().toISOString().split("T")[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach((route) => {
    sitemap += `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
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
