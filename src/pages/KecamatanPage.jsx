import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import UMKMCard from "../components/UMKMCard";
import api from "../services/api";

const allKecamatanInfo = {
  bae: {
    name: "Bae",
    title: "Daftar UMKM di Kecamatan Bae, Kudus",
    subtitle:
      "Temukan beragam produk lokal, kuliner khas, dan layanan unggulan dari pelaku UMKM asli Bae, Kudus.",
    image: "/images/hero_bae.webp",
  },
  kaliwungu: {
    name: "Kaliwungu",
    title: "Daftar UMKM di Kecamatan Kaliwungu, Kudus",
    subtitle:
      "Jelajahi makanan, minuman, dan jasa terbaik dari UMKM lokal di Kecamatan Kaliwungu, Kudus.",
    image: "/images/hero_kaliwungu.webp",
  },
  "kota-kudus": {
    name: "Kota Kudus",
    title: "Daftar UMKM di Kecamatan Kota Kudus",
    subtitle:
      "Pusat kuliner, kerajinan, dan jasa premium dari UMKM di jantung Kota Kudus.",
    image: "/images/hero_kotakudus.webp",
  },
  gebog: {
    name: "Gebog",
    title: "Daftar UMKM di Kecamatan Gebog, Kudus",
    subtitle:
      "Produk unggulan dan kuliner otentik dari para pelaku UMKM di Kecamatan Gebog.",
    image: "/images/hero_gebog.webp",
  },
  dawe: {
    name: "Dawe",
    title: "Daftar UMKM di Kecamatan Dawe, Kudus",
    subtitle:
      "Temukan makanan tradisional dan jasa berkualitas dari UMKM Dawe, Kudus.",
    image: "/images/hero_dawe.webp",
  },
  jati: {
    name: "Jati",
    title: "Daftar UMKM di Kecamatan Jati, Kudus",
    subtitle:
      "Kuliner khas, kerajinan tangan, dan layanan terbaik dari UMKM Jati, Kudus.",
    image: "/images/hero_jati.webp",
  },
  jekulo: {
    name: "Jekulo",
    title: "Daftar UMKM di Kecamatan Jekulo, Kudus",
    subtitle:
      "Beragam produk lokal dan jasa andalan dari pelaku UMKM di Kecamatan Jekulo.",
    image: "/images/hero_jekulo.webp",
  },
  mejobo: {
    name: "Mejobo",
    title: "Daftar UMKM di Kecamatan Mejobo, Kudus",
    subtitle:
      "Makanan, minuman, dan barang kebutuhan dari UMKM asli Mejobo, Kudus.",
    image: "/images/hero_mejobo.webp",
  },
  undaan: {
    name: "Undaan",
    title: "Daftar UMKM di Kecamatan Undaan, Kudus",
    subtitle:
      "Jelajahi produk unggulan dan kuliner otentik dari UMKM di Kecamatan Undaan.",
    image: "/images/hero_undaan.webp",
  },
};

const kategoriList = [
  { id: 1, name: "Makanan", icon: "fluent:food-16-regular" },
  { id: 2, name: "Minuman", icon: "fluent:drink-to-go-24-regular" },
  { id: 3, name: "Jasa", icon: "ph:wrench" },
  { id: 4, name: "Barang", icon: "lucide:package-open" },
  { id: 5, name: "Lainnya", icon: "basil:other-1-outline" },
];

