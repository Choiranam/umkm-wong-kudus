import React, { useState, useEffect, useMemo, useRef } from "react";
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
    image: "/images/hero_kota-kudus.webp",
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
  { id: 1, name: "Makanan", slug: "makanan", icon: "fluent:food-16-regular" },
  {
    id: 2,
    name: "Minuman",
    slug: "minuman",
    icon: "fluent:drink-to-go-24-regular",
  },
  { id: 3, name: "Jasa", slug: "jasa", icon: "ph:wrench" },
  { id: 4, name: "Barang", slug: "barang", icon: "lucide:package-open" },
  { id: 5, name: "Lainnya", slug: "lainnya", icon: "basil:other-1-outline" },
];

const KategoriButton = ({ name, slug, icon, isActive, onClick, isMobile }) => {
  const imageUrl = `/images/hero_${slug}.webp`;

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden flex items-center justify-start gap-1 px-3 py-2 rounded-md font-medium text-sm transition-all shadow-sm group ${
        isMobile ? "h-10" : "px-4 py-3"
      } ${
        isActive
          ? "text-white shadow-md"
          : "bg-white text-dark border border-dark/10"
      }`}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <div
        className={`relative flex items-center gap-1 transition-colors duration-300 ${
          isActive ? "text-white" : "group-hover:text-white"
        }`}
      >
        <Icon
          icon={icon}
          width={isMobile ? "18" : "20"}
          className={`transition-colors duration-300 ${
            isActive ? "text-white" : "group-hover:text-white"
          }`}
        />
        {name}
      </div>
    </button>
  );
};

const KecamatanPage = () => {
  const { slug } = useParams();

  const [kecamatanInfo, setKecamatanInfo] = useState(null);
  const [umkmInKecamatan, setUmkmInKecamatan] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    window.innerWidth < 640 ? 8 : 12
  );

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

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth < 640 ? 8 : 12;
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]);

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
    setCurrentPage(1);
    fetchUMKM();
  }, [slug]);

  const filteredUmkm = useMemo(() => {
    if (!umkmInKecamatan.length) return [];

    return umkmInKecamatan
      .filter(
        (u) =>
          (u.category?.name || "Lainnya").toLowerCase() ===
          activeCategory.toLowerCase()
      )
      .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [umkmInKecamatan, activeCategory, search]);

  const totalPages = Math.ceil(filteredUmkm.length / itemsPerPage);
  const paginatedUmkm = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUmkm.slice(start, start + itemsPerPage);
  }, [filteredUmkm, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    setTimeout(scrollToContainer, 50);
  };

  const handleCategoryClick = (catName) => {
    setActiveCategory(catName);
    setCurrentPage(1);
    setTimeout(scrollToContainer, 50);
  };

  const hasUmkmInCategory = (catName) => {
    return umkmInKecamatan.some(
      (u) => (u.category?.name || "Lainnya") === catName
    );
  };

  const hasSearchResult = paginatedUmkm.length > 0;

  const renderGrid = (isMobile = false) => (
    <div
      key={`${slug}-${activeCategory}-${search}-${currentPage}`}
      className={`grid ${
        isMobile
          ? "grid-cols-2 gap-4 sm:gap-6"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      } justify-items-center`}
    >
      {hasSearchResult ? (
        paginatedUmkm.map((umkm, idx) => (
          <motion.div
            key={umkm.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: idx * 0.08,
            }}
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <Link to={`/detail-umkm/${umkm.slug}`} className="block w-full">
              <UMKMCard data={umkm} />
            </Link>
          </motion.div>
        ))
      ) : hasUmkmInCategory(activeCategory) ? (
        <div className="col-span-full text-center text-dark/60 italic py-10">
          Tidak ditemukan hasil untuk pencarian{" "}
          <span className="font-semibold text-orange">"{search}"</span> di
          kategori "<strong>{activeCategory}</strong>".
        </div>
      ) : (
        <div className="col-span-full text-center text-dark/60 italic py-10">
          Belum ada UMKM di kategori{" "}
          <span className="font-semibold text-orange">"{activeCategory}</span>".
        </div>
      )}
    </div>
  );

  const renderPagination = () =>
    !loading &&
    totalPages > 1 && (
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
          <Icon icon="fluent:chevron-left-12-filled" width="22" height="22" />
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
          <Icon icon="fluent:chevron-right-12-filled" width="22" height="22" />
        </button>
      </motion.div>
    );

  return (
    <div className="bg-light min-h-screen w-full relative overflow-hidden md:overflow-visible">
      <Navbar />
      <HeroContent
        image={kecamatanInfo?.image || "/images/sampel_hero_content.webp"}
        title={kecamatanInfo?.title || "Memuat Data Kecamatan..."}
        subtitle={kecamatanInfo?.subtitle || "Silakan tunggu..."}
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
          <span className="text-orange font-semibold">
            {kecamatanInfo?.name || "—"}
          </span>
        </motion.nav>
        <div className="md:hidden grid grid-cols-2 sm:flex sm:flex-wrap justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
          {kategoriList.map((item) => (
            <KategoriButton
              key={item.id}
              name={item.name}
              slug={item.slug}
              icon={item.icon}
              isActive={activeCategory === item.name}
              onClick={() => handleCategoryClick(item.name)}
              isMobile={true}
            />
          ))}
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
              {kategoriList.map((item) => (
                <KategoriButton
                  key={item.id}
                  name={item.name}
                  slug={item.slug}
                  icon={item.icon}
                  isActive={activeCategory === item.name}
                  onClick={() => handleCategoryClick(item.name)}
                  isMobile={false}
                />
              ))}
            </div>
          </motion.aside>
          <div className="w-9/12">
            <div className="flex justify-start mb-8">
              <div className="relative w-full">
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
              renderGrid(false)
            )}
            {renderPagination()}
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
            renderGrid(true)
          )}
          {renderPagination()}
        </div>
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KecamatanPage;
