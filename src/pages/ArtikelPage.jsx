/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import { Icon } from "@iconify/react";
import ArtikelCard from "../components/ArtikelCard";

// PERUBAHAN: Tambahkan 'export' agar bisa dipakai di HomePage.js
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
  // ... (data dummy tidak diubah)
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
    date: "2025-10-28", // Diubah agar lolos filter '24 Jam Terakhir'
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
  const now = new Date(); // Asumsikan 'now' adalah 28 Okt 2025
  let filteredArticles = dummyArticles.filter((article) => {
    const articleDate = new Date(`${article.date}T00:00:00+07:00`); // WIB
    const diffMs = now - articleDate;
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = Math.floor(diffHours / 24); // Ini lebih akurat

    // Hapus console.log di production
    // console.log(
    //  `Artikel ${article.id}: ${article.date}, ${diffHours.toFixed(
    //   2
    //  )} jam, ${diffDays} hari`
    // );

    switch (activeCategory) {
      case "24 Jam Terakhir":
        // Artikel yang diposting 0-24 jam lalu
        return diffHours >= 0 && diffHours <= 24;
      case "3 Hari Terakhir":
        // Artikel yang diposting 0-3 hari lalu
        return diffDays >= 0 && diffDays <= 3;
      case "7 Hari Terakhir":
        return diffDays >= 0 && diffDays <= 7;
      case "30 Hari Terakhir":
        return diffDays >= 0 && diffDays <= 30;
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
        {/* PENYESUAIAN 1: Margin-bottom responsif
            - Sebelum: mb-8
            - Sesudah: mb-6 sm:mb-8
            - Alasan: Mengurangi spasi di mobile agar lebih ringkas.
        */}
        <div className="bg-dark/5 border border-dark/10 rounded-lg px-4 py-2 text-sm mb-6 sm:mb-8">
          <span className="font-semibold text-orange">Berita Terkini :</span>
          <span className="text-dark mx-2">
            Pemerintah umumkan jadwal libur nasional dan cuti bersama 2025
          </span>
        </div>

        {/* PENYESUAIAN 2: Margin-bottom responsif
            - Sebelum: mb-10
            - Sesudah: mb-6 sm:mb-10
            - Alasan: Konsistensi spasi di mobile.
            - 'flex-wrap' sudah membuat ini responsif (Bagus!)
        */}
        <div className="flex flex-wrap justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
          {kategoriList.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              /* PENYESUAIAN 3: Padding button responsif
                         - Sebelum: px-5 py-2.5
                         - Sesudah: px-4 py-2 sm:px-5 sm:py-2.5
                         - Alasan: Membuat button sedikit lebih kecil di mobile 
                           agar muat lebih banyak per baris sebelum 'wrap'.
                     */
              className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg 
    ${activeCategory === item.name
                  ? "bg-orange text-light shadow-orange/40"
                  : "bg-light text-dark hover:bg-orange/10"
                }`}
            >
              <Icon icon={item.icon} width="18" height="18" />
              {item.name}
            </button>
          ))}
        </div>

        {/* PENYESUAIAN 4: Gap grid responsif
            - Sebelum: gap-6
            - Sesudah: gap-4 sm:gap-6
            - Alasan: Mengurangi spasi antar kartu di mobile.
            - 'grid-cols-1' sudah membuat ini responsif (Bagus!)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
            /* PENYESUAIAN 5: Padding saat kosong
                     - Sebelum: (tidak ada)
                     - Sesudah: py-10
                     - Alasan: Memberi ruang vertikal jika tidak ada artikel.
                 */
            <div className="col-span-full text-center text-dark/70 py-10">
              Tidak ada artikel yang ditemukan untuk kategori ini.
            </div>
          )}
        </div>

        {/* PENYESUAIAN 6: Margin-top responsif
            - Sebelum: mt-10
            - Sesudah: mt-6 sm:mt-10
            - Alasan: Konsistensi spasi di mobile.
        */}
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
      </PageContainer>
      <Footer />
    </div>
  );
};

export default ArtikelPage;