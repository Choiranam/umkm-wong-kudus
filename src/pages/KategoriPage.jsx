import React from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import UMKMCard from "../components/UMKMCard";
import PageContainer from "../components/PageContainer";
import { useSearchParams } from "react-router-dom"; // 1. IMPORT useSearchParams

// --- DATA DUMMY UNTUK SIMULASI ---
const KATEGORI_DATA = {
  makanan: {
    title: "Jelajahi Rasa Lokal dari UMKM Kudus",
    subtitle:
      "Nikmati aneka kuliner khas buatan warga Kudus yang penuh cita rasa dan keunikan lokal.",
    image: "/images/sampel_hero_kategori.jpg",
    umkmList: Array(10).fill({
      name: "Ramboo Chicken",
      category: "Makanan",
      description: "Ramboo Chicken Kudus...",
      location: "Kota Kudus",
      openHour: "10.00–21.00",
      image: "/images/sampel_umkm.png",
    }),
  },
  minuman: {
    title: "Segarnya Kreasi Minuman dari UMKM Kudus",
    subtitle:
      "Temukan berbagai minuman segar hasil racikan pelaku UMKM dengan inovasi dan cita rasa khas daerah.",
    image: "/images/sampel_hero_minuman.jpg",
    umkmList: Array(5).fill({
      name: "Kopi Muria",
      category: "Minuman",
      description: "Kopi khas lereng Muria...",
      location: "Kec. Dawe",
      openHour: "09.00–20.00",
      image: "/images/sampel_kopi.jpg",
    }),
  },
  jasa: {
    title: "Layanan Terbaik dari Pelaku UMKM Kudus",
    subtitle: "Dari laundry hingga barbershop, kami hadirkan berbagai jasa berkualitas hasil karya masyarakat lokal.",
    image: "/images/sampel_hero_jasa.jpg",
    umkmList: Array(3).fill({
      name: "Berkah Laundry",
      category: "Jasa",
      description: "Jasa cuci cepat dan bersih...",
      location: "Kec. Jati",
      openHour: "08.00–21.00",
      image: "/images/sampel_laundry.jpg",
    }),
  },
  barang: {
    title: "Produk Unggulan Karya UMKM Kudus",
    subtitle:
      "Lihat hasil kreativitas warga Kudus melalui berbagai produk menarik dan bermanfaat bagi kebutuhan Anda.",
    image: "/images/sampel_hero_barang.jpg",
    umkmList: Array(6).fill({
      name: "Batik Kudusan",
      category: "Barang",
      description: "Kain batik tulis asli Kudus...",
      location: "Kec. Kota",
      openHour: "10.00–17.00",
      image: "/images/sampel_batik.jpg",
    }),
  },
  lainnya: {
    title: "Beragam Inovasi dari UMKM Kudus",
    subtitle: "Temukan usaha-usaha unik lainnya yang menunjukkan semangat dan kreativitas pelaku UMKM di Kudus.",
    image: "/images/sampel_hero_lainnya.jpg",
    umkmList: Array(2).fill({
      name: "Toko Kelontong Barokah",
      category: "Lainnya",
      description: "Menyediakan kebutuhan harian...",
      location: "Kec. Jekulo",
      openHour: "07.00–22.00",
      image: "/images/sampel_kelontong.jpg",
    }),
  },
};
// --- AKHIR DATA DUMMY ---

const KategoriPage = () => {
  // 2. BACA PARAMETER 'slug' DARI URL
  const [searchParams] = useSearchParams();
  const kategoriSlug = searchParams.get("slug") || "makanan"; // Default ke 'makanan' jika slug tidak ada

  // 3. AMBIL DATA SPESIFIK BERDASARKAN SLUG
  const kategoriData = KATEGORI_DATA[kategoriSlug] || KATEGORI_DATA.makanan;

  return (
    <div className="bg-light min-h-screen">
      <Navbar />

      {/* Hero Section - Sekarang Dinamis */}
      <HeroContent
        image={kategoriData.image}
        title={kategoriData.title}
        subtitle={kategoriData.subtitle}
      />

      {/* PENYESUAIAN 1: Padding Responsif
        - Sebelum: py-10
        - Sesudah: py-6 sm:py-10
        - Alasan: Mengurangi padding vertikal di layar mobile (py-6) 
          agar konten tidak terlalu jauh, dan mengembalikannya ke py-10 di layar sm ke atas.
      */}
      <PageContainer variant="wide" className="py-6 sm:py-10">
        {/* PENYESUAIAN 2: Font Size Judul Responsif
          - Sebelum: text-2xl
          - Sesudah: text-xl sm:text-2xl
          - Alasan: Menggunakan font size (text-xl) yang sedikit lebih kecil di mobile 
            agar pas, dan membesarkannya (sm:text-2xl) di layar lebih besar.
        */}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-dark">
          Menampilkan semua UMKM Kudus <br />
          <span className="font-normal text-dark/80">
            dalam kategori{" "}
            <span className="text-orange italic capitalize">
              “{kategoriSlug}”
            </span>
          </span>
        </h2>

        {/* GRID INI SUDAH RESPONSif DARI AWAL (Bagus!)
          'grid-cols-1' adalah default mobile, lalu 'sm:grid-cols-2', dst.

          PENYESUAIAN 3: Spasi (Gap & Margin) Responsif
          - Sebelum: gap-6 ... mt-10
          - Sesudah: gap-4 sm:gap-6 ... mt-6 sm:mt-10
          - Alasan: Menggunakan 'gap' dan 'margin-top' yang sedikit lebih kecil 
            di mobile (gap-4, mt-6) agar lebih proporsional.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center mt-6 sm:mt-10">
          {kategoriData.umkmList.map((umkm, index) => (
            <UMKMCard key={index} data={umkm} />
          ))}
        </div>

        {/* PAGINATION INI SUDAH RESPONSif
          'flex justify-center' sudah bekerja baik di semua ukuran.

          PENYESUAIAN 4: Konsistensi Margin
          - Sebelum: mt-10
          - Sesudah: mt-6 sm:mt-10
          - Alasan: Menyamakan margin-top responsif dengan grid di atas.
        */}
        <div className="flex justify-center mt-6 sm:mt-10">
          <div className="flex items-center gap-3">
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

export default KategoriPage;