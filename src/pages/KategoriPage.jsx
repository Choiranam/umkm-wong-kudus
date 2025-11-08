import React, { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import UMKMCard from "../components/UMKMCard";
import PageContainer from "../components/PageContainer";
import { dataUMKM } from "../data/dataUMKM";

const KATEGORI_CONFIG = {
  makanan: {
    title: "Jelajahi Rasa Lokal dari UMKM Kudus",
    subtitle:
      "Nikmati aneka kuliner khas buatan warga Kudus yang penuh cita rasa dan keunikan lokal.",
    image: "/images/sampel_hero_kategori.webp",
  },
  minuman: {
    title: "Segarnya Kreasi Minuman dari UMKM Kudus",
    subtitle:
      "Temukan berbagai minuman segar hasil racikan pelaku UMKM dengan inovasi dan cita rasa khas daerah.",
    image: "/images/sampel_hero_minuman.webp",
  },
  jasa: {
    title: "Layanan Terbaik dari Pelaku UMKM Kudus",
    subtitle:
      "Dari laundry hingga barbershop, kami hadirkan berbagai jasa berkualitas hasil karya masyarakat lokal.",
    image: "/images/sampel_hero_jasa.webp",
  },
  barang: {
    title: "Produk Unggulan Karya UMKM Kudus",
    subtitle:
      "Lihat hasil kreativitas warga Kudus melalui berbagai produk menarik dan bermanfaat bagi kebutuhan Anda.",
    image: "/images/sampel_hero_barang.webp",
  },
  lainnya: {
    title: "Beragam Inovasi dari UMKM Kudus",
    subtitle:
      "Temukan usaha-usaha unik lainnya yang menunjukkan semangat dan kreativitas pelaku UMKM di Kudus.",
    image: "/images/sampel_hero_lainnya.webp",
  },
};

const KategoriPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const kategoriSlug = searchParams.get("slug") || "makanan";

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [isOpen, setIsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    window.innerWidth < 640 ? 8 : 15
  );
  const filteredUMKM = useMemo(() => {
    return dataUMKM.filter((item) => {
      const matchesCategory =
        item.category.toLowerCase() === kategoriSlug.toLowerCase();
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [kategoriSlug, search]);

  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);

  const paginatedUMKM = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUMKM.slice(start, start + itemsPerPage);
  }, [filteredUMKM, currentPage, itemsPerPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [kategoriSlug, search]);
  useEffect(() => {
    setSearchParams({ slug: kategoriSlug, page: currentPage });
  }, [kategoriSlug, currentPage, setSearchParams]);
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth < 640 ? 8 : 15;
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]);
  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  const kategoriData = KATEGORI_CONFIG[kategoriSlug] || KATEGORI_CONFIG.makanan;

  return (
    <div className="bg-light min-h-screen overflow-x-hidden w-full relative">
      <Navbar />
      <HeroContent
        image={kategoriData.image}
        title={kategoriData.title}
        subtitle={kategoriData.subtitle}
      />

      <PageContainer variant="wide" className="py-6 sm:py-10 relative z-10">
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
                {Object.keys(KATEGORI_CONFIG).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSearchParams({ slug: key, page: 1 });
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
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-dark mb-6">
          Menampilkan {filteredUMKM.length} UMKM Kudus <br />
          <span className="font-normal text-dark/80">
            dalam kategori{" "}
            <span className="text-orange italic capitalize">
              “{kategoriSlug}”
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center mt-6 sm:mt-10">
          {paginatedUMKM.length > 0 ? (
            paginatedUMKM.map((umkm, index) => (
              <motion.div
                key={umkm.id}
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
                <Link to={`/detail-umkm/${umkm.slug}`} className="block w-full">
                  <UMKMCard data={umkm} />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-dark/60 italic py-10">
              Tidak ditemukan hasil untuk pencarian{" "}
              <span className="font-semibold text-orange">"{search}"</span> di
              kategori <span className="capitalize">"{kategoriSlug}"</span>.
            </div>
          )}
        </div>
        {totalPages > 1 && (
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
              <Icon
                icon="fluent:chevron-left-12-filled"
                width="22"
                height="22"
              />
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
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KategoriPage;
