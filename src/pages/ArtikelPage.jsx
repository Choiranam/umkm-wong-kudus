/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Icon } from "@iconify/react";
import ArtikelCard from "../components/ArtikelCard";
import { motion } from "framer-motion";
import api from "../services/api";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}.${minutes} WIB`;
};

const getTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  return `${diffDays} hari yang lalu`;
};

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const ArtikelPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [blogCategories, setBlogCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState("Semua Waktu");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    window.innerWidth < 640 ? 6 : 9
  );

  const pageContainerRef = useRef(null);

  const scrollToContainer = () => {
    if (pageContainerRef.current) {
      const navbarHeight = 70;
      const elementPosition =
        pageContainerRef.current.getBoundingClientRect().top;
      const offsetPosition = window.scrollY + elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth < 640 ? 6 : 9;
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories-blog");
        const result = response.data;

        if (result.status && Array.isArray(result.data)) {
          const map = {};
          result.data.forEach((cat) => {
            map[cat.id] = cat.title;
          });
          setBlogCategories(map);
        } else {
          setBlogCategories({ 1: "UMKM", 2: "Lainnya" });
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setBlogCategories({ 1: "UMKM", 2: "Lainnya" });
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await api.get("/articles");
        const result = response.data;

        if (result.status && Array.isArray(result.data)) {
          const formatted = result.data
            .filter((item) => item.status === "active")
            .map((item) => ({
              id: item.id,
              image: item.image || "/images/sampel_artikel.webp",
              category_blog_id: item.category_blog_id,
              title: item.title,
              created_at: item.created_at,
              author: item.author,
            }));
          setArticles(formatted);
        } else {
          throw new Error("Data tidak valid");
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Gagal memuat artikel. Silakan coba lagi.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const now = new Date();
  const filteredArticles = useMemo(() => {
    return articles
      .filter((article) => {
        const articleDate = new Date(article.created_at);
        const diffMs = now - articleDate;
        const diffHours = diffMs / (1000 * 60 * 60);
        const diffDays = Math.floor(diffHours / 24);

        let matchesTime = true;
        switch (activeCategory) {
          case "24 Jam Terakhir":
            matchesTime = diffHours >= 0 && diffHours <= 24;
            break;
          case "3 Hari Terakhir":
            matchesTime = diffDays >= 0 && diffDays <= 3;
            break;
          case "7 Hari Terakhir":
            matchesTime = diffDays >= 0 && diffDays <= 7;
            break;
          case "30 Hari Terakhir":
            matchesTime = diffDays >= 0 && diffDays <= 30;
            break;
          default:
            matchesTime = true;
        }

        const matchesSearch = article.title
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchesTime && matchesSearch;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [articles, activeCategory, search]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    setTimeout(scrollToContainer, 0);
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
  };

  const kategoriList = [
    { id: 1, name: "Semua Waktu", icon: "mdi:clock-outline" },
    { id: 2, name: "24 Jam Terakhir", icon: "mdi:clock-time-four-outline" },
    { id: 3, name: "3 Hari Terakhir", icon: "mdi:calendar-clock" },
    { id: 4, name: "7 Hari Terakhir", icon: "mdi:calendar-week-outline" },
    { id: 5, name: "30 Hari Terakhir", icon: "mdi:calendar-month-outline" },
  ];

  const renderArticleGrid = (isMobile = false) => (
    <>
      <div
        className={`grid grid-cols-1 ${
          isMobile
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
        } gap-4 sm:gap-6`}
      >
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>
        ) : paginatedArticles.length > 0 ? (
          paginatedArticles.map((article, i) => (
            <motion.div
              key={article.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariant}
            >
              <Link to={`/artikel/${article.id}/${slugify(article.title)}`}>
                <ArtikelCard
                  image={article.image}
                  category={
                    blogCategories[article.category_blog_id] || "Lainnya"
                  }
                  title={article.title}
                  author={article.author}
                  displayDate={
                    activeCategory === "Semua Waktu"
                      ? formatDate(article.created_at)
                      : getTimeAgo(article.created_at)
                  }
                />
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-dark/60 italic py-10">
            {search ? (
              <>
                Tidak ditemukan hasil untuk pencarian{" "}
                <span className="font-semibold text-orange">"{search}"</span>
                {activeCategory !== "Semua Waktu" && (
                  <> pada kategori waktu ini</>
                )}
                .
              </>
            ) : (
              <>Tidak ada artikel pada kategori waktu ini.</>
            )}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center gap-2 mt-10 flex-wrap"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md transition ${
              currentPage === 1
                ? "text-dark/30 cursor-not-allowed"
                : "text-dark/70 hover:text-orange"
            }`}
          >
            <Icon icon="fluent:chevron-left-12-filled" width="22" height="22" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                currentPage === page
                  ? "bg-orange text-white shadow"
                  : "text-dark/70 hover:bg-orange/10"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md transition ${
              currentPage === totalPages
                ? "text-dark/30 cursor-not-allowed"
                : "text-dark/70 hover:text-orange"
            }`}
          >
            <Icon
              icon="fluent:chevron-right-12-filled"
              width="22"
              height="22"
            />
          </button>
        </motion.div>
      )}
    </>
  );

  return (
    <div className="bg-light min-h-screen w-full overflow-hidden md:overflow-visible">
      <Navbar />
      <HeroContent
        image="/images/hero_artikel.webp"
        title="Temukan Cerita dan Inspirasi UMKM Kudus melalui Artikel"
        subtitle="Kumpulan kisah, wawasan, dan inovasi pelaku UMKM di Kudus untuk menginspirasi langkah Anda."
      />
      <PageContainer
        ref={pageContainerRef}
        variant="default"
        className="relative z-10"
      >
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-dark/70 text-sm sm:text-base mb-6 relative"
        >
          <Link to="/" className="hover:text-orange flex items-center gap-1">
            <Icon icon="mdi:home-outline" />
            Beranda
          </Link>
          <Icon icon="mdi:chevron-right" className="mx-2" />
          <span className="text-orange font-semibold">Artikel</span>
        </motion.nav>

        <div className="md:hidden grid grid-cols-2 sm:flex sm:flex-wrap justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
          {kategoriList.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              className={`flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium text-sm transition-all duration-200 shadow-lg 
                ${
                  activeCategory === item.name
                    ? "bg-orange text-light shadow-orange/40"
                    : "bg-light text-dark hover:bg-orange/10"
                }`}
            >
              <Icon icon={item.icon} width="18" height="18" />
              {item.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex flex-row gap-6 sm:gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/12 bg-white rounded-lg shadow-md p-4 md:p-6 border border-dark/5 md:sticky md:top-24 md:self-start z-20"
          >
            <h3 className="text-lg font-semibold text-dark mb-4">
              Filter Waktu
            </h3>
            <div className="flex flex-col gap-2">
              {kategoriList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.name)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 shadow-sm border ${
                    activeCategory === item.name
                      ? "bg-orange text-light shadow-md border-orange"
                      : "bg-white text-dark hover:bg-orange/5 hover:shadow-md border-dark/10 hover:border-orange/30"
                  }`}
                >
                  <Icon
                    icon={item.icon}
                    width="20"
                    height="20"
                    className={
                      activeCategory === item.name ? "text-white" : "text-dark"
                    }
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </motion.aside>

          <div className="w-9/12">
            <div className="flex justify-start mb-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari judul artikel..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-dark/20 rounded-[5px] px-5 py-2 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange transition placeholder:text-dark/50 text-dark"
                />
                <Icon
                  icon="mdi:magnify"
                  className="absolute right-4 top-2.5 text-dark/50"
                  width="22"
                  height="22"
                />
              </div>
            </div>
            {renderArticleGrid(false)}
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex justify-center mb-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari judul artikel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-dark/20 rounded-[5px] px-5 py-2 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange transition placeholder:text-dark/50 text-dark"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute right-4 top-2.5 text-dark/50"
                width="22"
                height="22"
              />
            </div>
          </div>
          {renderArticleGrid(true)}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
