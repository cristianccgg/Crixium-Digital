// Este componente muestra artículos filtrados por categoría
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SimpleSEO from "../SEO/SimpleSEO";
import SimpleSchemaData from "../SEO/SimpleSchemaData";
import blogData from "../../data/blogPosts.json";

const BlogCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Función para generar URLs localizadas
  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return `/en${path}`;
    }
    return path;
  };

  // Cargar artículos de la categoría
  useEffect(() => {
    const categoryPosts = blogData.filter((p) => p.category === category);

    if (categoryPosts.length > 0) {
      setPosts(categoryPosts);
      setCategoryName(categoryPosts[0].categoryName);
    } else {
      // Si no hay posts en la categoría, redirigir al blog principal
      navigate(getLocalizedPath("/blog"));
    }
  }, [category, navigate, i18n.language]);

  return (
    <>
      {/* SEO Components */}
      <SimpleSEO
        titleKey="blog.category.defaultTitle"
        descriptionKey={`blog.category.defaultDescription`}
        descriptionOptions={{ category: categoryName?.toLowerCase() }}
        canonicalUrl={`/blog/categoria/${category}`}
        ogType="website"
        ogImage="/logo.png"
      />
      <SimpleSchemaData
        pageType="CollectionPage"
        data={{
          path: `/blog/categoria/${category}`,
          name: categoryName,
        }}
      />
      <SimpleSchemaData
        pageType="BreadcrumbList"
        data={{
          breadcrumbs: [
            { name: "Inicio", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: categoryName || category },
          ],
        }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <Link
            to={getLocalizedPath("/blog")}
            className="inline-flex items-center text-white/80 hover:text-coral-400 mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Volver al blog</span>
          </Link>

          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl">
            Artículos sobre {categoryName.toLowerCase()} para empresas y
            profesionales
          </p>
        </div>
      </section>

      {/* Lista de artículos */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                >
                  <Link to={getLocalizedPath(`/blog/${post.slug}`)}>
                    <div className="relative aspect-video overflow-hidden bg-purple-100">
                      <img
                        src={post.image || "/blog/placeholder.jpg"}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-coral-500 text-white text-xs font-semibold rounded-md">
                        {post.categoryName}
                      </div>
                    </div>
                  </Link>
                  <div className="p-4 flex-grow">
                    <Link
                      to={getLocalizedPath(`/blog/${post.slug}`)}
                      className="block text-lg font-bold text-gray-800 mb-2 hover:text-purple-700 transition-colors"
                    >
                      {post.title}
                    </Link>
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
                      className="text-purple-700 text-sm font-medium hover:text-coral-500 transition-colors inline-flex items-center"
                    >
                      <span>Leer más</span>
                      <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                No hay artículos en esta categoría
              </h2>
              <p className="text-gray-600 mb-6">
                Estamos trabajando en crear contenido para esta categoría.
                ¡Vuelve pronto!
              </p>
              <Link
                to={getLocalizedPath("/blog")}
                className="inline-flex items-center text-white bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                <span>Volver al blog</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogCategory;
