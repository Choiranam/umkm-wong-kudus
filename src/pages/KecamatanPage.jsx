import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import UMKMCard from "../components/UMKMCard";
import { Icon } from "@iconify/react";

// --- (S) MOCK DATABASE ---
const allKecamatanInfo = {
  bae: {
    name: "Bae",
    title: "Daftar UMKM di Daerah Kecamatan Bae",
    subtitle: "Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Bae Kudus.",
    image: "/images/hero_bae.jpg",
  },
  kaliwungu: {
    name: "Kaliwungu",
    title: "Daftar UMKM di Daerah Kecamatan Kaliwungu Kudus",
    subtitle: "Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Kaliwungu Kudus.",
    image: "/images/sampel_hero_content.jpeg",
  }
  // ... (kecamatan lain)
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
  // 1. Ambil 'slug' dari URL
  const { slug } = useParams();

  const kategoriList = [
    { id: 1, name: "Makanan", icon: "fluent:food-16-regular" },
    { id: 2, name: "Minuman", icon: "fluent:drink-to-go-24-regular" },
    { id: 3, name: "Jasa", icon: "ph:wrench" },
    { id: 4, name: "Barang", icon: "lucide:package-open" },
    { id: 5, name: "Lainnya", icon: "basil:other-1-outline" },
  ];

  // 2. State
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [kecamatanInfo, setKecamatanInfo] = useState(null);
  const [filteredUmkm, setFilteredUmkm] = useState([]);

  // 3. useEffect
  useEffect(() => {
    const info = allKecamatanInfo[slug] || null;
    setKecamatanInfo(info);

    const umkms = allUmkmData.filter(
      (umkm) => umkm.kecamatanSlug === slug && umkm.category === activeCategory
    );
    setFilteredUmkm(umkms);

  }, [slug, activeCategory]);


  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroContent
        image={kecamatanInfo?.image || "/images/sampel_hero_content.jpeg"}
        title={kecamatanInfo?.title || "Memuat Data Kecamatan..."}
        subtitle={kecamatanInfo?.subtitle || "Silakan tunggu..."}
      />

      {/* Kategori Tabs + List UMKM */}
      {/* PENYESUAIAN 1: Padding Container Responsif
          - Sebelum: py-10
          - Sesudah: py-6 sm:py-10
          - Alasan: Mengurangi padding vertikal di mobile.
      */}
      <PageContainer variant="wide" className="py-6 sm:py-10">
        {/* Tabs Kategori */}
        {/* PENYESUAIAN 2: Spasi Tabs Responsif
            - Sebelum: gap-3 mb-10
            - Sesudah: gap-2 sm:gap-3 mb-6 sm:mb-10
            - Alasan: Mengurangi 'gap' dan 'margin-bottom' di mobile.
        */}
        <div className="flex flex-wrap justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
          {kategoriList.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.name)}
              /* PENYESUAIAN 3: Padding Button Responsif
                         - Sebelum: px-5 py-2.5
                         - Sesudah: px-4 py-2 sm:px-5 sm:py-2.5
                         - Alasan: Button sedikit lebih kecil di mobile agar muat lebih banyak.
                     */
              className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg ${activeCategory === item.name
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

        {/* Grid UMKM */}
        {/* PENYESUAIAN 4: Spasi Grid Responsif
            - Sebelum: gap-6
            - Sesudah: gap-4 sm:gap-6
            - Alasan: Mengurangi spasi antar kartu di mobile.
        */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
          {filteredUmkm.length > 0 ? (
            filteredUmkm.map((umkm) => (
              <UMKMCard key={umkm.id} data={umkm} />
            ))
          ) : (
            /* PENYESUAIAN 5: Padding Pesan Kosong
                      - Sebelum: (tidak ada)
                      - Sesudah: py-10
                      - Alasan: Memberi ruang vertikal jika pesan ini muncul.
                  */
            <p className="col-span-full text-center text-dark/50 py-10">
              Tidak ada UMKM yang ditemukan untuk kategori "{activeCategory}" di Kecamatan {kecamatanInfo?.name || slug}.
            </p>
          )}
        </div>

        {/* Pagination */}
        {/* PENYESUAIAN 6: Margin Atas Responsif
            - Sebelum: mt-10
            - Sesudah: mt-6 sm:mt-10
            - Alasan: Konsistensi spasi di mobile.
        */}
        <div className="flex justify-center mt-6 sm:mt-10">
          <div className="flex items-center gap-2">
            <button className="text-dark/50 hover:text-orange transition">
              <Icon icon="fluent:chevron-left-12-filled" width="22" height="22" />
            </button>

            <span className="px-4 py-1 rounded-md bg-orange text-white font-medium">
              1
            </span>

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