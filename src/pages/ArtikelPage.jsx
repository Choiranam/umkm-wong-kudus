/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Icon } from "@iconify/react";
import ArtikelCard from "../components/ArtikelCard";
import { motion } from "framer-motion";

export const formatDate = (dateString) => {
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
  const date = new Date(`${dateString}T00:00:00+07:00`);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}.${minutes} WIB`;
};

const getTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(`${dateString}T00:00:00+07:00`);
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  return `${diffDays} hari yang lalu`;
};

export const dummyArticles = [
  {
    id: 1,
    image: "/images/sampel_artikel.png",
    category: "Minuman",
    title: "Kudus Kenalkan Produk UMKM Unggulan ke Tingkat Nasional",
    date: "2025-08-17",
    author: "Admin",
  },
  {
    id: 2,
    image: "/images/sampel_artikel.png",
    category: "Makanan",
    title: "Inovasi Kuliner UMKM Kudus di Pasar Global",
    date: "2025-10-23",
    author: "Admin",
  },
  {
    id: 3,
    image: "/images/sampel_artikel.png",
    category: "Kerajinan",
    title: "Kerajinan Tangan Kudus Mendunia",
    date: "2025-10-21",
    author: "Admin",
  },
  {
    id: 4,
    image: "/images/sampel_artikel.png",
    category: "Fashion",
    title: "UMKM Fashion Kudus Curi Perhatian di Pameran Internasional",
    date: "2025-10-18",
    author: "Admin",
  },
  {
    id: 5,
    image: "/images/sampel_artikel.png",
    category: "Minuman",
    title: "Minuman Tradisional Kudus Kembali Populer",
    date: "2025-09-25",
    author: "Admin",
  },
  {
    id: 6,
    image: "/images/sampel_artikel.png",
    category: "Makanan",
    title: "Resep Sukses UMKM Kuliner di Kudus",
    date: "2025-10-22",
    author: "Admin",
  },
  {
    id: 7,
    image: "/images/sampel_artikel.png",
    category: "Kerajinan",
    title: "Kisah Sukses Pengrajin Lokal Kudus",
    date: "2025-10-17",
    author: "Admin",
  },
  {
    id: 8,
    image: "/images/sampel_artikel.png",
    category: "Fashion",
    title: "Batik Kudus: Warisan yang Mendunia",
    date: "2025-09-15",
    author: "Admin",
  },
  {
    id: 9,
    image: "/images/sampel_artikel.png",
    category: "Minuman",
    title: "UMKM Kudus Luncurkan Minuman Inovatif",
    date: "2025-08-10",
    author: "Admin",
  },
  {
    id: 10,
    image: "/images/sampel_artikel.png",
    category: "Uji",
    title: "Artikel Uji untuk 24 Jam",
    date: "2025-10-28",
    author: "Admin",
  },
];

const ArtikelPage = () => {
  const kategoriList = [
    { id: 1, name: "Semua Waktu", icon: "mdi:clock-outline" },
    { id: 2, name: "24 Jam Terakhir", icon: "mdi:clock-time-four-outline" },
    { id: 3, name: "3 Hari Terakhir", icon: "mdi:calendar-clock" },
    { id: 4, name: "7 Hari Terakhir", icon: "mdi:calendar-week-outline" },
    { id: 5, name: "30 Hari Terakhir", icon: "mdi:calendar-month-outline" },
  ];

  const [activeCategory, setActiveCategory] = useState("Semua Waktu");
  const now = new Date();
  let filteredArticles = dummyArticles.filter((article) => {
    const articleDate = new Date(`${article.date}T00:00:00+07:00`);
    const diffMs = now - articleDate;
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = Math.floor(diffHours / 24);
    switch (activeCategory) {
      case "24 Jam Terakhir":
        return diffHours >= 0 && diffHours <= 24;
      case "3 Hari Terakhir":
        return diffDays >= 0 && diffDays <= 3;
      case "7 Hari Terakhir":
        return diffDays >= 0 && diffDays <= 7;
      case "30 Hari Terakhir":
        return diffDays >= 0 && diffDays <= 30;
      default:
        return true;
    }
  });
  filteredArticles = filteredArticles.sort(
    (a, b) =>
      new Date(`${b.date}T00:00:00+07:00`) -
      new Date(`${a.date}T00:00:00+07:00`)
  );

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
    }),
  };

  const renderArticleGrid = (isMobile = false) => (
    <>
      <div
        className={`grid grid-cols-1 ${
          isMobile
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
        } gap-4 sm:gap-6`}
      >
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, i) => (
            <motion.div
              key={article.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariant}
            >
              <ArtikelCard
                image={article.image}
                category={article.category}
                title={article.title}
                author={article.author}
                displayDate={
                  activeCategory === "Semua Waktu"
                    ? `${formatDate(article.date)}`
                    : getTimeAgo(article.date)
                }
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-dark/70 py-10">
            Tidak ada artikel yang ditemukan pada waktu ini.
          </div>
        )}
      </div>

      {filteredArticles.length > 0 && (
        <div className="flex justify-center mt-6 sm:mt-10">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded text-dark/50 hover:text-orange transition flex items-center justify-center">
              <Icon icon="fluent:chevron-left-12-filled" width="20" />
            </button>
            <span className="px-4 py-1 rounded-md bg-orange text-white font-medium">
              1
            </span>
            <button className="p-2 rounded text-dark/50 hover:text-orange transition flex items-center justify-center">
              <Icon icon="fluent:chevron-right-12-filled" width="20" />
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-light min-h-screen w-full">
      <Navbar />
      <HeroContent
        image="/images/hero_artikel.jpg"
        title="Temukan Cerita dan Inspirasi UMKM Kudus melalui Artikel"
        subtitle="Kumpulan kisah, wawasan, dan inovasi pelaku UMKM di Kudus untuk menginspirasi langkah Anda."
      />
      <PageContainer variant="default" className="relative z-10">
        <div className="bg-dark/5 border border-dark/10 rounded-lg px-4 py-2 text-sm mb-6 sm:mb-8">
          <span className="font-semibold text-orange">Berita Terkini :</span>
          <span className="text-dark mx-2">
            Pemerintah umumkan jadwal libur nasional dan cuti bersama 2025
          </span>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
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
                        activeCategory === item.name
                          ? "text-white"
                          : "text-dark"
                      }
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.aside>
            <div className="w-9/12">{renderArticleGrid(false)}</div>
          </div>
          <div className="md:hidden">
            {renderArticleGrid(true)}
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
