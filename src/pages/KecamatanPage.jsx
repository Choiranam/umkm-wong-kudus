import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import HeroContent from "../components/HeroContent";
import Footer from "../components/Footer";
import PageContainer from "../components/PageContainer";
import UMKMCard from "../components/UMKMCard";

const allKecamatanInfo = {
  bae: {
    name: "Bae",
    title: "Daftar UMKM di Daerah Kecamatan Bae",
    subtitle:
      "Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Bae Kudus.",
    image: "/images/hero_bae.jpg",
  },
  kaliwungu: {
    name: "Kaliwungu",
    title: "Daftar UMKM di Daerah Kecamatan Kaliwungu Kudus",
    subtitle:
      "Temukan beragam produk lokal, kuliner, dan layanan terbaik dari pelaku UMKM asli Kaliwungu Kudus.",
    image: "/images/sampel_hero_content.jpeg",
  },
};

const allUmkmData = [
  {
    id: 1,
    name: "Soto Ayam Khas Bae",
    category: "Makanan",
    description: "Soto ayam legendaris di Bae.",
    location: "Bae",
    openHour: "07.00–15.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "bae",
  },
  {
    id: 2,
    name: "Es Tebu Segar Bae",
    category: "Minuman",
    description: "Minuman es tebu murni.",
    location: "Bae",
    openHour: "09.00–17.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "bae",
  },
  {
    id: 3,
    name: "Jasa Servis Elektronik Bae",
    category: "Jasa",
    description: "Servis TV, kulkas, dll.",
    location: "Bae",
    openHour: "08.00–16.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "bae",
  },
  {
    id: 4,
    name: "Ramboo Chicken",
    category: "Makanan",
    description: "Ramboo Chicken Kudus...",
    location: "Kaliwungu",
    openHour: "10.00–21.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "kaliwungu",
  },
  {
    id: 5,
    name: "Kopi Senja Kaliwungu",
    category: "Minuman",
    description: "Kedai kopi modern.",
    location: "Kaliwungu",
    openHour: "15.00–23.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "kaliwungu",
  },
  {
    id: 6,
    name: "Cetak Undangan Kaliwungu",
    category: "Jasa",
    description: "Jasa percetakan dan desain.",
    location: "Kaliwungu",
    openHour: "09.00–17.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "kaliwungu",
  },
  {
    id: 7,
    name: "Toko Sembako Kaliwungu",
    category: "Barang",
    description: "Menjual kebutuhan pokok.",
    location: "Kaliwungu",
    openHour: "06.00–20.00",
    image: "/images/sampel_umkm.png",
    kecamatanSlug: "kaliwungu",
  },
];

const kategoriList = [
  { id: 1, name: "Makanan", icon: "fluent:food-16-regular" },
  { id: 2, name: "Minuman", icon: "fluent:drink-to-go-24-regular" },
  { id: 3, name: "Jasa", icon: "ph:wrench" },
  { id: 4, name: "Barang", icon: "lucide:package-open" },
  { id: 5, name: "Lainnya", icon: "basil:other-1-outline" },
];

const KecamatanPage = () => {
  const { slug } = useParams();

  const [activeCategory, setActiveCategory] = useState("Makanan");
  const [kecamatanInfo, setKecamatanInfo] = useState(null);
  const [umkmInKecamatan, setUmkmInKecamatan] = useState([]);
  const [filteredUmkm, setFilteredUmkm] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const info = allKecamatanInfo[slug] || null;
    const umkms = allUmkmData.filter((umkm) => umkm.kecamatanSlug === slug);
    const availableCategories = [...new Set(umkms.map((u) => u.category))];
    const validCategory = availableCategories[0] || "Makanan";

    setKecamatanInfo(info);
    setUmkmInKecamatan(umkms);
    setActiveCategory(validCategory);
    setSearch("");
  }, [slug]);

  useEffect(() => {
    if (!umkmInKecamatan || umkmInKecamatan.length === 0) {
      setFilteredUmkm([]);
      return;
    }
    setTimeout(() => {
      const filtered = umkmInKecamatan
        .filter(
          (umkm) => umkm.category.toLowerCase() === activeCategory.toLowerCase()
        )
        .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

      setFilteredUmkm(filtered);
    }, 0);
  }, [activeCategory, search, umkmInKecamatan]);

  const hasUmkmInCategory = umkmInKecamatan.some(
    (u) => u.category.toLowerCase() === activeCategory.toLowerCase()
  );
  const hasSearchResult = filteredUmkm.length > 0;

  return (
    <div className="bg-light min-h-screen w-full relative">
      <Navbar />
      <HeroContent
        image={kecamatanInfo?.image || "/images/sampel_hero_content.jpeg"}
        title={kecamatanInfo?.title || "Memuat Data Kecamatan..."}
        subtitle={kecamatanInfo?.subtitle || "Silakan tunggu..."}
      />

      <PageContainer variant="wide" className="py-6 sm:py-10 relative z-10">
        {/* Breadcrumb */}
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
                    {key}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
          <Icon icon="mdi:chevron-right" className="mx-2" />
          <span className="text-orange capitalize font-semibold">{slug}</span>
        </motion.nav>

        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Mobile Tabs */}
          <div className="md:hidden grid grid-cols-2 sm:flex sm:flex-wrap justify-start gap-2 sm:gap-3 mb-6 sm:mb-10">
            {kategoriList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.name)}
                className={`flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer shadow-lg ${
                  activeCategory === item.name
                    ? "bg-orange text-light shadow-lg"
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
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-row gap-6 sm:gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-3/12 bg-white rounded-lg shadow-md p-4 md:p-6 top-4 self-start border border-dark/5 md:sticky md:top-24 md:self-start z-20"
            >
              <h3 className="text-lg font-semibold text-dark mb-4">
                Filter Kategori
              </h3>
              <div className="flex flex-col gap-2">
                {kategoriList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveCategory(item.name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 shadow-sm border ${
                      activeCategory === item.name
                        ? "bg-orange text-light shadow-md border-orange"
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
                ))}
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

              <div
                key={`${slug}-${activeCategory}-${search}`}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
              >
                {hasSearchResult ? (
                  filteredUmkm.map((umkm, index) => (
                    <motion.div
                      key={umkm.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
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
                ) : hasUmkmInCategory ? (
                  <div className="col-span-full text-center text-dark/60 italic py-10">
                    Tidak ditemukan hasil untuk pencarian{" "}
                    <span className="font-semibold text-orange">
                      "{search}"
                    </span>{" "}
                    di kategori "{activeCategory}".
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

              {filteredUmkm.length > 0 && (
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

          {/* Mobile Content */}
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

            <div
              key={`${slug}-${activeCategory}-${search}`}
              className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 justify-items-center"
            >
              {hasSearchResult ? (
                filteredUmkm.map((umkm, index) => (
                  <motion.div
                    key={umkm.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
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
              ) : hasUmkmInCategory ? (
                <div className="col-span-full text-center text-dark/60 italic py-10">
                  Tidak ditemukan hasil untuk pencarian{" "}
                  <span className="font-semibold text-orange">"{search}"</span>{" "}
                  di kategori "{activeCategory}".
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

            {filteredUmkm.length > 0 && (
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
      </PageContainer>

      <Footer />
    </div>
  );
};

export default KecamatanPage;
