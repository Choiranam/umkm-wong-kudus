import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import HeroContent from "../components/HeroContent";
import ArtikelCard from "../components/ArtikelCard";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import api from "../services/api";
import NotFoundPage from "./NotFoundPage";
import Toast from "../components/admin/Toast";

const DetailArtikelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const formatMainDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `Admin • ${day}/${month}/${year} • ${hours}.${minutes} WIB — diupload oleh admin`;
  };

  const formatSidebarDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${date.toLocaleDateString(
      "id-ID",
      options
    )} • ${hours}.${minutes} WIB`;
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const detailResponse = await api.get(`/articles/${id}`);
        const detailResult = detailResponse.data;

        if (!detailResult.status || !detailResult.data) {
          throw new Error("Artikel tidak ditemukan");
        }

        const apiArticle = detailResult.data;
        setArticle({
          ...apiArticle,
          category: "UMKM",
        });

        if (apiArticle.category_blog_id) {
          const relatedResponse = await api.get(
            `/articles/category/${apiArticle.category_blog_id}`
          );
          const relatedResult = relatedResponse.data;

          if (relatedResult.status && relatedResult.data) {
            const related = relatedResult.data
              .filter((item) => item.id !== parseInt(id))
              .slice(0, 3);
            setRelatedArticles(related);
          }
        }
      } catch (err) {
        setError("Artikel tidak ditemukan atau gagal dimuat.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const shareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setToast({ message: "Link berhasil disalin!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const shareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(
      `Baca artikel: ${article?.title || "Artikel UMKM"}\n${url}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="bg-light min-h-screen font-poppins flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (error || !article) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-light min-h-screen font-poppins overflow-x-hidden w-full">
      <Navbar />
      <HeroContent image={article.image} title={article.title} />

      <PageContainer variant="default" className="mt-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Konten Artikel */}
          <article className="w-full lg:w-2/3 order-2 lg:order-1">
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center text-dark/70 text-sm sm:text-base mb-6 flex-wrap"
            >
              <Link
                to="/artikel"
                className="hover:text-orange flex items-center gap-1"
              >
                <Icon icon="mdi:newspaper-variant-multiple-outline" />
                Artikel
              </Link>
              <Icon icon="mdi:chevron-right" className="mx-2" />
              <span className="text-dark/50 capitalize">
                {article.category}
              </span>
              <Icon icon="mdi:chevron-right" className="mx-2" />
              <span
                className="text-orange font-medium line-clamp-1"
                title={article.title}
              >
                {article.title}
              </span>
            </motion.nav>

            <div className="flex items-center gap-2 text-sm text-dark/50 mb-8">
              <Icon icon="mdi:account" className="text-orange text-base" />
              <span>{formatMainDate(article.created_at)}</span>
            </div>

            <div
              className="prose prose-lg max-w-none text-dark leading-relaxed whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* === Bagian yang muncul di bawah artikel (mobile only) === */}
            <div className="lg:hidden mt-12 space-y-8">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-dark font-bold whitespace-nowrap">
                  Bagikan:
                </span>
                <div className="flex gap-4">
                  <button
                    onClick={shareLink}
                    className="hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <Icon
                      icon="mingcute:link-line"
                      className="w-9 h-9 text-dark"
                    />
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <Icon
                      icon="basil:whatsapp-solid"
                      className="w-9 h-9"
                      color="#25D366"
                    />
                  </button>
                  <button
                    onClick={shareFacebook}
                    className="hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <Icon
                      icon="mdi:facebook"
                      className="w-9 h-9"
                      color="#1877F2"
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-dark mb-5">
                  Artikel lain
                </h3>
                <div className="space-y-5">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((item) => (
                      <Link
                        key={item.id}
                        to={`/artikel/${item.id}/${slugify(item.title)}`}
                        className="block hover:opacity-90 transition-opacity"
                      >
                        <ArtikelCard
                          image={item.image}
                          category={item.category || "Lainnya"}
                          title={item.title}
                          author={item.author}
                          displayDate={formatSidebarDate(item.created_at)}
                          className="text-base"
                        />
                      </Link>
                    ))
                  ) : (
                    <p className="text-dark/60 text-sm">
                      Belum ada artikel terkait.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar Desktop Only */}
          <aside className="hidden lg:block lg:w-1/3 order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="text-dark font-bold whitespace-nowrap">
                  Bagikan:
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={shareLink}
                    className="hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <Icon
                      icon="mingcute:link-line"
                      className="w-8 h-8 text-dark"
                    />
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <Icon
                      icon="basil:whatsapp-solid"
                      className="w-8 h-8"
                      color="#25D366"
                    />
                  </button>
                  <button
                    onClick={shareFacebook}
                    className="hover:opacity-80 transition-transform hover:scale-110"
                  >
                    <Icon
                      icon="mdi:facebook"
                      className="w-8 h-8"
                      color="#1877F2"
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-dark mb-4">
                  Artikel lain
                </h3>
                <div className="space-y-4">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((item) => (
                      <Link
                        key={item.id}
                        to={`/artikel/${item.id}/${slugify(item.title)}`}
                        className="block hover:opacity-90 transition-opacity"
                      >
                        <ArtikelCard
                          image={item.image}
                          category={item.category || "Lainnya"}
                          title={item.title}
                          author={item.author}
                          displayDate={formatSidebarDate(item.created_at)}
                          className="text-sm"
                        />
                      </Link>
                    ))
                  ) : (
                    <p className="text-dark/60 text-sm">
                      Belum ada artikel terkait.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </PageContainer>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DetailArtikelPage;
