// Este componente muestra el detalle de un artículo individual del blog
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  Calendar,
  User,
  Share2,
} from "lucide-react";
import SimpleSEO from "../SEO/SimpleSEO";
import SimpleSchemaData from "../SEO/SimpleSchemaData";
import blogDataEs from "../../data/blogPosts.json";
import blogDataEn from "../../data/blogPosts_en.json";

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Función para generar URLs localizadas
  const getLocalizedPath = (path) => {
    if (i18n.language === "en") {
      return `/en${path}`;
    }
    return path;
  };

  // Buscar el post actual y posts relacionados
  useEffect(() => {
    const blogData = i18n.language === 'en' ? blogDataEn : blogDataEs;
    
    // Obtener el post actual por su slug
    const currentPost = blogData.find((p) => p.slug === slug);

    if (currentPost) {
      setPost(currentPost);

      // Buscar posts relacionados por categoría
      const related = blogData
        .filter(
          (p) => p.category === currentPost.category && p.id !== currentPost.id
        )
        .slice(0, 3);

      setRelatedPosts(related);
    } else {
      // Si no se encuentra el post, redirigir a la página del blog
      navigate(getLocalizedPath("/blog"));
    }
  }, [slug, navigate, i18n.language]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Components */}
      <SimpleSEO
        titleKey={`${post.title} | Blog Crixium Digital`}
        descriptionKey={post.summary}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image || "/logo.png"}
      />
      <SimpleSchemaData
        pageType="Article"
        data={{
          path: `/blog/${post.slug}`,
          headline: post.title,
          datePublished: post.publishDate,
          author: post.author,
          publisher: "Crixium Digital",
          image: post.image,
        }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/95 to-purple-900/95 backdrop-blur"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to={getLocalizedPath("/blog")}
            className="inline-flex items-center text-white/80 hover:text-coral-400 mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Volver al blog</span>
          </Link>

          <div className="flex items-center space-x-3 mb-4">
            <Link
              to={getLocalizedPath(`/blog/categoria/${post.category}`)}
              className="px-3 py-1 bg-coral-500 text-white text-sm font-medium rounded-lg hover:bg-coral-600 transition-colors"
            >
              {post.categoryName}
            </Link>
            <div className="flex items-center text-white/70 text-sm">
              <Calendar size={14} className="mr-1" />
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-white/90 mb-6 max-w-3xl">{post.summary}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-purple-900 font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="block text-white font-medium">
                  {post.author}
                </span>
                <span className="text-sm text-white/70">{post.authorRole}</span>
              </div>
            </div>

            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Compartir artículo"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Contenido del artículo */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Artículo principal */}
          <div className="md:col-span-3">
            {/* Imagen destacada */}
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={post.image || "/blog/placeholder.jpg"}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Contenido del artículo */}
            <article className="prose prose-lg max-w-none prose-headings:text-purple-900 prose-a:text-coral-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-coral-700 prose-img:rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags del artículo */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={getLocalizedPath(
                        `/blog?tag=${encodeURIComponent(tag)}`
                      )}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-700 rounded-full text-sm transition-colors"
                    >
                      <Tag size={12} />
                      <span>{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Compartir y autor */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full mr-4 flex items-center justify-center text-purple-700 font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-gray-900 font-semibold text-lg">
                      {post.author}
                    </span>
                    <span className="text-gray-600">{post.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Compartir:</span>
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 transition-colors"
                    aria-label="Compartir en Twitter"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${
                          window.location.href
                        }&text=${encodeURIComponent(post.title)}`,
                        "_blank"
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 transition-colors"
                    aria-label="Compartir en Facebook"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                        "_blank"
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 transition-colors"
                    aria-label="Compartir en LinkedIn"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${
                          window.location.href
                        }&title=${encodeURIComponent(
                          post.title
                        )}&summary=${encodeURIComponent(post.summary)}`,
                        "_blank"
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* CTA para servicios relacionados */}
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h3 className="text-lg font-semibold mb-3 text-purple-900">
                  ¿Interesado en nuestros servicios?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Ofrecemos soluciones profesionales de{" "}
                  {post.category === "produccion-musical"
                    ? "producción musical"
                    : "desarrollo web"}{" "}
                  adaptadas a tus necesidades.
                </p>
                <Link
                  to={getLocalizedPath(
                    post.category === "produccion-musical"
                      ? "/music-production"
                      : "/web-development"
                  )}
                  className="block w-full py-2 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-center text-sm font-medium transition-colors"
                >
                  Ver servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Artículos relacionados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={getLocalizedPath(`/blog/${relatedPost.slug}`)}>
                    <div className="relative aspect-video overflow-hidden bg-purple-100">
                      <img
                        src={relatedPost.image || "/blog/placeholder.jpg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link
                      to={getLocalizedPath(`/blog/${relatedPost.slug}`)}
                      className="block text-lg font-bold text-gray-800 mb-2 hover:text-purple-700 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.summary}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs">
                        {new Date(relatedPost.publishDate).toLocaleDateString()}
                      </span>
                      <Link
                        to={getLocalizedPath(`/blog/${relatedPost.slug}`)}
                        className="text-purple-700 text-sm font-medium hover:text-coral-500 transition-colors inline-flex items-center"
                      >
                        <span>Leer más</span>
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPostDetail;
