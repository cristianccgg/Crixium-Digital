// Este componente muestra la página principal del blog, con listado de posts
// Importa el JSON directamente para evitar dependencias de CMS
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, ArrowRight, Tag } from "lucide-react";
import SimpleSEO from "../SEO/SimpleSEO";
import SimpleSchemaData from "../SEO/SimpleSchemaData";
import blogData from "../../data/blogPosts.json";

// Componente para tarjeta de artículo destacado
const FeaturedPostCard = ({ post }) => {
  const { i18n } = useTranslation();

  // Función para generar URLs localizadas
  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return `/en${path}`;
    }
    return path;
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[16/9] overflow-hidden bg-purple-100">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-purple-900/80 z-10"></div>
        <img
          src={post.image || "/blog/placeholder.jpg"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
          <span className="inline-block px-3 py-1 bg-coral-500 text-white text-sm font-semibold rounded-lg mb-3">
            {post.categoryName}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {post.title}
          </h3>
          <p className="text-white/90 mb-4 line-clamp-2">{post.summary}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="text-white text-sm font-medium block">
                  {post.author}
                </span>
                <span className="text-white/70 text-xs">
                  {new Date(post.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Link
              to={getLocalizedPath(`/blog/${post.slug}`)}
              className="inline-flex items-center text-coral-400 font-semibold hover:text-white transition-colors duration-300"
            >
              <span>Leer más</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para tarjeta de artículo estándar
const PostCard = ({ post }) => {
  const { i18n } = useTranslation();

  // Función para generar URLs localizadas
  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return `/en${path}`;
    }
    return path;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-purple-100">
        <img
          src={post.image || "/blog/placeholder.jpg"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 px-2 py-1 bg-coral-500 text-white text-xs font-semibold rounded-md">
          {post.categoryName}
        </span>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.summary}
        </p>
      </div>
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex justify-between items-center mt-auto">
        <div className="flex items-center">
          <span className="text-gray-500 text-xs">
            {new Date(post.publishDate).toLocaleDateString()}
          </span>
        </div>
        <Link
          to={getLocalizedPath(`/blog/${post.slug}`)}
          className="inline-flex items-center text-purple-700 text-sm font-medium hover:text-coral-500 transition-colors duration-300"
        >
          <span>Leer más</span>
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

// Componente principal de la página del blog
const BlogPage = () => {
  // Modificar para incluir múltiples namespaces
  const { t, i18n } = useTranslation(["blog", "common"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Filtrar posts según el idioma actual
  useEffect(() => {
    const currentLanguagePosts = blogData.filter(
      (post) => post.language === i18n.language || !post.language
    );
    setFilteredPosts(currentLanguagePosts);
  }, [i18n.language]); // Actualizar cuando cambie el idioma

  // Seccionar posts para el diseño
  const featuredPosts = filteredPosts
    .filter((post) => post.featured)
    .slice(0, 3);
  const recentPosts = [...filteredPosts]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 6);

  // Obtener categorías únicas para el sidebar
  const categories = Array.from(
    new Set(filteredPosts.map((post) => post.category))
  ).map((category) => {
    const categoryPost = filteredPosts.find(
      (post) => post.category === category
    );
    return {
      slug: category,
      name: categoryPost?.categoryName || category,
      count: filteredPosts.filter((post) => post.category === category).length,
    };
  });

  // Tags populares para el sidebar
  const allTags = filteredPosts.flatMap((post) => post.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ name: tag, count }));

  // Manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredPosts(blogData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = blogData.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );

    setFilteredPosts(results);
  };

  // Función para generar URLs localizadas
  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return `/en${path}`;
    }
    return path;
  };

  return (
    <>
      {/* SEO Components */}
      <SimpleSEO
        titleKey="blog.title"
        descriptionKey="blog.description"
        canonicalUrl="/blog"
        ogType="blog"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="Blog"
        data={{
          path: "/blog",
        }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title", { ns: "blog" })}
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl">
            {t("subtitle", { ns: "blog" })}
          </p>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder", { ns: "blog" })}
              className="w-full px-5 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-coral-400 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal con artículos */}
          <div className="lg:col-span-2">
            {/* Posts destacados */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  {t("featuredPosts", { ns: "blog" })}
                </h2>
                <div className="grid gap-6">
                  {featuredPosts.map((post) => (
                    <FeaturedPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Posts recientes */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {t("recentPosts", { ns: "blog" })}
              </h2>
              {recentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  {t("noArticles", { ns: "blog" })}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categorías */}
              {categories.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {t("categories", { ns: "blog" })}
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link
                          to={getLocalizedPath(
                            `/blog/categoria/${category.slug}`
                          )}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <span className="text-gray-700">{category.name}</span>
                          <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags populares */}
              {popularTags.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {t("popularTags", { ns: "blog" })}
                    <span className="text-sm text-gray-500 ml-2">
                      ({popularTags.length})
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Link
                        key={tag.name}
                        to={getLocalizedPath(
                          `/blog?tag=${encodeURIComponent(tag.name)}`
                        )}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-coral-100 hover:text-coral-700 text-gray-700 rounded-full text-sm transition-colors"
                      >
                        <Tag size={12} />
                        <span>{tag.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA para servicios */}
              <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-6 shadow-md text-white">
                <h3 className="text-xl font-bold mb-3">
                  {t("needHelp", { ns: "blog" })}
                </h3>
                <p className="text-purple-100 mb-4">
                  {t("needHelpText", { ns: "blog" })}
                </p>
                <div className="space-y-3">
                  <Link
                    to={getLocalizedPath("/web-development")}
                    className="block w-full py-2 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-center transition-colors"
                  >
                    {t("projectTypes.web")}
                  </Link>
                  <Link
                    to={getLocalizedPath("/music-production")}
                    className="block w-full py-2 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-center transition-colors"
                  >
                    {t("projectTypes.music")}
                  </Link>
                  <Link
                    to={getLocalizedPath("/contact")}
                    className="block w-full py-2 px-4 bg-coral-500 hover:bg-coral-600 rounded-lg text-center transition-colors font-medium"
                  >
                    {t("projectTypes.contact")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