const KecamatanPage = () => {
  const { slug } = useParams();

  const [kecamatanInfo, setKecamatanInfo] = useState(null);
  const [umkmInKecamatan, setUmkmInKecamatan] = useState([]);
  const [activeCategory, setActiveCategory] = useState("makanan");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUMKM = async () => {
      setLoading(true);
      try {
        const response = await api.get("/umkm");
        const result = response.data;

        if (result.status && Array.isArray(result.data)) {
          const filtered = result.data.filter(
            (u) => u.listing?.kecamatan_slug === slug
          );

          setUmkmInKecamatan(filtered);

          const availableCats = [
            ...new Set(filtered.map((u) => u.category?.name)),
          ];
          const firstCat = availableCats[0] || "Makanan";
          setActiveCategory(firstCat);
        }
      } catch (error) {
        console.error("Error fetching UMKM:", error);
        setUmkmInKecamatan([]);
      } finally {
        setLoading(false);
      }
    };

    const info = allKecamatanInfo[slug] || null;
    setKecamatanInfo(info);
    setSearch("");
    fetchUMKM();
  }, [slug]);

  const filteredUmkm = useMemo(() => {
    if (!umkmInKecamatan.length) return [];

    return umkmInKecamatan
      .filter(
        (u) => u.category?.name?.toLowerCase() === activeCategory.toLowerCase()
      )
      .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [umkmInKecamatan, activeCategory, search]);

  const hasUmkmInCategory = umkmInKecamatan.some(
    (u) => u.category?.name?.toLowerCase() === activeCategory.toLowerCase()
  );
  const hasSearchResult = filteredUmkm.length > 0;

  return (
    <div className="bg-light min-h-screen w-full relative">
      <Navbar />
      <HeroContent
        image={kecamatanInfo?.image || "/images/sampel_hero_content.webp"}
        title={kecamatanInfo?.title || "Memuat Data Kecamatan..."}
        subtitle={kecamatanInfo?.subtitle || "Silakan tunggu..."}
      />

      <PageContainer variant="wide" className="py-6 sm:py-10 relative z-10">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-dark/70 text-sm sm:text-base mb-6"
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
              <Icon icon="mdi:map-marker-outline" />
              Kecamatan
              <Icon icon="mdi:chevron-down" className="text-sm" />
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-full bg-white shadow-md rounded-md border border-dark/10 z-50 overflow-hidden min-w-40"
              >
                {Object.keys(allKecamatanInfo).map((key) => (
                  <Link
                    key={key}
                    to={`/kecamatan/${key}`}
                    onClick={() => setIsOpen(false)}
                    className={`block w-full text-left px-4 py-2 text-sm capitalize transition-colors ${
                      slug === key
                        ? "font-semibold text-orange bg-orange/10"
                        : "text-dark/70 hover:bg-orange hover:text-white"
                    }`}
                  >
                    {allKecamatanInfo[key].name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
          <Icon icon="mdi:chevron-right" className="mx-2" />
          <span className="text-orange capitalize font-semibold">
            {slug || "—"}
          </span>
        </motion.nav>
        <div className="md:hidden grid grid-cols-2 sm:flex sm:flex-wrap justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
          {kategoriList.map((item) => {
            const disabled = !umkmInKecamatan.some(
              (u) => u.category?.name === item.name
            );
            return (
              <button
                key={item.id}
                disabled={disabled}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg ${
                  activeCategory === item.name
                    ? "bg-orange text-light"
                    : disabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-dark hover:bg-orange/10 hover:shadow-lg border border-dark/10"
                }`}
              >
                <Icon
                  icon={item.icon}
                  width="18"
                  height="18"
                  className={
                    activeCategory === item.name ? "text-white" : "text-dark"
                  }
                />
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="hidden md:flex flex-row gap-6 sm:gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-3/12 bg-white rounded-lg shadow-md p-4 md:p-6 top-4 self-start border border-dark/5 md:sticky md:top-24 z-20"
          >
            <h3 className="text-lg font-semibold text-dark mb-4">
              Filter Kategori
            </h3>
            <div className="flex flex-col gap-2">
              {kategoriList.map((item) => {
                const disabled = !umkmInKecamatan.some(
                  (u) => u.category?.name === item.name
                );
                return (
                  <button
                    key={item.id}
                    disabled={disabled}
                    onClick={() => setActiveCategory(item.name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 shadow-sm border ${
                      activeCategory === item.name
                        ? "bg-orange text-light shadow-md border-orange"
                        : disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
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
                );
              })}
            </div>
          </motion.aside>
          <div className="w-9/12">
            <div className="flex justify-start mb-8">
              <div className="relative w-full sm:w-3/4 md:w-1/2">
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
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
              </div>
            ) : (
              <div
                key={`${slug}-${activeCategory}-${search}`}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
              >
                {hasSearchResult ? (
                  filteredUmkm.map((umkm, idx) => (
                    <motion.div
                      key={umkm.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                        delay: idx * 0.08,
                      }}
                      viewport={{ once: true }}
                      className="w-full flex justify-center"
                    >
                      <Link
                        to={`/detail-umkm/${umkm.slug}`}
                        className="block w-full"
                      >
                        <UMKMCard data={umkm} />
                      </Link>
                    </motion.div>
                  ))
                ) : hasUmkmInCategory ? (
                  <div className="col-span-full text-center text-dark/60 italic py-10">
                    Tidak ditemukan hasil untuk pencarian{" "}
                    <span className="font-semibold text-orange">
                      "{search}"
                    </span>{" "}
                    di kategori "<strong>{activeCategory}</strong>".
                  </div>
                ) : (
                  <div className="col-span-full text-center text-dark/60 italic py-10">
                    Belum ada UMKM di kategori{" "}
                    <span className="font-semibold text-orange">
                      "{activeCategory}"
                    </span>
                    .
                  </div>
                )}
              </div>
            )}
            {!loading && filteredUmkm.length > 0 && (
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
          </div>
        </div>
        <div className="md:hidden">
          <div className="flex justify-center mb-8">
            <div className="relative w-full sm:w-3/4">
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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
            </div>
          ) : (
            <div
              key={`${slug}-${activeCategory}-${search}-mobile`}
              className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 justify-items-center"
            >
              {hasSearchResult ? (
                filteredUmkm.map((umkm, idx) => (
                  <motion.div
                    key={umkm.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 12,
                      delay: idx * 0.08,
                    }}
                    viewport={{ once: true }}
                    className="w-full flex justify-center"
                  >
                    <UMKMCard data={umkm} />
                  </motion.div>
                ))
              ) : hasUmkmInCategory ? (
                <div className="col-span-full text-center text-dark/60 italic py-10">
                  Tidak ditemukan hasil untuk pencarian{" "}
                  <span className="font-semibold text-orange">"{search}"</span>{" "}
                  di kategori "<strong>{activeCategory}</strong>".
                </div>
              ) : (
                <div className="col-span-full text-center text-dark/60 italic py-10">
                  Belum ada UMKM di kategori{" "}
                  <span className="font-semibold text-orange">
                    "{activeCategory}"
                  </span>
                  .
                </div>
              )}
            </div>
          )}
          {!loading && filteredUmkm.length > 0 && (
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
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KecamatanPage;
