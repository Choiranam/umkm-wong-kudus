import React, { useState, useMemo, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import UMKMCard from "../components/UMKMCard";
import PageContainer from "../components/PageContainer";
import api from "../services/api";

const KATEGORI_CONFIG = {
  makanan: {
    title: "Jelajahi Rasa Lokal dari UMKM Kudus",
    subtitle:
      "Nikmati aneka kuliner khas buatan warga Kudus yang penuh cita rasa dan keunikan lokal.",
    image: "/images/hero_makanan.webp",
  },
  minuman: {
    title: "Segarnya Kreasi Minuman dari UMKM Kudus",
    subtitle:
      "Temukan berbagai minuman segar hasil racikan pelaku UMKM dengan inovasi dan cita rasa khas daerah.",
    image: "/images/hero_minuman.webp",
  },
  jasa: {
    title: "Layanan Terbaik dari Pelaku UMKM Kudus",
    subtitle:
      "Dari laundry hingga barbershop, kami hadirkan berbagai jasa berkualitas hasil karya masyarakat lokal.",
    image: "/images/hero_jasa.webp",
  },
  barang: {
    title: "Produk Unggulan Karya UMKM Kudus",
    subtitle:
      "Lihat hasil kreativitas warga Kudus melalui berbagai produk menarik dan bermanfaat bagi kebutuhan Anda.",
    image: "/images/hero_barang.webp",
  },
  lainnya: {
    title: "Beragam Inovasi dari UMKM Kudus",
    subtitle:
      "Temukan usaha-usaha unik lainnya yang menunjukkan semangat dan kreativitas pelaku UMKM di Kudus.",
    image: "/images/hero_lainnya.webp",
  },
};

// Daftar kecamatan (sama seperti di KecamatanPage)
const allKecamatanInfo = {
  bae: { name: "Bae", slug: "bae" },
  kaliwungu: { name: "Kaliwungu", slug: "kaliwungu" },
  "kota-kudus": { name: "Kota Kudus", slug: "kota-kudus" },
  gebog: { name: "Gebog", slug: "gebog" },
  dawe: { name: "Dawe", slug: "dawe" },
  jati: { name: "Jati", slug: "jati" },
  jekulo: { name: "Jekulo", slug: "jekulo" },
  mejobo: { name: "Mejobo", slug: "mejobo" },
  undaan: { name: "Undaan", slug: "undaan" },
};

const KategoriPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const kategoriSlug = searchParams.get("slug") || "makanan";
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const [umkmData, setUmkmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeKecamatan, setActiveKecamatan] = useState(""); // default: semua

  const pageContainerRef = useRef(null);

  const scrollToContainer = () => {
    if (pageContainerRef.current) {
      const navbarHeight = 70;
      const elementPosition =
        pageContainerRef.current.getBoundingClientRect().top;
      const offsetPosition = window.scrollY + elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    window.innerWidth < 640 ? 8 : 15
  );

  useEffect(() => {
    const fetchUMKM = async () => {
      setLoading(true);
      try {
        const response = await api.get("/umkm");
        if (response.data.status && Array.isArray(response.data.data)) {
          setUmkmData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching UMKM:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  // Reset filter saat ganti kategori
  useEffect(() => {
    setActiveKecamatan("");
    setSearch("");
    setCurrentPage(1);
    scrollToTop();
  }, [kategoriSlug]);

  // Filter UMKM: kategori + pencarian + kecamatan
  const filteredUMKM = useMemo(() => {
    return umkmData.filter((item) => {
      const categoryName = item.category?.name?.toLowerCase() || "";
      const matchesCategory = categoryName === kategoriSlug.toLowerCase();
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesKecamatan =
        !activeKecamatan || item.listing?.kecamatan_slug === activeKecamatan;

      return matchesCategory && matchesSearch && matchesKecamatan;
    });
  }, [kategoriSlug, search, umkmData, activeKecamatan]);

  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);
  const paginatedUMKM = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUMKM.slice(start, start + itemsPerPage);
  }, [filteredUMKM, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeKecamatan]);

  useEffect(() => {
    setSearchParams({
      slug: kategoriSlug,
      page: currentPage,
      ...(activeKecamatan && { kec: activeKecamatan }),
    });
  }, [kategoriSlug, currentPage, activeKecamatan, setSearchParams]);

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
    setTimeout(scrollToContainer, 0);
  };

  const kategoriData = KATEGORI_CONFIG[kategoriSlug] || KATEGORI_CONFIG.makanan;

  // Cek apakah kecamatan punya UMKM di kategori ini
  const hasUmkmInKecamatan = (slug) => {
    return umkmData.some(
      (u) =>
        u.category?.name?.toLowerCase() === kategoriSlug.toLowerCase() &&
        u.listing?.kecamatan_slug === slug
    );
  };

  return (
    <div className="bg-light min-h-screen w-full relative">
      <Navbar />
      <HeroContent
        image={kategoriData.image}
        title={kategoriData.title}
        subtitle={kategoriData.subtitle}
      />
      <PageContainer
        ref={pageContainerRef}
        variant="wide"
        className="py-6 sm:py-10 relative z-10"
      >
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
        <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setActiveKecamatan("")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all shadow-sm ${
              !activeKecamatan
                ? "bg-orange text-white"
                : "bg-white text-dark border border-dark/10 hover:bg-orange/10"
            }`}
          >
            <Icon icon="mdi:map-marker-off-outline" width="16" />
            Semua
          </button>
          {Object.entries(allKecamatanInfo).map(([slug, info]) => {
            const disabled = !hasUmkmInKecamatan(slug);
            return (
              <button
                key={slug}
                disabled={disabled}
                onClick={() => setActiveKecamatan(slug)}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md font-medium text-sm transition-all shadow-sm ${
                  activeKecamatan === slug
                    ? "bg-orange text-white"
                    : disabled
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-dark border border-dark/10 hover:bg-orange/10"
                }`}
              >
                <Icon icon="mdi:map-marker" width="16" />
                {info.name}
              </button>
            );
          })}
        </div>

        {/* Desktop: Layout 2 kolom */}
        <div className="hidden md:flex flex-row gap-6">
          {/* Sidebar: Filter Kecamatan */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-3/12 bg-white rounded-lg shadow-md p-6 top-4 self-start border border-dark/5 md:sticky md:top-24 z-20"
          >
            <h3 className="text-lg font-semibold text-dark mb-4">
              Filter Kecamatan
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveKecamatan("")}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all shadow-sm border ${
                  !activeKecamatan
                    ? "bg-orange text-white shadow-md border-orange"
                    : "bg-white text-dark hover:bg-orange/5 border-dark/10 hover:border-orange/30"
                }`}
              >
                <Icon icon="mdi:map-marker-off-outline" width="20" />
                Semua Kecamatan
              </button>
              {Object.entries(allKecamatanInfo).map(([slug, info]) => {
                const disabled = !hasUmkmInKecamatan(slug);
                return (
                  <button
                    key={slug}
                    disabled={disabled}
                    onClick={() => setActiveKecamatan(slug)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all shadow-sm border ${
                      activeKecamatan === slug
                        ? "bg-orange text-white shadow-md border-orange"
                        : disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                        : "bg-white text-dark hover:bg-orange/5 border-dark/10 hover:border-orange/30"
                    }`}
                  >
                    <Icon icon="mdi:map-marker" width="20" />
                    {info.name}
                  </button>
                );
              })}
            </div>
          </motion.aside>

          {/* Konten Utama */}
          <div className="w-9/12">
            <div className="flex justify-start mb-8">
              <div className="relative w-full sm:w-3/4">
                <input
                  type="text"
                  placeholder="Cari nama UMKM..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-dark/20 rounded-[5px] px-5 py-2 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange transition placeholder:text-dark/50 text-dark"
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
              Menampilkan {filteredUMKM.length} UMKM Kudus{" "}
              <span className="block mt-1 font-normal text-dark/80">
                dalam kategori{" "}
                <span className="text-orange italic capitalize">
                  "{kategoriSlug}"
                </span>
                {activeKecamatan && (
                  <>
                    {" "}
                    di{" "}
                    <span className="capitalize">
                      {allKecamatanInfo[activeKecamatan]?.name}
                    </span>
                  </>
                )}
              </span>
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols- gap-4 sm:gap-6 justify-items-center">
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
                      <Link
                        to={`/detail-umkm/${umkm.slug}`}
                        className="block w-full"
                      >
                        <UMKMCard data={umkm} />
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-dark/60 italic py-10">
                    {search ? (
                      <>
                        Tidak ditemukan hasil untuk pencarian{" "}
                        <span className="font-semibold text-orange">
                          "{search}"
                        </span>
                        {activeKecamatan && (
                          <> di {allKecamatanInfo[activeKecamatan]?.name}</>
                        )}
                        .
                      </>
                    ) : (
                      <>
                        Belum ada UMKM di kategori{" "}
                        <span className="text-orange capitalize">
                          "{kategoriSlug}"
                        </span>
                        {activeKecamatan && (
                          <> di {allKecamatanInfo[activeKecamatan]?.name}</>
                        )}
                        .
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {!loading && totalPages > 1 && (
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
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
          </div>
        </div>

        {/* Mobile: Konten Utama */}
        <div className="md:hidden">
          <div className="flex justify-center mb-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari nama UMKM..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-dark/20 rounded-[5px] px-5 py-2 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange transition placeholder:text-dark/50 text-dark"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute right-4 top-2.5 text-dark/50"
                width="22"
                height="22"
              />
            </div>
          </div>

          <h2 className="text-center text-lg sm:text-xl font-semibold text-dark mb-6">
            Menampilkan {filteredUMKM.length} UMKM{" "}
            <span className="block mt-1 font-normal text-dark/80 text-sm">
              kategori{" "}
              <span className="text-orange italic capitalize">
                "{kategoriSlug}"
              </span>
              {activeKecamatan && (
                <>
                  {" "}
                  di{" "}
                  <span className="capitalize">
                    {allKecamatanInfo[activeKecamatan]?.name}
                  </span>
                </>
              )}
            </span>
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 justify-items-center">
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
                    <Link
                      to={`/detail-umkm/${umkm.slug}`}
                      className="block w-full"
                    >
                      <UMKMCard data={umkm} />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center text-dark/60 italic py-10">
                  {search ? (
                    <>
                      Tidak ditemukan hasil untuk "
                      <span className="text-orange font-semibold">
                        {search}
                      </span>
                      "
                      {activeKecamatan && (
                        <> di {allKecamatanInfo[activeKecamatan]?.name}</>
                      )}
                      .
                    </>
                  ) : (
                    <>
                      Belum ada UMKM di kategori "
                      <span className="text-orange capitalize">
                        {kategoriSlug}
                      </span>
                      "
                      {activeKecamatan && (
                        <> di {allKecamatanInfo[activeKecamatan]?.name}</>
                      )}
                      .
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {!loading && totalPages > 1 && (
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}
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
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default KategoriPage;