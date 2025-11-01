import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import UMKMCard from "../components/UMKMCard";
import PageContainer from "../components/PageContainer";

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

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredList = kategoriData.umkmList.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light min-h-screen overflow-x-hidden w-full relative">
      <Navbar />
      <HeroContent
        image={kategoriData.image}
        title={kategoriData.title}
        subtitle={kategoriData.subtitle}
      />

      <PageContainer variant="wide" className="py-6 sm:py-10 relative z-10">
        {/* Breadcrumb dengan dropdown interaktif */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-dark/70 text-sm sm:text-base mb-6 relative"
        >
          {/* Beranda */}
          <Link to="/" className="hover:text-orange flex items-center gap-1">
            <Icon icon="mdi:home-outline" />
            Beranda
          </Link>

          <Icon icon="mdi:chevron-right" className="mx-2" />

          {/* Dropdown kategori */}
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-orange transition">
              <Icon icon="mdi:folder-outline" />
              Kategori
              <Icon icon="mdi:chevron-down" className="text-sm" />
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-full bg-white shadow-md rounded-md border border-dark/10 z-50 overflow-hidden min-w-40"
              >
                {Object.keys(KATEGORI_DATA).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.set("slug", key);
                      window.history.pushState({}, "", url);
                      window.location.reload();
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm capitalize transition-colors ${
                      kategoriSlug === key
                        ? "font-semibold text-orange bg-orange/10"
                        : "text-dark/70 hover:bg-orange hover:text-white"
                    } first:rounded-t-md last:rounded-b-md`}
                  >
                    {key}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <Icon icon="mdi:chevron-right" className="mx-2" />
          <span className="text-orange capitalize font-semibold">
            {kategoriSlug}
          </span>
        </motion.nav>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Cari nama UMKM..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-dark/20 rounded-[5px] px-5 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange transition placeholder:text-dark/50 text-dark"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute right-4 top-2.5 text-dark/50"
              width="22"
              height="22"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-dark">
          Menampilkan semua UMKM Kudus <br />
          <span className="font-normal text-dark/80">
            dalam kategori{" "}
            <span className="text-orange italic capitalize">
              “{kategoriSlug}”
            </span>
          </span>
        </h2>

        {/* UMKM List */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center mt-6 sm:mt-10">
          {filteredList.length > 0 ? (
            filteredList.map((umkm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 12,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                className="w-full flex justify-center"
              >
                <UMKMCard data={umkm} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-dark/60 italic py-10">
              Tidak ditemukan hasil untuk pencarian{" "}
              <span className="font-semibold text-orange">"{search}"</span>.
            </div>
          )}
        </div>

        {/* Pagination — tampil hanya jika ada hasil */}
        {filteredList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-6 sm:mt-10"
          >
            <div className="flex items-center gap-3">
              <button className="text-dark/50 hover:text-orange transition">
                <Icon
                  icon="fluent:chevron-left-12-filled"
                  width="22"
                  height="22"
                />
              </button>
              <span className="px-4 py-1 rounded-md bg-orange text-white font-medium shadow">
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
          </motion.div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KategoriPage;
