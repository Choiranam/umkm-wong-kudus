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

const DetailArtikelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return `${date.toLocaleDateString("id-ID", options)} • ${hours}.${minutes} WIB`;
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
        const response = await api.get(`/articles/${id}/detail`);
        const result = response.data;

        if (result.status && result.data) {
          const { article: apiArticle, related_articles } = result.data;

          setArticle(apiArticle);
          setRelatedArticles(related_articles || []);
        } else {
          throw new Error(result.message || "Data tidak valid");
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
    alert("Link berhasil disalin!");
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
    return (
      <div className="bg-light min-h-screen font-poppins">
        <Navbar />
        <PageContainer variant="default" className="py-20 text-center">
          <h1 className="text-2xl font-bold text-dark mb-3">
            Artikel tidak ditemukan
          </h1>
          <p className="text-dark mb-6">
            Artikel yang kamu cari mungkin sudah dihapus atau URL-nya salah.
          </p>
          <button
            onClick={() => navigate("/artikel")}
            className="bg-orange text-light px-6 py-2 rounded-lg hover:bg-orange-500 transition"
          >
            Kembali ke Artikel
          </button>
        </PageContainer>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen font-poppins overflow-x-hidden w-full">
      <Navbar />
      <HeroContent image={article.image} title={article.title} />

      <PageContainer
        variant="default"
        className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-6 sm:mt-8"
      >
        {/* KONTEN UTAMA */}
        <div className="lg:w-2/3">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center text-dark/70 text-sm sm:text-base mb-6"
          >
            <Link
              to="/artikel"
              className="hover:text-orange flex items-center gap-1"
            >
              <Icon icon="mdi:newspaper-variant-multiple-outline" />
              Artikel
            </Link>
            <Icon icon="mdi:chevron-right" className="mx-2" />
            <span className="text-dark/50 capitalize">{article.category}</span>
            <Icon icon="mdi:chevron-right" className="mx-2" />
            <span
              className="text-orange font-medium line-clamp-1"
              title={article.title}
            >
              {article.title}
            </span>
          </motion.nav>

          <div className="flex items-center gap-2 text-sm text-dark/50 mb-6">
            <Icon icon="mdi:account" className="text-orange text-base" />
            <span>{formatMainDate(article.created_at)}</span>
          </div>

          {/* PERBAIKAN: Tambah break-words agar kata panjang tidak tembus */}
          <div
            className="prose prose-lg max-w-none text-dark leading-relaxed space-y-4 break-words"
            // Jika ingin lebih ketat, bisa tambah style:
            // style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* SIDEBAR */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="flex items-center gap-3 mb-6 lg:ml-10">
            <span className="text-dark font-bold">Bagikan:</span>

            <button
              onClick={shareLink}
              className="hover:opacity-80 transition-transform transform hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Icon
                icon="mingcute:link-line"
                className="w-full h-full text-dark"
              />
            </button>

            <button
              onClick={shareWhatsApp}
              className="hover:opacity-80 transition-transform transform hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Icon
                icon="basil:whatsapp-solid"
                className="w-full h-full"
                color="#25D366"
              />
            </button>

            <button
              onClick={shareFacebook}
              className="hover:opacity-80 transition-transform transform hover:scale-110 flex items-center justify-center w-8 h-8"
            >
              <Icon
                icon="mdi:facebook"
                className="w-full h-full"
                color="#1877F2"
              />
            </button>
          </div>

          <h3 className="text-lg font-semibold text-dark mb-4 lg:ml-10">
            Artikel lain
          </h3>

          <div className="grid grid-cols-1 gap-4 w-full">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((item) => (
                <div
                  key={item.id}
                  className="w-full transition-transform duration-200 lg:transform lg:scale-90 lg:origin-top-right"
                >
                  <Link to={`/artikel/${item.id}/${slugify(item.title)}`}>
                    <ArtikelCard
                      image={item.image}
                      category={item.category || "Lainnya"}
                      title={item.title}
                      author={item.author}
                      displayDate={formatSidebarDate(item.created_at)}
                      className="text-sm"
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-dark/60 text-sm lg:ml-10">
                Belum ada artikel terkait.
              </p>
            )}
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default DetailArtikelPage;