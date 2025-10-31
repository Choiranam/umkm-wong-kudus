import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import UMKMCard from "../components/UMKMCard";
import PageContainer from "../components/PageContainer";
import { useSearchParams } from "react-router-dom";

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
    subtitle:
      "Dari laundry hingga barbershop, kami hadirkan berbagai jasa berkualitas hasil karya masyarakat lokal.",
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
    subtitle:
      "Temukan usaha-usaha unik lainnya yang menunjukkan semangat dan kreativitas pelaku UMKM di Kudus.",
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

const KategoriPage = () => {
  const [searchParams] = useSearchParams();
  const kategoriSlug = searchParams.get("slug") || "makanan";
  const kategoriData = KATEGORI_DATA[kategoriSlug] || KATEGORI_DATA.makanan;

  return (
    <div className="bg-light min-h-screen overflow-x-hidden w-full">
      <Navbar />
      <HeroContent
        image={kategoriData.image}
        title={kategoriData.title}
        subtitle={kategoriData.subtitle}
      />
      <PageContainer variant="wide" className="py-6 sm:py-10">
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-dark">
          Menampilkan semua UMKM Kudus <br />
          <span className="font-normal text-dark/80">
            dalam kategori{" "}
            <span className="text-orange italic capitalize">
              “{kategoriSlug}”
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center mt-6 sm:mt-10">
          {kategoriData.umkmList.map((umkm, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="w-full flex justify-center"
            >
              <UMKMCard data={umkm} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-6 sm:mt-10">
          <div className="flex items-center gap-3">
            <button className="text-dark/50 hover:text-orange transition">
              <Icon
                icon="fluent:chevron-left-12-filled"
                width="22"
                height="22"
              />
            </button>
            <span className="px-4 py-1 rounded-md bg-orange text-white font-medium">
              1
            </span>
            <button className="text-dark/50 hover:text-orange transition">
              <Icon
                icon="fluent:chevron-right-12-filled"
                width="22"
                height="22"
              />
            </button>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default KategoriPage;
