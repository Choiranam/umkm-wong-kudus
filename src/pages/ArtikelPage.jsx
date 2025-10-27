import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Icon } from "@iconify/react";
import ArtikelCard from "../components/ArtikelCard";

const formatDate = (dateString) => {
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

  // Buat tanggal berdasarkan zona waktu WIB (UTC+7)
  const date = new Date(`${dateString}T00:00:00+07:00`);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Ambil jam dan menit dari waktu lokal
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Tambahkan "WIB" di akhir
  return `${day} ${month} ${year}, ${hours}.${minutes} WIB`;
};

// Hitung waktu relatif (menit/jam/hari lalu)
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

// Dummy Data
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
  // Artikel uji untuk 24 Jam Terakhir
  {
    id: 10,
    image: "/images/sampel_artikel.png",
    category: "Uji",
    title: "Artikel Uji untuk 24 Jam",
    date: "2025-10-25",
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

  // Filter berdasarkan tanggal dengan zona waktu WIB
  const now = new Date();
  let filteredArticles = dummyArticles.filter((article) => {
    const articleDate = new Date(`${article.date}T00:00:00+07:00`); // WIB
    const diffMs = now - articleDate;
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = Math.floor(
      (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    console.log(
      `Artikel ${article.id}: ${article.date}, ${diffHours.toFixed(
        2
      )} jam, ${diffDays} hari`
    );

    switch (activeCategory) {
      case "24 Jam Terakhir":
        return diffHours <= 24;
      case "3 Hari Terakhir":
        return diffDays <= 3;
      case "7 Hari Terakhir":
        return diffDays <= 7;
      case "30 Hari Terakhir":
        return diffDays <= 30;
      case "Semua Waktu":
      default:
        return true;
    }
  });

  // Urutkan artikel dari terbaru ke terlama
  filteredArticles = filteredArticles.sort(
    (a, b) =>
      new Date(`${b.date}T00:00:00+07:00`) -
      new Date(`${a.date}T00:00:00+07:00`)
  );

  return (
    <div className="bg-light min-h-screen">
      <Navbar />
      <HeroContent
        image="/images/hero_artikel.jpg"
        title="Temukan Cerita dan Inspirasi UMKM Kudus melalui Artikel"
        subtitle="Kumpulan kisah, wawasan, dan inovasi pelaku UMKM di Kudus untuk menginspirasi langkah Anda."
      />
      <PageContainer variant="default">
        <div className="bg-dark/5 border border-dark/10 rounded-lg px-4 py-2 text-sm mb-8">
          <span className="font-semibold text-orange">Berita Terkini :</span>
          <span className="text-dark mx-2">
            Pemerintah umumkan jadwal libur nasional dan cuti bersama 2025
          </span>
        </div>
        <div className="flex flex-wrap justify-start gap-3 mb-10">
          {kategoriList.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg 
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArtikelCard
                key={article.id}
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
            ))
          ) : (
            <div className="col-span-full text-center text-dark/70">
              Tidak ada artikel yang ditemukan untuk kategori ini.
            </div>
          )}
        </div>
        <div className="flex justify-center mt-10">
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
      </PageContainer>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
