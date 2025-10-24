import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";

// --- (S) MOCK DATABASE ---
// Buat database tiruan untuk semua data Kecamatan dan UMKM
// Nantinya, ini bisa diganti dengan panggilan API

const allKecamatanInfo = {
  bae: {
    name: "Bae",
    title: "Daftar UMKM di Daerah Kecamatan Bae",
    subtitle: "Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Bae Kudus.",
    image: "/images/hero_bae.jpg", // Ganti gambar hero jika perlu
  },
  kaliwungu: {
    name: "Kaliwungu",
    title: "Daftar UMKM di Daerah Kecamatan Kaliwungu Kudus",
    subtitle: "Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Kaliwungu Kudus.",
    image: "/images/sampel_hero_content.jpeg",
  }
};

const allUmkmData = [
  // Data untuk Bae
  { id: 1, name: "Soto Ayam Khas Bae", category: "Makanan", description: "Soto ayam legendaris di Bae.", location: "Bae", openHour: "07.00–15.00", image: "/images/sampel_umkm.png", kecamatanSlug: "bae" },
  { id: 2, name: "Es Tebu Segar Bae", category: "Minuman", description: "Minuman es tebu murni.", location: "Bae", openHour: "09.00–17.00", image: "/images/sampel_umkm.png", kecamatanSlug: "bae" },
  { id: 3, name: "Jasa Servis Elektronik Bae", category: "Jasa", description: "Servis TV, kulkas, dll.", location: "Bae", openHour: "08.00–16.00", image: "/images/sampel_umkm.png", kecamatanSlug: "bae" },

  // Data untuk Kaliwungu
  { id: 4, name: "Ramboo Chicken", category: "Makanan", description: "Ramboo Chicken Kudus...", location: "Kaliwungu", openHour: "10.00–21.00", image: "/images/sampel_umkm.png", kecamatanSlug: "kaliwungu" },
  { id: 5, name: "Kopi Senja Kaliwungu", category: "Minuman", description: "Kedai kopi modern.", location: "Kaliwungu", openHour: "15.00–23.00", image: "/images/sampel_umkm.png", kecamatanSlug: "kaliwungu" },
  { id: 6, name: "Cetak Undangan Kaliwungu", category: "Jasa", description: "Jasa percetakan dan desain.", location: "Kaliwungu", openHour: "09.00–17.00", image: "/images/sampel_umkm.png", kecamatanSlug: "kaliwungu" },
  { id: 7, name: "Toko Sembako Kaliwungu", category: "Barang", description: "Menjual kebutuhan pokok.", location: "Kaliwungu", openHour: "06.00–20.00", image: "/images/sampel_umkm.png", kecamatanSlug: "kaliwungu" },
];
// --- (E) MOCK DATABASE ---


const KecamatanPage = () => {
  // 1. Ambil 'slug' dari URL (cth: "bae" atau "kaliwungu")
  const { slug } = useParams();

  // Daftar kategori (sudah ada)
  const kategoriList = [
    { id: 1, name: "Makanan", icon: "fluent:food-16-regular" },
    { id: 2, name: "Minuman", icon: "fluent:drink-to-go-24-regular" },
    { id: 3, name: "Jasa", icon: "ph:wrench" },
    { id: 4, name: "Barang", icon: "lucide:package-open" },
    { id: 5, name: "Lainnya", icon: "basil:other-1-outline" },
  ];

  // 2. State untuk data dinamis
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [kecamatanInfo, setKecamatanInfo] = useState(null);
  const [filteredUmkm, setFilteredUmkm] = useState([]);

  // 3. useEffect untuk memfilter data saat 'slug' atau 'activeCategory' berubah
  useEffect(() => {
    // Ambil info kecamatan berdasarkan slug
    const info = allKecamatanInfo[slug] || null; // Cari info di mock DB
    setKecamatanInfo(info);

    // Filter UMKM berdasarkan slug KECAMATAN dan KATEGORI aktif
    const umkms = allUmkmData.filter(
      (umkm) => umkm.kecamatanSlug === slug && umkm.category === activeCategory
    );
    setFilteredUmkm(umkms);

  }, [slug, activeCategory]); // Dependency array


  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* Hero Section - Dibuat Dinamis */}
      <HeroContent
        image={kecamatanInfo?.image || "/images/sampel_hero_content.jpeg"}
        title={kecamatanInfo?.title || "Memuat Data Kecamatan..."}
        subtitle={kecamatanInfo?.subtitle || "Silakan tunggu..."}
      />

      {/* Kategori Tabs + List UMKM */}
      <PageContainer variant="wide" className="py-10">
        {/* Tabs Kategori (Logik sudah benar) */}
        <div className="flex flex-wrap justify-start gap-3 mb-10">
          {kategoriList.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg ${activeCategory === item.name
                ? "bg-orange text-light shadow-lg"
                : "bg-light text-dark hover:bg-orange/10 hover:shadow-lg"
                }`}
            >
              <Icon
                icon={item.icon}
                width="18"
                height="18"
                className={`${activeCategory === item.name ? "text-white" : "text-dark"
                  }`}
              />
              {item.name}
            </button>
          ))}
        </div>

        {/* Grid UMKM - Dibuat Dinamis */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
          {/* Ganti 'umkmData.map' menjadi 'filteredUmkm.map' */}
          {filteredUmkm.length > 0 ? (
            filteredUmkm.map((umkm) => (
              <UMKMCard key={umkm.id} data={umkm} />
            ))
          ) : (
            // Tampilkan pesan jika tidak ada data
            <p className="col-span-full text-center text-dark/50">
              Tidak ada UMKM yang ditemukan untuk kategori "{activeCategory}" di Kecamatan {kecamatanInfo?.name || slug}.
            </p>
          )}
        </div>

        {/* Pagination (Anda bisa tambahkan logikanya nanti) */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2">
            {/* Tombol kiri */}
            <button className="text-dark/50 hover:text-orange transition">
              <Icon icon="fluent:chevron-left-12-filled" width="22" height="22" />
            </button>

            {/* Nomor halaman aktif */}
            <span className="px-4 py-1 rounded-md bg-orange text-white font-medium">
              1
            </span>

            {/* Tombol kanan */}
            <button className="text-dark/50 hover:text-orange transition">
              <Icon icon="fluent:chevron-right-12-filled" width="22" height="22" />
            </button>
          </div>
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KecamatanPage;